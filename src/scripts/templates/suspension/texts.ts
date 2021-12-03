import Config from '@editor-app/classes/Config'

export const texts = {
	RU: {
		id: 'ID',
		front: 'Переднее',
		rear: 'Заднее',
		wheelType: 'Тип колеса',
		height: 'Высота',
		strength: 'Жёсткость',
		damping: 'Затухание',
		suspensionMin: 'Минимальная высота подвески',
		suspensionMax: 'Максимальная высота подвески',
		brokenSuspensionMax: 'Максимальная высота подвески (когда сломана)',
		suspension: 'Подвеска',
		criticalDamageThreshold: 'Порог критического повреждения',
		damageCapacity: 'Прочность'
	},
	EN: {
		id: 'ID',
		wheelType: 'Wheel type',
		front: 'Front',
		rear: 'Rear',
		height: 'Height',
		strength: 'Strength',
		damping: 'Damping',
		suspensionMin: 'Minimum suspension height',
		suspensionMax: 'Maximum suspension height',
		brokenSuspensionMax: 'Minimum suspension height in broken condition',
		suspension: 'Suspension',
		criticalDamageThreshold: 'Critical damage threshold',
		damageCapacity: 'Damage capacity'
	},
	DE: {
		id: 'ID',
		front: 'Front',
		rear: 'Hinter',
		wheelType: 'Rad-Typ',
		height: 'Höhe',
		strength: 'Stärke',
		damping: 'Dämpfung',
		suspensionMin: 'Minimale Aufhängungshöhe',
		suspensionMax: 'Maximale Aufhängungshöhe',
		brokenSuspensionMax: 'Minimale Aufhängungshöhe in gebrochenem Zustand',
		suspension: 'Aussetzung',
		criticalDamageThreshold: 'Kritische Schadensschwelle',
		damageCapacity: 'Schadenskapazität'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		wheelType: 'Тип колеса, к которому будет применены параметры',
		suspensionMin: 'Минимальный ход подвески (позиция, которую колесо может принять при полной просадке подвески).',
		suspensionMax: 'Максимальный ход подвески (позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе).',
		brokenSuspensionMax: 'Максимальный ход сломанной подвески.',
		name: 'ID данной подвески',
		criticalDamageThreshold: 'Процент повреждения (процент = значение * 100), при котором подвеска будет проявлять признаки поломки',
		damageCapacity: 'Запас прочности данной подвески'
	},
	EN: {
		wheelType: 'The type of wheel to which the parameters will be applied',
		suspensionMin: 'The minimum suspension stroke (the position that the wheel can take when the suspension is completely sagged).',
		suspensionMax: 'Maximum suspension travel (the position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)',
		brokenSuspensionMax: 'The maximum stroke of the broken suspension.',
		name: 'ID of this suspension',
		criticalDamageThreshold: 'The percentage of damage (percentage = value * 100) at which the suspension will show signs of failure',
		damageCapacity: 'The safety margin of this suspension'
	},
	DE: {
		wheelType: 'Der Radtyp, auf den die Parameter angewendet werden sollen',
		suspensionMin: 'Minimaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung vollständig Drawdown).',
		suspensionMax: 'Maximaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)',
		brokenSuspensionMax: 'Maximaler Hub der gebrochenen Federung.',
		name: 'ID dieser Aufhängung',
		criticalDamageThreshold: 'Prozentsatz des Schadens (Prozent = Wert * 100), bei dem die Federung Anzeichen von Bruch zeigt',
		damageCapacity: 'Sicherheitsmarge dieser Aufhängung'
	}
}[Config.obj.lang]
