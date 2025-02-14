import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  backSteerSpeed: new BaseLocalization()
    .ru('Скорость возврата колёс')
    .en('Back steer speed')
    .de('Die Rücklaufquote der Spitze')
    .ch('车轮回正速度'),

  backSteerSpeedDesc: new BaseLocalization()
    .ru('Скорость, с которой руль возвращается в исходное положение после поворота')
    .en('The speed at which the steering wheel returns to its original position after turning')
    .de('Die Geschwindigkeit, mit der das Lenkrad nach dem Abbiegen in die Ausgangsposition zurückkehrt'),

  diffLockType: new BaseLocalization()
    .ru('Блокировка дифференциала')
    .en('Differential lock')
    .de('Differenzialsperre')
    .ch('差速器锁'),

  engineStartDelay: new BaseLocalization()
    .ru('Задержка запуска двигателя')
    .en('Engine start delay')
    .de('Motorstartverzögerung')
    .ch('发动机启动延迟'),

  engineStartDelayDesc: new BaseLocalization()
    .ru('Задержка после нажатия "включить двигатель"')
    .en('Delay after pressing "turn on the engine"')
    .de('Verzögerung nach dem Drücken von "Motor einschalten"'),

  exhaustStartTime: new BaseLocalization()
    .ru('Время начала выхлопа')
    .en('Exhaust start time')
    .de('Startzeit des Abgases')
    .ch('排气的开始时间'),

  exhaustStartTimeDesc: new BaseLocalization()
    .ru('Время начала выхлопа')
    .en('Exhaust start time')
    .de('Abgas-Startzeit'),

  responsiveness: new BaseLocalization()
    .ru('Чувствительность руля')
    .en('Steering wheel sensitivity')
    .de('Empfindlichkeit des Lenkers')
    .ch('方向盘灵敏度'),

  responsivenessDesc: new BaseLocalization()
    .ru('Чувствительность рулевого управления')
    .en('Steering sensitivity')
    .de('Lenkempfindlichkeit'),

  steerSpeed: new BaseLocalization()
    .ru('Скорость руля')
    .en('Steer speed')
    .de('Geschwindigkeit lenken')
    .ch('转方向盘速度'),

  steerSpeedDesc: new BaseLocalization()
    .ru('Скорость поворота руля')
    .en('Steering wheel rotation speed')
    .de('Lenkgeschwindigkeit')
}).loadRenderer()
