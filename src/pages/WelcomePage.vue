<script setup lang="ts">
  import Footer from '../components/Footer.vue'
  import { ref, onMounted } from 'vue'

  const username = ref('User')
  onMounted(() => {
    // @ts-ignore
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user && window.Telegram.WebApp.initDataUnsafe.user.username) {
      // @ts-ignore
      username.value = window.Telegram.WebApp.initDataUnsafe.user.username
    }
  })
</script> 

<template>
  <div class="font-bold">Welcom Home {{ username }}</div>
  <Footer />
</template>