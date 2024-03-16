<template>
  <div>
    <Segmented 
      v-if="radioMode"
      :value="Config.ref.lang"
      :options="options"
      size="large"
      @change="changeLang(parseStrToLang(String($event)))"
    />
    <template v-else>
      <label
        for="lang-select"
        class="lang-label"
      >
        {{ texts.languageLabel }}
      </label>
      <Select
        id="lang-select"
        :value="Config.ref.lang"
        :options="options"
        size="large"
        @change="value => changeLang(parseStrToLang(value?.toString() || ''))"
      />
    </template>
  </div>
</template>

<script lang='ts' setup>
import { Segmented, Select } from 'ant-design-vue'

import texts from './texts'
import { langToOptions } from './utils'

import { Config, Lang, parseStrToLang } from '/mods/renderer'

export type LanguageProps = {
  /** Режим горизонтального выбора */
  radioMode?: boolean
}

defineProps<LanguageProps>()

const options = langToOptions(Lang)

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
