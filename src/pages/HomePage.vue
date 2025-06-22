<script setup lang="ts">
import Footer from '../components/Footer.vue';
import { computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task';
import userService from '../services/userService';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const taskStore = useTaskStore();
const { user } = storeToRefs(userStore);

const tasks = computed(() => taskStore.tasks);

watch(
  user,
  (newUser) => {
    if (newUser?.id) {
      taskStore.getTasks(parseInt(newUser.id));
    }
  },
  { immediate: true }
);

onMounted(() => {
  let tgUserId;
  // @ts-ignore
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    // @ts-ignore
    tgUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
  }
  else {
    tgUserId = 7444943529;
  }
  
  try {
    userService().getUserByTgId(tgUserId)
    .catch(() => {
      router.push({ name: 'welcome' });
    })
  } 
  catch (error) {
    router.push({ name: 'welcome' });
  }
})
</script> 

<template>
  <div class="flex flex-col">
    <div class="text-left text-2xl">
      Welcome back, {{ user?.first_name }}!
    </div>
    <div class="text-left text-lg italic py-5 my-3 pl-3 border-l-4 rounded-sm border-gray-500">
      Together we can do it!!!
    </div>
    <div class="flex flex-col my-3">
      <div class="text-left text-base">
        How are you feeling today?
      </div>
      <div class="flex mt-4 bg-gray-200 p-5 rounded-sm justify-around">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434"/>
          </svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
          </svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-neutral" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5m3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5m4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5"/>
          </svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-tear" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M6.831 11.43A3.1 3.1 0 0 1 8 11.196c.916 0 1.607.408 2.25.826.212.138.424-.069.282-.277-.564-.83-1.558-2.049-2.532-2.049-.53 0-1.066.361-1.536.824q.126.27.232.535.069.174.135.373ZM6 11.333C6 12.253 5.328 13 4.5 13S3 12.254 3 11.333c0-.706.882-2.29 1.294-2.99a.238.238 0 0 1 .412 0c.412.7 1.294 2.284 1.294 2.99M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5m-1.5-3A.5.5 0 0 1 10 3c1.162 0 2.35.584 2.947 1.776a.5.5 0 1 1-.894.448C11.649 4.416 10.838 4 10 4a.5.5 0 0 1-.5-.5M7 3.5a.5.5 0 0 0-.5-.5c-1.162 0-2.35.584-2.947 1.776a.5.5 0 1 0 .894.448C4.851 4.416 5.662 4 6.5 4a.5.5 0 0 0 .5-.5"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="flex flex-col my-3">
      <div class="flex flex-row justify-between items-center">
        <div class="font-medium text-lg">Daily Tasks</div>
        <div class="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          <span class="text-base">Add</span>
        </div>
      </div>
      <div class="flex flex-col gap-3 mt-3">
        <div
          v-for="task in tasks"
          class="flex gap-2 items-center bg-gray-200 px-3 py-2 rounded-sm"
        >
          <input
            type="checkbox"
            name="task1"
            class="w-5 h-5"
          />
          <span class="">{{ task.title }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col my-3 items-center">
      <div class="bg-gray-900 py-3 px-5 rounded-sm w-48 text-white cursor-pointer">
        Let's focus
      </div>
    </div>
  </div>
  <Footer />
</template>