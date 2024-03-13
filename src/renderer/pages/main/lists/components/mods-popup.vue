<template>
  <Modal
    :title="items ? texts.modsPopupTitle : texts.loading"
    :open="show"
    :ok-text="texts.ok"
    :cancel-text="texts.cancel"
    @ok="saveChanges"
    @cancel="hidePopup"
  >
    <template v-if="items">
      <Transfer
        class="mods-transfer"
        :data-source="items.map(([file, name]) => ({
          key: file.path,
          title: name
        }))"
        :target-keys="targetKeys"
        :titles="[texts.foundItems, texts.addedItems]"
        :render="item => item.title"
        @change="newKeys => targetKeys = newKeys"
      />
      <Button
        class="mods-manual-button"
        @click="async () => addItems(await Mods.request())"
      >
        {{ texts.manualMod }}
      </Button>
      <Button
        class="mods-manual-button"
        @click="async () => addItems(await Mods.requestDirs())"
      >
        {{ texts.manualModFolder }}
      </Button>
    </template>
    <Spin v-else />
  </Modal>
</template>


<script lang='ts' setup>
import type { ModalProps } from 'ant-design-vue'
import { Button, Modal, Transfer } from 'ant-design-vue'
import { ref, watchEffect } from 'vue'

import texts from '../texts'

import type { File } from '/mods/renderer'
import { Mods } from '/mods/renderer'
import { Spin } from '/rend/components'
import type { EmitsToProps } from '/rend/types'

export type ModsPopupProps = Props & EmitsToProps<Emits>
  
type Props = {
  show: boolean
}

type Emits = {
  hide: [reload: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const items = ref<[File, string][] | undefined>(undefined)
const targetKeys = ref<string[]>([])

watchEffect(async () => {
  if (props.show && !items.value) {
    const loaded = await Mods.getAllMods()

    items.value = loaded
    targetKeys.value = getTargetKeys(loaded)
  }
})

const saveChanges: ModalProps['onOk'] = () => {
  if (!items.value) return

  Mods.saveFromSelect(targetKeys.value, items.value)
  emit('hide', true)
}

const hidePopup: ModalProps['onCancel'] = () => {
  if (!items.value) return
  
  targetKeys.value = getTargetKeys(items.value)
  emit('hide', false)
}

function getTargetKeys(items: [File, string][]): string[] {
  const keys = Mods.toSelectKeys(items)
  return Mods.filter(mod => keys.includes(mod.path)).map(mod => mod.path)
}

async function addItems(newItems?: Awaited<ReturnType<typeof Mods.requestDirs>>) {
  const modItems = items.value
  if (!newItems || !modItems) return

  const result = [...modItems]
  for (const [file, name] of newItems) {
    if (modItems.some(item => item[1] === name)) continue
    result.push([file, name])
  }

  items.value = result
}
</script>


<style lang='scss' scoped>
.mods {
  &-button {
    margin-bottom: 10px;
  }

  &-transfer {
    justify-content: center;
  }

  &-manual-button {
    display: block;
    margin: 10px auto 0;
  }

  &-spin {
    display: block;
    font-size: 24px;
    margin: 0 auto;
  }
}
</style>
