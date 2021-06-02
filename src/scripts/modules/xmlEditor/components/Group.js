const Group = {
    props: {
        item: Object,
        tabs: Number,
        parent: String
    },
    template: `
        <div class='accordion-item'>
            <div 
                class='group accordion-button collapsed'
                data-bs-toggle='collapse'
                :data-bs-target='\`#_\${groupContainerId}\`'
                aria-expanded='false'
                :style='styles.headerCont'
            >
                <div class='accordion-header' :id='\`_\${headerId}\`' :style='styles.header'>
                    {{ item.groupName }}
                </div>
            </div>
            <div
                class='group-cont accordion-collapse collapse'
                :aria-labelledby='\`_\${headerId}\`'
                :data-bs-parent='\`#\${parent}\`'
                :id='\`_\${groupContainerId}\`'
            >
                <div class='accordion-body' :id='\`_\${groupContentId}\`'>
                    <p-param
                        v-for='param in items.params'
                        :item='param'
                        :tabs='tabs + 1'
                    ></p-param>
                    <p-group
                        v-for='groupItem in items.groups'
                        :item='groupItem'
                        :parent='\`_\${groupContentId}\`'
                        :tabs='tabs + 1'
                    ></p-group>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            styles: {
                header: {
                    paddingLeft: `${this.tabs * 10}px`
                },
                headerCont: {
                    paddingLeft: `${this.tabs * 5}px`
                }
            }
        }
    },
    computed: {
        headerId() {
            return Math.round(Math.random() * 1000000)
        },
        groupContainerId() {
            return Math.round(Math.random() * 1000000)
        },
        groupContentId() {
            return Math.round(Math.random() * 1000000)
        },
        items() {
            const groups = []
            const params = []
            for (const groupItem of this.item.groupItems) {
                if (groupItem.paramType === 'group') {
                    groups.push(groupItem)
                } else {
                    params.push(groupItem)
                }
            }
            return {groups, params}
        }
    }
}

export default Group
