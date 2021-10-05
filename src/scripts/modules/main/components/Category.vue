<template>
    <div class='category' @click='openList'>
        <img :src='imgSrc'>
        <span class='category-name'>
            {{ t[`${name.toUpperCase()}_CATEGORY_TITLE`] }}
        </span>
    </div>
</template>

<script>
import {getText} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

export default {
    props: {
        name: String
    },
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            })
        };
    },
    methods: {
        openList() {
            local.set('listType', this.name);
            mainProcess.call('openList');
        }
    },
    computed: {
        imgSrc() {
            return require(`../../../../images/category/${this.name}_category.png`);
        }
    }
}
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
