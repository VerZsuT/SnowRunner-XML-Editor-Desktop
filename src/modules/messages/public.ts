import type { MainEvent } from 'emr-bridge'

import type { IMainMessage } from './types'

export enum Keys {
  messageEvent = 'msgs.messageEvent',
  onMessage = 'onMsgs.messageEvent'
}

export interface IPublic {
  [Keys.onMessage]: MainEvent<IMainMessage>
}
