type InputArea = [start: number, end: number]

/** Цветовые зоны поля ввода */
export default interface IInputAreas {
  /** Красная зона */
  red?: InputArea | InputArea[]
  /** Жёлтая зона */
  yellow?: InputArea | InputArea[]
  /** Зелёная зона */
  green?: InputArea | InputArea[]
}
