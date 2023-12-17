<template>
  <Modal
    :title='items ? texts.modsPopupTitle : texts.loading'
    :open='show'
    :ok-text='texts.ok'
    :cancel-text='texts.cancel'
    @ok='saveChanges'
    @cancel='hidePopup'
  >
    <template v-if='items'>
      <Transfer
        class='mods-transfer'
        :data-source='items.map(([file, name]) => ({
          key: file.path,
          title: name
        }))'
        :target-keys='targetKeys'
        :titles='[texts.foundItems, texts.addedItems]'
        :render='item => item.title'
        @change='newKeys => targetKeys = newKeys'
      />
      <Button @click='async () => addItems(await Mods.request())' class='mods-manual-button'>
        {{ texts.manualMod }}
      </Button>
      <Button @click='async () => addItems(await Mods.requestDirs())' class='mods-manual-button'>
        {{ texts.manualModFolder }}
      </Button>
    </template>
    <Spin v-else />
  </Modal>
</template>


<script lang='ts' setup>
import { Button, Modal, Transfer } from 'ant-design-vue'
import { ref, toRefs, watch } from 'vue'

import texts from '../texts'

import { File, Mods } from '/mods/renderer'
import { Spin } from '/rend/components'

type Props = {
  show: boolean
}

type Emits = {
  hide: [reload: boolean]
}

const props = defineProps<Props>()
const { show } = toRefs(props)
const emit = defineEmits<Emits>()

const items = ref<[File, string][] | undefined>(undefined)
const targetKeys = ref<string[]>([])

watch(show, async () => {
  if (show.value && !items.value) {
    const loaded = await Mods.getAllMods()
    items.value = loaded
    targetKeys.value = getTargetKeys(loaded)
  }
})

function saveChanges() {
  if (!items.value) return
  Mods.saveFromKeys(targetKeys.value, items.value)
  emit('hide', true)
}

function hidePopup() {
  if (!items.value) return
  targetKeys.value = getTargetKeys(items.value)
  emit('hide', false)
}

function getTargetKeys(items: [File, string][]): string[] {
  const keys = Mods.itemToKeys(items)
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
