<script setup lang="ts">
  import Footer from '../components/Footer.vue';
  import { supabase } from '../supabase';
  import { ref, onMounted } from 'vue'
  import type { User } from '../types/user';

  const users = ref<User[]>([])

  onMounted(() => {
    getUsers();
  })

  async function getUsers() {
    const { data, error, status } = await supabase.from('users').select('*');
    if (error && status !== 406) {
      throw error;
    } else {
      users.value = data ?? []
    }
  }
  
</script> 

<template>
  <div>
    <h1>Home Page</h1>
    <h1>{{ users }}</h1>
  </div>
  <Footer />
</template>