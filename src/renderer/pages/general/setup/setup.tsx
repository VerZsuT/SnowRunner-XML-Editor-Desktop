import type { IFile } from '@modules/files/renderer'
import { Header } from '@renderer/components/header'
import { Language } from '@renderer/components/language'
import { di } from '@utilities/di/container'
import { APP_TOKEN, ARCHIVER_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Steps } from 'antd'
import { useState } from 'react'
import { InitialSelect } from './initial-select'
import { SETUP_LOCALIZATION as texts } from './localization'
import './setup.scss'

/** Страница первоначальной настройки. */
export function Setup() {
	const [step, setStep] = useState(0)

	async function onChangeGameFolder(file?: IFile) {
		if (!file) {
			return
		}

		const config = di.resolve(CONFIG_TOKEN)
		const backup = di.resolve(BACKUP_TOKEN)
		const archiver = di.resolve(ARCHIVER_TOKEN)
		const app = di.resolve(APP_TOKEN)

		config.initialPath = file.path
		await backup.save()
		await archiver.unpackMain()
		app.reload()
	}

	return (
		<div className="setup">
			<Header
				className="header"
				text={texts.firstStepsDescription}
			/>

			<Steps
				className="steps"
				current={step}
				items={[
					{ title: texts.languageLabel },
					{ title: texts.gameDataStep }
				]}
			/>
			<div className="steps-content">
				{step === 0
					? <Language radioMode />
					: step === 1
						? <InitialSelect onChange={onChangeGameFolder} />
						: null}
			</div>
			<div className="steps-actions">
				{step === 0 && (
					<Button type="primary" onClick={() => setStep(value => value + 1)}>
						{texts.next}
					</Button>
				)}
			</div>
		</div>
	)
}
