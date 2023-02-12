import { defineStore } from "pinia";
// TS
import { StatsProps } from "../types/pages";

export const SpeciesOfPokemon = defineStore("species", {
  state() {
    return { id: 0, stats: [] as StatsProps[] };
  },

  actions: {
    updatingStats(id: number, stats: StatsProps[]) {
      this.id = id;
      this.stats = stats;
    },
  },

  getters: {
    urlSpecies(): string {
      return `https://pokeapi.co/api/v2/pokemon-species/${this.id}/`;
    },
  },
});
