import { ref, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_COOKIE_KEY = 'theme-preference'

export function useTheme() {
  const theme = ref<Theme>('light')
  const isSystem = ref(false)

  // 设置cookie
  const setCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // 获取cookie
  const getCookie = (name: string): string | null => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  // 应用主题到DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    
    // 设置颜色方案
    root.style.colorScheme = newTheme
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
    applyTheme(newTheme)
    setCookie(THEME_COOKIE_KEY, newTheme)
  }

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    applyTheme(newTheme)
    setCookie(THEME_COOKIE_KEY, newTheme)
  }

  // 初始化主题（防止闪烁）
  const initTheme = () => {
    // 从cookie获取保存的主题
    const savedTheme = getCookie(THEME_COOKIE_KEY) as Theme | null
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      theme.value = savedTheme
    } else {
      // 如果没有保存的主题，使用系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
      isSystem.value = true
    }
    
    applyTheme(theme.value)
  }

  // 监听系统主题变化
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (isSystem.value) {
        const newTheme = e.matches ? 'dark' : 'light'
        theme.value = newTheme
        applyTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  })

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    theme,
    isSystem,
    toggleTheme,
    setTheme,
    initTheme
  }
}