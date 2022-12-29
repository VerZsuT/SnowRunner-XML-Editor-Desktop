import type IInputParams from './IInputParams'

interface IParameterProps {
  item: IInputParams
  value: string
  defaultValue: string
  onSetValue(value: string): void
}

export default IParameterProps
