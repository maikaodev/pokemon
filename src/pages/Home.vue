<template>
  <div class="container">
    <div class="header">
      <h1>Pokémundo</h1>
      <p>Aqui você encontra tudo sobre o seu Pokémon preferido</p>
    </div>

    <section class="content">
      <form @submit.prevent="findPokemon" data-testid="form">
        <input
          data-testid="form_input"
          v-model="pokeName"
          type="text"
          placeholder="Encontre seu pokémon"
          aria-label="Encontre seu pokémon"
          required
        />
        <button data-testid="form_button" type="submit">Buscar</button>
      </form>
    </section>

    <Alert v-if="alert_message" :message="alert_message" />

    <router-link
      data-testid="card"
      v-show="showCard"
      :to="pokeData.detailsUrl || '/'"
      class="card"
    >
      <img
        data-testid="card_img"
        :src="pokeData.sprites?.front_default"
        :alt="pokeData.name"
      />
      <span data-testid="card_pokename">{{ pokeData.name }}</span>
      <ul>
        <li
          data-testid="card_poketype"
          v-for="(type, index) in pokeData.types"
          :key="index"
          :class="type.type.name"
        >
          {{ type.type.name }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script lang="ts">
import Alert from "../components/Alert/index.vue";

import { pokeDataStore } from "../stores/pokeDataStore";
import { PokemonProps } from "../types/pages";

const store = pokeDataStore();

export default {
  name: "Home",
  components: { Alert },
  data() {
    return {
      pokeData: {} as PokemonProps,
      pokeName: "",
      showCard: false,
      alert_message: "",
    };
  },
  methods: {
    async findPokemon() {
      if (!this.pokeName) return;

      const data = await store.getPokemon(this.pokeName);

      if ("error" in data) {
        this.pokeName = "";
        this.showCard = false;
        this.pokeData = {} as PokemonProps;
        this.alert_message = data.message;
        return;
      }

      setTimeout(() => {
        this.showCard = true;
      }, 1);
      this.showCard = false;
      this.pokeData = data;
      this.pokeName = "";
    },
  },
  watch: {
    pokeName(value) {
      if (value) this.alert_message = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes scale-up-center {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

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
  .card {
    border: 1px solid white;
    width: 250px;

    -webkit-box-shadow: 0px 0px 9px -1px #ffffff;
    box-shadow: 0px 0px 9px -1px #ffffff;

    animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    img {
      width: 150px;
      height: 150px;

      cursor: pointer;

      transition: all 0.75s;

      &:hover {
        transform: translateY(-20px);
      }
    }
    span {
      display: block;
      text-transform: capitalize;

      font-weight: 700;
      font-size: 24px;
      cursor: pointer;
    }

    ul {
      margin: 8px 0;
      list-style: none;

      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        margin: auto;
        padding: 4px 8px;
        font-size: 18px;

        text-transform: capitalize;

        color: black;
      }
      .electric {
        background-color: yellow;
      }
      .fire {
        background-color: red;
      }
      .poison {
        background-color: purple;
      }
      .water {
        background-color: lightblue;
      }
      .grass {
        background-color: green;
      }
      .flying {
        background-color: white;
      }
      .bug {
        background-color: lightgreen;
      }
      .normal {
        background-color: gray;
      }
      .ground,
      .fighting,
      .rock {
        background-color: brown;
      }
      .fairy {
        background-color: darkred;
      }

      .psychic {
        background-color: darkmagenta;
      }
      .steel {
        background-color: darkslategrey;
      }
      .ice {
        background-color: turquoise;
      }
    }
  }
}
</style>
