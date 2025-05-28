import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Question, SubmitAnswers } from "../types/question";
import questionService from "../services/questionService";

export const useQuestionStore = defineStore('question', () => {
    const question: Ref<Question | null> = ref(null);
    const questions: Ref<Question[] | null> = ref(null);

    const getQuestions = async() => {
        questions.value = null;

        try {
            questions.value = await questionService().getQuestions();
        } 
        catch (error) {
            throw new Error();
        }
    }

    const submitAnswers = async(userAnswers: SubmitAnswers[]) => {
        try {
            await questionService().submitAnswers(userAnswers);
        }
        catch (error) {
            throw new Error();
        }
    }

    return {
        question,
        questions,
        getQuestions,
        submitAnswers
    }
});