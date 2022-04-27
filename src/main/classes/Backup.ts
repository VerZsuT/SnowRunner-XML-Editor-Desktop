import { app } from "electron";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "fs";
import BuildType from "../enums/BuildType";

import { paths } from "../service";
import { settings } from "./Settings";
import { config } from "./Config";
import archiver from "./Archiver";
import dialog from "./Dialog";
import notification from "./Notification";
import texts from "./Texts";
import { linkWithRenderAs } from "../renderChannel";
import HasLinked from "../types/HasLinked";

/** Отвечает за работу с бэкапом `initial.pak` */
class Backup extends HasLinked {
    /**
     * Сохранить бэкап `initial.pak` и распаковать файлы.
     * @param reloadAfter перезагрузить после завершения.
     */
    @linkWithRenderAs("saveBackup")
    public async save(reloadAfter?: boolean) {
        await archiver.unpackMain();
        if (!existsSync(paths.backupFolder))
            mkdirSync(paths.backupFolder);

        if (existsSync(paths.backupInitial)) {
            try {
                rmSync(paths.backupInitial);
            }
            catch {
                throw new Error(texts.get("DELETE_OLD_INITIAL_BACKUP_ERROR"));
            }
        }

        if (config.buildType === BuildType.prod)
            this.copy();

        if (reloadAfter) {
            settings.isQuit = true;
            app.relaunch();
            app.quit();
        }
    }

    /** Сохранить бэкап `initial.pak` без распаковки. */
    @linkWithRenderAs("copyBackup")
    public copy() {
        try {
            copyFileSync(config.initial, paths.backupInitial);
            notification.show("SUCCESS", "SUCCESS_BACKUP_SAVE");
        }
        catch {
            throw new Error(texts.get("SAVE_INITIAL_BACKUP_ERROR"));
        }
    }

    /** Заменить оригинальный `initial.pak` на сохранённый. */
    @linkWithRenderAs("recoverFromBackup")
    public async recover() {
        if (!existsSync(paths.backupInitial))
            return;

        if (existsSync(config.initial)) {
            try {
                rmSync(config.initial);
            }
            catch {
                dialog.alert({
                    type: "warning",
                    title: texts.get("ERROR"),
                    message: texts.get("DELETE_CURRENT_INITIAL_BACKUP_ERROR")
                });
            }
        }
        
        try {
            copyFileSync(paths.backupInitial, config.initial);
            await archiver.unpackMain();
            notification.show("SUCCESS", "SUCCESS_INITIAL_RESTORE");
        }
        catch {
            dialog.alert({
                type: "warning",
                title: texts.get("ERROR"),
                message: texts.get("DELETE_CURRENT_INITIAL_BACKUP_ERROR")
            });
        }
    }
}

export default new Backup();
