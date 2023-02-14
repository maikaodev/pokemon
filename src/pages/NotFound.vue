<template>
  <div class="container">
    <h2>Página não encontrada</h2>
    <router-link to="/">Voltar para página inicial</router-link>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
@keyframes shake-horizontal {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    transform: translateX(10px);
  }
  80% {
    transform: translateX(8px);
  }
  90% {
    transform: translateX(-8px);
  }
}

.container {
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
  a {
    animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      both;
    background: none;
    color: white;

    padding: 16px;

    font-weight: 700;

    border: 1px solid red;

    cursor: pointer;

    transition-property: background-color;
    transition-duration: 0.75s;

    &:hover {
      background-color: red;
    }
  }
}
</style>
