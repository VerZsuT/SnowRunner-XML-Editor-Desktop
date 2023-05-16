/** Базовый класс модели */
class ViewModel<Props extends object = {}> {
  constructor(
    protected props = {} as Props
  ) { }
}

export default ViewModel
