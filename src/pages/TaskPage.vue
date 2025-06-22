<script setup lang="ts">
import { ref } from 'vue'
import Footer from '../components/Footer.vue'

const activeTab = ref<'todo' | 'completed'>('todo')
const slideDirection = ref<'left' | 'right'>('left')

let startX = 0
let startY = 0

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  startX = touch.clientX
  startY = touch.clientY
}

function handleTouchEnd(event: TouchEvent) {
  if (!startX || !startY) return
  
  const touch = event.changedTouches[0]
  const endX = touch.clientX
  const endY = touch.clientY
  
  const diffX = startX - endX
  const diffY = startY - endY
  
  // Only trigger swipe if horizontal movement is greater than vertical (to avoid interfering with scrolling)
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left - go to completed
        slideDirection.value = 'left'
        activeTab.value = 'completed'
      } else {
        // Swiped right - go to todo
        slideDirection.value = 'right'
        activeTab.value = 'todo'
      }
    }
  }
  
  // Reset values
  startX = 0
  startY = 0
}
</script>

<template>
<div 
  class="flex flex-col" 
  @touchstart="handleTouchStart"
  @touchend="handleTouchEnd"
>
  <div class="text-xl font-semibold">Tasks</div>
  <div class="flex flex-col mt-9">
    <div class="flex flex-row justify-around text-lg relative">
      <div
        class="pb-2 cursor-pointer transition-all duration-200 ease-in-out"
        :class="{ 'border-b-4 border-blue-500 text-blue-500': activeTab === 'todo' }"
        @click="() => { slideDirection = 'right'; activeTab = 'todo' }"
      >
        To Do
      </div>
      <div
        class="pb-2 cursor-pointer transition-all duration-200 ease-in-out"
        :class="{ 'border-b-4 border-blue-500 text-blue-500': activeTab === 'completed' }"
        @click="() => { slideDirection = 'left'; activeTab = 'completed' }"
      >
        Completed
      </div>
      <!-- Bottom line for style -->
      <div class="absolute border-b w-screen bottom-0"></div>
    </div>
    <!-- Content with smooth transitions -->
    <div class="mt-6 relative overflow-hidden">
      <Transition 
        :name="`slide-${slideDirection}`"
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-out"
        :enter-from-class="slideDirection === 'left' ? 'transform translate-x-full opacity-0' : 'transform -translate-x-full opacity-0'"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-from-class="transform translate-x-0 opacity-100"
        :leave-to-class="slideDirection === 'left' ? 'transform -translate-x-full opacity-0' : 'transform translate-x-full opacity-0'"
      >
        <div v-if="activeTab === 'todo'" key="todo" class="w-full">
          To Do tasks here...
        </div>
        <div v-else key="completed" class="w-full">
          Completed tasks here...
        </div>
      </Transition>
    </div>
  </div>
</div>
<Footer />
</template>