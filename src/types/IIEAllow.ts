import type IExportable from "./IExportable";
import type IImportable from "./IImportable";

/** Allow Import and Export */
interface IIEAllow<T> extends IExportable<T>, IImportable<T> {}

export default IIEAllow;
