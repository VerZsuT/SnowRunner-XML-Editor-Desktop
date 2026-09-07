import type { AppConstants } from '@modules/app/constants'
import type { App } from '@modules/app/main'
import type { Archive } from '@modules/archive/main'
import type { Backup } from '@modules/backup/main'
import type { Checks } from '@modules/checks/main'
import type { Config, IConfig } from '@modules/data/config/main'
import type { Edited } from '@modules/data/edited/main'
import type { Favorites } from '@modules/data/favorites/main'
import type { Mods } from '@modules/data/modifications/main'
import type { Sizes } from '@modules/data/sizes/main'
import type { Dialogs } from '@modules/dialogs/main'
import type { DLCs } from '@modules/dlcs/main'
import type { Env } from '@modules/env/main'
import type { EPF } from '@modules/epf/main'
import type { Dirs, Files } from '@modules/files/main'
import type { GameTexts } from '@modules/game-texts/main'
import type { Loading } from '@modules/loading/main'
import type { Messages } from '@modules/messages/main'
import type { IPaths, Paths } from '@modules/paths/main'
import type { QuitParams } from '@modules/quit-params/main'
import type { System } from '@modules/system/main'
import type { Updates } from '@modules/updates/main'
import type { Windows } from '@modules/windows/main'
import { InjectionToken } from '../token'

/** {@link Env|Перейти к **Env**} */
export const ENV_TOKEN = new InjectionToken<typeof Env>('Env')

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

/** {@link Sizes|Перейти к **Sizes**} */
export const SIZES_TOKEN = new InjectionToken<typeof Sizes>('Sizes')

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

/** {@link QuitParams|Перейти к **QuitParams**} */
export const QUIT_PARAMS_TOKEN = new InjectionToken<typeof QuitParams>('QuitParams')

/** {@link System|Перейти к **System**} */
export const SYSTEM_TOKEN = new InjectionToken<typeof System>('System')

/** {@link Updates|Перейти к **Updates**} */
export const UPDATES_TOKEN = new InjectionToken<typeof Updates>('Updates')

/** {@link Windows|Перейти к **Windows**} */
export const WINDOWS_TOKEN = new InjectionToken<typeof Windows>('Windows')
