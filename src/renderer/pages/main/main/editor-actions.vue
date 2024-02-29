<template>
  <Editor
    v-if="exportArgs"
    v-show="false"
    ref="exportEditor"
    :file="exportArgs.source"
    @vue:unmounted="exportArgs = forExport.pop() ?? null"
    @ready="exportFile(exportArgs.toExport)"
  />
  <Editor
    v-else-if="importArgs"
    v-show="false"
    ref="importEditor"
    :file="importArgs.file"
    @vue:unmounted="importArgs = forImport.pop() ?? null"
    @ready="importFile(importArgs.toImport)"
  />
  <Editor
    v-else-if="resetArgs"
    v-show="false"
    ref="resetEditor"
    :file="resetArgs"
    @vue:unmounted="resetArgs = forReset.pop() ?? null"
    @ready="resetFile()"
  />
</template>

<script lang='ts' setup>
import { shallowRef, watch } from 'vue'

import Editor from '../editor'
import type { EveryCallback } from '../lists/utils'
import { EditorUtils } from '../lists/utils'

import type { File } from '/mods/renderer'

const { forAction: forExport, args: exportArgs, editor: exportEditor } = useAction(EditorUtils.onExport)
const { forAction: forImport, args: importArgs, editor: importEditor } = useAction(EditorUtils.onImport)
const { forAction: forReset, args: resetArgs, editor: resetEditor } = useAction(EditorUtils.onReset)

async function exportFile(toExport?: File) {
  await exportEditor.value?.export(toExport)
  exportArgs.value = null
}
async function importFile(toImport?: File) {
  await importEditor.value?.import(isLast(), toImport)
  importArgs.value = null
}
async function resetFile() {
  await resetEditor.value?.reset(isLast())
  resetArgs.value = null
}

function isLast() {
  return (forExport.value.length + forImport.value.length + forReset.value.length) === 0
}

function useAction<L extends (args: any[], every?: EveryCallback) => Promise<void>>(handleAction: (listener: L) => void) {
  type Args = Parameters<L>[0]

  const forAction = shallowRef<Args>([] as unknown as Args)
  const actionArgs = shallowRef<Args[number] | null>(null)
  const editor = shallowRef<InstanceType<typeof Editor> | null>(null)
  let every: EveryCallback | undefined

  handleAction(((args: Args, callback?: EveryCallback) => {
    every = callback
    return new Promise<void>(resolve => {
      forAction.value = args
      const inervalID = setInterval(() => {
        if (!actionArgs.value && forAction.value.length === 0) {
          clearInterval(inervalID)
          resolve()
        }
      }, 100)
    })
  }) as L)

  watch(forAction, async () => {
    actionArgs.value = forAction.value.pop()!
  })
  watch(actionArgs, async () => {
    if (actionArgs.value !== null) await every?.()
  })

  return { forAction, args: actionArgs, editor }
}
</script>
