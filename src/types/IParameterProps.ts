import type { IInputParams } from './IInputParams'

export interface IParameterProps {
  item: IInputParams
  value: string
  defaultValue: string

  onSetValue(value: string): void
}
