import type { User, tgUser } from "../types/user";
import { supabase } from "../supabase";

export default () => ({
    getUser: async (tgId: number): Promise<User> => {
        const { data, error } = await supabase.from('users').select('*').eq('tg_id', tgId).single(); 

        if (error) {
            throw new Error();
        }
        
        return data;
    },

    createUser: async (user: tgUser): Promise<User> => {
        const { data } = await supabase
            .from('users')
            .insert({
                tg_id: user.id,
                first_name: user.first_name,
                tg_username: user?.username,
                photo_url: user?.photo_url
            })
            .select();
        
        if (!data || !data[0]) throw new Error("User creation failed");
        const newUser = data[0];

        return {
            id: newUser.id,
            first_name: newUser.first_name,
            tg_username: newUser.tg_username,
            tg_id: newUser.tg_id,
            photo_url: newUser.photo_url,
            created_at: newUser.created_at
        }
    }
})