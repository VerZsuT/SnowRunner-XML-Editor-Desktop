import type { Crane, Field, Trailer, Truck, TruckAddonSocket } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { errorMessage } from '@/api/errors'
import { App, Button, Typography } from 'antd'
import { Group } from './group'
import { texts } from '../texts'
import './actions.scss'

/** Имя крана «Банан бандита». */
const BANDIT_CRANE = 'CraneKrs58Bandit'

/** Трак, для которого доступен «Банан бандита». */
const BANDIT_TRUCK = 'zikz_605r'

/** Имена сокета аддона. */
function socketNames(socket: TruckAddonSocket): string[] {
	const value = socket.names.value ?? socket.names.defaultValue ?? []

	return Array.isArray(value) ? value : []
}

/** Есть ли аддон с таким именем в сокетах трака. */
export function hasAddon(truck: Truck, name: string): boolean {
	return (truck.gameData?.addonSockets ?? []).some(block => block.sockets.some(socket => socketNames(socket).includes(name)))
}

/** Краны, которые уже есть у трака. */
export function craneState(truck: Truck) {
	return {
		ru: hasAddon(truck, 'MinicraneRU'),
		us: hasAddon(truck, 'MinicraneUS')
	}
}

/** Прицепы, которые уже есть у трака. */
export function trailerState(truck: Truck) {
	return {
		scout: hasAddon(truck, 'ScautTrailer'),
		truck: hasAddon(truck, 'Trailer')
	}
}

/** Параметры группы действий с аддонами. */
interface ActionProps {
	/** Документ трака. */
	session: DocumentSession

	/** Модель трака. */
	truck: Truck

	/** Перечитывает модель трака после действия. */
	onRefresh(): Promise<void>
}

/** Краны трака. */
export function CranesGroup({ session, truck, onRefresh }: ActionProps) {
	const { message } = App.useApp()
	const { ru, us } = craneState(truck)

	if (!ru && !us) {
		return null
	}

	async function toggle(crane: Crane, enabled: boolean) {
		try {
			await session.setCrane(crane, enabled)
			await onRefresh()
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	return (
		<Group label={texts.cranes} icon="crane">
			<Typography.Paragraph className="editor-action-warning">
				{texts.cranesWarnTitle}
			</Typography.Paragraph>
			<Typography.Paragraph className="editor-action-message">
				{texts.cranesWarnMessage}
			</Typography.Paragraph>

			<div className="editor-actions-grid">
				<div className="editor-actions-card">
					<Typography.Text>US {texts.crane}</Typography.Text>
					{us
						? (
							<Button danger disabled={!ru} onClick={() => void toggle('us', false)}>
								{texts.remove}
							</Button>
						)
						: (
							<Button type="primary" disabled={!ru} onClick={() => void toggle('us', true)}>
								{texts.add}
							</Button>
						)}
				</div>
				<div className="editor-actions-card">
					<Typography.Text>RU {texts.crane}</Typography.Text>
					{ru
						? (
							<Button danger disabled={!us} onClick={() => void toggle('ru', false)}>
								{texts.remove}
							</Button>
						)
						: (
							<Button type="primary" disabled={!us} onClick={() => void toggle('ru', true)}>
								{texts.add}
							</Button>
						)}
				</div>
			</div>
		</Group>
	)
}

/** Прицепы трака. */
export function TrailersGroup({ session, truck, onRefresh }: ActionProps) {
	const { message } = App.useApp()
	const state = trailerState(truck)

	if (!state.scout && !state.truck) {
		return null
	}

	async function toggle(trailer: Trailer, enabled: boolean) {
		try {
			await session.setTrailer(trailer, enabled)
			await onRefresh()
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	return (
		<Group label={texts.trailers} icon="trailer">
			<div className="editor-actions-grid">
				<div className="editor-actions-card">
					<Typography.Text>{texts.scoutTrailers}</Typography.Text>
					{state.scout
						? (
							<Button danger disabled={!state.truck} onClick={() => void toggle('scout', false)}>
								{texts.remove}
							</Button>
						)
						: (
							<Button type="primary" disabled={!state.truck} onClick={() => void toggle('scout', true)}>
								{texts.add}
							</Button>
						)}
				</div>
				<div className="editor-actions-card">
					<Typography.Text>{texts.truckTrailers}</Typography.Text>
					{state.truck
						? (
							<Button danger disabled={!state.scout} onClick={() => void toggle('truck', false)}>
								{texts.remove}
							</Button>
						)
						: (
							<Button type="primary" disabled={!state.scout} onClick={() => void toggle('truck', true)}>
								{texts.add}
							</Button>
						)}
				</div>
			</div>
		</Group>
	)
}

/** Кран «Банан бандита» для Zikz 605R. */
export function BanditCraneGroup({ session, truck, onRefresh }: ActionProps) {
	const { message } = App.useApp()

	if (session.name !== BANDIT_TRUCK) {
		return null
	}

	const present = hasAddon(truck, BANDIT_CRANE)

	async function toggle(enabled: boolean) {
		try {
			await session.setBanditCrane(enabled)
			await onRefresh()
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	return (
		<Group label={texts.banditCrane} icon="banana">
			<Typography.Paragraph className="editor-action-warning">
				{texts.cranesWarnTitle}
			</Typography.Paragraph>
			<Typography.Paragraph>
				{texts.banditWarnMessage}
			</Typography.Paragraph>

			{present
				? (
					<Button danger onClick={() => void toggle(false)}>
						{texts.remove}
					</Button>
				)
				: (
					<Button type="primary" onClick={() => void toggle(true)}>
						{texts.add}
					</Button>
				)}
		</Group>
	)
}
