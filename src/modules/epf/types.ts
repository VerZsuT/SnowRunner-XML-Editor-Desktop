/** Экспортированные параметры. */
export interface IExportedData {
	/** Версия файла. */
	version: string

	/** Информация о содержащихся файлах. */
	info: {
		/** Имя файла. */
		name: string

		/** Является ли файл трейлером. */
		isTrailer: boolean

		/** Название DLC, к которому относится файл. */
		dlc?: string

		/** Название модификации, к которой относится файл. */
		mod?: string
	}[]

	/** Данные файлов. */
	data: {
		/** Данные по файлу. */
		[fileName: string]: { // `{name}_{[dlcName] | [modName] | 'default'}
			/** Данные по селектору. */
			[selector: string]: {
				/** Данные по атрибуту. */
				[attribute: string]: string | number
			}
		}
	}

	/** Данные доп. действий таблицы. */
	actionsData: {
		/** Данные по файлу. */
		[fileName: string]: {
			/** Данные по доп. действию. */
			[id: string]: any
		}
	}
}

/** Работа с файлами .epf. [public] */
export interface IPublicEpf {
	/**
	 * Открыть окно выбора `.epf` файлов.
	 * После выбора объединяет их и сохраняет по выбранному пользователем пути.
	 */
	join(): Promise<void>

	/**
	 * Вывести содержимое `.epf` файла.
	 * Анализирует выбранный `.epf` файл и выводит окно с его содержимым в более удобном формате.
	 */
	see(): Promise<void>
}

/** Работа с файлами .epf. [main] */
export type IMainEpf = IPublicEpf

/** Работа с файлами .epf. [renderer] */
export type IRendererEpf = IPublicEpf

