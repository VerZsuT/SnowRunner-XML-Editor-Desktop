# SnowRunner XML Editor Desktop (RU, then EN)

Данная программа позволяет редактировать XML файлы игры SnowRunner с помощью редактирования визуальной таблицы параметров.

Редактор распаковывает нужные файлы из _initial.pak_ во временную папку, после чего идёт работает с ними. При сохранении изменения вносятся в архив.

Для работы с _initial.pak_ программа использует портативную версию _WinRar_ для 32х разрядных систем.

Всё работает с применением **Electron**, **Webpack** и **Typescript**.

Редактор имеет модули:

- _обновление_
- _сброс программы и параметров_
- _импорт/экспорт настроек и параметров_
- _консоль_
- _редактирование XML_

## Установка

В релизах есть две версии:

- _установщик_. Устанавливает программу в систему (.exe).
- _архив_. Портативная версия программы (.rar).

Различие между версиями только в способе установки.

## Как пользоваться

О том как работать в программе можете почитать [в гайде по ссылке](https://snowrunner.mod.io/guides/snowrunner-xml-editor).

## Разработка

_Подразумевается, что у вас есть всё необходимое для работы с NodeJS._

Установите все необходимые зависимости:

```cmd
npm i
```

Для тестовой сборки проекта выполните команду:

```cmd
npm run package
```

В папке _out_ появится собранная тестовая сборка под 32х-битную систему.

В данной сборке вам доступен сброс программы, обновление окна, инструменты разработчика (Ctrl+Shift+I), а также не сохраняется бэкап initial.pak.

Значения каталогов проекта:

```text
|- build_scripts      (скрипты, выполняемые перед и после prod сборки)
|- configs            (конфигурации Webpack и Electron Forge)
|- docs               (страница GitHub Pages)
|- src                (основные ресурсы программы)
   |-main                (файлы главного-процесса)
      |-index.ts         (стартовый файл)
      |-templates     (шаблоны для редактора XML)
      |-texts         (переводы)
   |-images
   |-renderer
      |-modules       (cкрипты разных окон)
      |-service       (сервисные скрипты)
      |-styles
         |-main.scss     (главный стиль)
      |-pages
         |-template.html (главный шаблон)
```

## Картинки

![категории](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.1.png)
![список авто](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.2.png)
![таблица параметров](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.3.png)

# SnowRunner XML Editor Desktop (EN)

This program allows you to edit the XML files of the SnowRunner game by editing the visual parameter table.

The editor unpacks the necessary files from _initial.pak_ to a temporary folder, after which it goes to work with them. When saving, changes are made to the archive.

To work with _initial.pak_, the program uses a portable version of _WinRar_ for 32-bit systems.

Everything works using **Electron**, **Webpack** and **Typescript**.

The editor has modules:

- _update_
- _setting the program and parameters_
- _import/export settings and parameters_
- _console_
- _editing XML_

## Installation

There are two versions in the releases:

- _installer_. Installs the program into the system (.exe).
- _archive_. Portable version of the program (.rar).

The difference between the versions is only in the installation method.

## How to use

You can read about how to work in the program [in the guide at the link](https://snowrunner.mod.io/guides/snowrunner-xml-editor).

## Images

![categories](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.13.png)
![list of trucks](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.14.png)
![table](https://image.modcdn.io/members/4a97/2992192/profile/2022-01-1.15.png)
