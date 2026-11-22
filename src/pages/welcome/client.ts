import { backupArchive, findInitial, unpackInitial } from '@/api/archive'
import type { Config } from '@/api/bindings'
import { loadConfig, saveConfig } from '@/api/settings'

/** Клиент экрана первоначальной настройки: подменяется в тестах. */
export interface WelcomeClient {
	/** Текущая конфигурация. */
	config(): Promise<Config>

	/** Сохраняет конфигурацию. */
	saveConfig(config: Config): Promise<Config>

	/** Ищет `initial.pak` в каталоге игры. */
	findInitial(folder: string): Promise<string | null>

	/** Делает бэкап архива; возвращает путь копии. */
	backup(archivePath: string): Promise<string>

	/** Распаковывает игровые файлы; возвращает их число. */
	unpack(archivePath: string): Promise<number>

	/** Перезагружает интерфейс: применяет выбранный язык и распакованные данные. */
	reload(): void
}

/** Клиент команд ядра. */
export const welcomeClient: WelcomeClient = {
	config: loadConfig,
	saveConfig,
	findInitial,
	backup: backupArchive,
	unpack: unpackInitial,
	reload: () => window.location.reload()
}
