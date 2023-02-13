<template>
  <div class="container">
    <div class="header">
      <h1>Pokémundo</h1>
      <p>Aqui você encontra tudos sobre o seu pokémon preferido</p>
    </div>

    <section class="content">
      <form @submit.prevent>
        <input
          v-model="pokeName"
          type="text"
          placeholder="Encontre seu pokémon"
          aria-label="Encontre seu pokémon"
          required
        />
        <button type="submit" @click="findPokemon">Buscar</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
// Functions - utils

// Store
import { pokeDataStore } from "../stores/pokeDataStore";

const store = pokeDataStore();

// Ts

export default {
  name: "Home",
  data() {
    return {
      pokeName: "",
    };
  },
  methods: {
    findPokemon() {
      //

      if (!this.pokeName) return;

      store.setPokename(this.pokeName);

      this.$router.push(`/detalhes/${this.pokeName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
  .header {
    width: 80%;

    display: flex;
    flex-direction: column;
    gap: 16px;
    h1 {
      font-size: 32px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
    }
  }
  .content {
    form {
      display: flex;
      gap: 16px;
      input {
        padding: 8px 16px;
        &:focus {
          outline: none;
        }
      }
      button {
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
  }
}
</style>
