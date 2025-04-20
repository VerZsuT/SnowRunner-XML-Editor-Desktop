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
import type { ItemType, MenuProps } from 'ant-design-vue'
import { Menu } from 'ant-design-vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import Settings from '../settings'
import WhatsNew from '../whats-new'
import texts from './texts'
import { Archive, Backup, Config, Files, Helpers, Messages, Mods, Page, Paths } from '/mods/renderer'
import { usePageStore } from '/rend/pages/general/store'

const settingsHasBeenOpened = ref(false)
const settingsIsOpen = ref(false)

const whatsNewHasBeenOpened = ref(false)
const whatsNewIsOpen = ref(false)

/** Отсутствует `initial.pak`. */
const initialNotFound = !Config.initialPath
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
          onClick: () => Helpers.openPath(Paths.mainTemp)
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
        onClick: () => Helpers.quitApp()
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
        onClick: () => Helpers.openPath(Paths.backupFolder)
      },
      { type: 'divider' },
      {
        key: 'save_backup',
        label: texts.saveButton,
        onClick: () => Backup.save()
      },
      {
        key: 'recover_from_backup',
        label: texts.restoreMenuItemLabel,
        onClick: () => Backup.recoverFromIt()
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
        onClick: () => Config.reset()
      },
      {
        key: 'uninstall_program',
        label: texts.uninstallMenuItemLabel,
        onClick: () => {
          void Files.uninstall.exec()
          Helpers.quitApp()
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
        onClick: () => Helpers.openLink(links.modio)
      },
      {
        key: 'github',
        label: texts.githubTitle,
        onClick: () => Helpers.openLink(links.github)
      },
      {
        key: 'youtube',
        label: texts.youtubeTitle,
        onClick: () => Helpers.openLink(links.youtube)
      },
      {
        key: 'donation',
        label: texts.donationTitle,
        onClick: () => Helpers.openLink(links.donation)
      }
    ]
  }
] satisfies Required<MenuProps>['items'])

onMounted(() => {
  setTimeout(() => {
    if (Config.openWhatsNew) {
      openWhatsNew()
      Config.openWhatsNew = false
    }
  }, 1000)
})

function inAdvancedMode(items: ItemType[]) {
  return Config.advancedMode
    ? items
    : []
}

async function unpackFiles() {
  route(Page.none)
  await nextTick()
  await Promise.all([
    Archive.unpackMain(),
    Mods.procMods()
  ])
  route(Page.lists)
}

async function updateFiles() {
  const hideLoading = Messages.loading(texts.savingMessage)

  try {
    await Archive.updateFiles()
    Messages.success(texts.successSaveFiles)
  } catch (error: any) {
    Messages.error(error)
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
