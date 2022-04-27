interface IExportData {
    fileName: string
    version: string
    data: {
        [fileName: string]: {
            [selector: string]: {
                [attrName: string]: string | number
            }
        }
    }
    actionsData: {
        [key: string]: any
    }
}

export default IExportData;
