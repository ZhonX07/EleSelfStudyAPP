<template>
  <div class="real-time-clock">
    {{ currentTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let intervalId = null

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 450)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.real-time-clock {
  position: fixed;
  top: 30px;
  left: 30px;
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  z-index: 100;
}

@media (max-width: 768px) {
  .real-time-clock {
    font-size: 1.8rem;
    padding: 10px 15px;
    top: 20px;
    left: 20px;
  }
}
</style>