import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { tgUser, User } from "../types/user";
import userService from "../services/userService";

export const useUserStore = defineStore('user', () => {
    const user: Ref<User | null> = ref(null);

    const authUser = async(tgUser: tgUser) => {
        user.value = null;

        try {
            user.value = await userService().getUserByTgId(parseInt(tgUser.id));
        }
        catch (error) {
            createUser(tgUser);
        }
    }

    const createUser = async(newUser: tgUser) => {
        try {
            user.value = await userService().createUser(newUser);
        }
        catch (error) {
            throw new Error();
        }
    }

    const getUser = async(userId: number) => {
        user.value = null;

        try {
            user.value = await userService().getUser(userId);
        }
        catch (error) {
            throw new Error();
        }
    }

    return {
        user,
        authUser,
        createUser,
        getUser
    }
}, {
    persist: {
        paths: ['user.id']
    },
});