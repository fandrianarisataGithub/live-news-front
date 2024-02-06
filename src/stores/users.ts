import { ref } from 'vue';

import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/types';

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);

    const loadUsers = async () => {
        try {
            const response = await api.get<User[]>('/users');
            if(response.status === 200){
                users.value = response.data;
            }
        } catch (error) {
            console.log('Error loading users:', error);
            users.value = [];
        }
    };

    const preloadAvatars = () => {
        users.value.forEach((user) => {
            if(user.avatar) {
                const img = new Image();
                img.src = user.avatar;
            }
        })
    };

    return {
        users,
        loadUsers,
        preloadAvatars
    }
})