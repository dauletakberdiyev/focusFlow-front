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
            .eq('is_completed', false);

        if (error) {
            throw new Error();
        }

        return data;
    }
});