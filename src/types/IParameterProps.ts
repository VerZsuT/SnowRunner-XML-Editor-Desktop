import type IInputParams from './IInputParams'

export default interface IParameterProps {
  item: IInputParams
  value: string
  defaultValue: string
  onSetValue(value: string): void
}
