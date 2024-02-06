import { ref } from 'vue';

import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Post } from 'src/types';

export const usePostStore = defineStore('posts', () => {

  const posts = ref<Post[]>([]);
  const loadPosts = async () => {
    posts.value = [];
    try {
      const response = await api.get<Post[]>('/posts/find?sort=updatedAt DESC');
      if (response.status === 200) {
        posts.value = response.data;
      }
    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
    } 
  };

  return {
    posts,
    loadPosts,
  };
});
