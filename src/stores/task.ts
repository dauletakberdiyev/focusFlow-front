import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Task } from "../types/task";
import taskService from "../services/taskService";

export const useTaskStore = defineStore('task', () => {
    const tasks: Ref<Task[] | null> = ref(null);

    const getTasks = async(user_id: number) => {
        tasks.value = null;

        try {
            tasks.value = await taskService().getTasks(user_id);
        } 
        catch (error) {
            throw new Error();
        }
    }

    return {
        tasks,
        getTasks
    }
});