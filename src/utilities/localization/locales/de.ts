import type { Locale } from '../index'

/** Немецкая локализация интерфейса. */
export const de: Locale = {
	lists: {
		title: 'Autos und Anhänger',
		trucksCategory: 'Autos',
		trailersCategory: 'Anhänger',
		allSources: 'Alle Quellen',
		mainSource: 'Hauptspiel',
		dlcSource: 'DLC',
		modsSource: 'Mods',
		favoritesSource: 'Favoriten',
		editedSource: 'Geändert',
		addFavorite: 'Zu Favoriten hinzufügen',
		removeFavorite: 'Aus Favoriten entfernen',
		editedMark: 'Datei ist geändert',
		allTypes: 'Alle Klassen',
		heavyType: 'Schwer',
		heavyDutyType: 'Superschwer',
		highwayType: 'Autobahn',
		offroadType: 'Gelände',
		scoutType: 'Späher',
		specialType: 'Spezial',
		search: 'Suche nach Namen',
		nothingFound: 'Nichts gefunden',
		noGameFiles: 'Spieldateien nicht gefunden. Wählen Sie initial.pak aus, um sie zu entpacken.',
		openArchive: 'initial.pak auswählen',
		unpacking: 'Entpacken...',
		unpacked: 'Entpackte Dateien: {}',
		setup: 'Einstellungen',
		refresh: 'Aktualisieren',
		retry: 'Wiederholen'
	},

	setup: {
		title: 'Einstellungen',
		paths: 'Programmpfade',
		dataRoot: 'Datenverzeichnis',
		mode: 'Speichermodus',
		modeInstalled: 'Installierte Version',
		modePortable: 'Portable Version',
		modeDev: 'Entwicklungsmodus',
		classes: 'Spieldateien',
		mainTemp: 'Entpackte Daten',
		backupFolder: 'Sicherungsverzeichnis',
		backupInitial: 'Sicherung von initial.pak',
		game: 'Spieldateien',
		archivePath: 'Pfad zu initial.pak',
		noPath: 'Archiv nicht ausgewählt',
		choose: 'Auswählen',
		unpack: 'Entpacken',
		unpackConfirm: 'Zuerst wird das Archiv gesichert, dann werden die Spieldateien erneut entpackt. Fortfahren?',
		unpacked: 'Entpackte Dateien: {}',
		backup: 'Sicherung',
		backedUp: 'Sicherung gespeichert: {}',
		update: 'Archiv aktualisieren',
		updateMod: 'Mod in .pak schreiben',
		updated: 'Aktualisierte Einträge: {}',
		verify: 'Prüfen',
		verified: 'Geprüfte Einträge: {}',
		restore: 'Aus Sicherung wiederherstellen',
		restoreConfirm: 'initial.pak durch die Kopie aus dem Datenverzeichnis ersetzen? Nicht gespeicherte Archivänderungen gehen verloren.',
		restored: 'Archiv aus der Sicherung wiederhergestellt',
		mods: 'Mods',
		noMods: 'Keine Mods hinzugefügt',
		addMod: 'Mod hinzufügen (.pak)',
		syncMods: 'Mods aktualisieren',
		removeMod: 'Mod aus der Liste entfernen',
		language: 'Sprache der Oberfläche',
		portableMode: 'Portabler Modus',
		modeConfirm: 'Speichermodus wechseln? Die JSON-Dateien des Programms werden in das neue Verzeichnis verschoben; Spieldateien und Sicherungen müssen erneut entpackt werden.',
		modeSwitched: 'Modus geändert. Verschobene Dateien: {}. Starten Sie das Programm neu.',
		restartConfirm: 'Das Programm jetzt neu starten?',
		restart: 'Neu starten',
		options: 'Optionen',
		useMods: 'Mods verwenden',
		advancedMode: 'Erweiterter Modus',
		checkUpdates: 'Nach Updates suchen',
		cancel: 'Abbrechen',
		saved: 'Einstellungen gespeichert',
		loadError: 'Einstellungen konnten nicht gelesen werden'
	},

	editor: {
		title: 'Editor',
		type: 'Typ',
		trucks: 'Autos und Anhänger',
		noGameFiles: 'Spieldateien nicht gefunden. Wählen Sie initial.pak aus, um sie zu entpacken.',
		openArchive: 'initial.pak auswählen',
		unpacking: 'Entpacken...',
		unpacked: 'Entpackte Dateien: {}',
		refresh: 'Aktualisieren',
		save: 'Speichern',
		saved: 'Gespeichert',
		exportEpf: 'Parameter exportieren',
		importEpf: 'Parameter importieren',
		exported: 'Exportierte Attribute: {}',
		imported: 'Importierte Attribute: {}',
		unsaved: 'Es gibt nicht gespeicherte Änderungen',
		reset: 'Parameter zurücksetzen',
		resetDocument: 'Alles zurücksetzen',
		resetConfirm: 'Alle Parameter des Dokuments auf die ursprünglichen Werte zurücksetzen?',
		resetDone: 'Parameter zurückgesetzt. Vergessen Sie nicht, die Änderungen zu speichern',
		discardConfirm: 'Änderungen sind nicht gespeichert und gehen verloren. Editor schließen?',
		loadError: 'Datei konnte nicht geöffnet werden',
		cancel: 'Abbrechen',
		close: 'Schließen',
		yes: 'Ja',
		no: 'Nein',
		texts: 'Texte',
		control: 'Steuerung',
		winch: 'Winde',
		wheels: 'Räder',
		wheel: 'Rad',
		extraWheel: 'Zusatzrad',
		wheelSizes: 'Verfügbare Radgrößen',
		wheelSet: 'Radsatz',
		suspension: 'Aufhängung',
		suspensions: 'Aufhängungen',
		suspensionSet: 'Aufhängungssatz',
		frontSuspension: 'Vordere Aufhängung',
		middleSuspension: 'Mittlere Aufhängung',
		rearSuspension: 'Hintere Aufhängung',
		gearbox: 'Getriebe',
		gearboxes: 'Getriebe',
		gearboxParams: 'Getriebeparameter',
		gears: 'Gänge',
		gear: 'Gang',
		reverseGear: 'Rückwärtsgang',
		highGear: 'Hoher Gang',
		engine: 'Motor',
		engines: 'Motoren',
		fuel: 'Kraftstofftank',
		physicsModel: 'Physikmodell',
		unlock: 'Freischaltung',
		tire: 'Reifen',
		truck: 'Lastwagen',
		trailer: 'Anhänger',
		russia: 'Russland',
		usa: 'USA',
		cas: 'Zentralasien',
		ne: 'Nordeuropa',
		findOnMap: 'Auf der Karte finden',
		byRank: 'Nach Rang',
		torqueDefault: 'Immer angetrieben',
		torqueFull: 'Antrieb bei Allrad',
		torqueNone: 'Angetrieben',
		torqueConnectable: 'Vom Addon bestimmt',
		diffLockAlways: 'Immer aktiv',
		diffLockInstalled: 'Wird installiert',
		diffLockUninstalled: 'Wird nicht installiert',
		diffLockNone: 'Nicht vorhanden',
		wheelFront: 'Vorne',
		wheelMiddle: 'Mitte',
		wheelRear: 'Hinten',
		drive: 'Antrieb',
		addonsContent: 'Addon-Inhalt',
		loadAddons: 'Addons laden',
		loadingAddons: 'Addons werden geladen...',
		addonFilter: 'Nach Namen filtern',
		noAddons: 'Keine Addons gefunden',
		allAddons: 'Alle',
		installedAddons: 'Installiert',
		installedAddon: 'Installiert',
		notInstalledAddon: 'Nicht installiert',
		createTruckData: 'TruckData-Block erstellen',
		addonSockets: 'Addon-Sockets',
		socket: 'Socket',
		shift: 'Verschiebung',
		addSocket: 'Socket hinzufügen',
		addShift: 'Verschiebung hinzufügen',
		moveUp: 'Nach oben',
		moveDown: 'Nach unten',
		removeConfirm: 'Element löschen?',
		cranes: 'Kräne',
		crane: 'Kran',
		cranesWarnTitle: 'Achtung!',
		cranesWarnMessage: 'Bevor der Kran entfernt wird, muss er unbedingt vom Fahrzeug abgenommen werden.',
		banditCrane: 'Banditen-Banane',
		banditWarnMessage: 'Für die Verwendung wird das gekaufte DLC mit dem Fahrzeug KRS 58 "Bandit" benötigt.',
		trailers: 'Anhänger',
		scoutTrailers: 'Späher-Anhänger',
		truckTrailers: 'Normale Anhänger',
		add: 'Hinzufügen',
		remove: 'Löschen'
	},

	updateAlert: {
		title: 'Erneuerung',
		available: 'Eine neue Version des Programms ist verfügbar ({})',
		installer: 'Installer (.exe)',
		portable: 'Portable (.zip)',
		update: 'Update',
		ignore: 'Ignorieren',
		downloading: 'Update wird heruntergeladen',
		downloaded: 'Download abgeschlossen. Installationsprogramm wird gestartet...',
		downloadError: 'Update konnte nicht heruntergeladen werden',
		close: 'Schließen'
	},

	whatsNew: {
		title: 'Was ist neu in der Version',
		changes: [
			'Das Programm läuft jetzt auf Tauri (Rust): kleiner und sparsamer',
			'Die portable Version wird als .zip-Archiv geliefert',
			'Erfordert Windows 10 oder 11 (x64) und WebView2'
		]
	},

	dictionaries: {
		engine: {
			name: 'Titel',
			responsiveness: 'Empfänglichkeit',
			responsivenessDesc: 'Reaktionsfähigkeit des Motors (Drehzahl)',
			fuelConsumption: 'Kraftstoffverbrauch',
			fuelConsumptionDesc: 'Basiskraftstoffverbrauch durch den Motor',
			damagedConsumptionModifier: 'Schadensverbrauchsmodifikator',
			damagedConsumptionModifierDesc: 'Maximale Durchflussänderung bei Motorschaden',
			torque: 'Drehmoment',
			torqueDesc: 'Motorleistung',
			damagedMinTorqueModifier: 'Beschädigter min Drehmomentmodifikator',
			damagedMinTorqueModifierDesc: 'Leistungsmultiplikator, wenn der Motorschaden die Bruchschwelle erreicht hat',
			damagedMaxTorqueModifier: 'Beschädigte max Drehmoment-Modifikator',
			damagedMaxTorqueModifierDesc: 'Leistungsmultiplikator, wenn der Motor nahe an einem vollständigen Bruch liegt (bei 0 Stärke)',
			brakesDelay: 'Verzögerung beim Bremsen',
			brakesDelayDesc: 'Verzögerung beim Bremsen',
			maxDeltaAngVel: 'Maximale Winkelgeschwindigkeit Delta',
			maxDeltaAngVelDesc: 'Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto',
			criticalDamageThreshold: 'Kritische Schadensschwelle',
			criticalDamageThresholdDesc: 'Kritische Bruchschwelle. Nach dieser Schwelle ändert sich der Kraftstoffverbrauch und die Motorleistung',
			damageCapacity: 'Schadenskapazität',
			damageCapacityDesc: 'Die Größe des zulässigen Motorschadens'
		},

		gearbox: {
			name: 'Titel',
			awdConsumptionModifier: 'AWD-Verbrauchsmodifikator',
			awdConsumptionModifierDesc: 'Änderungskoeffizient des Kraftstoffverbrauchs bei Verwendung eines Allradantriebs',
			criticalDamageThreshold: 'Kritische Schadensschwelle',
			criticalDamageThresholdDesc: 'Die Schadensschwelle, nach der das Getriebe Anzeichen eines Defekts zeigt - herausspringende Gänge und erhöhter Kraftstoffverbrauch',
			damageCapacity: 'Schadenskapazität',
			damageCapacityDesc: 'Die Größe des zulässigen Getriebeschadens',
			damagedConsumptionModifier: 'Schadensverbrauchsmodifikator',
			damagedConsumptionModifierDesc: 'Der maximale Kraftstoffverbrauchsmultiplikator, den der Verbrauch erreicht, wenn das Getriebe vollständig defekt ist',
			fuelConsumption: 'Kraftstoffverbrauch',
			fuelConsumptionDesc: 'Basiskraftstoffverbrauch durch das Getriebe',
			idleFuelConsumption: 'Leerlaufverbrauch',
			idleFuelConsumptionDesc: 'Kraftstoffverbrauchs-Multiplikator, wenn das Fahrzeug bei laufendem Motor steht',
			minBreakFreqDesc: 'Minimale Häufigkeit des Gangspringens, wenn die Festigkeit die kritische Schwelle erreicht hat',
			maxBreakFreqDesc: 'Maximale Häufigkeit des Gangspringens, wenn sich die Festigkeit dem Nullpunkt nähert'
		},

		gearboxParams: {
			isHighGearExists: 'Hoher',
			isHighGearExistsDesc: 'Ist ein hoher Gang verfügbar',
			isLowerPlusGearExists: 'Unterer+',
			isLowerPlusGearExistsDesc: 'Ist ein unterer+ (erster) Gang verfügbar',
			isLowerGearExists: 'Unterer',
			isLowerGearExistsDesc: 'Ist ein unterer Gang verfügbar (45% der Geschwindigkeit des ersten Gangs)',
			isManualLowGear: 'Feineinstellung',
			isManualLowGearDesc: 'Ist eine genaue Einstellung verfügbar',
			isLowerMinusGearExists: 'Unterer-',
			isLowerMinusGearExistsDesc: 'Ist ein unterer- Gang verfügbar (20% der Geschwindigkeit des ersten Gangs)'
		},

		gear: {
			angVel: 'Winkelgeschwindigkeit',
			angVelDesc: 'Die maximale Winkelgeschwindigkeit des Rades bei diesem Gang',
			fuelModifier: 'Kraftstoffmodifikator',
			fuelModifierDesc: 'Kraftstoffverbrauchs-Multiplikator bei diesem Gang'
		},

		suspension: {
			height: 'Höhe',
			heightDesc: 'Höhe der Aufhängung',
			strength: 'Stärke',
			strengthDesc: 'Federungssteifigkeit',
			damping: 'Dämpfung',
			dampingDesc: 'Reduzierte Geschwindigkeit und Vibrationsintensität',
			suspensionMin: 'Minimale Aufhängungshöhe',
			suspensionMinDesc: 'Minimaler Federweg (Position, die das Rad bei vollständig durchgefederter Aufhängung einnehmen kann)',
			suspensionMax: 'Maximale Aufhängungshöhe',
			suspensionMaxDesc: 'Maximaler Federweg (Position, die das Rad einnehmen kann, wenn die Aufhängung betriebsbereit ist und ihre Steifigkeit Null ist, während das Rad in der Luft hängt)',
			brokenSuspensionMax: 'Minimale Aufhängungshöhe im defekten Zustand',
			brokenSuspensionMaxDesc: 'Maximaler Federweg der defekten Aufhängung'
		},

		suspensionSet: {
			name: 'Titel',
			damageCapacity: 'Schadenskapazität',
			damageCapacityDesc: 'Die Höhe des zulässigen Schadens an der Aufhängung',
			criticalDamageThreshold: 'Kritische Schadensschwelle',
			criticalDamageThresholdDesc: 'Schwelle für kritischen Fahrwerksschaden',
			brokenWheelDamageMultiplierDesc: 'Erhöhter Fahrwerksschaden bei einem platten Reifen'
		},

		winch: {
			name: 'Titel',
			length: 'Länge',
			lengthDesc: 'Maximale Länge des Windenseils',
			strengthMult: 'Stärke',
			isEngineIgnitionRequired: 'Arbeitet von',
			isEngineIgnitionRequiredDesc: 'Kann die Winde bei abgeschaltetem Motor arbeiten'
		},

		truckWinch: {
			winchLength: 'Länge der Winde',
			winchLengthDesc: 'Maximale Länge des Windenseils',
			strengthMult: 'Kraft der Winde'
		},

		truckWheel: {
			torque: 'Torsionsart',
			torqueDesc: 'Art des Radantriebs',
			steeringAngle: 'Drehwinkel',
			steeringAngleDesc: 'Maximaler Lenkwinkel des Rades beim Lenken',
			steeringCastorDesc: 'Neigungswinkel des Rades zur Drehrichtung',
			suspensionHeight: 'Höhe der Aufhängung',
			suspensionHeightDesc: 'Höhe der Radaufhängung',
			suspensionStrength: 'Federungssteifigkeit',
			suspensionStrengthDesc: 'Steifigkeit der Radaufhängung'
		},

		truckData: {
			backSteerSpeed: 'Rückstellgeschwindigkeit der Räder',
			backSteerSpeedDesc: 'Die Geschwindigkeit, mit der das Lenkrad nach dem Abbiegen in die Ausgangsposition zurückkehrt',
			diffLockType: 'Differenzialsperre',
			engineStartDelay: 'Motorstartverzögerung',
			engineStartDelayDesc: 'Verzögerung nach dem Drücken von "Motor einschalten"',
			exhaustStartTime: 'Startzeit des Abgases',
			exhaustStartTimeDesc: 'Startzeit des Abgases',
			responsiveness: 'Empfindlichkeit des Lenkers',
			responsivenessDesc: 'Lenkempfindlichkeit',
			steerSpeed: 'Geschwindigkeit lenken',
			steerSpeedDesc: 'Lenkgeschwindigkeit'
		},

		addonTruckData: {
			fuelCapacity: 'Kraftstoffkapazität',
			fuelCapacityDesc: 'Kraftstoffmenge im Addon',
			waterCapacity: 'Wasser-Kapazität',
			waterCapacityDesc: 'Wassermenge im Addon',
			repairsCapacity: 'Anzahl der Ersatzteile',
			repairsCapacityDesc: 'Anzahl der Reparaturteile im Addon',
			wheelRepairsCapacity: 'Anzahl der Räder zu reparieren',
			wheelRepairsCapacityDesc: 'Anzahl der Reparaturräder im Addon'
		},

		truckGameData: {
			country: 'Land',
			countryDesc: 'Die Region, in der das Auto zum Kauf verfügbar ist'
		},

		addonSlots: {
			quantity: 'Menge der Ladung',
			quantityDesc: 'Anzahl der Ladeschlitze'
		},

		compatibleWheels: {
			scale: 'Rad-Größe',
			type: 'Titel'
		},

		fuelTank: {
			damageCapacity: 'Schadenskapazität',
			damageCapacityDesc: 'Die Höhe des zulässigen Schadens am Benzintank'
		},

		gameData: {
			price: 'Preis',
			priceDesc: 'Der Wert des Artikels / Autos im Laden. Im Falle eines Autos sind dies lediglich die Grundkosten, die beim Kauf im Geschäft nicht die Kosten für Standardausrüstung beinhalten',
			unlockByExploration: 'Methode entsperren',
			unlockByExplorationDesc: 'Öffnet sich ein Gegenstand / ein Fahrzeug mit einer Standortsuche',
			unlockByRank: 'Level freischalten',
			unlockByRankDesc: 'Ab welchem Level der Gegenstand / das Auto freigeschaltet wird. Wird ignoriert, wenn die Freischaltung durch Erkundung gilt'
		},

		uiDesc: {
			uiDesc: 'Der Name',
			uiDescDesc: 'Beschreibung des Gegenstands',
			uiName: 'Die Beschreibung',
			uiNameDesc: 'Name des Gegenstands'
		},

		physicsBody: {
			mass: 'Masse',
			centerOfMassOffset: 'Versatz des Massenzentrums'
		},

		rim: {
			name: 'Titel'
		},

		tire: {
			name: 'Titel'
		},

		wheelFriction: {
			bodyFriction: 'Körperreibung',
			bodyFrictionDesc: 'Reibung mit dem Boden, ohne Schmutz und andere Gegenstände',
			bodyFrictionAsphalt: 'Körperreibung asphalt',
			bodyFrictionAsphaltDesc: 'Reibung mit der Straße',
			substanceFriction: 'Substanzreibung',
			substanceFrictionDesc: 'Reiben mit Schmutz',
			isIgnoreIce: 'Fahrten auf Eis',
			isIgnoreIceDesc: 'Hat das Rad einen guten Griff auf dem Eis'
		}
	}
}
