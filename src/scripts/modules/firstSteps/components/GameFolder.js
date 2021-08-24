import { getText } from '../../../service/funcs.js'
import toast from '../toast.js'

const GameFolder = {
    props: {
        t: Object, 
        pathToInitial: String
    },
    emits: ['update:pathToInitial'],
    template: `
        <label class='form-label'>
            {{ manual? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL }}
        </label><br>
        <input type='text' class='form-control' :style='styles.input' :title='gameFolder' :value='gameFolder' disabled>
        <button class='btn btn-primary btn-sm' @click='getFolder'>
            {{ t.OPEN_BUTTON }}
        </button><br>
        <label 
            class='form-label'
            :title='t.AUTO_INITIAL_TITLE'
        >
            {{ t.MANUAL_INITIAL }}
        </label>
        <input type='checkbox' class='form-check-input' :style='styles.checkbox' v-model='manual'><br>
    `,
    data() {
        return {
            manual: false,
            gameFolder: null,
            styles: {
                input: {
                    width: '150px',
                    display: 'inline-block',
                    'background-color': 'white',
                    'margin-right': '10px',
                    'margin-bottom': '10px'
                }
            }
        }
    },
    watch: {
        manual() {
            this.gameFolder = null
            this.$emit('update:pathToInitial', null)
        }
    },
    methods: {
        getFolder() {
            let data = {}
            if (this.manual) {
                data = preload.initial
                data.folder = data.initial
            } else {
                data = preload.gameFolder
            }

            if (!data) return
            
            this.gameFolder = data.folder
            this.$emit('update:pathToInitial', data.initial)
        }
    }
}

preload.errorHandler = (message) => toast(getText(message))

export default GameFolder

