interface IExportedData {
  fileName: string
  version: string
  data: Record<string, Record<string, Record<string, string | number>>>
  actionsData: Record<string, any>
}

export default IExportedData
