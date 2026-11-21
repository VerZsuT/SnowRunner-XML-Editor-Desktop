import { useConfig } from '@renderer/utilities/use-reactive'
import { useMemo, useState } from 'react'
import type { IActionProps } from '../../types'
import { Accordion } from '../accordion'
import { Group } from '../group/group'
import type { ReadyProps } from '../utilities'
import { useFilesReady } from '../utilities'
import { AddonsContent } from './addons-content/addons-content'
import { BanditCrane } from './bandit-crane/bandit-crane'
import { Cranes } from './cranes/cranes'
import { EXTRA_LOCALIZATION as texts } from './localization'
import { Trailers } from './trailers/trailers'

enum ReadyType {
	addonsContent = 'addons-content',
	banditCrane = 'bandit-crane',
	cranes = 'cranes',
	trailers = 'trailers'
}

/** Параметры группы `Дополнительно`. */
export type ExtraActionsProps = IActionProps & ReadyProps

/** Группа `Дополнительно`. */
export function Extra({ file, xml, onReady, onMount }: ExtraActionsProps) {
	const config = useConfig()
	const { ready, inProgress } = useFilesReady({ onReady, onMount, dynamic: true })
	const label = useMemo(() => texts.extra, [config.lang])

	// Регистрируем все вложенные группы до монтирования детей,
	// чтобы готовность не срабатывала после первой же группы.
	useState(() => {
		for (const type of Object.values(ReadyType)) {
			inProgress(type)
		}
	})

	return (
		<Group label={label}>
			<Accordion>
				<AddonsContent
					file={file}
					xml={xml}
					onMount={() => inProgress(ReadyType.addonsContent)}
					onReady={() => ready(ReadyType.addonsContent)}
				/>
				<BanditCrane
					file={file}
					xml={xml}
					onMount={() => inProgress(ReadyType.banditCrane)}
					onReady={() => ready(ReadyType.banditCrane)}
				/>
				<Cranes
					file={file}
					xml={xml}
					onMount={() => inProgress(ReadyType.cranes)}
					onReady={() => ready(ReadyType.cranes)}
				/>
				<Trailers
					file={file}
					xml={xml}
					onMount={() => inProgress(ReadyType.trailers)}
					onReady={() => ready(ReadyType.trailers)}
				/>
			</Accordion>
		</Group>
	)
}
