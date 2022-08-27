import {NameType, NumberType} from 'enums'
import type {XMLTemplate} from 'types'

import {ForEach, Group, Number, Select, Template} from '../items'
import {unlockGroup} from '../presets/unlockGroup'
import {getSelectors} from '../service'
import {winchTexts} from './texts'

const selectors = getSelectors(({ forEach }) => {
    const winch = `WinchVariants.Winch${forEach}`
    const winchText = `${winch}.GameData.UiDesc`
    const gameData = `${winch}.GameData`

    return { winch, winchText, gameData }
})

export const winchTemplate = {
    selector: 'WinchVariants',
    template: Template(selectors, [
        ForEach(selectors.winch, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: ['UiName', 'Name'],
                    selector: [selectors.winchText, selectors.winch]
                },
                provided: selectors.winch
            }, [
                Number({
                    attribute: 'Length',
                    type: NumberType.integer,
                    label: winchTexts.length,
                    max: 100,
                    default: 14,
                    areas: {
                        yellow: [[30, 50]],
                        red: [[51, 100]]
                    }
                }),
                Number({
                    attribute: 'StrengthMult',
                    label: winchTexts.strengthMult,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[2, 5]],
                        red: [[5.1, 10]]
                    }
                }),
                Select({
                    attribute: 'IsEngineIgnitionRequired',
                    label: winchTexts.isEngineIgnitionRequired,
                    options: {
                        true: winchTexts.engine,
                        false: winchTexts.battery
                    },
                    default: 'true'
                }),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
} as XMLTemplate
