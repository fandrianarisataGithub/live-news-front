<template>
  <div class="text-semi-bold username">
    <div>Hello, {{ formattedName }}</div>
  </div>
  <slot name="online"></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['click', 'openSetting']);

const formattedName = computed(() => {
  return props.username;
});

const emitOpenSetting = () => {
  emit('openSetting');
};
</script>
