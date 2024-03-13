<template>
  <Title
    class="version-title"
    :level="4"
  >
    {{ texts.allowNewVersion }} (v{{ version }})
  </Title>

  <div class="buttons">
    <Button
      type="primary"
      danger
      @click="onIgnoreClick"
    >
      {{ texts.ignore }}
    </Button>
    <Dropdown>
      <template #overlay>
        <Menu @click="onUpdateClick">
          <Menu.Item key="installer">
            {{ texts.installer }}
          </Menu.Item>
          <Menu.Item key="portable">
            {{ texts.portable }}
          </Menu.Item>
        </Menu>
      </template>
      <Button type="primary">
        {{ texts.update }}<DownOutlined />
      </Button>
    </Dropdown>
  </div>
</template>

<script lang='ts' setup>
import { DownOutlined } from '@ant-design/icons-vue'
import type { ButtonProps, MenuProps } from 'ant-design-vue'
import { Button, Dropdown, Menu, Typography } from 'ant-design-vue'
import { ref } from 'vue'

import texts from './texts'

import { Config, ProgramWindow, Updates, Windows } from '/mods/renderer'
import { useWindowReady } from '/rend/utils'

const { Title } = Typography

const version = ref('')

useWindowReady(ProgramWindow.update)
useEvents()

function useEvents() {
  Windows.onUpdateContent(data => version.value = data)
}

const onUpdateClick: MenuProps['onClick'] = ({ key }) => {
  if (!version.value) return
  void Updates.updateApp(key === 'portable')
}

const onIgnoreClick: ButtonProps['onClick'] = () => {
  Config.checkUpdates = false
  window.close()
}
</script>

<style lang='scss'>
body {
  background: #fff;
  text-align: center;
}
</style>

<style lang='scss' scoped>
.version-title {
  margin-top: 20px;
}

.buttons {
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 20px;
  justify-content: space-evenly;
}
</style>
