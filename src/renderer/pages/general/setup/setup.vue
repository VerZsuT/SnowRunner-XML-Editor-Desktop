<template>
  <div class="setup">
    <Header
      class="header"
      :text="texts.firstStepsDescription"
    />
	
    <Steps
      class="steps"
      :current="step"
      :items="[
        { title: texts.languageLabel },
        { title: texts.gameDataStep }
      ]"
    />
    <div class="steps-content">
      <Language
        v-if="step === 0"
        radio-mode
      />
      <InitialSelect
        v-else-if="step === 1"
        @update:model-value="onChangeGameFolder"
      />
    </div>
    <div class="steps-actions">
      <Button
        v-if="step === 0"
        type="primary"
        @click="step++"
      >
        {{ texts.next }}
      </Button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import Header from '@renderer/components/header.vue'
import { Language } from '@renderer/components/language'
import { di } from '@utilities/di/container'
import { APP_TOKEN, ARCHIVER_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Steps } from 'ant-design-vue'
import { ref } from 'vue'
import InitialSelect from './initial-select.vue'
import { SETUP_LOCALIZATION as texts } from './localization.js'

const step = ref(0)

async function onChangeGameFolder(file?: IFile) {
	if (!file) {
		return
	}

	const config = di.resolve(CONFIG_TOKEN)
	const backup = di.resolve(BACKUP_TOKEN)
	const archiver = di.resolve(ARCHIVER_TOKEN)
	const app = di.resolve(APP_TOKEN)

	config.initialPath = file.path
	await backup.save()
	await archiver.unpackMain()
	app.reload()
}
</script>

<style lang='scss' scoped>
.setup {
	display: flex;
	width: 100%;
	height: 100%;
	text-align: center;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-wrap: wrap;
	background: white;

	.header {
		position: absolute;
		top: 30px;
		left: 0;
	}

	.steps {
		padding: 0 15%;
		margin-top: 10px;

		&-content,
		&-actions {
			width: 100%;
			margin-top: 20px;
		}
	}
}
</style>
