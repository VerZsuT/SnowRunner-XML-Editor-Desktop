import { Group, Input, NumberType, Select } from '../../service'

const texts = {
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
    }
}[config.lang]

const descs = {
    RU: {
        price: 'Цена',
		byExploration: 'Способ разблокировки',
		unlockByRank: 'Уровень разблокировки'
    },
    EN: {
        price: 'Der Preis',
		byExploration: 'How to unlock',
		unlockByRank: 'Unlock Level'
    },
    DE: {
        price: 'The price',
		byExploration: 'Methode zum Entsperren',
		unlockByRank: 'Entsperren Ebene'
    }
}[config.lang]

export default (selector: string) => Group({
    name: texts.unlockGroupName,
    defaultSelector: selector
}, [
    Input({
        attribute: 'Price',
        numberType: NumberType.integer,
        text: texts.price,
        desc: descs.price,
        bold: true
    }),
    Select({
        attribute: 'UnlockByExploration',
        text: texts.byExploration,
        desc: descs.byExploration,
        options: {
            true: texts.findOnMap,
            false: texts.byRank
        },
        onlyDeveloper: true
    }),
    Input({
        attribute: 'UnlockByRank',
        numberType: NumberType.integer,
        text: texts.unlockByRank,
        desc: descs.unlockByRank,
        max: 30,
        min: 1
    })
])
