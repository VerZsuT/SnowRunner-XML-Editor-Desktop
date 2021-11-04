<template>
    <div class='category' @click='openList'>
        <img :src='imgSrc'>
        <span class='category-name'>
            {{ t[`${name.toUpperCase()}_CATEGORY_TITLE`] }}
        </span>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRefs } from 'vue'
import { t, mainProcess } from '../../../service'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const { name } = toRefs(props)

        return {
            t,
            name
        }
    },
    methods: {
        openList() {
            local.set('listType', this.name)
            mainProcess.openList()
        }
    },
    computed: {
        imgSrc() {
            return require(`../../../../images/category/${this.name}_category.png`)
        }
    }
})
</script>

<style scoped>
.category {
    display: flex;
    height: 320px;
    width: 320px;
    position: relative;
    cursor: pointer;
}

.category:hover {
    filter: brightness(0.8);
}

.category:hover .category-name {
    color: yellow;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.category-name {
    width: 100%;
    color: white;
    background-color: black;
    position: absolute;
    top: 0;
    padding: 10px 0;
    text-align: center;
    text-transform: uppercase;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}
</style>
