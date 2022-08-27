export function getPreload<T>(name?: string) {
    return <T>(name ? window[name] : window.preload)
}
