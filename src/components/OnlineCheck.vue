<template>
  <div class="network-status" :class="isOnline ? 'green' : 'red'"></div>
</template>

<script setup lang="ts">
import { useSyncState } from './../stores/sync';
const { isOnline } = useSyncState();
</script>

<style>
.network-status {
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 8px;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 32px;
  &.green {
    background-color: green;
  }
  &.red {
    background-color: red;
  }
}
</style>
