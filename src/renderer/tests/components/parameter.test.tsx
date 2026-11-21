import { Parameter } from '@renderer/pages/general/editor/components/parameter'
import { FileProvider } from '@renderer/pages/general/editor/utilities/import'
import type { ResetBucket } from '@renderer/pages/general/editor/utilities/reset'
import { emitReset, ResetProvider, resetUtils } from '@renderer/pages/general/editor/utilities/reset'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeFile, registerConfig } from '../helpers'

// oxc в Vitest 5 не опускает стандартные декораторы TS, поэтому модуль XML-парсера
// (нужный только `export`/`import` утилитам) подменяется заглушкой.
vi.mock('@modules/xml/renderer', () => ({
	TruckXML: { from: async () => undefined },
	TruckFileType: { trailer: 'Trailer' }
}))

/** Фиктивный descriptor параметра. */
function makeDescriptor(initialValue: string | number = 10) {
	const state = { value: initialValue }

	const descriptor = {
		name: 'mass',
		selector: 'truck',
		label: 'Mass',
		desc: 'Truck mass',
		get: () => state.value,
		set: (value: number) => {
			state.value = value
		},
		getStr: () => String(state.value),
		setStr: (value: string) => {
			state.value = value
		}
	}

	return { descriptor, state }
}

/** Отрисовать параметр (при необходимости с набором сброса). */
function renderParameter(descriptor: any, bucket?: ResetBucket) {
	const content = (
		<FileProvider file={makeFile('navistar')}>
			<Parameter descriptor={descriptor}>
				{({ value, onChange }) => (
					<>
						<span data-testid="value">{String(value)}</span>
						<button onClick={() => onChange(20)}>set-number</button>
						<button onClick={() => onChange('25')}>set-string</button>
					</>
				)}
			</Parameter>
		</FileProvider>
	)

	return bucket
		? render(<ResetProvider bucket={bucket}>{content}</ResetProvider>)
		: render(content)
}

describe('Parameter', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('рендерит подпись и начальное значение descriptor', () => {
		const { descriptor } = makeDescriptor()

		renderParameter(descriptor)

		expect(screen.getByText('Mass')).toBeInTheDocument()
		expect(screen.getByTestId('value')).toHaveTextContent('10')
	})

	it('вызывает set и перечитывает значение через get', () => {
		const { descriptor, state } = makeDescriptor()

		renderParameter(descriptor)

		fireEvent.click(screen.getByText('set-number'))

		expect(state.value).toBe(20)
		expect(screen.getByTestId('value')).toHaveTextContent('20')

		fireEvent.click(screen.getByText('set-string'))

		expect(state.value).toBe('25')
		expect(screen.getByTestId('value')).toHaveTextContent('25')
	})

	it('сбрасывается через ResetProvider/emitReset(bucket)', async () => {
		const { descriptor, state } = makeDescriptor()
		const bucket: ResetBucket = new Set()

		vi.spyOn(resetUtils, 'getDefaultValue').mockResolvedValue(15)

		renderParameter(descriptor, bucket)

		expect(state.value).toBe(10)

		await act(async () => {
			await emitReset(bucket)
		})

		expect(state.value).toBe(15)
		expect(screen.getByTestId('value')).toHaveTextContent('15')
	})
})
