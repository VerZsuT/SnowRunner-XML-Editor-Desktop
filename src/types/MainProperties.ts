import type {Config} from './Config'
import type {Paths} from './Paths'
import type {Texts} from './Texts'

export interface MainProperties {
    texts: Texts
    paths: Paths
    config: Config
}
