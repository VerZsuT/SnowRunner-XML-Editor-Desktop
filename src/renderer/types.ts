export type EmitsToProps<
  Emits extends { [key: string]: any[] }
> = {
  // @ts-expect-error
  [key in keyof Emits as `on${Capitalize<key>}`]?: (...args: Emits[key]) => void
}
