<template>
  <div class="wrapper">
    <Menu
      class="menu"
      trigger-sub-menu-action="click"
      mode="horizontal"
      :selectable="false"
      :items="items"
    />
    <Settings
      v-if="settingsHasBeenOpened"
      v-model="settingsIsOpen"
    />
    <WhatsNew
      v-if="whatsNewHasBeenOpened"
      v-model="whatsNewIsOpen"
    />
  </div>
</template>

<script lang='ts' setup>
import { Page } from '@modules/windows/enums'
import { usePageStore } from '@renderer/pages/general/store/page'
import { di } from '@utilities/di/container'
import { APP_TOKEN, ARCHIVE_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN, FILES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN, PATHS_TOKEN, SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import type { ItemType, MenuProps } from 'ant-design-vue'
import { Menu } from 'ant-design-vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { Settings } from '../settings'
import { WhatsNew } from '../whats-new'
import { MENU_LOCALIZATION as texts } from './localization'

const config = di.resolve(CONFIG_TOKEN)
const system = di.resolve(SYSTEM_TOKEN)
const paths = di.resolve(PATHS_TOKEN)
const app = di.resolve(APP_TOKEN)
const backup = di.resolve(BACKUP_TOKEN)
const archive = di.resolve(ARCHIVE_TOKEN)

const settingsHasBeenOpened = ref(false)
const settingsIsOpen = ref(false)

const whatsNewHasBeenOpened = ref(false)
const whatsNewIsOpen = ref(false)

/** Отсутствует `initial.pak`. */
const initialNotFound = !config.initialPath
const { route } = usePageStore()

/** Ссылки на медиа ресурсы. */
const links = {
  /** mod.io. */
  modio: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor',

  /** github.com. */
  github: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop',

  /** youtube.com. */
  youtube: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2',

  /** donationalerts.com. */
  donation: 'https://www.donationalerts.com/r/verzsut'
}

/** Элементы меню. */
const items = computed(() => [
  // Файл.
  {
    key: 'file_menu',
    label: texts.fileMenuLabel,
    children: [
      ...inAdvancedMode([
        {
          key: 'open_files_folder',
          label: texts.openFilesFolderItemLabel,
          disabled: initialNotFound,
          onClick: () => system.openPath(paths.mainTemp)
        },
        {
          key: 'save_files',
          label: texts.saveFilesItemLabel,
          disabled: initialNotFound,
          onClick: () => updateFiles()
        },
        {
          key: 'unpack_files',
          label: texts.unpackFilesItemLabel,
          disabled: initialNotFound,
          onClick: () => unpackFiles()
        },
        { type: 'divider' }
      ]),
      {
        key: 'exit',
        label: texts.exitMenuItemLabel,
        onClick: () => app.quit()
      }
    ]
  },

  // Бэкап.
  {
    key: 'backup_menu',
    label: texts.backupMenuLabel,
    disabled: initialNotFound,
    children: [
      {
        key: 'open_backup',
        label: texts.openButton,
        onClick: () => system.openPath(paths.backupFolder)
      },
      { type: 'divider' },
      {
        key: 'save_backup',
        label: texts.saveButton,
        onClick: () => backup.save()
      },
      {
        key: 'recover_from_backup',
        label: texts.restoreMenuItemLabel,
        onClick: () => backup.recoverFromIt()
      }
    ]
  },

  // Настройки.
  {
    key: 'settings_menu',
    label: texts.settingsMenuLabel,
    children: [
      {
        key: 'open_settings',
        label: texts.settingsMenuLabel,
        disabled: initialNotFound,
        onClick: () => openSettings()
      },
      { type: 'divider' },
      {
        key: 'reset_settings',
        label: texts.resetMenuItemLabel,
        disabled: initialNotFound,
        onClick: () => app.resetToDefaults()
      },
      {
        key: 'uninstall_program',
        label: texts.uninstallMenuItemLabel,
        onClick: async () => {
          const files = di.resolve(FILES_TOKEN)

          await system.openFile(files.uninstall.path)
          app.quit()
        }
      }
    ]
  },

  // Помощь.
  {
    label: texts.helpMenuLabel,
    key: 'help_menu',
    children: [
      {
        key: 'version_info',
        label: texts.versionMenuItemLabel,
        onClick: () => openWhatsNew()
      },
      { type: 'divider' },
      {
        key: 'how_to_use',
        label: texts.howToUseTitle,
        onClick: () => system.openLink(links.modio)
      },
      {
        key: 'github',
        label: texts.githubTitle,
        onClick: () => system.openLink(links.github)
      },
      {
        key: 'youtube',
        label: texts.youtubeTitle,
        onClick: () => system.openLink(links.youtube)
      },
      {
        key: 'donation',
        label: texts.donationTitle,
        onClick: () => system.openLink(links.donation)
      }
    ]
  }
] satisfies Required<MenuProps>['items'])

onMounted(() => {
  setTimeout(() => {
    if (config.openWhatsNew) {
      openWhatsNew()
      config.openWhatsNew = false
    }
  }, 1000)
})

function inAdvancedMode(items: ItemType[]) {
  return config.advancedMode
    ? items
    : []
}

async function unpackFiles() {
  const mods = di.resolve(MODS_TOKEN)

  route(Page.none)
  await nextTick()
  await Promise.all([
    archive.unpackMain(),
    mods.procMods()
  ])
  route(Page.lists)
}

async function updateFiles() {
  const messages = di.resolve(MESSAGES_TOKEN)
  const hideLoading = messages.loading(texts.savingMessage)

  try {
    await archive.updateFiles()
    messages.success(texts.successSaveFiles)
  } catch (error: any) {
    messages.error(error)
  }

  hideLoading()
}

function openSettings() {
  settingsHasBeenOpened.value = true
  settingsIsOpen.value = true
}

function openWhatsNew() {
  whatsNewHasBeenOpened.value = true
  whatsNewIsOpen.value = true
}
</script>

<style lang='scss' scoped>
.menu {
  li {
    padding: 0 10px !important;

    &:hover span,
    &:global(.ant-menu-submenu-active) span {
      color: black;
    }

    &:hover::after,
    &:global(.ant-menu-submenu-active::after) {
      border-bottom: 2px solid black !important;
    }

    :global(.ant-menu-submenu-title) {
      height: 30px;
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
