import { Config } from'@sxmle-app/classes/Config'

export const texts = {
	RU: {
		id: 'ID',
		length: 'Длина',
		strengthMult: 'Сила',
		isEngineIgnitionRequired: 'Работает от',
		engine: 'Двигателя',
		battery: 'Аккумулятора'
	},
	EN: {
		id: 'ID',
		length: 'Length',
		strengthMult: 'Strength',
		isEngineIgnitionRequired: 'Works from',
		engine: 'Engine',
		battery: 'Battery'
	},
	DE: {
		id: 'ID',
		length: 'Länge',
		strengthMult: 'Stärke',
		isEngineIgnitionRequired: 'Arbeitet von',
		engine: 'Motor',
		battery: 'Batterie'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		id: 'ID данной лебёдки',
		length: 'Максимальная длина лебёдки',
		strengthMult: 'Сила лебёдки',
		isEngineIgnitionRequired: 'От чего работает (аккумулятор - автономная).'
	},
	EN: {
		id: 'ID of this winch',
		length: 'Maximum winch length',
		strengthMult: 'Winch power',
		isEngineIgnitionRequired: 'What it works on (battery-autonomous).'
	},
	DE: {
		id: 'ID dieser Winde',
		length: 'Maximale Länge der Winde',
		strengthMult: 'Kraft der Winde',
		isEngineIgnitionRequired: 'Was funktioniert (Batterie-autonom).'
	}
}[Config.obj.lang]
