<script setup>
import { ref } from 'vue'
import RichTextEditor from './components/RichTextEditor.vue'
import MathSelfStudy from './components/MathSelfStudy.vue'

const subjects = [
  { name: '语文', color: '#ff6b6b', icon: '文', enabled: false },
  { name: '数学', color: '#4ecdc4', icon: '数', enabled: true },
  { name: '英语', color: '#45b7d1', icon: '英', enabled: false },
  { name: '物理', color: '#96ceb4', icon: '物', enabled: false },
  { name: '化学', color: '#ffeaa7', icon: '化', enabled: false },
  { name: '政治', color: '#fd79a8', icon: '政', enabled: false },
  { name: '地理', color: '#fdcb6e', icon: '地', enabled: false },
  { name: '生物', color: '#6c5ce7', icon: '生', enabled: false },
  { name: '历史', color: '#a29bfe', icon: '史', enabled: false }
]

const currentView = ref('home')

const openSubject = (subject) => {
  const subjectData = subjects.find(s => s.name === subject)
  if (subjectData && subjectData.enabled) {
    console.log(`打开${subject}学科`)
    if (subject === '数学') {
      currentView.value = 'math'
    }
    // 这里将来会导航到对应的学科页面
  }
}

const openScheduleGenerator = () => {
  currentView.value = 'editor'
}

const goHome = () => {
  currentView.value = 'home'
}
</script>

<template>
  <div class="app-container">
    <HelpButton />
    <!-- 首页 -->
    <div v-if="currentView === 'home'">
      <header class="header">
        <h1 class="title">自习课学习助手</h1>
        <p class="subtitle">选择学科开始学习</p>
      </header>

      <main class="main-content">
        <section class="subjects-section">
          <h2 class="section-title">学科入口</h2>
          <div class="subjects-grid">
            <div 
              v-for="subject in subjects" 
              :key="subject.name"
              class="subject-card"
              :class="{ disabled: !subject.enabled }"
              :style="{ '--subject-color': subject.color }"
              @click="openSubject(subject.name)"
            >
              <div class="subject-icon">{{ subject.icon }}</div>
              <div class="subject-name">{{ subject.name }}</div>
              <div v-if="!subject.enabled" class="disabled-overlay">
                <div class="disabled-icon">🚫</div>
                <div class="disabled-text">功能开发中</div>
              </div>
            </div>
          </div>
        </section>

        <section class="tools-section">
          <h2 class="section-title">学习工具</h2>
          <div class="tool-card" @click="openScheduleGenerator">
            <div class="tool-icon">📅</div>
            <div class="tool-info">
              <h3 class="tool-title">自习安排生成器</h3>
              <p class="tool-description">可视化界面辅助生成自习安排</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- 富文本编辑器页面 -->
    <div v-else-if="currentView === 'editor'">
      <RichTextEditor @go-home="goHome" />
    </div>

    <!-- 数学自习页面 -->
    <div v-else-if="currentView === 'math'">
      <MathSelfStudy @go-home="goHome" />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100vw;
  background: url('assets/back.png') center/cover no-repeat fixed;
  padding: 20px;
  font-family: 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
  margin: 0;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  color: rgb(0, 0, 0);
  margin-bottom: 10px;
  font-weight: bold;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(0, 0, 0);
  margin: 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.subjects-section {
  margin-bottom: 50px;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.subject-card {
  background: white;
  border-radius: 15px;
  padding: 20px 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: var(--subject-color);
}

.subject-card.disabled {
  cursor: not-allowed;
}

.subject-card.disabled:hover {
  transform: none;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.subject-card.disabled:hover .disabled-overlay {
  opacity: 1;
}

.subject-icon {
  width: 60px;
  height: 60px;
  background: var(--subject-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 0 auto 15px;
}

.subject-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.tools-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.tool-icon {
  font-size: 2.5rem;
}

.tool-info {
  flex: 1;
}

.tool-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
}

.tool-description {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.disabled-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.disabled-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.disabled-text {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .subjects-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
  }
  
  .subject-card {
    padding: 20px 10px;
  }
  
  .subject-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .tool-card {
    min-width: auto;
    width: 100%;
  }
}
</style>
