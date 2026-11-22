import { errorMessage } from '@/api/errors'
import type {
	RecoveryCandidatesDto,
	RecoveryDecisions,
	RecoveryPlan,
	RecoveryProgress,
	RecoveryReport
} from '@/api/recovery'
import { isArchiveChanged, isRecoveryConflict } from '@/api/recovery'
import { useConfig } from '@/config'
import { LOCALES } from '@/utilities/localization'
import { formatString } from '@/utilities/strings'
import { App as AntApp, Alert, Button, Empty, List, Modal, Progress, Space, Spin, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { RecoveryClient } from './client'
import { RecoveryConflicts } from './conflicts'
import './recovery.scss'

/** Шаг окна восстановления. */
type RecoveryStep = 'list' | 'plan' | 'conflicts' | 'progress' | 'report'

/** Параметры окна восстановления. */
export interface RecoveryDialogProps {
	/** Окно открыто. */
	open: boolean

	/** Клиент команд: подменяется в тестах. */
	client: RecoveryClient

	/** Закрывает окно без перезагрузки. */
	onClose(): void

	/** Перечитывает доступность восстановления: после удаления копии и успеха. */
	onAvailabilityChange(): void

	/** Архив изменился: показать окно целостности заново. */
	onArchiveChanged(): void
}

/**
 * Окно восстановления: кандидаты, конфликты, прогресс и отчёт.
 *
 * План и применение — отдельные команды ядра: решения собираются по индексам
 * файлов и полей плана, чтобы ядро могло сверить их с пересчитанным планом.
 */
export function RecoveryDialog({
	open,
	client,
	onClose,
	onAvailabilityChange,
	onArchiveChanged
}: RecoveryDialogProps) {
	const { message, modal } = AntApp.useApp()
	const config = useConfig()
	const texts = LOCALES[config.lang].recovery
	const [step, setStep] = useState<RecoveryStep>('list')
	const [candidates, setCandidates] = useState<RecoveryCandidatesDto | null>(null)
	const [plan, setPlan] = useState<RecoveryPlan | null>(null)
	const [report, setReport] = useState<RecoveryReport | null>(null)
	const [progress, setProgress] = useState<RecoveryProgress | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [cancelling, setCancelling] = useState(false)
	// Отчёт об изменившемся архиве показывается один раз: окно целостности
	// поднимется поверх и больше не должно дребезжать на повторных рендерах.
	const changedReported = useRef(false)

	useEffect(() => {
		let cancelled = false

		void client.candidates().then(
			result => {
				if (!cancelled) {
					setCandidates(result)
				}
			},
			reason => {
				if (!cancelled) {
					setError(errorMessage(reason))
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [client])

	useEffect(() => {
		let cancelled = false
		let stop: (() => void) | undefined

		void client.progress(next => setProgress(next))
			.then(unlisten => {
				if (cancelled) {
					unlisten()
				} else {
					stop = unlisten
				}
			})
			.catch(() => {
				// Без события прогресса окно покажет только пересборку архива.
			})

		return () => {
			cancelled = true
			stop?.()
		}
	}, [client])

	useEffect(() => {
		if (step !== 'report' || !report || report.rebuild !== 'archiveChanged') {
			return
		}

		if (!changedReported.current) {
			changedReported.current = true
			onArchiveChanged()
		}
	}, [onArchiveChanged, report, step])

	/** Показывает ошибку и возвращает окно к списку: план тогда перечитывается. */
	function fail(reason: unknown) {
		if (isArchiveChanged(reason)) {
			onClose()
			onArchiveChanged()

			return
		}

		if (isRecoveryConflict(reason)) {
			// Конфликт ядра — не ошибка файла: показываем текст команды и даём повторить.
			message.error(errorMessage(reason))
		} else {
			setError(errorMessage(reason))
		}

		setStep('list')
	}

	/** Загружает план и при отсутствии конфликтов сразу применяет его. */
	async function start() {
		if (!candidates || candidates.files.length === 0) {
			return
		}

		setError(null)
		setStep('plan')

		try {
			const nextPlan = await client.plan()

			setPlan(nextPlan)

			if (nextPlan.conflicts === 0 && nextPlan.legacy === 0) {
				await apply({ fields: [], legacy: [] })
			} else {
				setStep('conflicts')
			}
		} catch (reason) {
			fail(reason)
		}
	}

	/** Применяет восстановление и показывает прогресс, затем отчёт. */
	async function apply(decisions: RecoveryDecisions) {
		setError(null)
		setProgress({ current: 0, total: 0, file: null })
		setCancelling(false)
		setStep('progress')

		try {
			const nextReport = await client.recover(decisions)

			setReport(nextReport)
			setStep('report')
			onAvailabilityChange()
		} catch (reason) {
			fail(reason)
		}
	}

	/** Останавливает восстановление между файлами; окно ждёт отчёт. */
	function cancelRun() {
		setCancelling(true)

		void client.cancel().catch(reason => message.error(errorMessage(reason)))
	}

	/** Удаляет копию `previous_initial` после подтверждения. */
	function discard() {
		modal.confirm({
			title: texts.discard,
			content: texts.discardConfirm,
			okText: texts.discard,
			cancelText: texts.later,
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await client.discard()
					onAvailabilityChange()
					onClose()
				} catch (reason) {
					if (isArchiveChanged(reason)) {
						onClose()
						onArchiveChanged()
					} else {
						message.error(errorMessage(reason))
					}
				}
			}
		})
	}

	/** Закрывает отчёт и перезагружает интерфейс: документы в ядре уже очищены. */
	function closeReport() {
		onClose()
		client.reload()
	}

	const title = step === 'conflicts'
		? texts.conflictsTitle
		: step === 'progress' ? texts.progress : texts.title

	let footer: ReactNode = null

	if (step === 'list' || step === 'plan') {
		footer = (
			<Space>
				<Button danger disabled={step === 'plan'} onClick={discard}>{texts.discard}</Button>
				<Button disabled={step === 'plan'} onClick={onClose}>{texts.later}</Button>
				<Button
					type="primary"
					loading={step === 'plan'}
					disabled={step === 'plan' || !candidates || candidates.files.length === 0}
					onClick={() => void start()}
				>
					{texts.restore}
				</Button>
			</Space>
		)
	} else if (step === 'report') {
		footer = <Button type="primary" onClick={closeReport}>{texts.close}</Button>
	}

	const percent = progress && progress.total > 0
		? Math.round((progress.current / progress.total) * 100)
		: 0

	let content: ReactNode

	if (step === 'list') {
		content = (
			<>
				{error && <Alert className="recovery-error" type="error" showIcon title={error} />}
				{candidates === null
					? (
						<div className="recovery-loading">
							<Spin size="large" />
						</div>
					)
					: candidates.files.length === 0
						? <Empty description={texts.empty} />
						: (
							<>
								<p>{texts.intro}</p>
								{candidates.mods > 0 && (
									<Alert
										className="recovery-mods"
										type="info"
										showIcon
										title={formatString(texts.modsNote, String(candidates.mods))}
									/>
								)}
								<List
									className="recovery-list"
									dataSource={candidates.files}
									renderItem={candidate => (
										<List.Item>
											<Space size="small" wrap>
												<span className="recovery-file">{candidate.name}</span>
												<Tag>{texts.kind[candidate.kind]}</Tag>
												{candidate.dlc && <Tag color="gold">{candidate.dlc}</Tag>}
												<Tag color={candidate.state === 'ready' ? 'green' : 'default'}>
													{texts.state[candidate.state]}
												</Tag>
												{!candidate.history && <Tag color="orange">{texts.noHistory}</Tag>}
											</Space>
										</List.Item>
									)}
								/>
								<p className="recovery-note">{texts.laterNote}</p>
							</>
						)}
			</>
		)
	} else if (step === 'plan') {
		content = (
			<div className="recovery-loading">
				<Spin size="large" />
			</div>
		)
	} else if (step === 'conflicts' && plan) {
		content = (
			<RecoveryConflicts
				plan={plan}
				onApply={decisions => void apply(decisions)}
				onLater={onClose}
			/>
		)
	} else if (step === 'progress') {
		content = (
			<div className="recovery-progress">
				<Progress percent={percent} status="active" />
				<p>{progress?.file ? `${progress.current} / ${progress.total}: ${progress.file}` : texts.building}</p>
				{progress?.file !== null && progress?.file !== undefined && (
					<Button danger loading={cancelling} onClick={cancelRun}>{texts.cancel}</Button>
				)}
			</div>
		)
	} else if (step === 'report' && report) {
		const problems = report.files.filter(file => file.error !== null)

		content = (
			<div className="recovery-report">
				{report.cancelled && <Alert type="warning" showIcon title={texts.cancelled} />}
				<Space className="recovery-report-counts" size="large" wrap>
					<span>{`${texts.restored}: ${report.restored}`}</span>
					<span>{`${texts.unchanged}: ${report.unchanged}`}</span>
					<span>{`${texts.skipped}: ${report.skipped}`}</span>
					<span>{`${texts.failed}: ${report.failed}`}</span>
				</Space>
				{report.rebuild === 'archiveChanged' && (
					<Alert className="recovery-report-alert" type="warning" showIcon title={texts.archiveChanged} />
				)}
				{report.rebuild === 'failed' && report.rebuildError && (
					<Alert className="recovery-report-alert" type="error" showIcon title={report.rebuildError} />
				)}
				{report.journalError && (
					<Alert className="recovery-report-alert" type="warning" showIcon title={report.journalError} />
				)}
				{problems.length > 0 && (
					<List
						className="recovery-problems"
						size="small"
						dataSource={problems}
						renderItem={file => (
							<List.Item>
								<span>{`${file.name}: ${file.error}`}</span>
							</List.Item>
						)}
					/>
				)}
			</div>
		)
	}

	return (
		<Modal
			open={open}
			title={title}
			width={620}
			centered
			closable={step !== 'progress'}
			keyboard={step !== 'progress'}
			mask={{ closable: false }}
			onCancel={() => {
				if (step !== 'progress') {
					onClose()
				}
			}}
			footer={footer}
		>
			{content}
		</Modal>
	)
}
