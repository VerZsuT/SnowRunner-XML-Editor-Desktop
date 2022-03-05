import Config from 'main/classes/Config'

export const texts = {
	RU: {
		length: 'Длина',
		strengthMult: 'Сила',
		isEngineIgnitionRequired: 'Работает от',
		engine: 'Двигателя',
		battery: 'Аккумулятора'
	},
	EN: {
		length: 'Length',
		strengthMult: 'Strength',
		isEngineIgnitionRequired: 'Works from',
		engine: 'Engine',
		battery: 'Battery'
	},
	DE: {
		length: 'Länge',
		strengthMult: 'Stärke',
		isEngineIgnitionRequired: 'Arbeitet von',
		engine: 'Motor',
		battery: 'Batterie'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		length: 'Максимальная длина лебёдки',
		strengthMult: 'Сила лебёдки',
		isEngineIgnitionRequired: 'От чего работает (аккумулятор - автономная).'
	},
	EN: {
		length: 'Maximum winch length',
		strengthMult: 'Winch power',
		isEngineIgnitionRequired: 'What it works on (battery-autonomous).'
	},
	DE: {
		length: 'Maximale Länge der Winde',
		strengthMult: 'Kraft der Winde',
		isEngineIgnitionRequired: 'Was funktioniert (Batterie-autonom).'
	}
}[Config.obj.lang]
