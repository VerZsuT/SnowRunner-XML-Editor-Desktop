class ViewController<Props extends object = {}, Model extends object = {}> {
  constructor(
    protected props: Props = {} as unknown as Props,
    protected model: Model = {} as unknown as Model
  ) { }
}

export default ViewController
