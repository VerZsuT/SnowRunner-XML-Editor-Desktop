<template>
  <PageHeader class='header' @back='onBack'>
    <template #title>
      <h3 class='header-title'>{{ props.text }}</h3>
    </template>
    <template #extra>
      <slot name='extra'/>
    </template>
  </PageHeader>
</template>

<script lang='ts' setup>
import { PageHeader, PageHeaderProps } from 'ant-design-vue'

type Props = PageHeaderProps & {
  text: string
  withBack?: boolean
}

type Emits = {
  back: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onBack = props.withBack ? () => emit("back") : undefined
</script>

<style lang='scss' scoped>
.header {
  border: 1px solid rgb(235, 237, 240);
  padding: 5px 0;
  max-height: 55px;
  background-color: #1c7dca;

  &-title {
    width: 100vw;
    text-align: center;
    color: #fafafa;
    padding: 0;
    margin: 0;
  }

  :global(.ant-page-header-heading-left),
  :global(.ant-page-header-heading-extra) {
    margin: 0;
  }

  :global(.ant-page-header-back) {
    margin-right: 0 !important;
  }
}
</style>
