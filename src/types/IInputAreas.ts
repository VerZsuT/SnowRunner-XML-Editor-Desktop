type InputArea = [start: number, end: number]

/** Цветовые зоны поля ввода */
interface IInputAreas {
  /** Красная зона */
  red?: InputArea | InputArea[]
  /** Жёлтая зона */
  yellow?: InputArea | InputArea[]
  /** Зелёная зона */
  green?: InputArea | InputArea[]
}

export default IInputAreas
