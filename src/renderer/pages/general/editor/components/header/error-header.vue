<template>
  <Header
    :text="texts.error"
    with-back
    @back="() => route(Page.lists)"
  >
    <template #extra>
      <Dropdown
        class="menu-button"
        trigger="click"
      >
        <MenuOutlined style="font-size: 25px" />
        <template #overlay>
          <Menu mode="vertical">
            <FilesMenu v-if="config.advancedMode" />
          </Menu>
        </template>
      </Dropdown>
      <Tooltip
        key="save"
        :title="texts.saveButton"
      >
        <Button
          id="save"
          class="menu-save-button"
          type="text"
          shape="circle"
          disabled
        >
          <template #icon>
            <SaveOutlined style="font-size: 25px" />
          </template>
        </Button>
      </Tooltip> 
    </template>
  </Header>
</template>

<script lang='ts' setup>
import { MenuOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { Page } from '@modules/windows/enums'
import Header from '@renderer/components/header.vue'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { usePageStore } from '../../../store/page'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import FilesMenu from '../files-menu/files-menu.vue'

const { route } = usePageStore()
const config = di.resolve(CONFIG_TOKEN)
</script>
