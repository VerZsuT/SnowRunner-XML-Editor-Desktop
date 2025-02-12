<template>
  <Collapse
    accordion
    @change="onKeyChange"
  >
    <slot />
  </Collapse>
</template>

<script lang='ts' setup>
import { Collapse } from 'ant-design-vue';
import { provideActive } from './utils';

const { onKeyChange } = provideActive(true)
</script>
