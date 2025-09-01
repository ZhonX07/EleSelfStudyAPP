<template>
  <div class="help-container">
    <!-- 帮助按钮 -->
    <button class="help-btn" @click="showHelp = true" title="寻求帮助">
      ❓ 寻求帮助
    </button>
    
    <!-- 帮助卡片 -->
    <div v-if="showHelp" class="help-overlay" @click="closeOnOverlay">
      <div class="help-card" @click.stop>
        <div class="help-header">
          <h3>寻求帮助</h3>
          <button class="close-btn" @click="showHelp = false" title="关闭">
            ✕
          </button>
        </div>
        <div class="help-content">
          <p>需要定制自习软件或有问题/建议反馈请加好友（优先钉钉）</p>
          
          <!-- 标签页 -->
          <div class="tabs">
            <div class="tab-header">
              <button 
                :class="['tab-btn', { active: activeTab === 'dingtalk' }]" 
                @click="activeTab = 'dingtalk'"
              >
                钉钉
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'wechat' }]" 
                @click="activeTab = 'wechat'"
              >
                微信
              </button>
            </div>
            <div class="tab-content">
              <div v-if="activeTab === 'dingtalk'" class="tab-pane">
                <img :src="dingTalkQR" alt="钉钉二维码" class="qr-code" />
              </div>
              <div v-if="activeTab === 'wechat'" class="tab-pane">
                <img :src="weChatQR" alt="微信二维码" class="qr-code" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 修正图片导入路径
import dingTalkQR from '../assets/Friend_DingTalk.jpg'
import weChatQR from '../assets/Friend_WeChat.jpg'

const showHelp = ref(false)
const activeTab = ref('dingtalk') // 默认显示钉钉标签

const closeOnOverlay = (e) => {
  if (e.target === e.currentTarget) {
    showHelp.value = false
  }
}
</script>

<style scoped>
.help-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.help-btn {
  background: #17a2b8;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-btn:hover {
  background: #138496;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(23, 162, 184, 0.4);
}

.help-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.help-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.help-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e9ecef;
}

.help-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6c757d;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #333;
}

.help-content {
  padding: 20px 24px 24px;
  line-height: 1.6;
  color: #555;
}

.help-content p {
  margin: 0 0 16px 0;
}

/* 标签页样式 */
.tabs {
  margin-top: 10px;
}

.tab-header {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.2s ease;
}

.tab-btn.active {
  color: #17a2b8;
  border-bottom: 2px solid #17a2b8;
}

.tab-btn:hover:not(.active) {
  color: #333;
  background-color: #f8f9fa;
}

.tab-content {
  min-height: 200px;
}

.tab-pane {
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-code {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .help-btn {
    padding: 10px 16px;
    font-size: 12px;
  }
  
  .help-card {
    margin: 20px;
    width: calc(100% - 40px);
  }
  
  .help-header {
    padding: 16px 20px 12px;
  }
  
  .help-content {
    padding: 16px 20px 20px;
  }

  .tab-btn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .qr-code {
    max-width: 150px;
    max-height: 150px;
  }
}
</style>