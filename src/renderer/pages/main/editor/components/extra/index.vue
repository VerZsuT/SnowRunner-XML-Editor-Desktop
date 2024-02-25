<template>
  <Group :label='texts.extra'>
    <AddonsContent
      v-files='ReadyType.addonsContent'
      :file='file'
      :xml='xml'
      @ready='ready(ReadyType.addonsContent)'
    />
    <BanditCrane
      v-files='ReadyType.banditCrane'
      :file='file'
      :xml='xml'
      @ready='ready(ReadyType.banditCrane)'
    />
    <Cranes
      v-files='ReadyType.cranes'
      :file='file'
      :xml='xml'
      @ready='ready(ReadyType.cranes)'
    />
    <Trailers
      v-files='ReadyType.trailers'
      :file='file'
      :xml='xml'
      @ready='ready(ReadyType.trailers)'
    />
  </Group>
</template>

<script lang='ts' setup>
import { IActionProps } from '../../types'
import Group from '../group'
import { ReadyEmits, useFilesReady } from '../utils'
import AddonsContent from './addons-content'
import BanditCrane from './bandit-crane'
import Cranes from './cranes'
import texts from './texts'
import Trailers from './trailers'

enum ReadyType {
  addonsContent = 'addons-content',
  banditCrane = 'bandit-crane',
  cranes = 'cranes',
  trailers = 'trailers'
}

const emit = defineEmits<ReadyEmits>()
const { file, xml } = defineProps<IActionProps>()
const { ready, vFiles } = useFilesReady(emit)
</script>
