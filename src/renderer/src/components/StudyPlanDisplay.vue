<template>
  <div class="study-plan-display" @click="selectFile">
    <input 
      ref="fileInput" 
      type="file" 
      accept=".txt" 
      @change="handleFileSelect" 
      style="display: none"
    >
    
    <div v-if="!content" class="empty-state">
      <div class="upload-icon">📄</div>
      <h3>点击选择自习安排文件</h3>
      <p>请选择一个 .txt 文件来显示自习安排</p>
    </div>
    
    <div v-else class="content-display" v-html="processedContent"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const content = ref('')
const processedContent = ref('')

const selectFile = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'text/plain') {
    const reader = new FileReader()
    reader.onload = (e) => {
      content.value = e.target.result
      processedContent.value = processRichText(content.value)
    }
    reader.readAsText(file, 'utf-8')
  }
}

const processRichText = (text) => {
  if (!text) return ''
  
  let processed = Text
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
  transition: all 0.3s ease;
  overflow-y: auto;
  z-index: 50;
}

.study-plan-display:hover {
  transform: translate(-50%, -50%) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #666;
}

.upload-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-state h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
}

.empty-state p {
  font-size: 1.1rem;
  opacity: 0.8;
}

.content-display {
  font-size: 3rem;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
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