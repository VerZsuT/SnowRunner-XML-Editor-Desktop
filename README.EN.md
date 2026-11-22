# SnowRunner XML Editor Desktop (EN)

This program allows you to edit the XML files of the SnowRunner game by editing the visual parameter table.  
The editor unpacks the necessary files from _initial.pak_ to a temporary folder and works with them through the UI. When saving, changes are made to the archive.  
Everything works using **Rust**, **Tauri**, **Vite**, **React**, **Typescript**.

The editor has the following functionality:

- _update_
- _reset the program and parameters_
- _import / export settings and parameters_
- _editing XML_

## Installation

There are two versions in the releases:

- _installer_. Installs the program into the system (.exe).
- _archive_. The portable version of the program (.rar).

The difference between the versions is only in the installation method.

### Where the data is stored

- The installed version keeps settings, backups and temporary folders in `%APPDATA%\SnowRunner XML Editor` and does not require administrator rights at startup.
- The portable version keeps data in the `data` folder next to the `.exe` when the `portable.txt` marker is present (it is included in the portable archive). Without the marker, data is written to `%APPDATA%`.
- On the first run of a version with the new data folder, existing json files are copied from the installation folder to the new one; the originals are not deleted.

## How to use

You can read about how to use the program in the [guide at the link](https://snowrunner.mod.io/guides/snowrunner-xml-editor).

## Development

_NodeJS and Rust (stable) are required._

Install dependencies:

```cmd
npm i
```

To run the application in development mode:

```cmd
npm run tauri:dev
```

To build the installer:

```cmd
npm run tauri:build
```

The NSIS installer appears in `src-tauri/target/release/bundle/nsis`.  
zustand keeps only interface state; game data, documents and configuration live in the Rust core.

Project directories:

```text
/src:               the main resources of the program.
   /images:          graphic resources.
      /icons             other images.
      /trailers          pictures of trailers.
      /trucks            pictures of trucks.
      favicon.ico        program icon.
   /renderer:        the interface (React).
      /api               core commands and generated types.
      /components        common components.
      /pages             screens: lists, editor, setup.
      /tests             tests.
      app.tsx            root screen.
      entry.tsx          application mount.
      config.ts          interface configuration.
      tsconfig.json      TS configuration for the interface.
   /utilities:
      /localization      interface localization.
      /strings           string formatting.
   global.d.ts
   tsconfig.json        main TS configuration.
/src-tauri:           the Rust core.
   /crates/domain        XML, game models.
   /crates/storage       files, ZIP, atomic writes.
   /crates/app           configuration, documents, mods, updates.
   /src                  Tauri commands.
   tauri.conf.json       window, build, installer.
```

## Pictures

![list of cars](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04131955.png)
![parameters table](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04132039.png)
