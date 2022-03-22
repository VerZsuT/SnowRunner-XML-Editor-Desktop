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
	},
	ZH: {
		length: '长度',
		strengthMult: '力量',
		isEngineIgnitionRequired: '作品从',
		engine: '引擎',
		battery: '电池'
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
	},
	ZH: {
		length: '最大绞盘长度',
		strengthMult: '绞盘力量',
		isEngineIgnitionRequired: '它的工作原理（电池自主）。'
	}
}[Config.obj.lang]
