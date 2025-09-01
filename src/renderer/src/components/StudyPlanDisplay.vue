<template>
  <div class="study-plan-display" @click="selectFile">
    <input 
      ref="fileInput" 
      type="file" 
      accept=".txt" 
      @change="handleFileSelect" 
      style="display: none"
    >
    
    <transition name="content-fade" mode="out-in">
      <div v-if="!content" key="empty" class="empty-state">
        <div class="upload-icon">📄</div>
        <h3>点击选择自习安排文件</h3>
        <p>请选择一个 .txt 文件来显示自习安排</p>
        <div class="drag-hint">点击或拖拽文件到这里</div>
      </div>
      
      <div v-else key="content" class="content-display" v-html="processedContent"></div>
    </transition>
    
    <!-- 上传动画 -->
    <div class="upload-animation" v-if="isUploading">
      <div class="upload-progress"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const content = ref('')
const processedContent = ref('')
const isUploading = ref(false)

const selectFile = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'text/plain') {
    isUploading.value = true
    
    // 模拟文件处理延迟，创建更好的视觉反馈
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (e) => {
        content.value = e.target.result
        processedContent.value = processRichText(content.value)
        isUploading.value = false
      }
      reader.readAsText(file, 'utf-8')
    }, 800)
  }
}

const processRichText = (text) => {
  if (!text) return ''
  
  let processed = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[r\](.*?)\[\/r\]/g, '<span class="red-text">$1</span>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/<br>/g, '<br>')
    .replace(/\n/g, '<br>')
  
  return processed
}
</script>

<style scoped>
.study-plan-display {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  height: 55%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow-y: auto;
  z-index: 50;
  animation: appear 0.6s ease-out;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.study-plan-display:hover {
  transform: translate(-50%, -50%) scale(1.02);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #666;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.upload-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.7;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-state h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
}

.empty-state p {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 20px;
}

.drag-hint {
  padding: 12px 24px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  font-size: 1rem;
  color: #888;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.study-plan-display:hover .drag-hint {
  border-color: #17a2b8;
  color: #17a2b8;
}

.content-display {
  font-size: 3rem;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
  animation: fadeIn 0.5s ease-out;
}

/* 内容切换动画 */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 上传动画 */
.upload-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(23, 162, 184, 0.2);
  overflow: hidden;
  border-radius: 0 0 20px 20px;
}

.upload-progress {
  height: 100%;
  width: 100%;
  background: #17a2b8;
  animation: loading 1.5s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

:deep(.red-text) {
  color: #dc3545;
}

:deep(strong) {
  font-weight: bold;
}

:deep(em) {
  font-style: italic;
}

:deep(h2) {
  font-size: 3.5rem;
  margin: 0.8em 0;
  color: #2c3e50;
  font-weight: 600;
}

:deep(br) {
  display: block;
  margin: 0.5em 0;
}

@media (max-width: 1200px) {
  .study-plan-display {
    width: 70%;
    height: 55%;
  }
  
  .content-display {
    font-size: 3.2rem;
  }
  
  :deep(h2) {
    font-size: 4rem;
  }
}

@media (max-width: 768px) {
  .study-plan-display {
    width: 85%;
    height: 60%;
    padding: 25px;
  }
  
  .content-display {
    font-size: 2.5rem;
  }
  
  :deep(h2) {
    font-size: 3rem;
  }
  
  .upload-icon {
    font-size: 3.5rem;
  }
  
  .empty-state h3 {
    font-size: 1.4rem;
  }
  
  .empty-state p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .study-plan-display {
    width: 95%;
    height: 65%;
    padding: 20px;
  }
  
  .content-display {
    font-size: 2rem;
  }
  
  :deep(h2) {
    font-size: 2.5rem;
  }
}
</style>