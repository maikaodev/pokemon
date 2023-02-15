<template>
  <nav data-testid="menu_navigation">
    <router-link :to="{ name: 'home' }" data-testid="menu_navigation_icon">
      <img
        src="../../assets/pokebola.png"
        alt="Pokebola"
        height="50"
        width="50"
      />
    </router-link>

    <ul>
      <li data-testid="menu_navigation_item">
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
  height: 10vh;

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
