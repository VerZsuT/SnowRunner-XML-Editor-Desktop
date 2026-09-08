<template>
  <Group
    key="extra"
    :label="texts.extra"
  >
    <Accordion>
      <AddonsContent
        class="content"
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
import Group from '../group/group.vue'
import type { ReadyEmits, ReadyProps } from '../utilities'
import { useFilesReady } from '../utilities'
import AddonsContent from './addons-content/addons-content.vue'
import BanditCrane from './bandit-crane/bandit-crane.vue'
import Cranes from './cranes/cranes.vue'
import { EXTRA_LOCALIZATION as texts } from './localization'
import Trailers from './trailers/trailers.vue'

enum ReadyType {
	addonsContent = 'addons-content',
	banditCrane = 'bandit-crane',
	cranes = 'cranes',
	trailers = 'trailers'
}

export type ExtraActionsProps = IActionProps & ReadyProps

const { file, xml } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const { ready, inProgress } = useFilesReady(emit, true)
</script>

<style lang="scss" scoped>
.content {
	justify-content: center;
}
</style>
