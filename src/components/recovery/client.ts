import type {
	RecoveryCandidatesDto,
	RecoveryDecisions,
	RecoveryPlan,
	RecoveryProgress,
	RecoveryReport
} from '@/api/recovery'
import {
	cancelRecovery,
	discardPrevious,
	onRecoveryProgress,
	recoverPrevious,
	recoveryCandidates,
	recoveryPlan
} from '@/api/recovery'

/** Клиент окна восстановления: подменяется в тестах. */
export interface RecoveryClient {
	/** Документы, которые можно восстановить после обновления игры. */
	candidates(): Promise<RecoveryCandidatesDto>

	/** План восстановления: конфликты и режим «нет истории». */
	plan(): Promise<RecoveryPlan>

	/** Применяет восстановление по решениям пользователя. */
	recover(decisions: RecoveryDecisions): Promise<RecoveryReport>

	/** Отменяет идущее восстановление. */
	cancel(): Promise<boolean>

	/** Удаляет копию `previous_initial`. */
	discard(): Promise<boolean>

	/** Подписка на прогресс восстановления. */
	progress(handler: (progress: RecoveryProgress) => void): Promise<() => void>

	/** Перезагружает интерфейс после восстановления. */
	reload(): void
}

/** Клиент команд ядра. */
export const recoveryClient: RecoveryClient = {
	candidates: recoveryCandidates,
	plan: recoveryPlan,
	recover: recoverPrevious,
	cancel: cancelRecovery,
	discard: discardPrevious,
	progress: onRecoveryProgress,
	reload: () => window.location.reload()
}
