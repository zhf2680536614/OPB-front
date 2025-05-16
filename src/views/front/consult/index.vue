<script setup>
import Top from './cpns/top.vue'
import Center from './cpns/center.vue';
import hotConsult from './cpns/hotConsult.vue';
</script>
<template>

    <div class="container">
        <Top class="top" />

        <Center class="center" />

        <hotConsult class="hot_consult" />
    </div>


</template>
<style lang="less" scoped>
.container {
    position: relative;

    .top {
        position: absolute;
    }

    .center {
        position: absolute;
        top: 3vw;
    }

    .hot_consult {
        position: absolute;
        top: 34vw;
    }
}
</style>