<template>
    <div id="categories">
        <Category 
            :key='category' 
            v-for='category in categories' 
            :name='category'
        />
    </div>
</template>

<script lang='ts'>
import '../../../service/menu'
import '../../../bootstrap/bootstrap.bundle.min.js'
import { defineComponent } from 'vue'

import Category from './Category.vue'

export default defineComponent({
    components: {
        Category
    },
    setup() {
        const categories = ['trucks', 'trailers', 'cargo']

        return {
            categories
        }
    }
})
</script>

<style>
@import '../../../../styles/main.css';

body {
    background-color: white;
}

#categories {
    margin-top: 2px;
    display: flex;
    justify-content: space-evenly;
}
</style>
