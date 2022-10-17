import { ref } from 'react-afc/compatible'

export function getForceUpdate() {
  const bool = ref(false)
  return () => bool.value = !bool.value
}
