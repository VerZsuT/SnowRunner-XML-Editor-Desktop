<template>
  <Alert
    v-if="isOpen"
    class="alert"
    :message="texts.title"
    :description="`${texts.allowNewVersion} (v${version})`"
    type="info"
    show-icon
  >
    <template #icon>
      <CloudDownloadOutlined />
    </template>
    <template #action>
      <Space
        direction="vertical"
        class="buttons"
      >
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
          <Button
            size="small"
            type="primary"
          >
            {{ texts.update }}<DownOutlined />
          </Button>
        </Dropdown>
        <Button
          size="small"
          type="primary"
          danger
          @click="onIgnoreClick"
        >
          {{ texts.ignore }}
        </Button>
      </Space>
    </template>
  </Alert>
</template>

<script lang='ts' setup>
import { CloudDownloadOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { ButtonProps, MenuProps } from 'ant-design-vue'
import { Alert, Button, Dropdown, Menu, Space } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import texts from './texts'
import { Checks, Config, Updates } from '/mods/renderer'

const version = ref('')
const isOpen = ref(false)

onMounted(async () => {
  version.value = await Checks.checkUpdate() ?? ''
  isOpen.value = !!version.value
})

const onUpdateClick: MenuProps['onClick'] = ({ key }) => {
  if (!version.value) {
    return
  }
  
  void Updates.updateApp(key === 'portable')
  isOpen.value = false
}

const onIgnoreClick: ButtonProps['onClick'] = () => {
  Config.checkUpdates = false
  isOpen.value = false
}
</script>

<style lang='scss' scoped>
.alert {
  position: absolute;
  bottom: 0;
  right: 0;
  height: fit-content;
  width: 400px;
  z-index: 5;

  .buttons {
    margin-left: 10px;
  }
}
</style>
