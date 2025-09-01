<template>
  <div class="gaokao-countdown">
    <div class="countdown-content">
      <span class="countdown-text">还有</span>
      <span class="days-number">{{ daysLeft }}</span>
      <span class="countdown-text">天高考</span>
    </div>
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
  animation: floatIn 0.8s ease-out;
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
}

.gaokao-countdown:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.countdown-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.days-number {
  display: inline-block;
  margin: 0 10px;
  color: #ff6b6b;
  position: relative;
  animation: pulse 2s infinite;
}

.days-number::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #ff6b6b;
  border-radius: 2px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
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