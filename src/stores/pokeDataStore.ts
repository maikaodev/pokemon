import { defineStore } from "pinia";
// TS
import { ErrorProps, PokemonProps } from "../types/pages";
import { fetchData } from "../utils/fetchData";

export const pokeDataStore = defineStore("pokeData", {
  state() {
    return {
      url_default: "https://pokeapi.co/api/v2/pokemon/",
      url_species: "https://pokeapi.co/api/v2/pokemon-species/", //https://pokeapi.co/api/v2/pokemon-species/pikachu/
      pokemons: {} as Record<string, PokemonProps>,
    };
  },

  actions: {
    async findOrGetPokemon(name: string): Promise<PokemonProps | ErrorProps> {
      if (this.pokemons[name]) {
        return this.pokemons[name];
      }
      const pokemonData: PokemonProps | ErrorProps = await fetchData(
        this.url_default + name
      );

      if ("error" in pokemonData) return pokemonData;

      this.pokemons[name] = pokemonData;

      return this.pokemons[name];
    },
  },
});
