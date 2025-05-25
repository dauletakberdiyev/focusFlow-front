<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { User } from '../types/user';
  import { supabase } from '../supabase';

  const username = ref('User');
  const tgId = ref('');

  const user = ref<User | null>(null);
 
  onMounted(() => {
    // @ts-ignore
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user && window.Telegram.WebApp.initDataUnsafe.user.username) {
      // @ts-ignore
      const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
      // @ts-ignore
      username.value = tgUser?.username;
      // @ts-ignore
      tgId.value = tgUser.id;

      getUser(tgId.value);

      if (!user.value) {
        createUser(tgUser);
      }
    }
  });

  async function getUser(tgId: string) {
    const { data, error } = await supabase.from('users').select('*').eq('tg_id', tgId).single();
    if (error) {
      throw error;
    } else {
      user.value = data;
    }
  }
  async function createUser(user: any) {
    const { data, error } = await supabase.from('users').insert({
      tg_id: user.id,
      firt_name: user.first_name,
      tg_username: user?.username,
      photo_url: user?.photo_url
    });
  }
</script> 

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-2xl font-medium">Welcome {{ username }}! Your ID: {{ tgId }}</div>
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