/*
    Скрипт преобработки билда.

    - Очищает выходную папку out.
    - Изменяет package.json, package-lock.json, installer.config.iss.
    -- Меняет версию на указанную в config.json.
    - Изменяет public.json(sxmle_updater).
    -- Меняет версию на указанную в config.json.
*/

const { rmSync, mkdirSync } = require("fs");
const Log = require("./Log.js");
const { preBuildPaths: paths, checkPath, readFileToVar, checkVar, writeFile } = require("./funcs.js");

Log.mainGroup();
Log.print("Starting pre-build script", true);
Log.stageGroup();

Log.print("Cleaning out folder");
checkPath(paths.out, () => {
    rmSync(paths.out, { recursive: true });
});
mkdirSync(paths.out);

Log.separator();

Log.print("Reading config.json");
readFileToVar("config", paths.config);
Log.print("Reading package.json");
readFileToVar("package", paths.package);
Log.print("Reading package-lock.json");
readFileToVar("packageLock", paths.packageLock);
Log.print("Reading public.json");
readFileToVar("public", paths.public);
Log.print("Reading installer.config.iss");
readFileToVar("issConfig", paths.issConfig, false);

Log.separator();

Log.print("Setting a variable package");
checkVar(global.package, () => global.package.version = global.config.version);
Log.print("Setting a variable packageLock");
checkVar(global.packageLock, () => global.packageLock.version = global.config.version);
Log.print("Setting a variable public");
checkVar(global.public, () => global.public.latestVersion = global.config.version);
Log.print("Setting a variable issConfig");
checkVar(global.issConfig, () => {
    const partBefore = global.issConfig.split("MyAppVersion ")[1].split("\n")[0];
    global.issConfig = global.issConfig.replace(partBefore, `"${global.config.version}"`);
});

Log.separator();

Log.print("Changing package.json");
writeFile(paths.package, global.package, () => JSON.stringify(global.package, null, "\t"));
Log.print("Changing package-lock.json");
writeFile(paths.packageLock, global.packageLock, () => JSON.stringify(global.packageLock, null, "\t"));
Log.print("Changing public.json");
writeFile(paths.public, global.public, () => JSON.stringify(global.public, null, "\t"));
Log.print("Changing installer.config.iss");
writeFile(paths.issConfig, global.issConfig, () => global.issConfig);

Log.groupEnd();
Log.print("Success", true);
