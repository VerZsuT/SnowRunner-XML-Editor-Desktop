/** Базовый класс модели */
export default class ViewModel<Props extends object = {}> {
  constructor(
    protected props = {} as Props
  ) { }
}
