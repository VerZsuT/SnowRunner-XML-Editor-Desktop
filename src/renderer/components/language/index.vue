<template>
  <div>
    <Radio.Group
      v-if='props.isSetup'
      :value='Config.ref.lang'
      :options='options'
      @change='changeLang($event.target.value)'
      option-type='button'
      button-style='solid'
    />
    <template v-else>
      <label for='lang-select' class='lang-label'>
        {{ texts.languageLabel }}
      </label>
      <Select
        id='lang-select'
        @change='value => changeLang(parseStrToLang(value?.toString() || ""))'
        :value='Config.ref.lang'
        :options='options'
        size='large'
      />
    </template>
  </div>
</template>

<script lang='ts' setup>
import { Radio, Select } from 'ant-design-vue'
import texts from './texts'
import { useLangToOptions } from './utils'
import { Config, Lang, parseStrToLang } from '/mods/renderer'

type Props = {
  isSetup?: boolean
}

const props = defineProps<Props>()
const options = useLangToOptions(Lang)

function changeLang(newLang: Lang) {
  if (newLang === Config.lang) return
  Config.lang = newLang
}
</script>

<style lang='scss' scoped>
.lang-label {
  color: black;
  display: inline-block;
  margin-right: 15px;
  font-size: 1rem;
}
</style>
