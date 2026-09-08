import type { IAppConstants, IMainApp } from '@modules/app/types'
import type { IMainArchiver } from '@modules/archiver/types'
import type { IMainInitialBackup } from '@modules/backup/types'
import type { IMainChecks } from '@modules/checks/types'
import type { IConfig, IMainConfigManager } from '@modules/data/config/types'
import type { IMainEdited } from '@modules/data/edited/types'
import type { IMainFavorites } from '@modules/data/favorites/types'
import type { IMainMods } from '@modules/data/modifications/types'
import type { ISizes } from '@modules/data/sizes/types'
import type { IMainDialogs } from '@modules/dialogs/types'
import type { IMainDlc } from '@modules/dlcs/types'
import type { IEnv } from '@modules/env/types'
import type { IMainEpf } from '@modules/epf/types'
import type { IDirs, IFiles } from '@modules/files/types'
import type { IMainGameTexts } from '@modules/game-texts/types'
import type { IMainLoading } from '@modules/loading/types'
import type { IMainMessages } from '@modules/messages/types'
import type { IMainPathsManager, IPaths } from '@modules/paths/types'
import type { IQuitParams } from '@modules/quit-params/types'
import type { IMainSystem } from '@modules/system/types'
import type { IMainUpdates } from '@modules/updates/types'
import type { IMainWindows } from '@modules/windows/types'
import type { ConstructorOf } from '../container'
import { InjectionToken } from '../token'

/** {@link IEnv} */
export const ENV_TOKEN = new InjectionToken<ConstructorOf<IEnv>>('IEnv')

/** {@link IAppConstants} */
export const APP_CONSTANTS_TOKEN = new InjectionToken<ConstructorOf<IAppConstants>>('IAppConstants')

/** {@link IMainApp} */
export const APP_TOKEN = new InjectionToken<ConstructorOf<IMainApp>>('IMainApp')

/** {@link IMainArchiver} */
export const ARCHIVER_TOKEN = new InjectionToken<ConstructorOf<IMainArchiver>>('IMainArchiveManager')

/** {@link IMainInitialBackup} */
export const BACKUP_TOKEN = new InjectionToken<ConstructorOf<IMainInitialBackup>>('IMainInitialBackup')

/** {@link IMainChecks} */
export const CHECKS_TOKEN = new InjectionToken<ConstructorOf<IMainChecks>>('IMainChecks')

/** {@link IConfig} */
export const CONFIG_TOKEN = new InjectionToken<ConstructorOf<IConfig>>('IConfig')

/** {@link IMainConfigManager} */
export const CONFIG_MANAGER_TOKEN = new InjectionToken<ConstructorOf<IMainConfigManager>>('IMainConfigManager')

/** {@link IMainEdited} */
export const EDITED_TOKEN = new InjectionToken<ConstructorOf<IMainEdited>>('IMainEdited')

/** {@link IMainFavorites} */
export const FAVORITES_TOKEN = new InjectionToken<ConstructorOf<IMainFavorites>>('IMainFavorites')

/** {@link IMainMods} */
export const MODS_TOKEN = new InjectionToken<ConstructorOf<IMainMods>>('IMainMods')

/** {@link ISizes} */
export const SIZES_TOKEN = new InjectionToken<ConstructorOf<ISizes>>('ISizes')

/** {@link IMainDialogs} */
export const DIALOGS_TOKEN = new InjectionToken<ConstructorOf<IMainDialogs>>('IMainDialogs')

/** {@link IMainDlc} */
export const DLC_TOKEN = new InjectionToken<ConstructorOf<IMainDlc>>('IMainDlc')

/** {@link IMainEpf} */
export const EPF_TOKEN = new InjectionToken<ConstructorOf<IMainEpf>>('IMainEpf')

/** {@link IFiles} */
export const FILES_TOKEN = new InjectionToken<ConstructorOf<IFiles>>('IFiles')

/** {@link IDirs} */
export const DIRS_TOKEN = new InjectionToken<ConstructorOf<IDirs>>('IDirs')

/** {@link IMainGameTexts} */
export const GAME_TEXTS_TOKEN = new InjectionToken<ConstructorOf<IMainGameTexts>>('IMainGameTexts')

/** {@link IMainLoading} */
export const LOADING_TOKEN = new InjectionToken<ConstructorOf<IMainLoading>>('IMainLoading')

/** {@link IMainMessages} */
export const MESSAGES_TOKEN = new InjectionToken<ConstructorOf<IMainMessages>>('IMainMessages')

/** {@link IMainPathsManager} */
export const PATHS_MANAGER_TOKEN = new InjectionToken<ConstructorOf<IMainPathsManager>>('IMainPathsManager')

/** {@link IPaths} */
export const PATHS_TOKEN = new InjectionToken<ConstructorOf<IPaths>>('IPaths')

/** {@link IQuitParams} */
export const QUIT_PARAMS_TOKEN = new InjectionToken<ConstructorOf<IQuitParams>>('IQuitParams')

/** {@link IMainSystem} */
export const SYSTEM_TOKEN = new InjectionToken<ConstructorOf<IMainSystem>>('ISystem')

/** {@link IMainUpdates} */
export const UPDATES_TOKEN = new InjectionToken<ConstructorOf<IMainUpdates>>('IMainUpdates')

/** {@link IMainWindows} */
export const WINDOWS_TOKEN = new InjectionToken<ConstructorOf<IMainWindows>>('IMainWindows')
