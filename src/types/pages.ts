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
  stats_advanced: StatsProps[];
  stats_base: { weight: number; height: number; base_experience: number };
  sprites: { front_default: string };
  types: TypeProps[];
  species: {
    evolution_chain: { url: string };
  };
};
