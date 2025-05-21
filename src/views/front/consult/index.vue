<script setup>
import Top from '../../../components/front/top.vue'
import Center from './cpns/center.vue';
import HotConsult from './cpns/hotConsult.vue';
import ConnnectGroup from './cpns/connnectGroup.vue';
import CommonConsult from './cpns/commonConsult.vue';
import Footer from '@/components/front/footer.vue';
</script>
<template>

    <div class="container">
        <Top class="top" />

        <Center class="center" />

        <HotConsult class="hot_consult" />

        <ConnnectGroup class="connect_group" />

        <CommonConsult class="common_consult" />

        <Footer class="footer" />

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

    .connect_group {
        position: absolute;
        top: 68vw;
    }

    .common_consult {
        position: absolute;
        top: 139vw;
    }

    .footer {
        position: absolute;
        top: 190vw;
    }

}
</style>