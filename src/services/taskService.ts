import { supabase } from "../supabase";
import type { Task } from "../types/task";

export default () => ({
    getTasks: async (user_id: number): Promise<Task[]> => {
        const { data, error } = await supabase.from('tasks')
            .select(`
                id,
                title,
                user_id,
                created_at,
                is_completed
            `)
            .eq('user_id', user_id)
            .eq('is_completed', false)
            .limit(5);

        if (error) {
            throw new Error();
        }

        return data;
    },
    getNotCompletedTasks: async (user_id: number): Promise<Task[]> => {
        const { data, error } = await supabase.from('tasks')
            .select(`
                id,
                title,
                user_id,
                created_at,
                is_completed
            `)
            .eq('user_id', user_id)
            .eq('is_completed', false);

        if (error) {
            throw new Error();
        }

        return data;
    },
    getCompletedTasks: async (user_id: number): Promise<Task[]> => {
        const { data, error } = await supabase.from('tasks')
            .select(`
                id,
                title,
                user_id,
                created_at,
                is_completed
            `)
            .eq('user_id', user_id)
            .eq('is_completed', true);

        if (error) {
            throw new Error();
        }

        return data;
    },
    toggleTask: async (task_id: number, is_completed: boolean): Promise<void> => {
        const { error } = await supabase.from('tasks')
            .update({is_completed: !is_completed})
            .eq('id', task_id);

        if (error) {
            throw new Error();
        }
    }
});