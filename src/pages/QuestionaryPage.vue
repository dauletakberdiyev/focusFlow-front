<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '../stores/question'
import { useUserStore } from '../stores/user';
import type { Answer, SubmitAnswers } from '../types/question';

const questionStore = useQuestionStore();
const userStore = useUserStore();

const questions = computed(() => questionStore.questions);
const user = computed(() => userStore.user);

const step = ref(1);

const mainGoal: Ref<Answer | null> = ref(null);
const focusChallenge: Ref<Answer | null> = ref(null);
const answers: Ref<SubmitAnswers[]> = ref([]);

const handleNext = () => {
  if (step.value === 1 && mainGoal.value) {
    step.value = 2
  }
}

const router = useRouter()

const handleSubmit = () => {
  if (mainGoal.value) {
    answers.value.push({
      user_id: parseInt(user.value?.id!),
      question_id: mainGoal.value.question_id,
      answer_id: mainGoal.value.id
    });
  }
  if (focusChallenge.value) {
    answers.value.push({
      user_id: parseInt(user.value?.id!),
      question_id: focusChallenge.value.question_id,
      answer_id: focusChallenge.value.id
    });
  }
  questionStore.submitAnswers(answers.value);
  
  router.push({ name: 'home' })
}

onMounted(() => {
  questionStore.getQuestions();
})
</script>

<template>
  <div class="text-lg">Personalize your experience</div>
  <template v-if="step === 1 && questions && questions.length > 0">
    <div class="mt-10">
      <div class="text-2xl font-semibold">{{ questions[0]?.text }}</div>
      <div class="flex flex-col gap-4 my-4 text-start">
        <label
          v-for="option in questions[0]?.answer_options"
          :key="option.id"
          class="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name="mainGoal"
            v-model="mainGoal"
            :value="option"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span class="select-none peer-checked:text-blue-600">{{ option.text }}</span>
        </label>
      </div>
    </div>
  </template>

  <template v-if="step === 2 && questions && questions.length > 0">
    <div class="mt-10">
      <div class="text-2xl font-semibold">{{ questions[1]?.text }}</div>
      <div class="flex flex-col gap-4 my-4 text-start">
        <label
          v-for="option in questions[1]?.answer_options"
          :key="option.id"
          class="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name="focusChallenge"
            v-model="focusChallenge"
            :value="option"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span class="select-none peer-checked:text-blue-600">{{ option.text }}</span>
        </label>
      </div>
    </div>
  </template>

  <!-- Patch the Next button to call handleNext and only show on step 1 -->
  <button 
    v-if="step === 1"
    :disabled="!mainGoal"
    @click="handleNext"
    class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed">
    Next
  </button>
  <div
    v-if="step === 2"
    class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md flex flex-row gap-4 z-10">
    <button
      @click="step = 1"
      class="flex-1 py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      Previous
    </button>
    <button
      :disabled="!focusChallenge"
      @click="handleSubmit"
      class="flex-1 py-3 bg-green-500 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      Submit
    </button>
  </div>
</template>