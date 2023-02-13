<template>
  <nav>
    <router-link :to="{ name: 'home' }">
      <img
        src="../../assets/pokebola.png"
        alt="Pokebola"
        height="50"
        width="50"
      />
    </router-link>

    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Página Inicial</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
nav {
  height: 100%;
  display: flex;
  align-items: center;

  padding: 0 16px;

  gap: 32px;

  ul {
    list-style: none;
    li {
      a {
        transition-property: color;
        transition-duration: 0.75s;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>
