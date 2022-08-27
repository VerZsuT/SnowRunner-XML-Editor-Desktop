import {NumberType} from 'enums'
import {localize} from 'scripts/localize'

import {Group, Number, Select} from '../items'

const texts = localize({
    RU: {
        unlockGroupName: 'Разблокировка',
        price: 'Цена',
        byExploration: 'Способ разблокировки',
        findOnMap: 'Найти на карте',
        byRank: 'По достижению уровня',
        unlockByRank: 'Уровень разблокировки'
    },
    EN: {
        unlockGroupName: 'Unlock',
        price: 'Price',
        byExploration: 'Unlock method',
        findOnMap: 'Find on map',
        byRank: 'By rank',
        unlockByRank: 'Unlock level'
    },
    DE: {
        unlockGroupName: 'Freischalten',
        price: 'Preis',
        byExploration: 'Methode entsperren',
        findOnMap: 'Auf Karte finden',
        byRank: 'Nach Rang',
        unlockByRank: 'Level freischalten'
    },
    CH: {
        unlockGroupName: '解锁',
        price: '价格',
        byExploration: '解锁的方法',
        findOnMap: '在地图上查找',
        byRank: '当达到该水平时',
        unlockByRank: '解锁级别'
    }
})

export function unlockGroup(selector: string) {
    return Group({
        label: texts.unlockGroupName,
        provided: selector
    }, [
        Number({
            attribute: 'Price',
            type: NumberType.integer,
            label: texts.price
        }),
        Select({
            attribute: 'UnlockByExploration',
            label: texts.byExploration,
            options: {
                true: texts.findOnMap,
                false: texts.byRank
            }
        }),
        Number({
            attribute: 'UnlockByRank',
            type: NumberType.integer,
            label: texts.unlockByRank,
            max: 30,
            min: 1
        })
    ])
}
