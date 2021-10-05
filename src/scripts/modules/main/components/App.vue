<template>
    <div id="categories">
        <category :key='category' v-for='category in categories' :name='category'/>
    </div>
</template>

<script>
import '../../../service/menu.js';
import '../../../bootstrap/bootstrap.bundle.min.js';

import Category from './Category.vue';

export default {
    components: {
        Category
    },
    data() {
        return {
            categories: ['trucks', 'trailers', 'cargo']
        };
    }
}
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
