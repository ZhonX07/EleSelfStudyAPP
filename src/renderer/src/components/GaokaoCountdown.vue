<template>
  <div class="gaokao-countdown">
    还有 {{ daysLeft }} 天高考
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const daysLeft = ref(0)
let intervalId = null

const calculateDaysLeft = () => {
  const today = new Date()
  const gaokaoDate = new Date('2026-06-06')
  
  // 重置时间为当天0点，确保计算准确
  today.setHours(0, 0, 0, 0)
  gaokaoDate.setHours(0, 0, 0, 0)
  
  const timeDiff = gaokaoDate.getTime() - today.getTime()
  daysLeft.value = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
}

onMounted(() => {
  calculateDaysLeft()
  // 每小时更新一次，确保跨日期时能及时更新
  intervalId = setInterval(calculateDaysLeft, 1000 * 60 * 60)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.gaokao-countdown {
  position: fixed;
  top: 30px;
  left: 350px;
  font-size: 3rem;
  font-weight: bold;
  color: #ff6b6b;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  z-index: 100;
  border: 2px solid #ff6b6b;
}

@media (max-width: 768px) {
  .gaokao-countdown {
    font-size: 1.5rem;
    padding: 10px 15px;
    top: 20px;
    left: 200px;
  }
}

@media (max-width: 480px) {
  .gaokao-countdown {
    font-size: 1.2rem;
    padding: 8px 12px;
    top: 80px;
    left: 20px;
  }
}
</style>