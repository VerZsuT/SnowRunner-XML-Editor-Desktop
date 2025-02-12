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
import type { MenuProps } from 'ant-design-vue'
import { Menu } from 'ant-design-vue'
import { computed, onMounted, ref } from 'vue'
import Settings from '../settings'
import WhatsNew from '../whats-new'
import texts from './texts'
import { Backup, Config, Files, Helpers, Paths } from '/mods/renderer'

const settingsHasBeenOpened = ref(false)
const settingsIsOpen = ref(false)

const whatsNewHasBeenOpened = ref(false)
const whatsNewIsOpen = ref(false)

/** Отсутствует `initial.pak`. */
const initialNotFound = !Config.initialPath

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

/** Элементы меню */
const items = computed(() => [
  {
    key: 'FILE MENU',
    label: texts.fileMenuLabel,
    children: [
      {
        key: 'EXIT',
        label: texts.exitMenuItemLabel,
        onClick: () => Helpers.quitApp()
      }
    ]
  },
  {
    key: 'BACKUP MENU',
    label: texts.backupMenuLabel,
    disabled: initialNotFound,
    children: [
      {
        key: 'OPEN BACKUP',
        label: texts.openButton,
        onClick: () => Helpers.openPath(Paths.backupFolder)
      },
      { type: 'divider' },
      {
        key: 'SAVE BACKUP',
        label: texts.saveButton,
        onClick: () => Backup.save()
      },
      {
        key: 'RECOVER FROM BACKUP',
        label: texts.restoreMenuItemLabel,
        onClick: () => Backup.recoverFromIt()
      }
    ]
  },
  {
    key: 'SETTINGS MENU',
    label: texts.settingsMenuLabel,
    children: [
      {
        key: 'OPEN SETTINGS',
        label: texts.settingsMenuLabel,
        disabled: initialNotFound,
        onClick: () => openSettings()
      },
      { type: 'divider' },
      {
        key: 'RESET SETTINGS',
        label: texts.resetMenuItemLabel,
        disabled: initialNotFound,
        onClick: () => Config.reset()
      },
      {
        key: 'UNINSTALL',
        label: texts.uninstallMenuItemLabel,
        onClick: () => Files.uninstall.exec()
      }
    ]
  },
  {
    label: texts.helpMenuLabel,
    children: [
      {
        key: 'VERSION',
        label: texts.versionMenuItemLabel,
        onClick: () => openWhatsNew()
      },
      { type: 'divider' },
      {
        key: 'HOW TO USE',
        label: texts.howToUseTitle,
        onClick: () => Helpers.openLink(links.modio)
      },
      {
        key: 'GITHUB',
        label: texts.githubTitle,
        onClick: () => Helpers.openLink(links.github)
      },
      {
        key: 'YOUTUBE',
        label: texts.youtubeTitle,
        onClick: () => Helpers.openLink(links.youtube)
      },
      {
        key: 'DONATION',
        label: texts.donationTitle,
        onClick: () => Helpers.openLink(links.donation)
      }
    ],
    key: 'HELP MENU'
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
