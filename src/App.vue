<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar/index.vue";
import SocialNetwork from "./components/SocialNetwork/index.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <SocialNetwork />
  </footer>
</template>
