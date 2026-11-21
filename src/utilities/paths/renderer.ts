/**
 * Коды символов, используемые при разборе путей Windows.
 */
const CHAR_DOT = 46
const CHAR_FORWARD_SLASH = 47
const CHAR_COLON = 58
const CHAR_BACKWARD_SLASH = 92

/**
 * Зарезервированные имена устройств Windows.
 */
const WINDOWS_RESERVED_NAMES = [
	'CON', 'PRN', 'AUX', 'NUL',
	'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
	'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9',
	'COM¹', 'COM²', 'COM³',
	'LPT¹', 'LPT²', 'LPT³'
]

/**
 * Является ли код символа разделителем пути Windows.
 * @param code Код символа.
 * @returns Является ли символ разделителем.
 */
function isPathSeparator(code: number): boolean {
	return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
}

/**
 * Является ли код символа разделителем пути POSIX.
 * @param code Код символа.
 * @returns Является ли символ разделителем.
 */
function isPosixPathSeparator(code: number): boolean {
	return code === CHAR_FORWARD_SLASH
}

/**
 * Является ли код символа буквой диска.
 * @param code Код символа.
 * @returns Является ли символ буквой диска.
 */
function isWindowsDeviceRoot(code: number): boolean {
	return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
}

/**
 * Является ли часть пути зарезервированным именем устройства Windows.
 * @param path Разбираемый путь.
 * @param colonIndex Позиция двоеточия в пути.
 * @returns Является ли имя зарезервированным.
 */
function isWindowsReservedName(path: string, colonIndex: number): boolean {
	const devicePart = path.slice(0, colonIndex).toUpperCase()

	return WINDOWS_RESERVED_NAMES.includes(devicePart)
}

/**
 * Разрешить элементы `.` и `..` в пути с именами каталогов.
 * @param path Путь для нормализации.
 * @param allowAboveRoot Разрешать ли выход выше корня.
 * @param separator Разделитель пути.
 * @param separatorFn Функция проверки разделителя.
 * @returns Нормализованный путь.
 */
function normalizeString(
	path: string,
	allowAboveRoot: boolean,
	separator: string,
	separatorFn: (code: number) => boolean
): string {
	let res = ''
	let lastSegmentLength = 0
	let lastSlash = -1
	let dots = 0
	let code = 0

	for (let i = 0; i <= path.length; ++i) {
		if (i < path.length) {
			code = path.charCodeAt(i)
		} else if (separatorFn(code)) {
			break
		} else {
			code = CHAR_FORWARD_SLASH
		}

		if (separatorFn(code)) {
			if (lastSlash === i - 1 || dots === 1) {
				// Пустой сегмент или одиночная точка — пропускаем.
			} else if (dots === 2) {
				if (
					res.length < 2 ||
					lastSegmentLength !== 2 ||
					res.charCodeAt(res.length - 1) !== CHAR_DOT ||
					res.charCodeAt(res.length - 2) !== CHAR_DOT
				) {
					if (res.length > 2) {
						const lastSlashIndex = res.length - lastSegmentLength - 1

						if (lastSlashIndex === -1) {
							res = ''
							lastSegmentLength = 0
						} else {
							res = res.slice(0, lastSlashIndex)
							lastSegmentLength = res.length - 1 - res.lastIndexOf(separator)
						}

						lastSlash = i
						dots = 0
						continue
					} else if (res.length !== 0) {
						res = ''
						lastSegmentLength = 0
						lastSlash = i
						dots = 0
						continue
					}
				}

				if (allowAboveRoot) {
					res += res.length > 0 ? `${separator}..` : '..'
					lastSegmentLength = 2
				}
			} else {
				if (res.length > 0) {
					res += `${separator}${path.slice(lastSlash + 1, i)}`
				} else {
					res = path.slice(lastSlash + 1, i)
				}

				lastSegmentLength = i - lastSlash - 1
			}

			lastSlash = i
			dots = 0
		} else if (code === CHAR_DOT && dots !== -1) {
			++dots
		} else {
			dots = -1
		}
	}

	return res
}

/**
 * Нормализовать путь Windows.
 * @param path Исходный путь.
 * @returns Нормализованный путь.
 */
export function normalizePath(path: string): string {
	const len = path.length

	if (len === 0) {
		return '.'
	}

	let rootEnd = 0
	let device: string | undefined
	let isAbsolute = false
	const code = path.charCodeAt(0)

	if (len === 1) {
		return isPosixPathSeparator(code) ? '\\' : path
	}

	if (isPathSeparator(code)) {
		isAbsolute = true

		if (isPathSeparator(path.charCodeAt(1))) {
			let j = 2
			let last = j

			while (j < len && !isPathSeparator(path.charCodeAt(j))) {
				j++
			}

			if (j < len && j !== last) {
				const firstPart = path.slice(last, j)
				last = j

				while (j < len && isPathSeparator(path.charCodeAt(j))) {
					j++
				}

				if (j < len && j !== last) {
					last = j

					while (j < len && !isPathSeparator(path.charCodeAt(j))) {
						j++
					}

					if (j === len || j !== last) {
						if (firstPart === '.' || firstPart === '?') {
							device = `\\\\${firstPart}`
							rootEnd = 4
							const colonIndex = path.indexOf(':')
							const possibleDevice = path.slice(4, colonIndex + 1)

							if (isWindowsReservedName(possibleDevice, possibleDevice.length - 1)) {
								device = `\\\\?\\${possibleDevice}`
								rootEnd = 4 + possibleDevice.length
							}
						} else if (j === len) {
							return `\\\\${firstPart}\\${path.slice(last)}\\`
						} else {
							device = `\\\\${firstPart}\\${path.slice(last, j)}`
							rootEnd = j
						}
					}
				}
			}
		} else {
			rootEnd = 1
		}
	} else {
		const colonIndex = path.indexOf(':')

		if (colonIndex > 0) {
			if (isWindowsDeviceRoot(code) && colonIndex === 1) {
				device = path.slice(0, 2)
				rootEnd = 2

				if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
					isAbsolute = true
					rootEnd = 3
				}
			} else if (isWindowsReservedName(path, colonIndex)) {
				device = path.slice(0, colonIndex + 1)
				rootEnd = colonIndex + 1
			}
		}
	}

	let tail = rootEnd < len
		? normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator)
		: ''

	if (tail.length === 0 && !isAbsolute) {
		tail = '.'
	}

	if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
		tail += '\\'
	}

	if (!isAbsolute && device === undefined && path.includes(':')) {
		// Путь не должен внезапно стать абсолютным из-за двоеточия (CVE-2024-36139).
		if (
			tail.length >= 2 &&
			isWindowsDeviceRoot(tail.charCodeAt(0)) &&
			tail.charCodeAt(1) === CHAR_COLON
		) {
			return `.\\${tail}`
		}

		let index = path.indexOf(':')

		do {
			if (index === len - 1 || isPathSeparator(path.charCodeAt(index + 1))) {
				return `.\\${tail}`
			}
		} while ((index = path.indexOf(':', index + 1)) !== -1)
	}

	const colonIndex = path.indexOf(':')

	if (isWindowsReservedName(path, colonIndex)) {
		return `.\\${device ?? ''}${tail}`
	}

	if (device === undefined) {
		return isAbsolute ? `\\${tail}` : tail
	}

	return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`
}

/**
 * Соединить сегменты пути Windows и нормализовать результат.
 * @param parts Сегменты пути.
 * @returns Соединённый путь.
 */
export function joinPath(...parts: string[]): string {
	if (parts.length === 0) {
		return '.'
	}

	const paths: string[] = []

	for (const part of parts) {
		if (part.length > 0) {
			paths.push(part)
		}
	}

	if (paths.length === 0) {
		return '.'
	}

	const firstPart = paths[0]!
	let joined = paths.join('\\')

	// Не даём соединённому пути начинаться с двух разделителей, иначе
	// normalize() примет его за UNC-путь.
	let needsReplace = true
	let slashCount = 0

	if (isPathSeparator(firstPart.charCodeAt(0))) {
		++slashCount
		const firstLen = firstPart.length

		if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
			++slashCount

			if (firstLen > 2) {
				if (isPathSeparator(firstPart.charCodeAt(2))) {
					++slashCount
				} else {
					needsReplace = false
				}
			}
		}
	}

	if (needsReplace) {
		while (slashCount < joined.length && isPathSeparator(joined.charCodeAt(slashCount))) {
			slashCount++
		}

		if (slashCount >= 2) {
			joined = `\\${joined.slice(slashCount)}`
		}
	}

	// Имена зарезервированных устройств Windows не нормализуем.
	const segments: string[] = []
	let segment = ''

	for (let i = 0; i < joined.length; i++) {
		if (joined[i] === '\\') {
			if (segment) {
				segments.push(segment)
			}

			segment = ''

			while (i + 1 < joined.length && joined[i + 1] === '\\') {
				i++
			}
		} else {
			segment += joined[i]
		}
	}

	if (segment) {
		segments.push(segment)
	}

	if (segments.some(current => {
		const colonIndex = current.indexOf(':')

		return colonIndex !== -1 && isWindowsReservedName(current, colonIndex)
	})) {
		let result = ''

		for (const char of joined) {
			result += char === '/' ? '\\' : char
		}

		return result
	}

	return normalizePath(joined)
}

/**
 * Получить каталог пути Windows.
 * @param path Исходный путь.
 * @returns Каталог пути.
 */
export function dirname(path: string): string {
	const len = path.length

	if (len === 0) {
		return '.'
	}

	let rootEnd = -1
	let offset = 0
	const code = path.charCodeAt(0)

	if (len === 1) {
		return isPathSeparator(code) ? path : '.'
	}

	if (isPathSeparator(code)) {
		rootEnd = offset = 1

		if (isPathSeparator(path.charCodeAt(1))) {
			let j = 2
			let last = j

			while (j < len && !isPathSeparator(path.charCodeAt(j))) {
				j++
			}

			if (j < len && j !== last) {
				last = j

				while (j < len && isPathSeparator(path.charCodeAt(j))) {
					j++
				}

				if (j < len && j !== last) {
					last = j

					while (j < len && !isPathSeparator(path.charCodeAt(j))) {
						j++
					}

					if (j === len) {
						return path
					}

					if (j !== last) {
						rootEnd = offset = j + 1
					}
				}
			}
		}
	} else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
		rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2
		offset = rootEnd
	}

	let end = -1
	let matchedSlash = true

	for (let i = len - 1; i >= offset; --i) {
		if (isPathSeparator(path.charCodeAt(i))) {
			if (!matchedSlash) {
				end = i
				break
			}
		} else {
			matchedSlash = false
		}
	}

	if (end === -1) {
		if (rootEnd === -1) {
			return '.'
		}

		end = rootEnd
	}

	return path.slice(0, end)
}

/**
 * Получить имя файла из пути Windows.
 * @param path Исходный путь.
 * @param suffix Суффикс, который нужно отбросить.
 * @returns Имя файла.
 */
export function basename(path: string, suffix?: string): string {
	let start = 0
	let end = -1
	let matchedSlash = true

	if (
		path.length >= 2 &&
		isWindowsDeviceRoot(path.charCodeAt(0)) &&
		path.charCodeAt(1) === CHAR_COLON
	) {
		start = 2
	}

	if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {
		if (suffix === path) {
			return ''
		}

		let extIdx = suffix.length - 1
		let firstNonSlashEnd = -1

		for (let i = path.length - 1; i >= start; --i) {
			const code = path.charCodeAt(i)

			if (isPathSeparator(code)) {
				if (!matchedSlash) {
					start = i + 1
					break
				}
			} else {
				if (firstNonSlashEnd === -1) {
					matchedSlash = false
					firstNonSlashEnd = i + 1
				}

				if (extIdx >= 0) {
					if (code === suffix.charCodeAt(extIdx)) {
						if (--extIdx === -1) {
							end = i
						}
					} else {
						extIdx = -1
						end = firstNonSlashEnd
					}
				}
			}
		}

		if (start === end) {
			end = firstNonSlashEnd
		} else if (end === -1) {
			end = path.length
		}

		return path.slice(start, end)
	}

	for (let i = path.length - 1; i >= start; --i) {
		if (isPathSeparator(path.charCodeAt(i))) {
			if (!matchedSlash) {
				start = i + 1
				break
			}
		} else if (end === -1) {
			matchedSlash = false
			end = i + 1
		}
	}

	if (end === -1) {
		return ''
	}

	return path.slice(start, end)
}

/**
 * Получить расширение файла из пути Windows.
 * @param path Исходный путь.
 * @returns Расширение файла (с точкой) или пустая строка.
 */
export function extname(path: string): string {
	let start = 0
	let startDot = -1
	let startPart = 0
	let end = -1
	let matchedSlash = true
	let preDotState = 0

	if (
		path.length >= 2 &&
		path.charCodeAt(1) === CHAR_COLON &&
		isWindowsDeviceRoot(path.charCodeAt(0))
	) {
		start = startPart = 2
	}

	for (let i = path.length - 1; i >= start; --i) {
		const code = path.charCodeAt(i)

		if (isPathSeparator(code)) {
			if (!matchedSlash) {
				startPart = i + 1
				break
			}

			continue
		}

		if (end === -1) {
			matchedSlash = false
			end = i + 1
		}

		if (code === CHAR_DOT) {
			if (startDot === -1) {
				startDot = i
			} else if (preDotState !== 1) {
				preDotState = 1
			}
		} else if (startDot !== -1) {
			preDotState = -1
		}
	}

	if (
		startDot === -1 ||
		end === -1 ||
		preDotState === 0 ||
		(
			preDotState === 1 &&
			startDot === end - 1 &&
			startDot === startPart + 1
		)
	) {
		return ''
	}

	return path.slice(startDot, end)
}
