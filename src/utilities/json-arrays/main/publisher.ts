import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import type { IBaseMainArray } from '../types'
import type { BaseMainArray } from './index'

/** Опубликовать {@link BaseMainArray}. */
export function publishMainArray<
	T extends abstract new (...args: any[]) => IBaseMainArray<any, any>
>(className: string, instanceGetter: () => InstanceType<T>) {
	publishInstanceVariable(className, 'arr', instanceGetter)
	publishInstanceFunction(className, 'reset', instanceGetter)
	publishInstanceFunction(className, 'save', instanceGetter)
}
