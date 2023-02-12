<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar/index.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <h1>Rede Socias</h1>
  </footer>
</template>
