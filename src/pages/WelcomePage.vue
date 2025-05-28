<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const username = ref('User');

onMounted(() => {
  // @ts-ignore
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user && window.Telegram.WebApp.initDataUnsafe.user.username) {
    // @ts-ignore
    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
    // @ts-ignore
    username.value = tgUser?.first_name;

    userStore.authUser(tgUser);
  }
  else {
    userStore.getUser(7444943529).then(() => {
      const user = userStore.user;
      username.value = user?.first_name as string;
    });
  }
});
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