<template>
  <div class="search">
    <Input
      :placeholder="texts.search"
      :bordered="false"
      :value="filter"
      @change="setFilter($event.target.value || '')"
    />
    <SearchOutlined class="search-icon" />
  </div>
</template>

<script lang='ts' setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { Input } from 'ant-design-vue'

import { useListStore } from '../../store'
import texts from '../texts'

const { filter, setFilter } = useListStore()
</script>

<style lang='scss' scoped>
.search {
  background-color: #2196f3;
  border-radius: 5px;
  margin-right: 30px;
  margin-top: 2px;

  input {
    color: #fff;

    &::-webkit-input-placeholder {
      color: rgb(253, 255, 249);
    }
  }

  &-icon {
    position: relative;
    background-color: #2196f3;
    right: 10px;
    font-size: 20px;
    top: 2px;
    color: #fff;
  }
}
</style>
