import type {
	RecoveryCandidateDto,
	RecoveryCandidateOrigin,
	RecoveryCandidateState,
	RecoveryCandidatesDto,
	RecoveryDecisions,
	RecoveryKeep,
	RecoveryPlan,
	RecoveryPlanField,
	RecoveryPlanFieldState,
	RecoveryPlanFile,
	RecoveryProgress,
	RecoveryReport
} from './bindings'
import { commands, events } from './bindings'
import { CommandFailure, call } from './invoke'

export type {
	RecoveryCandidateDto,
	RecoveryCandidateOrigin,
	RecoveryCandidateState,
	RecoveryCandidatesDto,
	RecoveryDecisions,
	RecoveryKeep,
	RecoveryPlan,
	RecoveryPlanField,
	RecoveryPlanFieldState,
	RecoveryPlanFile,
	RecoveryProgress,
	RecoveryReport
}

/** Кандидаты на восстановление параметров после обновления игры. */
export async function recoveryCandidates(): Promise<RecoveryCandidatesDto> {
	return call(commands.recoveryCandidates())
}

/** План восстановления: что будет применено и где конфликты; ничего не пишет. */
export async function recoveryPlan(): Promise<RecoveryPlan> {
	return call(commands.recoveryPlan())
}

/** Применяет восстановление по решениям пользователя. */
export async function recoverPrevious(decisions: RecoveryDecisions): Promise<RecoveryReport> {
	return call(commands.recoverPrevious(decisions))
}

/** Отменяет идущее восстановление; `false` — восстановление не идёт. */
export async function cancelRecovery(): Promise<boolean> {
	return call(commands.cancelRecovery())
}

/** Удаляет копию `previous_initial`. */
export async function discardPrevious(): Promise<boolean> {
	return call(commands.discardPrevious())
}

/** Подписывает на прогресс восстановления. */
export function onRecoveryProgress(
	handler: (progress: RecoveryProgress) => void
): Promise<() => void> {
	return events.recoveryProgress.listen(event => handler(event.payload))
}

/** Ошибка означает, что архив изменился и запись в него запрещена. */
export { isArchiveChanged } from './archive'

/** Ошибка означает конфликт состояния: занято, несохранённые документы или устаревший план. */
export function isRecoveryConflict(reason: unknown): boolean {
	return reason instanceof CommandFailure && reason.code === 'conflict'
}
