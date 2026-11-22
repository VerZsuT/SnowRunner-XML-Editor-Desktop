import { Lang } from '@/utilities/localization'
import { App as AntApp, ConfigProvider } from 'antd'
import deDE from 'antd/locale/de_DE'
import enUS from 'antd/locale/en_US'
import ruRU from 'antd/locale/ru_RU'
import zhCN from 'antd/locale/zh_CN'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadConfig } from './api/settings'
import { fromConfigDto, registerConfig } from './config'

/** Локали компонентов antd. */
const ANTD_LOCALES = {
	[Lang.ru]: ruRU,
	[Lang.en]: enUS,
	[Lang.de]: deDE,
	[Lang.ch]: zhCN
}

/** Монтирует приложение после чтения конфигурации ядра. */
async function start() {
	const container = document.getElementById('main')

	if (!container) {
		throw new Error('Не найден контейнер #main')
	}

	const dto = await loadConfig().catch(() => null)
	const config = registerConfig(dto ? fromConfigDto(dto) : undefined)

	// Тексты и локаль antd фиксируются при импорте, поэтому интерфейс грузится
	// только после того, как прочитан язык из конфигурации.
	const { App } = await import('./app')

	createRoot(container).render(
		<StrictMode>
			<ConfigProvider locale={ANTD_LOCALES[config.lang]}>
				<AntApp>
					<App />
				</AntApp>
			</ConfigProvider>
		</StrictMode>
	)
}

void start()
