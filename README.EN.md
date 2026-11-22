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
- _archive_. The portable version of the program (.zip).

The program runs on Tauri (Rust) since version 2.0.0. Windows 10 or 11 (x64) and WebView2 are required: it is already installed on Windows 11, while on Windows 10 the installer fetches it when there is internet access.

The versions differ in the installation method and the data location: the installed build keeps data in `%APPDATA%`, the portable one — in `data` next to the `.exe`.

### Where the data is stored

- The installed version keeps settings, backups and temporary folders in `%APPDATA%\SnowRunner XML Editor` and does not require administrator rights at startup.
- The portable version keeps data in the `data` folder next to the `.exe` when the `portable.txt` marker is present (it is included in the portable archive). Without the marker, data is written to `%APPDATA%`.
- When the data mode changes, json files are copied to the new folder without overwriting existing ones; temporary files and backups are not transferred.

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

Developer documentation — [docs/README.md](docs/README.md).

Project directories:

```text
/src:               the main resources of the program.
   /images:          graphic resources.
      /icons             other images.
      /trailers          pictures of trailers.
      /trucks            pictures of trucks.
      favicon.ico        program icon.
   /api               core commands and generated types.
   /components        common components.
   /pages             screens: lists, editor, first run.
   /tests             tests.
   /styles            global application styles.
   /utilities:
      /localization      interface localization.
         /locales           language texts: ru (reference), en, de, ch.
      /strings           string formatting.
   app.tsx            root screen.
   entry.tsx          application mount.
   config.ts          interface configuration.
   index.html         Vite entry point.
   global.d.ts
   tsconfig.json        main TS configuration.
/src-tauri:           the Rust core.
   /crates/domain        XML, game models.
   /crates/storage       files, ZIP, atomic writes.
   /crates/app           documents, archive, mods, configuration, updates, reset.
   /src                  Tauri commands.
   tauri.conf.json       window, build, installer.
```

## Pictures

![list of cars](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04131955.png)
![parameters table](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04132039.png)
