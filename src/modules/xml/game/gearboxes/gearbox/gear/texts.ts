import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  angVel: new BaseLocalization()
	  .ru('Макс. угловая скорость колеса')
	  .en('Max wheel angular velocity')
	  .de('Winkelgeschwindigkeit')
	  .ch('齿比'),

  angVelDesc: new BaseLocalization()
    .ru('Максимальная угловая скорость колеса на данной передаче')
    .en('The maximum angular velocity of the wheel in this gear')
    .de('Die maximale Winkelgeschwindigkeit des Rades bei diesem Gang'),
  
	fuelModifier: new BaseLocalization()
	  .ru('Модификатор потребления топлива')
	  .en('Fuel modifier')
	  .de('Kraftstoffmodifikator')
	  .ch('燃油消耗'),

	fuelModifierDesc: new BaseLocalization()
    .ru('Множитель потребления топлива на данной передаче')
    .en('Fuel consumption multiplier in this gear')
    .de('Multiplikator des Kraftstoffverbrauchs in diesem Getriebe')
}).loadRenderer()
