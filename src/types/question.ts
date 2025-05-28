export type Question = {
    id: number,
    text: string,
    answer_options: Answer[]
}

export type Answer = {
    id: number,
    question_id: number,
    text: string
}

export type SubmitAnswers = {
    user_id: number
    question_id: number,
    answer_id: number
}