import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import type { MainArrayBase } from './index'

export function publishMainArray<
	T extends abstract new (...args: any[]) => MainArrayBase<any>
>(className: string, instanceGetter: () => InstanceType<T>) {
	publishInstanceVariable(className, 'arr', instanceGetter)
	publishInstanceFunction(className, 'reset', instanceGetter)
	publishInstanceFunction(className, 'save', instanceGetter)
}
