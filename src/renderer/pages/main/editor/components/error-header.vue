<template>
  <Header
    :text='texts.error'
    with-back
    @back='route(Page.lists)'
  />
</template>

<script lang='ts' setup>
import { Page } from '../../enums'
import { usePageStore } from '../../store'
import texts from '../texts'
import { Header } from '/rend/components'

const { route } = usePageStore()
</script>
