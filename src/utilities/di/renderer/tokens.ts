import type { IAppConstants, IRendererApp } from '@modules/app/types'
import type { IRendererArchiver } from '@modules/archiver/types'
import type { IRendererInitialBackup } from '@modules/backup/types'
import type { IRendererChecks } from '@modules/checks/types'
import type { IConfig, IRendererConfigManager } from '@modules/data/config/types'
import type { IRendererEdited } from '@modules/data/edited/types'
import type { IRendererFavorites } from '@modules/data/favorites/types'
import type { IRendererMods } from '@modules/data/modifications/types'
import type { IRendererDialogs } from '@modules/dialogs/types'
import type { IRendererDlc } from '@modules/dlcs/types'
import type { IRendererEpf } from '@modules/epf/types'
import type { IDirs, IFiles } from '@modules/files/types'
import type { IRendererGameTexts } from '@modules/game-texts/types'
import type { IImages } from '@modules/images/types'
import type { IRendererLoading } from '@modules/loading/types'
import type { IRendererMessages } from '@modules/messages/types'
import type { IPaths, IRendererPathsManager } from '@modules/paths/types'
import type { IMainSystem } from '@modules/system/types'
import type { IRendererUpdates } from '@modules/updates/types'
import type { IRendererWindows } from '@modules/windows/types'
import type { ConstructorOf } from '../container'
import { InjectionToken } from '../token'

/** {@link IAppConstants} */
export const APP_CONSTANTS_TOKEN = new InjectionToken<ConstructorOf<IAppConstants>>('IAppConstants')

/** {@link IRendererApp} */
export const APP_TOKEN = new InjectionToken<ConstructorOf<IRendererApp>>('IRendererApp')

/** {@link IRendererArchiver} */
export const ARCHIVER_TOKEN = new InjectionToken<ConstructorOf<IRendererArchiver>>('IRendererArchiveManager')

/** {@link IRendererInitialBackup} */
export const BACKUP_TOKEN = new InjectionToken<ConstructorOf<IRendererInitialBackup>>('IRendererInitialBackup')

/** {@link IRendererChecks} */
export const CHECKS_TOKEN = new InjectionToken<ConstructorOf<IRendererChecks>>('IRendererChecks')

/** {@link IRendererConfigManager} */
export const CONFIG_MANAGER_TOKEN = new InjectionToken<ConstructorOf<IRendererConfigManager>>('IRendererConfigManager')

/** {@link IConfig} */
export const CONFIG_TOKEN = new InjectionToken<ConstructorOf<IConfig>>('IConfig')

/** {@link IRendererEdited} */
export const EDITED_TOKEN = new InjectionToken<ConstructorOf<IRendererEdited>>('IRendererEdited')

/** {@link IRendererFavorites} */
export const FAVORITES_TOKEN = new InjectionToken<ConstructorOf<IRendererFavorites>>('IRendererFavorites')

/** {@link IRendererMods} */
export const MODS_TOKEN = new InjectionToken<ConstructorOf<IRendererMods>>('IRendererMods')

/** {@link IRendererDialogs} */
export const DIALOGS_TOKEN = new InjectionToken<ConstructorOf<IRendererDialogs>>('IRendererDialogs')

/** {@link IRendererDlc} */
export const DLC_TOKEN = new InjectionToken<ConstructorOf<IRendererDlc>>('IRendererDlc')

/** {@link IRendererEpf} */
export const EPF_TOKEN = new InjectionToken<ConstructorOf<IRendererEpf>>('IRendererEpf')

/** {@link IFiles} */
export const FILES_TOKEN = new InjectionToken<ConstructorOf<IFiles>>('IFiles')

/** {@link IDirs} */
export const DIRS_TOKEN = new InjectionToken<ConstructorOf<IDirs>>('IDirs')

/** {@link IRendererGameTexts} */
export const GAME_TEXTS_TOKEN = new InjectionToken<ConstructorOf<IRendererGameTexts>>('IRendererGameTexts')

/** {@link IRendererLoading} */
export const LOADING_TOKEN = new InjectionToken<ConstructorOf<IRendererLoading>>('IRendererLoading')

/** {@link IRendererMessages} */
export const MESSAGES_TOKEN = new InjectionToken<ConstructorOf<IRendererMessages>>('IRendererMessages')

/** {@link IRendererPathsManager} */
export const PATHS_MANAGER_TOKEN = new InjectionToken<ConstructorOf<IRendererPathsManager>>('IRendererPathsManager')

/** {@link IPaths} */
export const PATHS_TOKEN = new InjectionToken<ConstructorOf<IPaths>>('IPaths')

/** {@link IMainSystem} */
export const SYSTEM_TOKEN = new InjectionToken<ConstructorOf<IMainSystem>>('ISystem')

/** {@link IRendererUpdates} */
export const UPDATES_TOKEN = new InjectionToken<ConstructorOf<IRendererUpdates>>('IRendererUpdates')

/** {@link IRendererWindows} */
export const WINDOWS_TOKEN = new InjectionToken<ConstructorOf<IRendererWindows>>('IRendererWindows')

/** {@link IImages} */
export const IMAGES_TOKEN = new InjectionToken<ConstructorOf<IImages>>('IImages')
