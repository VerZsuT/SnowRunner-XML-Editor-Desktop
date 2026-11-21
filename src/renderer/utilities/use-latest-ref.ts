import { useEffect, useRef } from 'react'

/**
 * Хранит последнее значение в ref, обновляя его после рендера.
 *
 * Позволяет обработчикам и подпискам читать актуальные пропсы, не пересоздавая
 * их и не записывая в ref во время рендера (это запрещено React Compiler).
 * @param value Актуальное значение.
 * @returns Ref с последним значением.
 */
export function useLatestRef<Value>(value: Value) {
	const ref = useRef(value)

	useEffect(() => {
		ref.current = value
	}, [value])

	return ref
}
