import type { MenuProps } from 'antd'

export type MenuItemType = Required<MenuProps>['items'][number]

export const MenuItem = (
  label: string,
  onClick: () => void,
  disabled = false,
  key = Math.random().toString()
): MenuItemType => ({ label, onClick, disabled, key })

export const NestedMenuItem = (
  label: string,
  children: MenuItemType[],
  disabled = false,
  key = Math.random().toString()
): MenuItemType => ({ label, children, disabled, key })

export const Divider = (): MenuItemType => ({ type: 'divider' as const })
