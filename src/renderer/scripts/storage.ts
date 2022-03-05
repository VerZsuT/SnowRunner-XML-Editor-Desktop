export default {
    pop(name: string) {
        const val = localStorage.getItem(name)

        localStorage.removeItem(name)
        if (val === 'null') {
            return null
        }
        if (val === 'undefined') {
            return undefined
        }
        return val
    },
    get(name: string) {
        const val = localStorage.getItem(String(name))

        if (val === 'null') {
            return null
        }
        if (val === 'undefined') {
            return undefined
        }
        return val
    },
    set(name: string, value: string) {
        localStorage.setItem(String(name), value)
    }
}
