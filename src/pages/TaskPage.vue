<script setup lang="ts">
import { ref } from 'vue'
import Footer from '../components/Footer.vue'

const activeTab = ref<'todo' | 'completed'>('todo')

// Optional: swipe handling (simple version)
function handleSwipe(event: TouchEvent) {
  const touch = event.changedTouches[0]
  const startX = touch.clientX
  let endX: number

  const handleEnd = (e: TouchEvent) => {
    endX = e.changedTouches[0].clientX
    if (startX - endX > 50) activeTab.value = 'completed' // swipe left
    else if (endX - startX > 50) activeTab.value = 'todo' // swipe right

    window.removeEventListener('touchend', handleEnd)
  }

  window.addEventListener('touchend', handleEnd)
}
</script>

<template>
  <div class="flex flex-col" @touchstart="handleSwipe">
    <div class="text-xl font-semibold">Tasks</div>

    <div class="flex flex-col mt-9">
      <div class="flex flex-row justify-around text-lg relative">
        <div
          class="pb-2 cursor-pointer"
          :class="{ 'border-b-4 border-blue-500': activeTab === 'todo' }"
          @click="activeTab = 'todo'"
        >
          To Do
        </div>
        <div
          class="pb-2 cursor-pointer"
          :class="{ 'border-b-4 border-blue-500': activeTab === 'completed' }"
          @click="activeTab = 'completed'"
        >
          Completed
        </div>
        <!-- Bottom line for style -->
        <div class="absolute border-b w-screen bottom-0"></div>
      </div>

      <!-- Content -->
      <div class="mt-6">
        <div v-if="activeTab === 'todo'">To Do tasks here...</div>
        <div v-else>Completed tasks here...</div>
      </div>
    </div>
  </div>

  <Footer />
</template>
