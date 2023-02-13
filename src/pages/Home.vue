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

    <section v-show="showCard" class="card">
      <img :src="url_img" :alt="name" />
      <span>{{ name }}</span>
      <ul>
        <li v-for="(type, index) in types" :key="index" :class="type.type.name">
          {{ type.type.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
// Functions - utils
import { capitilized } from "../utils/capitilized";
import { fetchData } from "../utils/fetchData";

// Store
import { pokeDataStore } from "../stores/pokeDataStore";

const store = pokeDataStore();

// Ts
import { DataProps, TypeProps } from "../types/pages";

export default {
  name: "Home",
  data() {
    return {
      pokeName: "",
      name: "",
      url_img: "",
      types: [] as TypeProps[],
      showCard: false,
    };
  },
  methods: {
    async findPokemon() {
      //

      if (!this.pokeName) return;

      store.setPokename(this.pokeName);

      const dataDefault: DataProps = await fetchData(
        `${store.url_default + store.pokename}`
      );

      this.name = dataDefault.name;
      this.url_img = dataDefault.sprites.front_default;
      this.types = dataDefault.types;

      store.setStats(dataDefault.stats);
      this.showCard = true;
      this.pokeName = "";
    },
  },
  computed: {
    Pokaname() {
      return capitilized(this.name);
    },
    TypeName() {
      return capitilized(this.types[0].type.name);
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
    span {
      display: block;

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
