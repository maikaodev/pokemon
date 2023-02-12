import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state() {
    return { count: 0 };
  },

  actions: {
    increment() {
      this.count++;
    },
  },

  getters: {
    showCount(): string {
      return "O valor do counter é: " + this.count;
    },
  },
});
