import type { RecoveryDecisions, RecoveryPlan, RecoveryPlanField } from '@/api/recovery'
import { useConfig } from '@/config'
import { fieldText } from '@/pages/editor/texts'
import { LOCALES } from '@/utilities/localization'
import { formatString } from '@/utilities/strings'
import { Alert, Button, List, Radio, Space, Typography } from 'antd'
import { useState } from 'react'

/** Ключ решения по конфликтному полю: индексы файла и поля в плане. */
function fieldKey(file: number, field: number): string {
	return `${file}:${field}`
}

/** Подпись поля: ключ подписи из ядра, иначе имя атрибута. */
function fieldLabel(field: RecoveryPlanField): string {
	return fieldText(field.label) || field.attribute
}

/** Параметры окна конфликтов. */
export interface RecoveryConflictsProps {
	/** План восстановления с конфликтами и режимом «нет истории». */
	plan: RecoveryPlan

	/** Решения приняты: можно применять. */
	onApply(decisions: RecoveryDecisions): void

	/** Отложить восстановление. */
	onLater(): void
}

/**
 * Конфликты трёхстороннего сравнения и режим «нет истории».
 *
 * «Применить» неактивна, пока по каждому конфликту и каждому legacy-файлу
 * с отличиями нет решения: иначе ядро отклонит восстановление.
 */
export function RecoveryConflicts({ plan, onApply, onLater }: RecoveryConflictsProps) {
	const config = useConfig()
	const texts = LOCALES[config.lang].recovery
	const [fields, setFields] = useState<Record<string, 'mine' | 'game'>>({})
	const [legacy, setLegacy] = useState<Record<number, boolean>>({})

	const conflicts: Array<{ file: number, field: number, value: RecoveryPlanField }> = []

	plan.files.forEach((planFile, fileIndex) => {
		planFile.fields.forEach((field, fieldIndex) => {
			if (field.state === 'conflict') {
				conflicts.push({ file: fileIndex, field: fieldIndex, value: field })
			}
		})
	})

	const legacyFiles = plan.files
		.map((file, index) => ({ file, index }))
		.filter(({ file }) => file.mode === 'legacy' && file.fields.length > 0)

	const applyCount = plan.files.reduce(
		(sum, file) => sum + file.fields.filter(field => field.state === 'apply').length,
		0
	)
	const actionCount = plan.files.reduce((sum, file) => sum + file.actions, 0)
	const decided = conflicts.every(({ file, field }) => fields[fieldKey(file, field)] !== undefined)
		&& legacyFiles.every(({ index }) => legacy[index] !== undefined)

	/** Проставить одно решение всем конфликтам. */
	function keepAll(keep: 'mine' | 'game') {
		const next: Record<string, 'mine' | 'game'> = {}

		for (const { file, field } of conflicts) {
			next[fieldKey(file, field)] = keep
		}

		setFields(next)
	}

	/** Собирает решения в контракт ядра: индексы файла и поля в плане. */
	function apply() {
		if (!decided) {
			return
		}

		onApply({
			fields: conflicts.map(({ file, field }) => ({
				file,
				field,
				keep: fields[fieldKey(file, field)]!
			})),
			legacy: legacyFiles.map(({ index }) => ({ file: index, restore: legacy[index]! }))
		})
	}

	return (
		<div className="recovery-conflicts">
			<p>{texts.conflictsText}</p>

			{conflicts.length > 0 && (
				<>
					<Space wrap>
						<Button size="small" onClick={() => keepAll('mine')}>{texts.mineAll}</Button>
						<Button size="small" onClick={() => keepAll('game')}>{texts.gameAll}</Button>
					</Space>
					<List
						className="recovery-conflict-list"
						dataSource={conflicts}
						renderItem={({ file, field, value }) => (
							<List.Item>
								<div className="recovery-conflict">
									<Typography.Text strong>{fieldLabel(value)}</Typography.Text>
									<div className="recovery-conflict-values">
										<span>{`${texts.mine}: ${value.mine ?? '—'}`}</span>
										<span>{`${texts.game}: ${value.game ?? '—'}`}</span>
									</div>
									<Radio.Group
										value={fields[fieldKey(file, field)]}
										onChange={event => {
											const keep = event.target.value as 'mine' | 'game'

											setFields(current => ({ ...current, [fieldKey(file, field)]: keep }))
										}}
									>
										<Radio value="mine">{texts.mine}</Radio>
										<Radio value="game">{texts.game}</Radio>
									</Radio.Group>
								</div>
							</List.Item>
						)}
					/>
				</>
			)}

			{legacyFiles.map(({ file, index }) => (
				<section key={index} className="recovery-legacy">
					<Typography.Title level={5}>{file.name}</Typography.Title>
					<Alert type="warning" showIcon title={texts.legacyText} />
					<List
						className="recovery-legacy-fields"
						dataSource={file.fields}
						renderItem={value => (
							<List.Item>
								<div className="recovery-conflict">
									<Typography.Text strong>{fieldLabel(value)}</Typography.Text>
									<div className="recovery-conflict-values">
										<span>{`${texts.mine}: ${value.mine ?? '—'}`}</span>
										<span>{`${texts.game}: ${value.game ?? '—'}`}</span>
									</div>
								</div>
							</List.Item>
						)}
					/>
					<Radio.Group
						value={legacy[index] === undefined ? undefined : legacy[index] ? 'restore' : 'skip'}
						onChange={event => {
							const restore = event.target.value === 'restore'

							setLegacy(current => ({ ...current, [index]: restore }))
						}}
					>
						<Radio value="restore">{texts.legacyRestore}</Radio>
						<Radio value="skip">{texts.legacySkip}</Radio>
					</Radio.Group>
				</section>
			))}

			<Typography.Text type="secondary" className="recovery-summary">
				{formatString(texts.willApply, String(applyCount))}
				{actionCount > 0 ? ` (+${actionCount})` : ''}
			</Typography.Text>

			<Space className="recovery-actions">
				<Button type="primary" disabled={!decided} onClick={apply}>{texts.apply}</Button>
				<Button onClick={onLater}>{texts.later}</Button>
			</Space>
		</div>
	)
}
