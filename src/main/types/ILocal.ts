interface ILocal {
    pop(name: string): null | undefined | string
    get(name: string): null | undefined | string
    set(name: string, value: string): void
}

export default ILocal;
