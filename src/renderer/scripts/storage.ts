/** Работа с local storage */
export const storage = {
    pop<T = string>(name: string) {
        const value = localStorage.getItem(name)

        localStorage.removeItem(name)
        if (value === 'null')
            return null

        if (value === 'undefined')
            return undefined

        return <T><unknown>value
    },
    get<T = string>(name: string) {
        const value = localStorage.getItem(String(name))

        if (value === 'null')
            return null

        if (value === 'undefined')
            return undefined

        return <T><unknown>value
    },
    set(name: string, value: string) {
        localStorage.setItem(String(name), value)
    }
}
