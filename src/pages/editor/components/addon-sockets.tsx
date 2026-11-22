import type { Field, Truck, TruckAddonShift, TruckAddonSocket } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { errorMessage } from '@/api/errors'
import { App, Button, Popconfirm } from 'antd'
import { DocumentField } from './field'
import { Group } from './group'
import { texts } from '../texts'
import './addon-sockets.scss'

/** Параметры группы «Сокеты аддонов». */
export interface AddonSocketsProps {
	/** Документ трака. */
	session: DocumentSession

	/** Модель трака. */
	truck: Truck

	/** Перечитывает модель трака после правки дерева. */
	onRefresh(): Promise<void>
}

/** Имена из поля-списка. */
function list(field: Field<string[]>): string[] {
	const value = field.value ?? field.defaultValue ?? []

	return Array.isArray(value) ? value : []
}

/** Подпись сокета: имена аддонов или номер. */
function socketLabel(socket: TruckAddonSocket, index: number): string {
	const names = list(socket.names)
	const label = names.join(', ')

	if (!label) {
		return `${texts.socket} ${index + 1}`
	}

	return label.length > 60 ? `${label.slice(0, 57)}…` : label
}

/** Подпись сдвига: типы аддонов или номер. */
function shiftLabel(shift: TruckAddonShift, index: number): string {
	const types = list(shift.types)
	const label = types.join(', ')

	return label ? `${texts.shift}: ${label}` : `${texts.shift} ${index + 1}`
}

/** Дерево сокетов аддонов: секции, сокеты и сдвиги. */
export function AddonSocketsGroup({ session, truck, onRefresh }: AddonSocketsProps) {
	const { message } = App.useApp()
	const blocks = truck.gameData?.addonSockets ?? []

	if (blocks.length === 0) {
		return null
	}

	async function run(operation: Promise<unknown>) {
		try {
			await operation
			await onRefresh()
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	return (
		<Group label={texts.addonSockets}>
			{blocks.map((block, blockIndex) => {
				const blockPath = block.defaultAddon.descriptor.selector

				return (
					<Group key={blockIndex} nested label={`${texts.addonSockets} ${blockIndex + 1}`}>
						<DocumentField session={session} field={block.defaultAddon} />

						<Button
							size="small"
							className="editor-socket-add"
							onClick={() => void run(session.addElement(blockPath, 'Socket'))}
						>
							{texts.addSocket}
						</Button>

						{block.sockets.map((socket, socketIndex) => {
							const socketPath = `${blockPath}/Socket[${socketIndex}]`

							return (
								<Group key={socketIndex} nested label={socketLabel(socket, socketIndex)}>
									<DocumentField session={session} field={socket.names} />
									<DocumentField session={session} field={socket.offset} />
									<DocumentField session={session} field={socket.namesBlock} />

									<div className="editor-socket-buttons">
										<Button
											size="small"
											disabled={socketIndex === 0}
											onClick={() => void run(session.moveElement(socketPath, socketIndex - 1))}
										>
											{texts.moveUp}
										</Button>
										<Button
											size="small"
											disabled={socketIndex === block.sockets.length - 1}
											onClick={() => void run(session.moveElement(socketPath, socketIndex + 1))}
										>
											{texts.moveDown}
										</Button>
										<Popconfirm
											title={texts.removeConfirm}
											okText={texts.remove}
											cancelText={texts.cancel}
											onConfirm={() => void run(session.removeElement(socketPath))}
										>
											<Button size="small" danger>
												{texts.remove}
											</Button>
										</Popconfirm>
										<Button
											size="small"
											onClick={() => void run(session.addElement(socketPath, 'AddonsShift'))}
										>
											{texts.addShift}
										</Button>
									</div>

									{socket.addonShifts.map((shift, shiftIndex) => {
										const shiftPath = `${socketPath}/AddonsShift[${shiftIndex}]`

										return (
											<Group key={shiftIndex} nested label={shiftLabel(shift, shiftIndex)}>
												<DocumentField session={session} field={shift.types} />
												<DocumentField session={session} field={shift.offset} />
												<DocumentField session={session} field={shift.trailerNamesBlock} />

												<div className="editor-socket-buttons">
													<Button
														size="small"
														disabled={shiftIndex === 0}
														onClick={() => void run(session.moveElement(shiftPath, shiftIndex - 1))}
													>
														{texts.moveUp}
													</Button>
													<Button
														size="small"
														disabled={shiftIndex === socket.addonShifts.length - 1}
														onClick={() => void run(session.moveElement(shiftPath, shiftIndex + 1))}
													>
														{texts.moveDown}
													</Button>
													<Popconfirm
														title={texts.removeConfirm}
														okText={texts.remove}
														cancelText={texts.cancel}
														onConfirm={() => void run(session.removeElement(shiftPath))}
													>
														<Button size="small" danger>
															{texts.remove}
														</Button>
													</Popconfirm>
												</div>
											</Group>
										)
									})}
								</Group>
							)
						})}
					</Group>
				)
			})}
		</Group>
	)
}
