<script lang="ts">
// Router
import { useRouter } from "vue-router";
const router = useRouter();
// Functions - utils
import { fetchData } from "../utils/fetchData";

// Store
import { pokeDataStore } from "../stores/pokeDataStore";

const store = pokeDataStore();

// TS
import { DataProps, StatsProps } from "../types/pages";
import { capitilized } from "../utils/capitilized";

export default {
  name: "Details",

  data() {
    const stats: StatsProps[] = [];
    return {
      name: this.$route.params.name.toString(),
      url_img: "",
      stats,
      first_evolution: {
        name: "",
        url: "",
      },
      middle_evolution: {
        name: "",
        url: "",
      },
      last_evolution: {
        name: "",
        url: "",
      },
      weight: 0,
      height: 0,
      base_experience: 0,
      type: [],
      showIt: false,
    };
  },
  created() {
    this.gettingData();
  },

  methods: {
    async gettingData() {
      //
      const name = this.$route.params.name.toString();

      // Datas
      const defaultData: DataProps = await fetchData(
        `${store.url_default}${name.toLowerCase()}`
      );
      const speciesData = await fetchData(
        `${store.url_species}${name.toLowerCase()}`
      );

      // Error

      if (defaultData.error) {
        return alert(defaultData.message);
      }

      // States

      this.url_img = defaultData.sprites.front_default;
      this.stats = defaultData.stats;
      this.weight = defaultData.weight;
      this.height = defaultData.height;
      this.base_experience = defaultData.base_experience;

      const dataEvolution = await fetchData(speciesData.evolution_chain.url);

      const chain = dataEvolution.chain;

      if (chain.species?.name) {
        const name = chain.species.name;
        this.first_evolution.name = name;
        this.first_evolution.url = `/detalhes/${name}`;
      }
      if (chain.evolves_to) {
        const name = chain.evolves_to[0].species.name;
        this.middle_evolution.name = name;
        this.middle_evolution.url = `/detalhes/${name}`;
      }
      if (chain.evolves_to[0].evolves_to) {
        const name = chain.evolves_to[0].evolves_to[0].species.name;
        this.last_evolution.name = name;
        this.last_evolution.url = `/detalhes/${name}`;
      }
      this.showIt = true;
    },
  },
  computed: {
    nameCapitalized() {
      return capitilized(this.name);
    },
    firstEvolution(): string {
      return capitilized(this.first_evolution.name);
    },
    middleEvolution(): string {
      return capitilized(this.middle_evolution.name);
    },
    lastEvolution(): string {
      return capitilized(this.last_evolution.name);
    },
  },
};
</script>
<template>
  <div v-show="showIt" class="container">
    <h1>Nome: {{ nameCapitalized }}</h1>
    <section class="content">
      <!-- Stats -->
      <section class="stats">
        <ul>
          <li>Weight: {{ weight }}</li>
          <li>Height: {{ height }}</li>
          <li>Base experience: {{ base_experience }}</li>
        </ul>
      </section>
      <!-- Stats -->

      <!-- IMG -->
      <img :src="url_img" :alt="name" />
      <!-- IMG -->

      <!-- Stats - ADVANCED -->

      <section class="stats_advanced">
        <ul>
          <li v-for="(stat, index) in stats" :key="index">
            {{ stat.stat.name + ": " + stat.base_stat }}
          </li>
        </ul>
      </section>
      <!-- Stats - ADVANCED -->
    </section>
    <!-- Evolutions -->
    <section class="evolutions">
      <h2>Evoluções:</h2>
      <ul>
        <li>
          <a :href="first_evolution.url">{{ firstEvolution }}</a>
        </li>
        <li>
          <a :href="middle_evolution.url">{{ middleEvolution }}</a>
        </li>
        <li>
          <a :href="last_evolution.url">{{ lastEvolution }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 150px;
      height: 150px;
    }
    .stats,
    .stats_advanced {
      ul {
        display: flex;
        flex-direction: column;

        gap: 16px;

        list-style: none;
      }
    }
  }
}
</style>
