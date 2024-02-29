<template>
  <Menu
    class="menu"
    trigger-sub-menu-action="click"
    mode="horizontal"
    :selectable="false"
    :items="items"
  />
</template>

<script lang='ts' setup>
import { Menu } from 'ant-design-vue'

import items from './items'
</script>

<style lang='scss' scoped>
.menu {
  li {
    padding: 0 10px !important;

    &:hover span,
    &:global(.ant-menu-submenu-active) span {
      color: black;
    }

    &:hover::after,
    &:global(.ant-menu-submenu-active::after) {
      border-bottom: 2px solid black !important;
    }

    :global(.ant-menu-submenu-title) {
      height: 30px;
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
