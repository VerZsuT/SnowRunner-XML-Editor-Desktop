<template>
    <div class='accordion-item' style='position: relative'>
        <div 
            :class='["group", "accordion-button", {collapsed: !Boolean(filter.value)}]'
            data-bs-toggle='collapse'
            :data-bs-target='`#_${groupContainerId}`'
            aria-expanded='false'
            :style='styles.headerCont'
        >
            <div class='accordion-header' :style='styles.header' :id='`_${headerId}`'>
                {{ item.groupName }}
            </div>
        </div>
        <div
            :class='["group-cont", "accordion-collapse", "collapse", {show: Boolean(filter.value)}]'
            :aria-labelledby='`_${headerId}`'
            :data-bs-parent='`#${parent}`'
            :id='`_${groupContainerId}`'
        >
            <div class='accordion-body' :id='`_${groupContentId}`'>
                <Param
                    :isExport='isExport'
                    :isExporting='isExporting'
                    v-for='param in items.params'
                    :item='param'
                    :tabs='tabs + 1'
                    :key='param.name'
                />
                <Group
                    :isExport='isExport'
                    :isExporting='isExporting'
                    v-for='groupItem in items.groups'
                    :item='groupItem'
                    :parent='`_${groupContentId}`'
                    :tabs='tabs + 1'
                    :key='groupItem.groupName'
                />
            </div>
        </div>
        <input type="checkbox" class='group-export' v-model="isExport" v-show="isExporting">
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Param from './Param.vue'

export default defineComponent({
    name: 'PGroup',
    components: {
        Param
    },
    props: {
        item: Object,
        tabs: Number,
        parent: String,
        isExport: {
            type: Boolean,
            default: true
        },
        isExporting: Boolean
    },
    inject: ['filter'],
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
        };
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
            return {
                groups,
                params
            }
        }
    }
})
</script>

<style scoped>
.group-export {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 18px;
    z-index: 5;
    width: 20px !important;
}
</style>
