import { createApp } from 'vue'
import './office.css'
import OfficeApp from '../officeApp.vue'
import { useTheme } from './useTheme'

const app = createApp(OfficeApp)

// 初始化主题
const { initTheme } = useTheme()
initTheme()

app.mount('#app')
