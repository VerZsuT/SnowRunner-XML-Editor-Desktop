import type { MainEvent } from 'emr-bridge'

import type { IMainMessage } from './types'

export enum PubKeys {
  messageEvent = '-msgs/messageEvent',
  onMessage = `on${PubKeys.messageEvent}`
}

export type PubType = {
  [PubKeys.onMessage]: MainEvent<IMainMessage>
}
