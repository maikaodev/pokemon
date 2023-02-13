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
.container {
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
  a {
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
