import {
    funcs
} from '../../../service/renderer.js'
import {
    getText
} from '../../../service/funcs.js'
import toast from '../toast.js'

const Save = {
    props: {
        t: Object,
        pathToInitial: String
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

            config.paths.initial = this.pathToInitial
            funcs.saveInitialSum()
            funcs.saveBackup(true)
        }
    }
}

export default Save
