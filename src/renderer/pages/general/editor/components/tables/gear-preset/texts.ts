import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
	angelVelocity: new BaseLocalization()
	  .ru('Макс. угловая скорость колеса')
	  .en('Max wheel angular velocity')
	  .de('Winkelgeschwindigkeit')
	  .ch('齿比'),
  
	fuelModifier: new BaseLocalization()
	  .ru('Модификатор потребления топлива')
	  .en('Fuel modifier')
	  .de('Kraftstoffmodifikator')
	  .ch('燃油消耗')
}).loadRenderer()
