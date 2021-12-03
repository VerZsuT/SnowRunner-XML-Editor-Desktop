/** Для неявной передачи настроек в остальные классы программы. */
export default class Settings {
    public static obj: ISettings = {}
    public static set(newObj: ISettings): ISettings {    
        for (const key in newObj) {
            this.obj[key] = newObj[key]
        }
        return this.obj
    }
}
