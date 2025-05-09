import type { InputType, NumberType } from './enums'

import type { IFile, Position, TruckXML } from '/mods/renderer'
import type { IStringConvertAttrDescriptor } from '/mods/xml/game/attributes'

/** Параметры доп. сценария */
export interface IActionData {
  /** Название в меню */
  name: string
  /** Уникальный номер */
  id: string | number
  /** Минимальная ширина popup'а */
  minWidth?: number
  /** Минимальная высота popup'а */
  minHeight?: number
  /** Картинка для кнопки в меню */
  imgSRC?: string
  isActive(xml: TruckXML, fileName: string): boolean
  onPressOk?(): void
  export?(xml: TruckXML): any
  import?(mxl: TruckXML, data: any): void
}

export interface IActionProps {
  file: IFile
  xml: TruckXML
}

export interface IParameterProps<
  Value = any,
  Descriptor = IStringConvertAttrDescriptor<Value>
> {
  /** Название параметра в таблице */
  label?: string
  desc?: string
  getter?(): Value
  setter?(value: Value): void
  descriptor: Descriptor
}

export interface IInputProps {
  type: InputType
  value: string | number
  numberType?: NumberType
  step?: number
  areas?: IInputAreas
  min?: number
  max?: number
}

export type PositionProps = Omit<IInputProps, 'value' | 'areas' | 'type'> & {
  value?: Position
}

export type InputArea = [start: number, end: number]

/** Цветовые зоны поля ввода */
export interface IInputAreas {
  /** Красная зона */
  red?: InputArea | InputArea[]
  /** Жёлтая зона */
  yellow?: InputArea | InputArea[]
  /** Зелёная зона */
  green?: InputArea | InputArea[]
}

export type NumberProps = Omit<IInputProps, 'type'> & {
  type?: NumberType
}

export interface IGroupProps {
  /** Параметры подписи группы */
  label: string
  /** Путь к иконке группы */
  icon?: string
}

export type ArrOrNot<T> = T | T[]
export type ParameterValue = ArrOrNot<string | number | boolean>

export type ParameterEmits = {
  change: [value: ParameterValue]
}

export type SelectEmits = {
  change: [value: string | string[]]
}

export type NumberEmits = {
  change: [value: number]
}

export type SelectOptions = [value: string | number | boolean, label: string][]

export interface ISelectProps {
  value: ArrOrNot<string | boolean>
  options: SelectOptions
  multiple?: boolean
  emptyIsAll?: boolean
  disabled?: boolean
}


