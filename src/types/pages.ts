export type StatsProps = {
  base_state: number;
  effort: number;
  stat: { name: string };
};

export type DataProps = {
  error: boolean;
  message: string;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: [{ type: { name: string } }];
  id: number;
  stats: StatsProps[];
};
