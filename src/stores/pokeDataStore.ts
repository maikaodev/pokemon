import { defineStore } from "pinia";
// TS
import { CardProps, StatsProps } from "../types/pages";

export const pokeDataStore = defineStore("pokeData", {
  state() {
    return {
      pokename: "",
      url_default: "https://pokeapi.co/api/v2/pokemon/",
      url_species: "https://pokeapi.co/api/v2/pokemon-species/", //https://pokeapi.co/api/v2/pokemon-species/pikachu/
      stats: [] as StatsProps[],
      card: {} as CardProps,
    };
  },

  actions: {
    setPokename(name: string) {
      this.pokename = name;
    },
    setStats(stats: StatsProps[]) {
      this.stats = stats;
    },
  },
});
