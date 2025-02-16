<template>
  <PageHeader
    class="header"
    @back="onBack"
  >
    <template #title>
      <h3 class="header-title">
        {{ text }}
      </h3>
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </PageHeader>
</template>

<script lang='ts' setup>
import type { PageHeaderProps } from 'ant-design-vue'
import { PageHeader } from 'ant-design-vue'
import type { EmitsToProps } from '../types'

export type HeaderProps = Props & EmitsToProps<Emits>

type Props = PageHeaderProps & {
  /** Текст заголовка, */
  text: string

  /** Показать кнопку `Назад`. */
  withBack?: boolean
}

type Emits = {
  /** Событие перехода назад. */
  back: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onBack: PageHeaderProps['onBack'] = props.withBack
  ? () => emit('back')
  : undefined
</script>

<style lang='scss' scoped>
.header {
  padding: 4px 5px 5px 5px;
  max-height: 55px;
  background-color: #1c7dca;
  box-shadow: 0 0 3px 0 rgba(34, 60, 80, 0.6);
  z-index: 1;

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
