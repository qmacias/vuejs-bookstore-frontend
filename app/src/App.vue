<script setup>
import { useRoute } from "vue-router";
import { watchEffect } from "vue";

import TheFooter from "@/components/TheFooter.vue";
import TheNavbar from "@/components/TheNavbar.vue";

const route = useRoute();

watchEffect(() => {
  document.title = route.meta.title;
});
</script>

<template>
  <TheNavbar />
  <RouterView />
  <TheFooter />
</template>

<style>

</style>