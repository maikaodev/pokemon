<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="hello">Hello<span>world</span></div>
</template>

<style scoped lang="scss">
@import "../styles/app.scss";
</style>
