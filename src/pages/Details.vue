<script lang="ts">
import Alert from "../components/Alert/index.vue";

import { capitilized } from "../utils/capitilized";
import { convertToCm } from "../utils/convertToCm";
import { convertToKg } from "../utils/convertToKg";
import { fetchData } from "../utils/fetchData";

import { pokeDataStore } from "../stores/pokeDataStore";

const store = pokeDataStore();

import { RouterLink } from "vue-router";
import { DataProps, StatsProps } from "../types/pages";
type SpeciesProps = DataProps & {
  evolution_chain: {
    url: string;
  };
};

export default {
  name: "Details",
  components: { Alert, RouterLink },
  data() {
    const stats: StatsProps[] = [];
    return {
      name: this.$route.params.name.toString(),
      url_img: "",
      stats,
      evolutions: [
        {
          name: "",
          url: "",
          link_img: "",
        },
        {
          name: "",
          url: "",
          link_img: "",
        },
        {
          name: "",
          url: "",
          link_img: "",
        },
      ],
      weight: 0,
      height: 0,
      base_experience: 0,
      type: [],
      showIt: false,
      showMenu: false,
      alert_message: "",
    };
  },
  created() {
    this.gettingData();
  },

  methods: {
    async gettingData() {
      const name = this.$route.params.name.toString().toLocaleLowerCase();

      const defaultData: DataProps = await fetchData(
        `${store.url_default}${store.pokename || name}`
      );
      const speciesData: SpeciesProps = await fetchData(
        `${store.url_species}${store.pokename || name}`
      );

      if (defaultData.error || speciesData.error) {
        return (this.alert_message = defaultData.message);
      }

      this.url_img = defaultData.sprites.front_default;
      this.stats = store.stats || defaultData.stats;
      this.weight = convertToKg(store.weight || defaultData.weight);
      this.height = convertToCm(store.height || defaultData.height);
      this.base_experience = defaultData.base_experience;

      const dataEvolution = await fetchData(speciesData.evolution_chain.url);

      const chain = dataEvolution.chain;

      if (chain.species?.name) {
        const name = chain.species.name;
        this.evolutions[0].name = name;
        this.evolutions[0].url = `/detalhes/${name}`;
      }
      if (chain.evolves_to) {
        const name = chain.evolves_to[0].species.name;
        this.evolutions[1].name = name;
        this.evolutions[1].url = `/detalhes/${name}`;
      }
      if (chain.evolves_to[0].evolves_to) {
        const name = chain.evolves_to[0].evolves_to[0].species.name;
        this.evolutions[2].name = name;
        this.evolutions[2].url = `/detalhes/${name}`;
      }
      this.showIt = true;

      this.setUrlImg();
    },
    async setUrlImg() {
      this.evolutions.forEach(async (evolution) => {
        const data: DataProps = await fetchData(
          `${store.url_default}${evolution.name}`
        );

        evolution.link_img = data.sprites.front_default;
      });
    },
    showOrHidden() {
      this.showMenu = !this.showMenu;
    },
  },
  computed: {
    nameCapitalized() {
      return capitilized(this.name);
    },
    firstEvolution(): string {
      return capitilized(this.evolutions[0].name);
    },
    middleEvolution(): string {
      return capitilized(this.evolutions[1].name);
    },
    lastEvolution(): string {
      return capitilized(this.evolutions[2].name);
    },
  },
};
</script>
<template>
  <div v-show="alert_message" class="alert_component">
    <Alert :message="alert_message" />
    <router-Link to="/">Página Inicial</router-Link>
  </div>

  <div v-show="showIt" class="container">
    <h1>{{ nameCapitalized }}</h1>
    <img :src="url_img" :alt="name" @click="showOrHidden" />
    <section class="content">
      <!-- IMG -->
      <!-- IMG -->

      <!-- Stats -->
      <section class="stats">
        <ul>
          <li>Peso: {{ weight }} kg</li>
          <li>Altura: {{ height }} cm</li>
          <li>Experiência: {{ base_experience }}</li>
        </ul>
      </section>
      <!-- Stats -->

      <!-- Stats - ADVANCED -->

      <section v-show="showMenu" class="stats_advanced">
        <ul>
          <li v-for="(stat, index) in stats" :key="index">
            {{ stat.stat.name.replace("-", " ") + ": " + stat.base_stat }}
          </li>
        </ul>
      </section>
      <!-- Stats - ADVANCED -->
    </section>
    <!-- Evolutions -->
    <section class="evolutions">
      <h2>Evoluções</h2>
      <ul>
        <li v-for="(evolution, index) in evolutions" :key="index">
          <router-link :to="evolution.url">
            <img :src="evolution.link_img" :alt="evolution.name" />
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.alert_component {
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  h1 {
    text-align: center;
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
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    justify-content: space-around;

    .stats,
    .stats_advanced {
      ul {
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

@media (min-width: $breakpoint-tablet) {
  .container {
    .content {
      flex-direction: row;
    }
    .evolutions {
      ul {
        flex-direction: row;
      }
    }
  }
}
</style>
