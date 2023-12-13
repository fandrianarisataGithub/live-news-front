import 'pinia';
import { defineStore } from 'pinia';

export const useSyncState = defineStore('sync', {
  state: () => {
    return {
      itemsProgression: 0,
    };
  },
  getters: {
    getItemsLoadingProgression: (state) => state.itemsProgression,
    getItemsLoadingProgressionValue: (state) => state.itemsProgression / 100,
  },
  actions: {
    simulateProgression() {
      const fakeArray = [10, 25, 50, 75, 100];
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < fakeArray.length) {
          this.itemsProgression = fakeArray[index++];
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    },
  },
});
