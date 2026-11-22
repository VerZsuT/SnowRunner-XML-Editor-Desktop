import { Lang } from '@localization'
import { UpdateAlert } from '@renderer/components/update-alert'
import { registerConfig } from '@renderer/config'
import { App as AntApp } from 'antd'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Подписка, которая ничего не слушает. */
async function subscribe() {
	return () => {}
}

describe('UpdateAlert', () => {
	beforeEach(() => {
		registerConfig({ lang: Lang.en })
	})

	it('показывает новую версию', async () => {
		render(
			<AntApp>
				<UpdateAlert check={async () => '1.5.0'} subscribe={subscribe} />
			</AntApp>
		)

		expect(await screen.findByText(/A new version of the program is available/)).toHaveTextContent('v1.5.0')
	})

	it('скрывается и выключает проверку по кнопке «Игнорировать»', async () => {
		const disable = vi.fn(async () => {})

		render(
			<AntApp>
				<UpdateAlert check={async () => '1.5.0'} disable={disable} subscribe={subscribe} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('button', { name: 'Ignore' }))

		expect(disable).toHaveBeenCalledOnce()
		expect(screen.queryByText(/A new version of the program is available/)).not.toBeInTheDocument()
	})

	it('загружает установщик и запускает его', async () => {
		const download = vi.fn(async () => 'C:/data/updateTemp/SnowRunnerXMLEditor.exe')
		const install = vi.fn(async () => {})

		render(
			<AntApp>
				<UpdateAlert
					check={async () => '1.5.0'}
					download={download}
					install={install}
					subscribe={subscribe}
				/>
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('button', { name: /Update/ }))
		await userEvent.click(await screen.findByText('Installer (.exe)'))

		await waitFor(() => expect(download).toHaveBeenCalledWith('1.5.0', false))
		await waitFor(() => expect(install).toHaveBeenCalledWith(
			'C:/data/updateTemp/SnowRunnerXMLEditor.exe',
			false
		))
	})

	it('показывает прогресс загрузки', async () => {
		let notify: ((progress: { percent: number; downloaded: number | null; total: number | null }) => void) | undefined
		let finish!: (path: string) => void
		const download = vi.fn(() => new Promise<string>(resolve => {
			finish = resolve
		}))

		render(
			<AntApp>
				<UpdateAlert
					check={async () => '1.5.0'}
					download={download}
					install={async () => {}}
					subscribe={async handler => {
						notify = handler

						return () => {}
					}}
				/>
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('button', { name: /Update/ }))
		await userEvent.click(await screen.findByText('Installer (.exe)'))
		await waitFor(() => expect(download).toHaveBeenCalled())

		act(() => notify?.({ percent: 42, downloaded: 42, total: 100 }))

		expect(await screen.findByText('42%')).toBeInTheDocument()

		act(() => finish('C:/data/updateTemp/SnowRunnerXMLEditor.exe'))
	})
})
