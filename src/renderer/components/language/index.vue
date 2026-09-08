<template>
  <div>
    <Segmented 
      v-if="radioMode"
      :value="config.lang"
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
        :value="config.lang"
        :options="options"
        size="large"
        @change="value => changeLang(parseStrToLang(value?.toString() || ''))"
      />
    </template>
  </div>
</template>

<script lang='ts' setup>
import { Lang, parseStrToLang } from '@modules/data/config/enums'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, GAME_TEXTS_TOKEN } from '@utilities/di/renderer/tokens'
import { Segmented, Select } from 'ant-design-vue'
import { nextTick } from 'vue'
import { LANGUAGE_LOCALIZATION as texts } from './localization'

export type LanguageProps = {
	/** Режим горизонтального выбора. */
	radioMode?: boolean
}

defineProps<LanguageProps>()

const options = langToOptions(Lang)
const config = di.resolve(CONFIG_TOKEN)
const gameTexts = di.resolve(GAME_TEXTS_TOKEN)

/**
 * Изменить язык.
 * @param newLang Новый язык.
 */
async function changeLang(newLang: Lang) {
	if (newLang === config.lang) {
		return
	}

	config.lang = newLang
	await nextTick()
	await gameTexts.initFromInitial()
	await gameTexts.initFromMods()
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
