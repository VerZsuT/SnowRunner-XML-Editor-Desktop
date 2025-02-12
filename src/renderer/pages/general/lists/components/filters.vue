<template>
  <Transition name="filters">
    <div
      v-show="isOpen"
      class="filters"
    >
      <Select
        class="filter-select"
        size="large"
        :bordered="false"
        :options="categories"
        :value="category"
        @change="setCategory($event as Category)"
      />
      <Select
        class="filter-select"
        size="large"
        :bordered="false"
        :options="sources"
        :value="source"
        @change="setSource($event as SourceType)"
      />
      <Select
        class="filter-select"
        size="large"
        :bordered="false"
        :disabled="category !== Category.trucks"
        :options="truckTypes"
        :value="truckType"
        @change="setTruckType($event as TruckType)"
      />
      <Input
        class="filter-input"
        size="large"
        :bordered="false"
        :placeholder="texts.search"
        :value="name"
        @change="setName($event.target.value)"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { Input, Select } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, Transition } from 'vue'
import { Category, SourceType } from '../../enums'
import { useListStore } from '../../store'
import texts from '../texts'
import { Config, TruckType } from '/mods/renderer'

export type FiltersProps = {
	isOpen: boolean
}

defineProps<FiltersProps>()

const listStore = useListStore()
const { category, source, name, truckType } = storeToRefs(listStore)
const { setSource, setCategory, setName, setTruckType } = listStore

const categories = computed<SelectProps['options']>(() => [
  {
    label: texts.trucksCategory,
    value: Category.trucks
  },
  {
    label: texts.trailersCategory,
    value: Category.trailers
  }
])
const sources = computed<SelectProps['options']>(() => [
  {
    label: texts.mainSource,
    value: SourceType.main
  },
  {
    label: texts.dlcSource,
    value: SourceType.dlc
  },
  {
    label: texts.modsSource,
    value: SourceType.mods,
    disabled: !Config.useMods
  },
  {
    label: texts.favoritesSource,
    value: SourceType.favorites
  }
])
const truckTypes = computed<SelectProps['options']>(() => [
  {
    label: texts.allTypes,
    value: ''
  },
  {
    label: texts.heavyType,
    value: TruckType.heavy
  },
  {
    label: texts.heavyDutyType,
    value: TruckType.heavyDuty
  },
  {
    label: texts.highwayType,
    value: TruckType.highway
  },
  {
    label: texts.offroadType,
    value: TruckType.offroad
  },
  {
    label: texts.scoutType,
    value: TruckType.scout
  }
])
</script>

<style lang="scss">
.filters-enter-active,
.filters-leave-active {
  transition: all 0.1s ease-out;
}

.filters-enter-from,
.filters-leave-to {
  transform: translateY(-50px);
}
</style>

<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  background: white;
  box-shadow: 0 0 3px 0 rgba(34, 60, 80, 0.6);
  height: 40px;
  padding: 5px 0;
  text-align: center;

  .filter-select {
    min-width: 150px;
  }

  .filter-input {
    display: inline-block;
    width: 150px;
  }
}
</style>
