import type { Locale } from '../index'

/** Китайская (упрощённая) локализация интерфейса. */
export const ch: Locale = {
	lists: {
		title: '车辆与拖车',
		trucksCategory: '车辆',
		trailersCategory: '拖车',
		allSources: '所有来源',
		mainSource: '主游戏',
		dlcSource: 'DLC',
		modsSource: '模组',
		favoritesSource: '收藏',
		editedSource: '已修改',
		addFavorite: '添加到收藏',
		removeFavorite: '从收藏中移除',
		editedMark: '文件已修改',
		allTypes: '所有类别',
		heavyType: '重型',
		heavyDutyType: '超重型',
		highwayType: '公路型',
		offroadType: '越野型',
		scoutType: '侦察型',
		specialType: '特殊型',
		search: '按名称搜索',
		nothingFound: '未找到任何内容',
		noGameFiles: '未找到游戏文件。请选择 initial.pak 以解包。',
		openArchive: '选择 initial.pak',
		unpacking: '正在解包...',
		unpacked: '已解包文件：{}',
		setup: '设置',
		refresh: '刷新',
		retry: '重试'
	},

	setup: {
		title: '设置',
		paths: '程序路径',
		dataRoot: '数据目录',
		mode: '存储模式',
		modeInstalled: '安装版',
		modePortable: '便携版',
		modeDev: '开发模式',
		classes: '游戏文件',
		mainTemp: '已解包数据',
		backupFolder: '备份目录',
		backupInitial: 'initial.pak 备份',
		game: '游戏文件',
		archivePath: 'initial.pak 路径',
		noPath: '未选择压缩包',
		choose: '选择',
		unpack: '解包',
		unpackConfirm: '将先备份压缩包，然后重新解包游戏文件。是否继续？',
		unpacked: '已解包文件：{}',
		backup: '备份',
		backedUp: '备份已保存：{}',
		update: '更新压缩包',
		updateMod: '将模组写入 .pak',
		updated: '已更新条目：{}',
		verify: '检查',
		verified: '已检查条目：{}',
		restore: '从备份恢复',
		restoreConfirm: '用数据目录中的副本替换 initial.pak？未保存的压缩包更改将会丢失。',
		restored: '已从备份恢复压缩包',
		mods: '模组',
		noMods: '未添加模组',
		addMod: '添加模组 (.pak)',
		syncMods: '更新模组',
		removeMod: '从列表中移除模组',
		language: '界面语言',
		portableMode: '便携模式',
		modeConfirm: '更改数据存储模式？程序的 JSON 文件将移动到新目录，游戏文件和备份需要重新解包。',
		modeSwitched: '模式已更改。已移动文件：{}。请重新启动程序。',
		restartConfirm: '现在重新启动程序？',
		restart: '重新启动',
		options: '参数',
		useMods: '使用模组',
		advancedMode: '高级模式',
		checkUpdates: '检查更新',
		cancel: '取消',
		saved: '设置已保存',
		loadError: '无法读取设置'
	},

	editor: {
		title: '编辑器',
		type: '类型',
		trucks: '车辆与拖车',
		noGameFiles: '未找到游戏文件。请选择 initial.pak 以解包。',
		openArchive: '选择 initial.pak',
		unpacking: '正在解包...',
		unpacked: '已解包文件：{}',
		refresh: '刷新',
		save: '保存',
		saved: '已保存',
		exportEpf: '导出参数',
		importEpf: '导入参数',
		exported: '已导出属性：{}',
		imported: '已导入属性：{}',
		unsaved: '有未保存的更改',
		reset: '重置参数',
		resetDocument: '全部重置',
		resetConfirm: '将文档的所有参数重置为原始值？',
		resetDone: '参数已重置。请不要忘记保存更改',
		discardConfirm: '更改未保存将会丢失。关闭编辑器？',
		loadError: '无法打开文件',
		cancel: '取消',
		close: '关闭',
		yes: '是',
		no: '否',
		texts: '文本',
		control: '操控',
		winch: '绞车',
		wheels: '车轮',
		wheel: '车轮',
		extraWheel: '附加车轮',
		wheelSizes: '可用车轮尺寸',
		wheelSet: '车轮组',
		suspension: '悬架',
		suspensions: '悬架',
		suspensionSet: '悬架组',
		frontSuspension: '前悬架',
		middleSuspension: '中悬架',
		rearSuspension: '后悬架',
		gearbox: '变速箱',
		gearboxes: '变速箱',
		gearboxParams: '变速箱参数',
		gears: '挡位',
		gear: '挡位',
		reverseGear: '倒挡',
		highGear: '高速挡',
		engine: '发动机',
		engines: '发动机',
		fuel: '油箱',
		physicsModel: '物理模型',
		unlock: '解锁',
		tire: '轮胎',
		truck: '卡车',
		trailer: '拖车',
		russia: '俄罗斯',
		usa: '美国',
		cas: '中亚',
		ne: '北欧',
		findOnMap: '在地图上查找',
		byRank: '按等级解锁',
		torqueDefault: '始终驱动',
		torqueFull: '全轮驱动时驱动',
		torqueNone: '从动',
		torqueConnectable: '由配件决定',
		diffLockAlways: '始终启用',
		diffLockInstalled: '可安装',
		diffLockUninstalled: '不可安装',
		diffLockNone: '无',
		wheelFront: '前',
		wheelMiddle: '中',
		wheelRear: '后',
		drive: '驱动',
		addonsContent: '配件内容',
		loadAddons: '加载配件',
		loadingAddons: '正在加载配件...',
		addonFilter: '按名称筛选',
		noAddons: '未找到配件',
		allAddons: '全部',
		installedAddons: '已安装',
		installedAddon: '已安装',
		notInstalledAddon: '未安装',
		createTruckData: '创建 TruckData 块',
		addonSockets: '配件插槽',
		socket: '插槽',
		shift: '位移',
		addSocket: '添加插槽',
		addShift: '添加位移',
		moveUp: '上移',
		moveDown: '下移',
		removeConfirm: '删除该元素？',
		cranes: '起重机',
		crane: '起重机',
		cranesWarnTitle: '注意！',
		cranesWarnMessage: '移除起重机前必须先将其从车辆上卸下。',
		banditCrane: 'Bandit 香蕉',
		banditWarnMessage: '使用需要已购买的 KRS 58 "Bandit" 车辆 DLC。',
		trailers: '拖车',
		scoutTrailers: '侦察车拖车',
		truckTrailers: '普通拖车',
		add: '添加',
		remove: '删除'
	},

	updateAlert: {
		title: '更新',
		available: '有新版本的程序可用（{}）',
		installer: '安装程序 (.exe)',
		portable: '便携版 (.zip)',
		update: '更新',
		ignore: '忽略',
		downloading: '正在下载更新',
		downloaded: '下载完成。正在启动安装程序...',
		downloadError: '下载更新失败',
		close: '关闭'
	},

	whatsNew: {
		title: '本版本的更新内容',
		changes: [
			'程序已迁移到 Tauri（Rust）：体积更小、内存占用更低',
			'便携版以 .zip 压缩包提供',
			'需要 Windows 10 或 11（x64）和 WebView2'
		]
	},

	dictionaries: {
		engine: {
			name: '标题',
			responsiveness: '引擎转速增加的速度',
			responsivenessDesc: '发动机的响应性（转速提升的速度）',
			fuelConsumption: '油耗',
			fuelConsumptionDesc: '发动机的基础油耗',
			damagedConsumptionModifier: '损伤时油耗增加的倍数',
			damagedConsumptionModifierDesc: '发动机损坏时油耗变化的最大值',
			torque: '马力',
			torqueDesc: '发动机功率',
			damagedMinTorqueModifier: '损坏时马力输出倍数',
			damagedMinTorqueModifierDesc: '发动机损伤达到损坏阈值时的功率倍数',
			damagedMaxTorqueModifier: '严重损坏时马力输出倍数',
			damagedMaxTorqueModifierDesc: '发动机接近完全损坏（耐久降至 0）时的功率倍数',
			brakesDelay: '制动延迟',
			brakesDelayDesc: '刹车时的延迟',
			maxDeltaAngVel: '加速的减速',
			maxDeltaAngVelDesc: '车轮最大角加速度的限制值。该值越小，车辆加速越慢',
			criticalDamageThreshold: '损坏阈值',
			criticalDamageThresholdDesc: '临界损坏阈值。超过该阈值后油耗和发动机功率会发生变化',
			damageCapacity: '血量',
			damageCapacityDesc: '发动机可承受的损伤量'
		},

		gearbox: {
			name: '标题',
			awdConsumptionModifier: '全轮驱动打开时油耗的倍数',
			awdConsumptionModifierDesc: '使用全轮驱动时油耗变化的系数',
			criticalDamageThreshold: '损坏阈值',
			criticalDamageThresholdDesc: '变速箱开始出现故障迹象（跳挡和油耗增加）的损伤阈值',
			damageCapacity: '血量',
			damageCapacityDesc: '变速箱可承受的损伤量',
			damagedConsumptionModifier: '损伤时油耗增加的倍数',
			damagedConsumptionModifierDesc: '变速箱完全损坏时油耗达到的最大倍数',
			fuelConsumption: '油耗',
			fuelConsumptionDesc: '变速箱的基础油耗',
			idleFuelConsumption: '怠速时的油耗',
			idleFuelConsumptionDesc: '车辆静止且发动机运转时的油耗倍数',
			minBreakFreqDesc: '耐久达到临界阈值时变速箱跳挡的最低频率',
			maxBreakFreqDesc: '耐久接近零时变速箱跳挡的最高频率'
		},

		gearboxParams: {
			isHighGearExists: '高速挡',
			isHighGearExistsDesc: '是否可用高速挡',
			isLowerPlusGearExists: '低速+',
			isLowerPlusGearExistsDesc: '是否可用低速+（一挡）挡位',
			isLowerGearExists: '低速',
			isLowerGearExistsDesc: '是否可用低速挡（一挡速度的 45%）',
			isManualLowGear: '微调',
			isManualLowGearDesc: '是否可用精确调节',
			isLowerMinusGearExists: '低速-',
			isLowerMinusGearExistsDesc: '是否可用低速-挡（一挡速度的 20%）'
		},

		gear: {
			angVel: '车轮最大角速度',
			angVelDesc: '该挡位下车轮的最大角速度',
			fuelModifier: '燃油消耗',
			fuelModifierDesc: '该挡位下的油耗倍数'
		},

		suspension: {
			height: '悬架的高度',
			heightDesc: '悬架高度',
			strength: '悬架的硬度',
			strengthDesc: '悬架刚度',
			damping: '悬架的阻尼',
			dampingDesc: '降低振动的速度和强度',
			suspensionMin: '悬架最小行程',
			suspensionMinDesc: '最小悬架行程（悬架完全压缩时车轮可达到的位置）',
			suspensionMax: '悬架最大行程(悬空时)',
			suspensionMaxDesc: '最大悬架行程（悬架正常且刚度为 0、车轮悬空时车轮可达到的位置）',
			brokenSuspensionMax: '悬架损坏时的最大行程',
			brokenSuspensionMaxDesc: '损坏悬架的最大行程'
		},

		suspensionSet: {
			name: '标题',
			damageCapacity: '血量',
			damageCapacityDesc: '悬架可承受的损伤量',
			criticalDamageThreshold: '损坏阈值',
			criticalDamageThresholdDesc: '悬架的临界损伤阈值',
			brokenWheelDamageMultiplierDesc: '轮胎被击穿时悬架损伤增加的系数'
		},

		winch: {
			name: '标题',
			length: '长度',
			lengthDesc: '绞车绳索的最大长度',
			strengthMult: '力量',
			isEngineIgnitionRequired: '动力来源',
			isEngineIgnitionRequiredDesc: '发动机熄火时绞车是否仍可工作'
		},

		truckWinch: {
			winchLength: '绞车的长度',
			winchLengthDesc: '绞车绳索的最大长度',
			strengthMult: '绞车的动力'
		},

		truckWheel: {
			torque: '驱动器',
			torqueDesc: '车轮驱动类型',
			steeringAngle: '转弯角度',
			steeringAngleDesc: '转向时车轮的最大转角',
			steeringCastorDesc: '车轮朝转向方向的倾斜角度',
			suspensionHeight: '悬架的高度',
			suspensionHeightDesc: '车轮悬架高度',
			suspensionStrength: '悬架的硬度',
			suspensionStrengthDesc: '车轮悬架刚度'
		},

		truckData: {
			backSteerSpeed: '车轮回正速度',
			backSteerSpeedDesc: '转向后方向盘回到初始位置的速度',
			diffLockType: '差速器锁',
			engineStartDelay: '发动机启动延迟',
			engineStartDelayDesc: '按下“启动发动机”后的延迟',
			exhaustStartTime: '排气的开始时间',
			exhaustStartTimeDesc: '排气的开始时间',
			responsiveness: '方向盘灵敏度',
			responsivenessDesc: '转向灵敏度',
			steerSpeed: '转方向盘速度',
			steerSpeedDesc: '方向盘转动速度'
		},

		addonTruckData: {
			fuelCapacity: '燃油容量',
			fuelCapacityDesc: '配件中的燃油量',
			waterCapacity: '水容量',
			waterCapacityDesc: '配件中的水量',
			repairsCapacity: '修理零件数量',
			repairsCapacityDesc: '配件中的修理零件数量',
			wheelRepairsCapacity: '备胎数量',
			wheelRepairsCapacityDesc: '配件中的备胎数量'
		},

		truckGameData: {
			country: '国家',
			countryDesc: '车辆可购买的所在地区'
		},

		addonSlots: {
			quantity: '装载货物的格数',
			quantityDesc: '货物槽位数量'
		},

		compatibleWheels: {
			scale: '车轮尺寸',
			type: '标题'
		},

		fuelTank: {
			damageCapacity: '血量',
			damageCapacityDesc: '油箱可承受的损伤量'
		},

		gameData: {
			price: '价格',
			priceDesc: '商店中物品 / 车辆的价格。对车辆而言这只是基础价格，不包含在商店购买时标准配置的费用',
			unlockByExploration: '解锁条件',
			unlockByExplorationDesc: '物品 / 车辆是否通过在地图上的搜索（侦察）解锁',
			unlockByRank: '解锁等级',
			unlockByRankDesc: '达到哪个等级后解锁物品 / 车辆。若通过侦察解锁则此项被忽略'
		},

		uiDesc: {
			uiDesc: '描述',
			uiDescDesc: '物品描述',
			uiName: '名称',
			uiNameDesc: '物品名称'
		},

		physicsBody: {
			mass: '重量',
			centerOfMassOffset: '车辆重心调整'
		},

		rim: {
			name: '标题'
		},

		tire: {
			name: '标题'
		},

		wheelFriction: {
			bodyFriction: '在干土地上的摩擦力',
			bodyFrictionDesc: '与地面（无泥浆和其他物体）的摩擦',
			bodyFrictionAsphalt: '在公路上的摩擦力',
			bodyFrictionAsphaltDesc: '与路面的摩擦',
			substanceFriction: '在泥浆里的摩擦力',
			substanceFrictionDesc: '与泥浆的摩擦',
			isIgnoreIce: '在冰上驾驶',
			isIgnoreIceDesc: '车轮在冰面上是否有良好的抓地力'
		}
	}
}
