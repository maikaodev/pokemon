<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <router-link :to="{ name: 'home' }">Go to Home</router-link>
    <router-link :to="{ name: 'about' }">About</router-link>
  </div>
  <router-view />
</template>
