import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import BackToHomeButton from './components/BackToHomeButton.vue'
import HelpButton from './components/HelpButton.vue'

const app = createApp(App)

// 注册全局组件
app.component('BackToHomeButton', BackToHomeButton)
app.component('HelpButton', HelpButton)

app.mount('#app')
