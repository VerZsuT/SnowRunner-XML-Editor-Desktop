/** DI токен. */
export class InjectionToken<_> {
	/** Уникальный ключ. */
	readonly key: symbol

	constructor(description: string) {
		this.key = Symbol(description)
	}
}
