export default {
    pop<T>(name: string) {
        const val = localStorage.getItem(name)

        localStorage.removeItem(name)
        if (val === 'null')
            return null

        if (val === 'undefined')
            return undefined

        return val as unknown as T
    },
    get<T>(name: string) {
        const val = localStorage.getItem(String(name))

        if (val === 'null')
            return null

        if (val === 'undefined')
            return undefined

        return val as unknown as T
    },
    set(name: string, value: string) {
        localStorage.setItem(String(name), value)
    }
}
