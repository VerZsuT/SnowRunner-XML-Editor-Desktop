import { existsSync, readFileSync, lstatSync } from "fs";
import { createHash } from "crypto";

/** Отвечает за хэши файлов. */
class Hasher {
    /** Вычислить `SHA1-хэш` файла. */
    public getHash(path: string) {
        if (!existsSync(path))
            return "";

        return createHash("sha1").update(readFileSync(path)).digest("hex");
    }

    /** Получить размер файла. */
    public getSize(path: string) {
        return lstatSync(path).size;
    }
}

export default new Hasher();
