import { useForceUpdate, useOnDestroy, useOnMount } from 'react-afc'

import { handleLangChange } from '#g/texts/renderer'

/** Вызывает обновление компонта при изменении языка */
function handleLocalization() {
  const forceUpdate = useForceUpdate()
  let destroyer: () => void

  useOnMount(() => destroyer = handleLangChange(forceUpdate))
  useOnDestroy(() => destroyer?.())
}

export default handleLocalization
