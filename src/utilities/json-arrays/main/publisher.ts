import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import type { IPubNamed } from '@utilities/bridge/types'
import type { IBaseMainArray } from '../types'

/** Опубликовать {@link BaseMainArray}. */
export function publishMainArray<
	Target extends abstract new (...args: any[]) => any,
	Instance extends IBaseMainArray<any, any>
>(target: Target & IPubNamed, instanceGetter: () => Instance) {
	publishInstanceVariable(target, 'arr', instanceGetter)
	publishInstanceFunction(target, 'reset', instanceGetter)
	publishInstanceFunction(target, 'save', instanceGetter)
}
