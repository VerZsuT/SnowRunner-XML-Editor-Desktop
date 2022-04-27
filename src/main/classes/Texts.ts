import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type ITranslation from "../types/ITranslation";

import { RU, EN, DE, CH, ITexts } from "texts";
import { paths } from "../service";
import { config } from "./Config";

type TKeys = keyof ITexts;

/** Отвечает за работу с переводами. */
class Texts {
    /** Объект переводов. */
    public obj = {
        /** Русский перевод программы. */
        RU: RU,
        /** Английский перевод программы. */
        EN: EN,
        /** Немецкий перевод программы. */
        DE: DE,
        /** Китайский перевод программы. */
        CH: CH,
        /** Игровой перевод из файлов модификаций. */
        mods: {},
        /** Игровой перевод из `initial.pak.` */
        ingame: {}
    };

    /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе). */
    public async addIngame() {
        if (existsSync(paths.texts))
            this.obj.ingame = JSON.parse(readFileSync(paths.texts).toString());

        if (existsSync(paths.strings)) {
            const map = {
                RU: "russian",
                EN: "english",
                DE: "german",
                CH: "chinese_simplified"
            };
            const stringsFilePath = join(paths.strings, `strings_${map[config.lang]}.str`);

            if (existsSync(stringsFilePath)) {
                this.obj.ingame = this.parse(readFileSync(stringsFilePath, { encoding: "utf16le" }).toString());
                this.save();
            }
        }
    }

    /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе). */
    public addFromMods() {
        const mods = {};
        const map = {
            RU: "russian",
            EN: "english",
            DE: "german",
            CH: "chinese_simplified"
        };
        for (const modId in config.mods.items) {
            if (existsSync(join(paths.modsTemp, modId, "texts"))) {
                const stringsFilePath = join(paths.modsTemp, modId, `texts/strings_${map[config.lang]}.str`);
                if (existsSync(stringsFilePath))
                    mods[modId] = this.parse(readFileSync(stringsFilePath, { encoding: "utf16le" }).toString(), true);
            }
        }
        this.obj.mods = mods;
    }

    /** Получить текст перевода по ключу (в программе). */
    public get(key: TKeys, returnKey = true): string | undefined {
        const translation = this.obj[config.lang];
        if (translation)
            return translation[key] || (returnKey ? key : undefined);
    }

    /** Сохранить игровой перевод в файл (для оптимизации). */
    private save() {
        writeFileSync(paths.texts, JSON.stringify(this.obj.ingame, null, "\t"));
    }

    /** Обработать файл игрового перевода. */
    private parse(data: string, parseAll?: boolean): ITranslation {
        const strings = {};
        const lines = data.match(/[^\r\n]+/g);

        if (lines) {
            for (const line of lines) {
                const result = line.match(/(.*?)[\s\t]*(\".*?\")/);

                if (result && result.length === 3) {
                    const key = result[1].replaceAll("\"", "").replaceAll("\'", "").replaceAll("﻿", "");
                    
                    if (parseAll || (this.startsWith(key, [
                        "UI_VEHICLE",
                        "UI_ADDON",
                        "UI_ADDONS",
                        "UI_UPGRADE",
                        "UI_TUNING",
                        "UI_SCOUT",
                        "UI_FRAME",
                        "UI_STUFF",
                        "UI_SEMITRAILER",
                        "UI_TRAILER",
                        "UI_ROCKET",
                        "UI_TRAIN",
                        "UI_ENGINE",
                        "UI_GEARBOX",
                        "UI_SUSPENSION",
                        "UI_RIM",
                        "UI_TIRE",
                        "UI_WINCH"
                    ]) && key.endsWith("NAME"))) {
                        try {
                            strings[key] = JSON.parse(result[2].replaceAll("\\", ""));
                        }
                        catch {}
                    }
                }
            }
        }
        return strings;
    }

    private startsWith(key: string, array: string[]) {
        for (const str of array) {
            if (key.startsWith(str))
                return true;
        }
        return false;
    }
}

export default new Texts();
