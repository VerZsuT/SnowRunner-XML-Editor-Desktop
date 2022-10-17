export enum IPCChannel {
  getPublicInfo = 'getPublicInfo',
  windowReady = 'window-ready-',
  windowResize = 'window-resize',
  handleWindowResize = 'handle-window-resize',
  functionCall = 'function-call-',
  propertyGet = 'property-get-',
  propertySet = 'property-set-',
  promisePostfix = '-promise'
}
