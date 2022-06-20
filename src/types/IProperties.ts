import type IConfig from "./IConfig";
import type IDefaults from "./IDefaults";
import type IPaths from "./IPaths";
import type Texts from "./Texts";

interface IProperties {
    texts: Texts;
    paths: IPaths;
    config: IConfig;
    defaults: IDefaults;
}

export default IProperties;
