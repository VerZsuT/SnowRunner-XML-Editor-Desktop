import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const GEAR_LOCALIZATION = loadLocalization(new Localization({
  angVel: new LocalizationStrings()
	  .ru('Макс. угловая скорость колеса')
	  .en('Max wheel angular velocity')
	  .de('Winkelgeschwindigkeit')
	  .ch('齿比'),

  angVelDesc: new LocalizationStrings()
    .ru('Максимальная угловая скорость колеса на данной передаче')
    .en('The maximum angular velocity of the wheel in this gear')
    .de('Die maximale Winkelgeschwindigkeit des Rades bei diesem Gang'),

	fuelModifier: new LocalizationStrings()
	  .ru('Модификатор потребления топлива')
	  .en('Fuel modifier')
	  .de('Kraftstoffmodifikator')
	  .ch('燃油消耗'),

	fuelModifierDesc: new LocalizationStrings()
    .ru('Множитель потребления топлива на данной передаче')
    .en('Fuel consumption multiplier in this gear')
    .de('Multiplikator des Kraftstoffverbrauchs in diesem Getriebe')
}))
