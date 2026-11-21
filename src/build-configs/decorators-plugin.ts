import ts from 'typescript'
import type { Plugin } from 'vite'

/** Строка с декоратором. */
const DECORATOR = /^\s*@[A-Za-z_$][\w$]*\s*(?:\([^)]*\))?\s*$/m

/** Строка с полем `accessor`. */
const ACCESSOR = /^\s*(?:static\s+)?accessor\s+[A-Za-z_$]/m

/**
 * Плагин для преобразования стандартных декораторов TypeScript.
 *
 * Oxc (Vite 8) не опускает ни стандартные декораторы, ни поля `accessor`,
 * поэтому такие файлы транспилируются средствами TypeScript до обработки
 * остальными плагинами.
 * @returns Плагин Vite.
 */
export function pluginDecorators(): Plugin {
	return {
		name: 'emr-bridge:decorators',
		enforce: 'pre',
		transform(code, id) {
			if (id.includes('node_modules') || id.includes('/.vite/')) {
				return
			}

			if (!/\.(ts|tsx)$/.test(id) || id.endsWith('.d.ts')) {
				return
			}

			if (!DECORATOR.test(code) && !ACCESSOR.test(code)) {
				return
			}

			const result = ts.transpileModule(code, {
				fileName: id,
				compilerOptions: {
					target: ts.ScriptTarget.ES2022,
					module: ts.ModuleKind.ESNext,
					moduleResolution: ts.ModuleResolutionKind.Bundler,
					jsx: ts.JsxEmit.ReactJSX,
					isolatedModules: true,
					useDefineForClassFields: true,
					esModuleInterop: true,
					sourceMap: true
				}
			})

			return {
				code: result.outputText,
				map: result.sourceMapText
					? JSON.parse(result.sourceMapText)
					: null
			}
		}
	}
}
