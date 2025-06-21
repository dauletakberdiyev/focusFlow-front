import { supabase } from "../supabase";
import type { Question, SubmitAnswers } from "../types/question";

export default () => ({
    getQuestions: async (): Promise<Question[]> => {
        const { data, error } = await supabase.from('questions')
            .select(`
                id,
                text,
                answer_options (
                    id,
                    question_id,
                    text
                )    
            `);
        
        if (error) {
            throw new Error();
        }

        return data;
    },

    submitAnswers: async (userAnswers: SubmitAnswers[]): Promise<void> => {
        const { error } = await supabase.from('user_answers')
            .insert(userAnswers)
            .select();

        if (error) {
            throw new Error();
        }
    }
});