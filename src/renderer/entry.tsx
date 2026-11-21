import { App as AntApp, ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { loadConfig } from './api/settings'
import { fromConfigDto, registerConfig } from './config'

/** Монтирует приложение после чтения конфигурации ядра. */
async function start() {
	const container = document.getElementById('main')

	if (!container) {
		throw new Error('Не найден контейнер #main')
	}

	const dto = await loadConfig().catch(() => null)

	registerConfig(dto ? fromConfigDto(dto) : undefined)

	createRoot(container).render(
		<StrictMode>
			<ConfigProvider locale={ruRU}>
				<AntApp>
					<App />
				</AntApp>
			</ConfigProvider>
		</StrictMode>
	)
}

void start()

