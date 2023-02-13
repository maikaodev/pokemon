import { defineStore } from "pinia";

import {
  ErrorProps,
  PokemonDetails,
  PokemonProps,
  SpeciesProps,
} from "../types/pages";

import { capitalized } from "../utils/capitalized";
import { convertToCm } from "../utils/convertToCm";
import { convertToKg } from "../utils/convertToKg";

import { fetchData } from "../utils/fetchData";

export const pokeDataStore = defineStore("pokeData", {
  state() {
    return {
      url_default: "https://pokeapi.co/api/v2/pokemon/",
      url_species: "https://pokeapi.co/api/v2/pokemon-species/",
      pokemons: {} as Record<string, PokemonProps>,
    };
  },

  actions: {
    async getPokemon(nameParam: string): Promise<PokemonProps | ErrorProps> {
      const name = nameParam.toString().toLowerCase();

      if (this.pokemons[name]) {
        return this.pokemons[name];
      }

      const pokemonData: PokemonProps | ErrorProps = await fetchData(
        this.url_default + name
      );

      if ("error" in pokemonData) return pokemonData;

      this.pokemons[name] = {
        ...pokemonData,
        height: convertToCm(pokemonData.height),
        weight: convertToKg(pokemonData.weight),
        name: capitalized(pokemonData.name),
        detailsUrl: `/detalhes/${pokemonData.name}`,
      };

      return this.pokemons[name];
    },

    async getPokemonDetails(
      nameParam: string
    ): Promise<PokemonDetails | ErrorProps> {
      const name = nameParam.toString().toLowerCase();
      const pokemonData = await this.getPokemon(name);
      const speciesData: SpeciesProps | ErrorProps = await fetchData(
        `${this.url_species}${name}`
      );

      if ("error" in speciesData) return speciesData;

      // TODO: Criar tipo para resposta da API
      const dataEvolution = await fetchData(speciesData.evolution_chain.url);

      if ("error" in dataEvolution) return dataEvolution;

      const chain = dataEvolution.chain;

      let evolutions = [];

      if (chain.species?.name) {
        const name = chain.species.name;
        evolutions.push(name);
      }

      if (chain.evolves_to?.length > 0) {
        const name = chain.evolves_to[0].species.name;
        evolutions.push(name);

        if (chain.evolves_to[0].evolves_to?.length > 0) {
          const name = chain.evolves_to[0].evolves_to[0].species.name;
          evolutions.push(name);
        }
      }

      const evolutionsData = await Promise.all(
        evolutions.map((evolution) => {
          // TODO: Tratar resposta de erro para remover cast
          return this.getPokemon(evolution);
        })
      );

      return {
        ...pokemonData,
        evolutions: evolutionsData as PokemonProps[],
      };
    },
  },
});
