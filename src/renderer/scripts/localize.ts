import main from "./main";
import config from "./config";
import type { ITexts } from "texts";

export default <ITexts><unknown>main.texts[config.lang];
