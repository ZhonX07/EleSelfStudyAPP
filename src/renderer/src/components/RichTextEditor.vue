<template>
  <div class="editor-app">
    <BackToHomeButton @go-home="$emit('go-home')" />
    <HelpButton />
    <div class="container">
      <header>
        <div class="header-controls">
          <div class="header-content">
            <h1>高级富文本编辑器</h1>
            <p>支持加粗、斜体、红色字体和二级标题格式</p>
          </div>
        </div>
      </header>
    
    <div id="toolbar">
      <div class="tool-group">
        <button id="bold-btn" :class="{ active: activeFormats.bold }" @click="toggleBold" title="加粗 (Ctrl+B)">
          <strong>B</strong>
        </button>
        <button id="italic-btn" :class="{ active: activeFormats.italic }" @click="toggleItalic" title="斜体 (Ctrl+I)">
          <em>I</em>
        </button>
        <button id="red-btn" :class="{ active: activeFormats.red }" @click="toggleRed" title="红色文本">
          <span style="color: #dc3545; font-weight: bold;">红</span>
        </button>
        <button id="h2-btn" :class="{ active: activeFormats.h2 }" @click="toggleH2" title="二级标题">
          <strong>H2</strong>
        </button>
      </div>
      
      <div class="tool-group">
        <button id="clear-btn" class="clear-btn" @click="clearFormat" title="清除格式">
          清除格式
        </button>
      </div>
      
      <div class="tool-group">
        <button id="export-btn" class="export-btn" @click="exportTxt" title="导出配置文件">
          导出配置
        </button>
      </div>
    </div>
    
    <div id="editor-container">
      <div 
        id="editor" 
        ref="editor"
        contenteditable="true" 
        placeholder="开始输入内容..."
        @input="handleInput"
        @keydown="handleKeydown"
      ></div>
    </div>
    
    <footer>
      <div id="status-bar">
        ℹ️ 提示：支持先选择文本再应用格式，或先激活格式再输入文本
      </div>
    </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

defineEmits(['go-home'])

const editor = ref(null)
const activeFormats = reactive({
  bold: false,
  italic: false,
  red: false,
  h2: false
})

let activeFormat = null

onMounted(() => {
  editor.value.focus()
  document.addEventListener('selectionchange', updateButtonStates)
})

const toggleBold = () => {
  if (activeFormat === 'bold') {
    activeFormats.bold = false
    activeFormat = null
  } else {
    deactivateAll()
    document.execCommand('bold', false, null)
    activeFormats.bold = true
    activeFormat = 'bold'
  }
}

const toggleItalic = () => {
  if (activeFormat === 'italic') {
    activeFormats.italic = false
    activeFormat = null
  } else {
    deactivateAll()
    document.execCommand('italic', false, null)
    activeFormats.italic = true
    activeFormat = 'italic'
  }
}

const toggleRed = () => {
  if (activeFormat === 'red') {
    activeFormats.red = false
    activeFormat = null
  } else {
    deactivateAll()
    
    const selection = window.getSelection()
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = "red"
      range.surroundContents(span)
    } else {
      activeFormats.red = true
      activeFormat = 'red'
    }
  }
}

const toggleH2 = () => {
  if (activeFormat === 'h2') {
    activeFormats.h2 = false
    activeFormat = null
    document.execCommand('formatBlock', false, 'div')
  } else {
    deactivateAll()
    document.execCommand('formatBlock', false, 'h2')
    activeFormats.h2 = true
    activeFormat = 'h2'
  }
}

const clearFormat = () => {
  deactivateAll()
  document.execCommand('removeFormat', false, null)
  document.execCommand('unlink', false, null)
  
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const content = range.extractContents()
    const text = document.createTextNode(content.textContent)
    range.insertNode(text)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

const exportTxt = () => {
  let html = editor.value.innerHTML
  
  html = html
    .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
    .replace(/<b>(.*?)<\/b>/g, "**$1**")
    .replace(/<em>(.*?)<\/em>/g, "*$1*")
    .replace(/<i>(.*?)<\/i>/g, "*$1*")
    .replace(/<span class="red">(.*?)<\/span>/g, "[r]$1[/r]")
    .replace(/<h2>(.*?)<\/h2>/g, "## $1")
    .replace(/<div><br><\/div>/g, '\n')
    .replace(/<div>/g, '\n')
    .replace(/<\/div>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/^\n+/, '')
    .replace(/\n{3,}/g, '\n\n')
  
  const blob = new Blob([html], { type: "text/plain;charset=utf-8" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "richtext_config.txt"
  a.click()
}

const deactivateAll = () => {
  Object.keys(activeFormats).forEach(key => {
    activeFormats[key] = false
  })
  activeFormat = null
}

const updateButtonStates = () => {
  const isBold = document.queryCommandState('bold')
  const isItalic = document.queryCommandState('italic')
  
  activeFormats.bold = isBold
  activeFormats.italic = isItalic
}

const handleInput = (e) => {
  if (activeFormat === 'red') {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = "red"
      range.surroundContents(span)
      
      const newRange = document.createRange()
      newRange.setStartAfter(span)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
  }
}

const handleKeydown = (e) => {
  if (e.ctrlKey) {
    if (e.key === 'b' || e.key === 'B') {
      e.preventDefault()
      toggleBold()
    } else if (e.key === 'i' || e.key === 'I') {
      e.preventDefault()
      toggleItalic()
    }
  } else if (e.key === 'Enter') {
    if (!e.shiftKey) {
      // 普通回车键，插入 <br> 标签
      e.preventDefault()
      document.execCommand('insertHTML', false, '<br><br>')
    }
  }
}
</script>

<style scoped>
.editor-app {
  min-height: 100vh;
  width: 100vw;
  background: url('/resources/back.png') center/cover no-repeat fixed;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

:root {
  --primary-color: #4a6ee0;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --border-radius: 6px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  animation: slideUp 0.6s ease-out;
  transform-origin: center;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

header {
  background: var(--primary-color);
  color: white;
  padding: 20px;
  text-align: center;
}

.header-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.h1{
    color: white !important;
}

.header-content {
  flex: 1;
  text-align: center;
}

.header-content h1 {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: rgb(0, 0, 0);
}

.header-content p {
  font-size: 1rem;
  opacity: 0.9;
  color: rgb(0, 0, 0);
}

#toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 15px;
  background: var(--light-color);
  border-bottom: 1px solid #dee2e6;
}

.tool-group {
  display: flex;
  gap: 4px;
  padding-right: 15px;
  border-right: 1px solid #dee2e6;
}

.tool-group:last-child {
  border-right: none;
}

#toolbar button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ced4da;
  border-radius: var(--border-radius);
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 14px;
  min-width: 40px;
  position: relative;
  overflow: hidden;
}

#toolbar button:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

#toolbar button:active {
  transform: translateY(0) scale(0.95);
}

#toolbar button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

#toolbar button:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

#toolbar button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(74, 110, 224, 0.3);
}

#toolbar button i {
  margin-right: 5px;
}

#editor-container {
  position: relative;
}

#editor {
  min-height: 300px;
  padding: 20px;
  line-height: 1.6;
  font-size: 16px;
  border: 1px solid #ced4da;
  margin: 0;
  outline: none;
  overflow-y: auto;
}

#editor:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(74, 110, 224, 0.25);
  animation: cursorBlink 1s infinite;
}

#editor:empty:before {
  content: attr(placeholder);
  color: #6c757d;
  display: block;
}

#editor:focus:empty:before {
  content: attr(placeholder);
  color: #6c757d;
}

footer {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background: var(--light-color);
  border-top: 1px solid #dee2e6;
}

#status-bar {
  font-size: 14px;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
}

:deep(b), :deep(strong) {
  font-weight: bold;
}

:deep(i), :deep(em) {
  font-style: italic;
}

:deep(span.red) {
  color: #dc3545;
}

:deep(h2) {
  font-size: 1.5em;
  margin: 0.83em 0;
  color: var(--dark-color);
  font-weight: 600;
}

.export-btn {
  background: var(--success-color) !important;
  color: rgb(36, 126, 0) !important;
  border: none;
  padding: 8px 16px;
}

.export-btn:hover {
  background: var(--success-color) !important;
  color: white !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 15px rgba(40, 167, 69, 0.3) !important;
}

.clear-btn {
  background: var(--danger-color) !important;
  color: rgb(255, 0, 0) !important;
  border: none;
  padding: 8px 16px;
}

.clear-btn:hover {
  background: var(--danger-color) !important;
  color: white !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 15px rgba(220, 53, 69, 0.3) !important;
}

/* 编辑器光标闪烁动画 */
@keyframes cursorBlink {
  0%, 100% { border-color: rgba(74, 110, 224, 0.5); }
  50% { border-color: rgba(74, 110, 224, 1); }
}
</style>