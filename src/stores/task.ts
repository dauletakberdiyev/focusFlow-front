import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Task } from "../types/task";
import taskService from "../services/taskService";

export const useTaskStore = defineStore('task', () => {
    const tasks: Ref<Task[] | null> = ref(null);
    const notCompletedTasks: Ref<Task[] | null> = ref(null);
    const completedTasks: Ref<Task[] | null> = ref(null);

    const getTasks = async(user_id: number) => {
        tasks.value = null;

        try {
            tasks.value = await taskService().getTasks(user_id);
        } 
        catch (error) {
            throw new Error();
        }
    }

    const getNotCompletedTasks = async(user_id: number) => {
        notCompletedTasks.value = null;

        try {
            notCompletedTasks.value = await taskService().getNotCompletedTasks(user_id);
        } 
        catch (error) {
            throw new Error();
        }
    }

    const getCompletedTasks = async(user_id: number) => {
        completedTasks.value = null;

        try {
            completedTasks.value = await taskService().getCompletedTasks(user_id);
        } 
        catch (error) {
            throw new Error();
        }
    }

    const toggleTask = async(user_id: number, task_id: number, is_completed: boolean = false) => {
        completedTasks.value = null;
        notCompletedTasks.value = null;

        try {
            await taskService().toggleTask(task_id, is_completed);
            completedTasks.value = await taskService().getCompletedTasks(user_id);
            notCompletedTasks.value = await taskService().getNotCompletedTasks(user_id);
        } 
        catch (error) {
            throw new Error();
        }
    }

    return {
        tasks,
        notCompletedTasks,
        completedTasks,
        getTasks,
        getNotCompletedTasks,
        getCompletedTasks,
        toggleTask
    }
});