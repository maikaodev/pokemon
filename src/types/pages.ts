export type StatsProps = {
  base_stat: number;
  effort: number;
  stat: { name: string };
};

export type ErrorProps = {
  error: boolean;
  message: string;
};

export type TypeProps = {
  type: { name: string };
};

export type PokemonProps = {
  name: string;
  detailsUrl: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: StatsProps[];
  sprites: { front_default: string };
  types: TypeProps[];
};

export type SpeciesProps = {
  evolution_chain: {
    url: string;
  };
};

export type PokemonDetails = PokemonProps & {
  evolutions: PokemonProps[];
};
