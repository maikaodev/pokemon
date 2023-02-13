import { capitalized } from "./capitalized";

const statsTranslations: Record<string, string> = {
  hp: "Vida",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque especial",
  "special-defense": "Defesa especial",
  speed: "Velocidade",
};

export function translateStat(name: string) {
  return statsTranslations[name] || capitalized(name.replace("-", " "));
}
