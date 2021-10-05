<template>
    <div>
        <span class="list-title h2">
            <span v-if='srcType === "mods"'>
                {{ t.MODS_LIST_TITLE }}
                <button
                    class='btn btn-primary'
                    @click='addMod'
                    style='padding: 0 10px;'
                >
                    {{ t.MODS_ADD_BUTTON }}
                </button>
            </span>
            <span v-if='srcType === "dlc"'>{{ t.DLC_LIST_TITLE }}</span>
            <span v-if='srcType === "main"'>{{ t.MAIN_LIST_TITLE }}</span>
        </span>
        <div class='list'>
            <span v-if='items.length === 0'>{{ t.EMPTY }}</span>
            <list-item
                v-for='item in items'
                :item-type='listType'
                :item='item'
                :key='item.path'
            ></list-item>
        </div>
    </div>
</template>

<script>
import {getText} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

import ListItem from './ListItem.vue';

export default {
    components: {
        ListItem
    },
    props: ['srcType'],
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(String(propName));
                }
            }),
            listType: local.get('listType'),
            isArray: this.srcType !== 'main'
        };
    },
    methods: {
        addMod() {
            const result = preload.getModPak();
            if (!config.modsList[result.id]) {
                config.modsList.length++;
            }
            config.modsList[result.id] = {
                name: result.name,
                path: result.path
            };
            if (mainProcess.call('confirm', getText('[RELAUNCH_PROMPT]'))) {
                mainProcess.call('reload');
            }
        }
    },
    computed: {
        items() {
            let array = [];
            if (this.listType === 'trucks' || this.listType === 'trailers' || this.listType === 'cargo') {
                array = preload.getList(this.listType, this.srcType);
            }
            if (this.srcType === 'main') {
                array = array.map((value) => {
                    if (this.listType !== 'trucks') {
                        return value;
                    }
                    const fileData = mainProcess.call('getFileData', value.path);
                    const dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml');
                    if (dom.querySelector('Truck').getAttribute('Type') !== 'Trailer') {
                        return value;
                    }
                });
                const out = [];
                for (const item of array) {
                    if (item) {
                        out.push(item);
                    }
                }
                return out;
            } else {
                let newArray = [];
                for (const dlcOrMod of array) {
                    for (const item of dlcOrMod.items) {
                        newArray.push({
                            ...item,
                            dlcName: dlcOrMod.dlcName,
                            modId: dlcOrMod.id
                        });
                    }
                }
                newArray = newArray.map((value) => {
                    const fileData = mainProcess.call('getFileData', value.path);
                    const dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml');
                    if (this.listType === 'trailers' && dom.querySelector('Truck') && dom.querySelector('Truck').getAttribute('Type') === 'Trailer') {
                        return value;
                    } else if (this.listType === 'trucks' && dom.querySelector('Truck') && dom.querySelector('Truck').getAttribute('Type') !== 'Trailer') {
                        return value;
                    } else if (this.listType === 'cargo') {
                        return value;
                    }
                })
                const out = [];
                for (const item of newArray) {
                    if (item) {
                        out.push(item);
                    }
                }
                return out;
            }
        }
    }
}
</script>

<style scoped>
.list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}

.list:nth-child(n+1) {
    margin-bottom: 20px;
}

.list-title {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background-color: #2c3c6b;
    color: white;
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid lightgray;
}
</style>
