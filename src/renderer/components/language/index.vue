<template>
  <div>
    <Segmented 
      v-if="radioMode"
      :value="Config.lang"
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
        :value="Config.lang"
        :options="options"
        size="large"
        @change="value => changeLang(parseStrToLang(value?.toString() || ''))"
      />
    </template>
  </div>
</template>

<script lang='ts' setup>
import { Segmented, Select } from 'ant-design-vue'
import { nextTick } from 'vue'
import texts from './texts'
import { Config, GameTexts, Lang, parseStrToLang } from '/mods/renderer'

export type LanguageProps = {
  /** Режим горизонтального выбора. */
  radioMode?: boolean
}

defineProps<LanguageProps>()

const options = langToOptions(Lang)

/**
 * Изменить язык.
 * @param newLang Новый язык.
 */
async function changeLang(newLang: Lang) {
  if (newLang === Config.lang) {
    return
  }

  Config.lang = newLang
  await nextTick()
  await GameTexts.initFromInitial()
  await GameTexts.initFromMods()
}

/**
 * Преобразовать `Lang` в опции `Select`.
 * @param lang Язык.
 * @returns Опции `Select`.
 */
function langToOptions(lang: typeof Lang): { label: string, value: string }[] {
  return Object.entries(lang).map(([name, value]) => ({
    label: name.toUpperCase(),
    value: value
  }))
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
