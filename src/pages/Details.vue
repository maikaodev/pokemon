<template>
  <div v-show="alert_message" class="alert_component">
    <Alert :message="alert_message" />
    <router-Link to="/">Página Inicial</router-Link>
  </div>

  <div v-show="showIt" class="container">
    <h1>{{ pokemonDetails.name }}</h1>

    <img
      :src="pokemonDetails.sprites?.front_default"
      :alt="pokemonDetails.name"
      @click="toggleMoreInfo"
    />

    <section class="content">
      <section class="stats">
        <ul>
          <li>Peso: {{ pokemonDetails.weight }} kg</li>
          <li>Altura: {{ pokemonDetails.height }} cm</li>
          <li>Experiência: {{ pokemonDetails.base_experience }}</li>
        </ul>
      </section>

      <section v-show="showMoreInfo" class="stats_advanced">
        <ul>
          <li v-for="(stat, index) in pokemonDetails.stats" :key="index">
            {{ translateStat(stat.stat.name) }}: {{ stat.base_stat }}
          </li>
        </ul>
      </section>
    </section>

    <section class="evolutions">
      <h2>Evoluções</h2>
      <ul>
        <li
          v-for="(evolution, index) in pokemonDetails.evolutions"
          :key="index"
        >
          <router-link :to="evolution.detailsUrl">
            <img
              :src="evolution.sprites?.front_default"
              :alt="evolution.name"
            />
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";

import Alert from "../components/Alert/index.vue";

import { pokeDataStore } from "../stores/pokeDataStore";
import { PokemonDetails } from "../types/pages";
import { translateStat } from "../utils/translateStat";

const store = pokeDataStore();

export default {
  name: "Details",
  components: { Alert, RouterLink },
  data() {
    return {
      showIt: false,
      showMoreInfo: false,
      alert_message: "",
      pokemonDetails: {} as PokemonDetails,
    };
  },
  created() {
    this.gettingData(this.$route.params.name.toString().toLowerCase());

    this.$watch(
      () => this.$route.params,
      (toParams) => {
        this.gettingData(toParams.name.toString().toLowerCase());
      }
    );
  },
  methods: {
    // Passa referência da util pro método
    translateStat,
    async gettingData(name: string) {
      const data = await store.getPokemonDetails(name);

      if ("error" in data) {
        this.alert_message = data.message;
        return;
      }

      this.pokemonDetails = data;
      this.showIt = true;
    },
    toggleMoreInfo() {
      this.showMoreInfo = !this.showMoreInfo;
    },
  },
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
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes scale-in-hor-center {
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
@keyframes slide-left-top {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-120px) translateX(-150px);
  }
}

@keyframes slide-right-top {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-120px) translateX(75px);
  }
}

.alert_component {
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.container {
  height: 100%;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  h1 {
    text-align: center;
    animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }
  gap: 32px;

  img {
    width: 150px;
    height: 150px;
    cursor: pointer;

    transition: all 0.75s;

    &:hover {
      transform: translateY(-20px);
    }
  }
  .content {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    justify-content: space-around;

    .stats,
    .stats_advanced {
      ul {
        width: 200px;
        display: flex;
        flex-direction: column;

        margin-top: 16px;

        gap: 16px;

        list-style: none;
      }
    }
  }
  .evolutions {
    text-align: center;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      list-style: none;
      animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
      li {
        transition: all 0.75s;
        &:hover {
          transform: translateY(-15px);
        }
      }
    }
  }
}
$breakpoint-tablet: 768px;
$breakpoint-laptop: 1024px;

@media (min-width: $breakpoint-tablet) {
  .container {
    .content {
      flex-direction: row;
      width: calc(100% - 400px);
      justify-content: normal;

      height: 0px;
      .stats {
        animation: slide-left-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
      .stats_advanced {
        animation: slide-right-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
      }
    }
    .evolutions {
      ul {
        flex-direction: row;
      }
    }
  }
}
@media (min-width: $breakpoint-tablet) {
  .container {
    .content {
      .stats {
      }
    }
  }
}
</style>
