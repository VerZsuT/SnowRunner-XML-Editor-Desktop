import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  torque: new BaseLocalization()
    .ru('Привод')
    .en('Type of wheel drive')
    .de('Torsionsart')
    .ch('驱动器'),

  torqueDesc: new BaseLocalization()
    .ru('Тип привода колеса')
    .en('Type of wheel drive')
    .de('Art des Radantriebs'),

  steeringAngle: new BaseLocalization()
    .ru('Угол поворота')
    .en('Steering angle')
    .de('Drehwinkel')
    .ch('转弯角度'),

  steeringAngleDesc: new BaseLocalization()
    .ru('Максимальный угол поворота колеса при рулении')
    .en('The maximum angle of rotation of the wheel when taxiing')
    .de('Maximaler Lenkwinkel des Rades beim Lenken'),

  steeringCastorDesc: new BaseLocalization()
    .ru('Угол наклона колеса в сторону поворота')
    .en('The angle of inclination of the wheel in the direction of rotation')
    .de('Neigungswinkel des Rades zum Drehen'),

  suspensionHeight: new BaseLocalization()
    .ru('Высота подвески')
    .en('Suspension height')
    .de('Höhe der Aufhängung')
    .ch('悬架的高度'),

  suspensionHeightDesc: new BaseLocalization()
    .ru('Высота подвески колеса')
    .en('Wheel suspension height')
    .de('Höhe der Radaufhängung'),

  suspensionStrength: new BaseLocalization()
    .ru('Жёсткость подвески')
    .en('Suspension strength')
    .de('Federungssteifigkeit')
    .ch('悬架的硬度'),

  suspensionStrengthDesc: new BaseLocalization()
    .ru('Жесткость подвески колеса')
    .en('Wheel suspension stiffness')
    .de('Steifigkeit der Radaufhängung')
}).loadRenderer()
