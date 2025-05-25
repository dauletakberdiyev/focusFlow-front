<script setup lang="ts">
  import Footer from '../components/Footer.vue'
  
</script> 

<template>
  <div class="flex flex-col items-center">
    <div class="text-lg">Personalize your experience</div>
    <div class="mt-10">
      <div class="text-2xl font-semibold">What is your main goals for using this app?</div>
      <div class="flex flex-col gap-4 my-4 text-start">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Improve productivity and time management</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Track and complete daily tasks</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Stay focused during work sessions</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="mainGoal" class="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-400 checked:bg-blue-500 checked:border-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <span class="select-none peer-checked:text-blue-600">Build better work habits</span>
        </label>
      </div>
    </div>
  <button class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md py-3 bg-blue-500 text-white rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors z-10">
    Next
  </button>
  </div>
</template>