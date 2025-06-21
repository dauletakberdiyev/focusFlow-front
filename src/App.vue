<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useUserStore } from './stores/user';
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  onMounted(() => {
    if (user.value?.id) {
      userStore.getUser(parseInt(user.value.id));
    }
  });
</script>

<template>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
