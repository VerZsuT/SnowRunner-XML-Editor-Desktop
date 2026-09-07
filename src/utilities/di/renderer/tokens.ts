import type { AppConstants } from '@modules/app/constants'
import type { App } from '@modules/app/renderer'
import type { Archive } from '@modules/archive/renderer'
import type { Backup } from '@modules/backup/renderer'
import type { Checks } from '@modules/checks/renderer'
import type { Config, IConfig } from '@modules/data/config/renderer'
import type { Edited } from '@modules/data/edited/renderer'
import type { Favorites } from '@modules/data/favorites/renderer'
import type { Mods } from '@modules/data/modifications/renderer'
import type { Dialogs } from '@modules/dialogs/renderer'
import type { DLCs } from '@modules/dlcs/renderer'
import type { EPF } from '@modules/epf/renderer'
import type { Dirs, Files } from '@modules/files/renderer'
import type { GameTexts } from '@modules/game-texts/renderer'
import type { Images } from '@modules/images/renderer'
import type { Loading } from '@modules/loading/renderer'
import type { Messages } from '@modules/messages/renderer'
import type { IPaths, Paths } from '@modules/paths/renderer'
import type { System } from '@modules/system/renderer'
import type { Updates } from '@modules/updates/renderer'
import type { Windows } from '@modules/windows/renderer'
import { InjectionToken } from '../token'

/** {@link AppConstants|Перейти к **AppConstants**} */
export const APP_CONSTANTS_TOKEN = new InjectionToken<typeof AppConstants>('AppConstants')

/** {@link App|Перейти к **App**} */
export const APP_TOKEN = new InjectionToken<typeof App>('App')

/** {@link Archive|Перейти к **Archive**} */
export const ARCHIVE_TOKEN = new InjectionToken<typeof Archive>('Archive')

/** {@link Backup|Перейти к **Backup**} */
export const BACKUP_TOKEN = new InjectionToken<typeof Backup>('Backup')

/** {@link Checks|Перейти к **Checks**} */
export const CHECKS_TOKEN = new InjectionToken<typeof Checks>('Checks')

/** {@link Config|Перейти к **Config**} */
export const CONFIG_TOKEN = new InjectionToken<{new(): Config & IConfig}>('Config')

/** {@link Edited|Перейти к **Edited**} */
export const EDITED_TOKEN = new InjectionToken<typeof Edited>('Edited')

/** {@link Favorites|Перейти к **Favorites**} */
export const FAVORITES_TOKEN = new InjectionToken<typeof Favorites>('Favorites')

/** {@link Mods|Перейти к **Mods**} */
export const MODS_TOKEN = new InjectionToken<typeof Mods>('Mods')

/** {@link Dialogs|Перейти к **Dialogs**} */
export const DIALOGS_TOKEN = new InjectionToken<typeof Dialogs>('Dialogs')

/** {@link DLCs|Перейти к **DLCs**} */
export const DLC_TOKEN = new InjectionToken<typeof DLCs>('DLCs')

/** {@link EPF|Перейти к **EPF**} */
export const EPF_TOKEN = new InjectionToken<typeof EPF>('EPF')

/** {@link Files|Перейти к **Files**} */
export const FILES_TOKEN = new InjectionToken<typeof Files>('Files')

/** {@link Dirs|Перейти к **Dirs**} */
export const DIRS_TOKEN = new InjectionToken<typeof Dirs>('Dirs')

/** {@link GameTexts|Перейти к **GameTexts**} */
export const GAME_TEXTS_TOKEN = new InjectionToken<typeof GameTexts>('GameTexts')

/** {@link Loading|Перейти к **Loading**} */
export const LOADING_TOKEN = new InjectionToken<typeof Loading>('Loading')

/** {@link Messages|Перейти к **Messages**} */
export const MESSAGES_TOKEN = new InjectionToken<typeof Messages>('Messages')

/** {@link Paths|Перейти к **Paths**} */
export const PATHS_TOKEN = new InjectionToken<{new(): Paths & IPaths}>('Paths')

/** {@link System|Перейти к **System**} */
export const SYSTEM_TOKEN = new InjectionToken<typeof System>('System')

/** {@link Updates|Перейти к **Updates**} */
export const UPDATES_TOKEN = new InjectionToken<typeof Updates>('Updates')

/** {@link Windows|Перейти к **Windows**} */
export const WINDOWS_TOKEN = new InjectionToken<typeof Windows>('Windows')

/** {@link Images|Перейти к **Images**} */
export const IMAGES_TOKEN = new InjectionToken<typeof Images>('Images')
