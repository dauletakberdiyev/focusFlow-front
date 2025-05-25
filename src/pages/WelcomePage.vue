<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const username = ref('User');
  
  onMounted(() => {
    // @ts-ignore
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user && window.Telegram.WebApp.initDataUnsafe.user.username) {
      // @ts-ignore
      username.value = window.Telegram.WebApp.initDataUnsafe.user.username
      console.log(window.Telegram.WebApp.initDataUnsafe.user.id);
    }
  })
</script> 

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-2xl font-medium">Welcome {{ username }}!</div>
    <div class="text-2xl font-medium mb-4">Focus on what matters</div>
    <div class="text-base">
      Boost your productivity with our task tracking app, featuring a built-in Pomodoro timer to help
      you stay focused and achieve your goals.
    </div>
    <router-link 
      :to="{ name: 'questionary' }"
      class="btn-primary mt-5 px-5 py-3 bg-blue-500 text-white rounded-xl">
      Get Started
    </router-link>
  </div>
</template>