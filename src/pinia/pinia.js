import { defineStore } from "pinia"
export const usePinia = defineStore('mainPinia', {
  state: () => {
    return {
      pCount: 8
    }
  },
  getters: {
    updateCount(state) {
      return state.pCount * 2
    }
  },
  actions: {

  }
})