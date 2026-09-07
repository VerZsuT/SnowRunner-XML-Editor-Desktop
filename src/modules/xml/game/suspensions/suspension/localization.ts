import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const SUSPENSION_LOCALIZATION = loadLocalization(new Localization({
  height: new LocalizationStrings()
    .ru('Высота')
    .en('Height')
    .de('Höhe')
    .ch('悬架的高度'),

  heightDesc: new LocalizationStrings()
    .ru('Высота подвески')
    .en('Suspension height')
    .de('Höhe der Aufhängung'),

  strength: new LocalizationStrings()
    .ru('Жёсткость')
    .en('Strength')
    .de('Stärke')
    .ch('悬架的硬度'),

  strengthDesc: new LocalizationStrings()
    .ru('Жесткость подвески')
    .en('Suspension stiffness')
    .de('Federungssteifigkeit'),

  damping: new LocalizationStrings()
    .ru('Демпинг')
    .en('Damping')
    .de('Dämpfung')
    .ch('悬架的阻尼'),

  dampingDesc: new LocalizationStrings()
    .ru('Снижение скорости и интенсивности вибраций')
    .en('Reducing the speed and intensity of vibrations')
    .de('Reduzierte Geschwindigkeit und Vibrationsintensität'),

  suspensionMin: new LocalizationStrings()
    .ru('Минимальная высота подвески')
    .en('Minimum suspension height')
    .de('Minimale Aufhängungshöhe')
    .ch('悬架最小行程'),

  suspensionMinDesc: new LocalizationStrings()
    .ru('Минимальный ход подвески (Позиция, которую колесо может принять при полной просадке подвески)')
    .en('Minimum suspension stroke (The position that the wheel can take when the suspension is fully sagged)')
    .de('Minimaler Federweg (Position, die das Rad annehmen kann, wenn die Federung vollständig abfällt)'),

  suspensionMax: new LocalizationStrings()
    .ru('Максимальная высота подвески')
    .en('Maximum suspension height')
    .de('Maximale Aufhängungshöhe')
    .ch('悬架最大行程(悬空时)'),

  suspensionMaxDesc: new LocalizationStrings()
    .ru('Максимальный ход подвески (Позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе)')
    .en('Maximum suspension travel (The position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)')
    .de('Maximaler Federweg (Die Position, die das Rad annehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)'),

  brokenSuspensionMax: new LocalizationStrings()
    .ru('Максимальная высота подвески (когда сломана)')
    .en('Minimum suspension height in broken condition')
    .de('Minimale Aufhängungshöhe in gebrochenem Zustand')
    .ch('悬架损坏时的最大行程'),

  brokenSuspensionMaxDesc: new LocalizationStrings()
    .ru('Максимальный ход сломанной подвески')
    .en('The maximum stroke of a broken suspension')
    .de('Maximaler Hub der gebrochenen Aufhängung')
}))
