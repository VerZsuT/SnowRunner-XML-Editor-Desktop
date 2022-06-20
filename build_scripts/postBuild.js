/*
    Стрипт постобработки билда.
    
    - Переименовывает билд.
    - Устанавливает тип билда на prod в config.json готового билда.
    - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
    - Архивирует билд с помощью WinRAR.
    - Запускает InnoSetup и копирует .exe файл для загрузки на GoogleDrive
*/

const { checkPath, readFileToVar, checkVar, writeFile, generateMap, postBuildPaths: paths } = require("./funcs.js");
const { renameSync, rmSync, existsSync, copyFileSync } = require("fs");
const { execSync } = require("child_process");
const { join } = require("path");
const { mainGroup, print, stageGroup, separator, error } = require("./log.js");

const winrarPath = paths.winrar;
const originalPath = process.argv[2] === "x32" ? paths.original32 : paths.original64;

mainGroup();
print("Starting post-build script", true);
stageGroup();

print("Renaming the build");
checkPath(originalPath, () => renameSync(originalPath, paths.renamed), true);

separator();

print("Changing config.json");
readFileToVar("config", paths.config);
checkVar(global.config, () => {
    global.config.buildType = "prod";
    global.config.settings.showWhatsNew = true;
    writeFile(paths.config, global.config, () => JSON.stringify(global.config));
});

separator();

print("Archiving the build");
checkPath(winrarPath, () => {
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, "SnowRunnerXMLEditor.rar")}" "${paths.renamed}"`, { cwd: winrarPath });
});

separator();

print("Creating a file map for auto-updating");
checkPath(paths.sxmleUpdater, () => {
    const appPath = join(paths.renamed, "resources/app");
    checkPath(appPath, () => {
        const map = generateMap(appPath);
        writeFile(join(paths.sxmleUpdater, "updateMap.json"), map, () => JSON.stringify(map));
    });

    print("Adding files for auto-update");
    const updateFilesPath = join(paths.sxmleUpdater, "files");
    checkPath(updateFilesPath, () => {
        rmSync(join(paths.sxmleUpdater, "files"), { recursive: true });
        checkPath(appPath, () => {
            renameSync(appPath, join(paths.sxmleUpdater, "files"));
            renameSync(join(paths.sxmleUpdater, "files/.webpack"), join(paths.sxmleUpdater, "files/webpack"));
        });
    });

    rmSync(join(paths.renamed), { recursive: true });
});

separator();

print("Creating an installation file");
if (!existsSync(paths.renamed)) {
    print("Unpacking files for installation");
    execSync(`WinRAR x -ibck -inul "${join(paths.out, "SnowRunnerXMLEditor.rar")}" "${paths.out}\\"`, { cwd: winrarPath });
}
print("Launching InnoSetup");
execSync("installer.config.iss", { cwd: join(__dirname, "../innoSetup") });
print("Copying .exe file for Google Drive");

if (existsSync(join(paths.out, "SnowRunnerXMLEditor.exe")))
    copyFileSync(join(paths.out, "SnowRunnerXMLEditor.exe"), join(paths.out, `SnowRunnerXMLEditor_v${global.config.version}.exe`));
else
    error("\"SnowRunnerXMLEditor.exe\" not found.");

separator();
