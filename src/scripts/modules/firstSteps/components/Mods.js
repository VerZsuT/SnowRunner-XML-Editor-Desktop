const Mods = {
    props: ['t', 'modsSupport'],
    template: `
        <div v-if='visible' :style='styles.message'>
            <p>
                <span v-if='!modsSupport.profile'>{{ t.NO_PROFILE }}<br></span>
                <span v-if='!modsSupport.existed'>{{ t.MODS_FOLDER_NOT_EXISTED }}<br></span>
                {{ t.MODS_WARNING }}
            </p>
        </div>
    `,
    data() {
        return {
            styles: {
                message: {
                    color: 'red'
                }
            }
        }
    },
    computed: {
        visible() {
            return !(this.modsSupport.profile && this.modsSupport.existed)
        }
    }
}

export default Mods
