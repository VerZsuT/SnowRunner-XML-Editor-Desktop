<template>
  <template v-if="wrap">
    <component :is="wrapper">
      <slot />
      <template
        v-for="name in slotNames"
        :key="name"
        #[name]
      >
        <slot :name="name" />
      </template>
    </component>
  </template>
  <slot v-else />
</template>

<script setup lang="ts">
import { type Component } from 'vue';

export type WrapProps = {
	wrapper: Component
	wrap: boolean
}

defineProps<WrapProps>()
const slots = defineSlots<any>()

const contentSlot = 'default'
const slotNames = Object.keys(slots).filter(item => item !== contentSlot)
</script>
