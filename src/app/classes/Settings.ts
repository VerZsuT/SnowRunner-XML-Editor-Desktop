/** Для неявной передачи настроек в остальные классы программы. */
export default class Settings {
    static obj: ISettings = {}
    static set(newObj: ISettings): ISettings {    
        for (const key in newObj) {
            this.obj[key] = newObj[key]
        }
        return this.obj
    }
}
