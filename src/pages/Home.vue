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
import { fetchData } from "../utils/fetchData";

// Store
import { SpeciesOfPokemon } from "../stores/SpeciesOfPokemon";

const storeSpeciesPokemon = SpeciesOfPokemon();

// Ts
import { DataProps, StatsProps } from "../types/pages";

export default {
  name: "Home",
  data() {
    return {
      pokeName: "",
    };
  },
  methods: {
    async findPokemon() {
      //

      if (!this.pokeName) return;

      const data: DataProps = await fetchData(
        `https://pokeapi.co/api/v2/pokemon/${this.pokeName.toLowerCase()}`
      );

      if (data.error) {
        return alert(data.message);
      }

      const stats: StatsProps[] = data.stats;
      const id: number = data.id;

      this.updatingUrl(id, stats);

      //
      this.$router.push(`/detalhes/${this.pokeName}`);
    },
    updatingUrl(id: number, stats: StatsProps[]) {
      storeSpeciesPokemon.updatingStats(id, stats);
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
