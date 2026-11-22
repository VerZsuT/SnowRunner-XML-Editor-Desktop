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

После переименования каталога источник нужно переключить, иначе старые URL
вернут 404. Через GitHub CLI:

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
  "latestVersion": "2.0.0"
}
```

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

* Версии в `download.html`, `version-info.json` и теге релиза должны совпадать.
* Не добавлять сюда скрипты сборки и зависимости: Pages отдаёт статику.
* Исторические релизы не удалять: на них ведут старые кнопки.
