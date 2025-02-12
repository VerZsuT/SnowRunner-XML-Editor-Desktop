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
            <FilesMenu v-if="Config.advancedMode" />
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
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { usePageStore } from '../../../store'
import texts from '../../texts'
import FilesMenu from '../files-menu'
import { Config, Page } from '/mods/renderer'
import { Header } from '/rend/components'

const { route } = usePageStore()
</script>
