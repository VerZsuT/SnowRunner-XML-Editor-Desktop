interface IIEParam {
    id: string
    forExport(): {
        selector: string
        name: string
        value: string | number
        fileName: string
    }
    forImport: {
        setValue(value: string): any
        name: string
        selector: string
        fileName: string
    }
}

export default IIEParam;
