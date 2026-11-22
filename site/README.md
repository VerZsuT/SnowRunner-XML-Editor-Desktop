# Сайт GitHub Pages

Статический сайт проекта. Сборки нет: файлы отдаются как есть.

| Файл | Назначение |
|---|---|
| `download.html` | страница загрузки, список релизов |
| `script.js` | собирает ссылки GitHub Releases из атрибутов кнопок |
| `style.css` | стили страницы |
| `version-info.json` | последняя версия для автообновления приложения |

## Публикация

Сайт обслуживается GitHub Pages из каталога `site/` (раньше — `docs/`).
В настройках репозитория: **Settings → Pages → Source: Deploy from a branch**,
ветка `main`, каталог `/site`.

Источник нужно переключить с `docs/` на `site/`, иначе старые URL вернут 404.
Через GitHub CLI:

```powershell
gh api --method PUT repos/VerZsuT/SnowRunner-XML-Editor-Desktop/pages `
  -f 'source[branch]=main' -f 'source[path]=/site'
```

Проверка:

```powershell
gh api repos/VerZsuT/SnowRunner-XML-Editor-Desktop/pages
Invoke-WebRequest https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/version-info.json
```

## Автообновление

`version-info.json` имеет вид:

```json
{
  "latestVersion": "1.4.0"
}
```

Сейчас в файле `1.4.0`: после публикации файлов 2.0.0 значение поднимается вместе
со страницей загрузки.

Приложение читает его по адресу
`https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/version-info.json`
и скачивает файлы из GitHub Releases по пути
`v<версия>/SnowRunnerXMLEditor.exe` или `SnowRunnerXMLEditor.zip`.

Порядок:

1. Загрузить оба файла в GitHub Release.
2. Проверить прямые ссылки.
3. Только потом обновить `latestVersion` и страницу загрузки.

Если поднять версию раньше файлов, апдейтер получит 404.

## Правила

* После публикации файлов версия в `download.html` и теге релиза совпадает с `version-info.json`.
  До публикации `version-info.json` остаётся прежним (сейчас `1.4.0`, страница показывает 2.0.0).
* Не добавлять сюда скрипты сборки и зависимости: Pages отдаёт статику.
* Исторические релизы не удалять: на них ведут старые кнопки.
