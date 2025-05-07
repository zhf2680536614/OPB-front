<script setup lang="ts">
import {useRoute} from 'vue-router'
const route = useRoute()
const key = () => route.path + Date.now()
</script>

<template>
  <RouterView :key="key()" />
</template>

<style scoped lang="less">

</style>
