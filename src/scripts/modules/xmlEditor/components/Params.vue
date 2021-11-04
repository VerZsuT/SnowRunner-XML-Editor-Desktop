<template>
    <div id="parameters" class="accordion snow">
        <div :key='item.groupName? (item.groupName+item.name):(item.selector+item.name)' v-for='item in params'>
            <Group
                :isExporting='isExporting'
                v-if='item.paramType === "group" && item.groupItems.length'
                :item='item'
                parent='parameters'
                :tabs='1'
                :key='item.groupName'
            />
            <Param
                :isExporting='isExporting'
                v-if='item.paramType !== "group"'
                :item='item'
                :tabs='1'
                :key='item.name'
            />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { templates } from '../../../service'

import Group from './Group.vue'
import Param from './Param.vue'

export default defineComponent({
    components: {
        Group,
        Param
    },
    props: {
        isExporting: Boolean
    },
    inject: ['fileDOM', 'filter'],
    computed: {
        params() {
            let template: ITemplate
            let name: string
            for (let tmp in templates) {
                let selector = `root > ${templates[tmp].selector}`
                if (this.fileDOM.querySelector(selector)) {
                    template = templates[tmp]
                    name = tmp
                    break
                }
            }

            return this.parseTemplate(template.main, name)
        }
    },
    methods: {
        parseTemplate(obj: [ICTemplate, ICSelectors], name: string) {
            const selectors = obj[1].toObject()
            const template = obj[0]

            return this.filt(template.getParams({
                selectors: selectors,
                fileDOM: this.fileDOM,
                templateName: name
            }))
        },
        filt(array) {
            const newArray = []

            array.map((value) => {
                const newValue = Object(value)
                if (value.groupName) {
                    newValue.groupItems = this.filt(value.groupItems)
                    newArray.push(newValue)
                } else if (!this.filter.value || value.text.toLowerCase().includes(this.filter.value.toLowerCase())) {
                    newArray.push(newValue)
                }
            })

            return newArray
        }
    }
})
</script>
