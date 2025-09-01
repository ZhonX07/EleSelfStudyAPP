<template>
  <button class="back-to-home-btn" @click="$emit('go-home')" title="返回首页">
    ← 返回首页
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
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.back-to-home-btn:hover {
  background: rgba(74, 110, 224, 1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.back-to-home-btn:active {
  transform: translateY(0);
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