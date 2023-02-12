<script lang="ts">
import { useCounterStore } from "../stores/CounterStore";

const counterStore = useCounterStore();

export default {
  name: "Counter",
  data() {
    return {
      count: counterStore,
    };
  },
};
</script>

<template>
  <div>
    <button @click="count.increment">Adicionar</button>
    {{ count.showCount }}
  </div>
</template>

<style></style>
