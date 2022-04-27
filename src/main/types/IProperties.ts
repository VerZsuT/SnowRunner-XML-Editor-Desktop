import type IPaths from "./IPaths";
import type IDefaults from "./IDefaults";
import type IConfig from "./IConfig";
import type Texts from "./Texts";
import type ITemplates from "../templates/types/ITemplates";

interface IProperties {
    texts: Texts
    paths: IPaths
    config: IConfig
    templates: ITemplates
    defaults: IDefaults
}

export default IProperties;
