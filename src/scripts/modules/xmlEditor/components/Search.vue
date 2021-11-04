<template>
    <div class='search'>
        <label for='search' class='form-label'>{{ t.SEARCH }}:</label>
        <input type='text' id='search' class='form-control' v-model='value'>
    </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { t } from '../../../service'

export default defineComponent({
    inject: ['filter'],
    data() {
        const filter = inject<{value: string}>('filter')

        return {
            value: filter.value,
            t: t
        }
    },
    watch: {
        value() {
            this.filter.set(this.value)
        }
    }
})
</script>
