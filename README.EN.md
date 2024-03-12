# SnowRunner XML Editor Desktop (EN)

This program allows you to edit the XML files of the SnowRunner game by editing the visual parameter table.  
The editor unpacks the necessary files from _initial.pak_ to a temporary folder, after which it goes to work with them. When saving, changes are made to the archive.  
To work with _initial.pak_, the program uses a portable version of _WinRar_ for 32-bit systems.  
Everything works using **Electron**, **Vite**, **Vue**, **Typescript**.

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

## How to use

You can read about how to use the program in the [guide at the link](https://snowrunner.mod.io/guides/snowrunner-xml-editor).

## Development

_It is understood that you have everything you need to work with NodeJS_.

Install dependencies:

```cmd
npm i
```

To start the dev server:

```cmd
npm start
```

For a test build of the project:

```cmd
npm run package
```

The assembled test assembly for a 32-bit system will appear in the _out_ folder.  
In this build, you can reset the program, update the window, developer tools (Ctrl+Shift+I), and the backup `initial.pak` is not saved.

Project directories:

```text
/docs               page GitHub Pages.
/inno-setup         InnoSetup configuration.
/src:               the main resources of the program.
   /build-configs       the Vite and Electron Forge configurations.
   /images:             graphic resources.
      /icons                other images.
      /trailers             pictures of trailers.
      /trucks               pictures of trucks.
      favicon.ico           program icon.
   /main:               main process.
      index.ts              the start file.
      tsconfig.json         TS configuration for the main process.
   /modules:            different kinds of modules.
      /archive              working with the archiver.
      /backup               working with backup.
      /checks               basic checks.
      /data                 stored data.
      /dialogs              system dialogs.
      /dlcs                 processing of game DLCs.
      /epf                  exporting parameters.
      /errors               throwing errors.
      /files                working with the file system.
      /game-texts           processing of game texts.
      /helpers              utilities.
      /images               working with images.
      /messages             displays messages in the renderer process.
      /paths                different paths.
      /quit-params          program closing parameters.
      /updates              program update.
      /xml                  working with XML.
   /renderer:           renderer process.
      /components           common components.
      /pages                program windows.
         /loading               loading window.
         /main                  main window.
            /editor                 page of the editor (tables).
            /lists                  page of lists of trucks / trailers.
            /main                   main page.
         /settings              settings window.
         /setup                 first setup window.
         /update                update window.
         /whats-new             "what's new" window.
      /utils                helper scripts.
      style.scss            global styles.
      preload.ts            preload script.
      template-script.ts    template script.
      tsconfig.json         TS configuration for the renderer process.
      types.ts              common types for the renderer process.
   /utils               common utilities.
   consts.ts            useful flags.
   tsconfig.json        main TS configuration.
```

## Pictures

![list of cars](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04131955.png)
![parameters table](https://thumb.modcdn.io/mods/71c4/3056663/thumb_1020x2000/screenshot2024-03-04132039.png)
