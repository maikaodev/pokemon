<template>
  <div class="container">
    <div class="header">
      <h1>Pokémundo</h1>
      <p>Aqui você encontra tudo sobre o seu Pokémon preferido</p>
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

    <Alert v-if="alert_message" :message="alert_message" />

    <section v-show="showCard" class="card">
      <img :src="url_img" :alt="name" />
      <router-link :to="link">
        <span>{{ name }}</span>
      </router-link>
      <ul>
        <li v-for="(type, index) in types" :key="index" :class="type.type.name">
          {{ type.type.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
// Components
import Alert from "../components/Alert/index.vue";
// Functions - utils
import { fetchData } from "../utils/fetchData";

// Store
import { pokeDataStore } from "../stores/pokeDataStore";

const store = pokeDataStore();

// Ts
import { DataProps, TypeProps } from "../types/pages";

export default {
  name: "Home",
  components: { Alert },
  data() {
    return {
      pokeName: "",
      name: "",
      url_img: "",
      types: [] as TypeProps[],
      showCard: false,
      alert_message: "",
    };
  },
  methods: {
    async findPokemon() {
      //

      if (!this.pokeName) return;

      store.setPokename(this.pokeName.toLocaleLowerCase());

      const dataDefault: DataProps = await fetchData(
        `${store.url_default + store.pokename}`
      );

      if (dataDefault.error) {
        this.pokeName = "";

        return (this.alert_message = dataDefault.message);
      }

      this.name = dataDefault.name;
      this.url_img = dataDefault.sprites.front_default;
      this.types = dataDefault.types;

      store.setStats(dataDefault.stats);
      this.showCard = true;
      this.pokeName = "";
    },
  },
  computed: {
    link(): string {
      return `/detalhes/${this.name}`;
    },
  },
  watch: {
    pokeName(value) {
      if (value) return (this.alert_message = "");
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
  .card {
    border: 1px solid white;
    width: 250px;

    -webkit-box-shadow: 0px 0px 9px -1px #ffffff;
    box-shadow: 0px 0px 9px -1px #ffffff;
    img {
      width: 150px;
      height: 150px;

      cursor: pointer;

      transition: all 0.75s;

      &:hover {
        transform: translateY(-20px);
      }
    }
    a {
      span {
        display: block;
        text-transform: capitalize;

        font-weight: 700;
        font-size: 24px;
        cursor: pointer;
      }
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
