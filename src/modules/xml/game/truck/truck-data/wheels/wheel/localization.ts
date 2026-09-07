import { Localization, LocalizationStrings, loadLocalization } from '@localization/renderer'

export const WHEEL_LOCALIZATION = loadLocalization(new Localization({
  torque: new LocalizationStrings()
    .ru('Привод')
    .en('Type of wheel drive')
    .de('Torsionsart')
    .ch('驱动器'),

  torqueDesc: new LocalizationStrings()
    .ru('Тип привода колеса')
    .en('Type of wheel drive')
    .de('Art des Radantriebs'),

  steeringAngle: new LocalizationStrings()
    .ru('Угол поворота')
    .en('Steering angle')
    .de('Drehwinkel')
    .ch('转弯角度'),

  steeringAngleDesc: new LocalizationStrings()
    .ru('Максимальный угол поворота колеса при рулении')
    .en('The maximum angle of rotation of the wheel when taxiing')
    .de('Maximaler Lenkwinkel des Rades beim Lenken'),

  steeringCastorDesc: new LocalizationStrings()
    .ru('Угол наклона колеса в сторону поворота')
    .en('The angle of inclination of the wheel in the direction of rotation')
    .de('Neigungswinkel des Rades zum Drehen'),

  suspensionHeight: new LocalizationStrings()
    .ru('Высота подвески')
    .en('Suspension height')
    .de('Höhe der Aufhängung')
    .ch('悬架的高度'),

  suspensionHeightDesc: new LocalizationStrings()
    .ru('Высота подвески колеса')
    .en('Wheel suspension height')
    .de('Höhe der Radaufhängung'),

  suspensionStrength: new LocalizationStrings()
    .ru('Жёсткость подвески')
    .en('Suspension strength')
    .de('Federungssteifigkeit')
    .ch('悬架的硬度'),

  suspensionStrengthDesc: new LocalizationStrings()
    .ru('Жесткость подвески колеса')
    .en('Wheel suspension stiffness')
    .de('Steifigkeit der Radaufhängung')
}))
