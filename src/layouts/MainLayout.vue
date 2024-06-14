<template>
    <Header />
    <slot name="main-layout-content"> </slot>
    <Footer />
</template>
<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<style scoped></style>
