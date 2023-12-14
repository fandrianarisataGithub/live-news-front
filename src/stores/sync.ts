import 'pinia';
import { defineStore } from 'pinia';
import { useOnline } from '@vueuse/core';
import { computed, ref } from 'vue';
export const useSyncState = defineStore('sync', () => {
  const isOnline = computed(() => {
    return useOnline();
  });
  const itemsProgression = ref(0);

  const getItemsLoadingProgression = computed(() => {
    return itemsProgression.value;
  });
  const getItemsLoadingProgressionValue = computed(() => {
    return itemsProgression.value / 100;
  });

  const simulateProgression = () => {
    const fakeArray = [10, 25, 50, 75, 100];
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fakeArray.length) {
        itemsProgression.value = fakeArray[index++];
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return {
    isOnline,
    getItemsLoadingProgression,
    getItemsLoadingProgressionValue,
    simulateProgression,
  };
});
