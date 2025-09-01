<template>
  <button class="back-to-home-btn" @click="$emit('go-home')" title="返回首页">
    <span class="arrow">←</span> 返回首页
  </button>
</template>

<script setup>
// 定义事件
defineEmits(['go-home'])
</script>

<style scoped>
.back-to-home-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(74, 110, 224, 0.9);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow: hidden;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.back-to-home-btn:hover {
  background: rgba(74, 110, 224, 1);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.back-to-home-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.back-to-home-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.back-to-home-btn:hover::before {
  left: 100%;
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
  margin-right: 5px;
}

.back-to-home-btn:hover .arrow {
  transform: translateX(-5px);
}

@media (max-width: 768px) {
  .back-to-home-btn {
    bottom: 15px;
    left: 15px;
    padding: 10px 16px;
    font-size: 13px;
  }
}
</style>