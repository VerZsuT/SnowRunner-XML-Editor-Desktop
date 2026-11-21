import { Lang, parseStrToLang } from '@modules/data/config/enums'
import { updateConfig } from '@renderer/config'
import { useConfig } from '@renderer/utilities/use-reactive'
import { di } from '@utilities/di/container'
import { GAME_TEXTS_TOKEN } from '@utilities/di/renderer/tokens'
import { Segmented, Select } from 'antd'
import { LANGUAGE_LOCALIZATION as texts } from './localization'
import './language.scss'

/** Параметры выбора языка. */
export interface LanguageProps {
	/** Режим горизонтального выбора. */
	radioMode?: boolean
}

/** Выбор языка. */
export function Language({ radioMode }: LanguageProps) {
	const configState = useConfig()
	const gameTexts = di.resolve(GAME_TEXTS_TOKEN)
	const options = langToOptions(Lang)

	/**
	 * Изменить язык.
	 * @param newLang Новый язык.
	 */
	async function changeLang(newLang: Lang) {
		if (newLang === configState.lang) {
			return
		}

		updateConfig('lang', newLang)

		await new Promise(resolve => setTimeout(resolve, 0))
		await gameTexts.initFromInitial()
		await gameTexts.initFromMods()
	}

	return (
		<div>
			{radioMode
				? (
					<Segmented
						value={configState.lang}
						options={options}
						size="large"
						onChange={value => void changeLang(parseStrToLang(String(value)))}
					/>
				)
				: (
					<div className="lang-select">
						<label htmlFor="lang-select" className="lang-label">
							{texts.languageLabel}
						</label>
						<Select
							id="lang-select"
							value={configState.lang}
							options={options}
							size="large"
							onChange={value => void changeLang(parseStrToLang(String(value ?? '')))}
						/>
					</div>
				)}
		</div>
	)
}

/**
 * Преобразовать `Lang` в опции `Select`.
 * @param lang Язык.
 * @returns Опции `Select`.
 */
function langToOptions(lang: typeof Lang): { label: string, value: string }[] {
	return Object.entries(lang).map(([name, value]) => ({
		label: name.toUpperCase(),
		value
	}))
}
