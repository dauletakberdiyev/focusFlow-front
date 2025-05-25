<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const step = ref(1)

  const mainGoal = ref('')
  const focusChallenge = ref('')

  const handleNext = () => {
    if (step.value === 1 && mainGoal.value) {
      step.value = 2
    }
    // You can add more steps here if needed
  }
  
  const router = useRouter()

  const handleSubmit = () => {
    router.push({ name: 'home' })
  }
</script>

<template>
<!-- Patch the original question radios to use v-model and only show on step 1 -->
  <div class="text-lg">Personalize your experience</div>
  <template v-if="step === 1">
    <div class="mt-10">
      <div class="text-2xl font-semibold">What is your main goals for using this app?</div>
      <div class="flex flex-col gap-4 my-4 text-start">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" v-model="mainGoal" value="Improve productivity and time management"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Improve productivity and time management</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" v-model="mainGoal" value="Track and complete daily tasks"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Track and complete daily tasks</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" v-model="mainGoal" value="Stay focused during work sessions"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Stay focused during work sessions</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" v-model="mainGoal" value="Build better work habits"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Build better work habits</span>
        </label>
      </div>
    </div>
  </template>

  <template v-if="step === 2">
    <div class="mt-10 w-full flex flex-col items-center">
      <div class="text-2xl font-semibold">What is your biggest challenge with staying focused?</div>
      <div class="flex flex-col gap-4 my-4 text-start w-full max-w-md">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="focusChallenge" v-model="focusChallenge" value="Distractions from phone/social media"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Distractions from phone/social media</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="focusChallenge" v-model="focusChallenge" value="Procrastination"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Procrastination</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="focusChallenge" v-model="focusChallenge" value="Lack of motivation"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Lack of motivation</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="focusChallenge" v-model="focusChallenge" value="Too many tasks at once"
            class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Too many tasks at once</span>
        </label>
      </div>
      <!-- You can add another button for "Finish" or "Continue" here if needed -->
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