<template>
  <q-page padding>
    <template v-if="isLoading"> Loading... </template>
    <template v-else>
      <q-list class="column">
        <q-item v-for="post in posts" :key="post.id">
          <post-card :post="post"></post-card>
        </q-item>
      </q-list>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue';

import { storeToRefs } from 'pinia';
import PostCard from 'src/components/PostCard.vue';
import { usePostStore } from 'src/stores/posts';
import { useUserStore } from 'src/stores/users';

const isLoading = ref(false);
const userStore = useUserStore();
const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const { loadPosts } = postStore;

const loadPostAndUsers = async () => {
  try {
    isLoading.value = true;
    await userStore.loadUsers();
    userStore.preloadAvatars();
    await postStore.loadPosts();
  } catch (error) {
    console.error('🚀 error when showing all posts and users in indexPage :', error);
  }finally{
    isLoading.value = false;
  }
}

onMounted(() => {
  loadPostAndUsers();
});
</script>
