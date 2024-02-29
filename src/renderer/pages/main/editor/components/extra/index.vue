<template>
  <Group
    key="extra"
    :label="texts.extra"
  >
    <Accordion>
      <AddonsContent
        :file="file"
        :xml="xml"
        @mount="inProgress(ReadyType.addonsContent)"
        @ready="ready(ReadyType.addonsContent)"
      />
      <BanditCrane
        :file="file"
        :xml="xml"
        @mount="inProgress(ReadyType.banditCrane)"
        @ready="ready(ReadyType.banditCrane)"
      />
      <Cranes
        :file="file"
        :xml="xml"
        @mount="inProgress(ReadyType.cranes)"
        @ready="ready(ReadyType.cranes)"
      />
      <Trailers
        :file="file"
        :xml="xml"
        @mount="inProgress(ReadyType.trailers)"
        @ready="ready(ReadyType.trailers)"
      />
    </Accordion>
  </Group>
</template>

<script lang='ts' setup>
import type { IActionProps } from '../../types'
import Accordion from '../accordion.vue'
import Group from '../group'
import type { ReadyEmits } from '../utils'
import { useFilesReady } from '../utils'
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
const { ready, inProgress } = useFilesReady(emit, true)
</script>
