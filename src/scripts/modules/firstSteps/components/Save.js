import { funcs } from '../../../service/renderer.js'
import { getText } from '../../../service/funcs.js'
import toast from '../toast.js'

const Save = {
    props: {
        t: Object,
        pathToInitial: String,
        modsSupport: Object,
        disableMods: Boolean
    },
    template: `
        <button class='btn btn-primary' :style='style' @click='save'>
            {{ t.SAVE_BUTTON }}
        </button>
    `,
    data() {
        return {
            style: {
                'margin-top': '20px',
                'margin-bottom': '60px'
            }
        }
    },
    methods: {
        save() {
            if (!this.pathToInitial) {
                toast(getText('[NO_GAME_FOLDER]'))
                return
            }
        
            if (!this.modsSupport.profile || !this.modsSupport.existed || this.disableMods) {
                config.settings.disableMods = true
            }
            config.paths.initial = this.pathToInitial
            funcs.saveInitialSum()
            funcs.saveBackup(true)
        }
    }
}

export default Save
