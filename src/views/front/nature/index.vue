<script setup>

import Top from '@/components/front/top.vue';
import Footer from '@/components/front/footer.vue';
import Banner from './cpns/banner.vue';
import AsiaView from './cpns/AsiaView.vue';

</script>
<template>

    <div class="container">
        <top class="top" />

        <Banner class="banner"></Banner>

        <AsiaView class="asia_view" />

        <Footer class="footer" />
    </div>



</template>
<style lang="less" scoped>
.container {
    position: relative;

    .top {
        position: absolute;
    }

    .banner {
        position: absolute;
        top: 3vw;
    }

    .asia_view {
        position: absolute;
        top: 35vw;
    }

    .footer {
        position: absolute;
        top: 50vw;
    }
}
</style>