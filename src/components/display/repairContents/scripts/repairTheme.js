// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 只有在浏览器端，当DOM加载完毕后，才会执行这里的代码

    // 主题管理系统
    class ThemeManager {
        constructor() {
            this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
            this.init();
        }

        // 初始化主题系统
        init() {
            this.applyTheme(this.currentTheme);
            this.setupEventListeners();
            this.syncWithOtherPages();
        }

        // 获取存储的主题
        getStoredTheme() {
            // 优先检查 localStorage
            const localTheme = localStorage.getItem('theme');
            if (localTheme) {
                return localTheme;
            }

            // 检查 cookie (与其他页面兼容)
            const cookieTheme = this.getCookie('theme');
            if (cookieTheme) {
                return cookieTheme;
            }

            return null;
        }

        // 获取系统主题偏好
        getSystemTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }

        // 获取 Cookie
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        }

        // 设置 Cookie
        setCookie(name, value, days = 365) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        }

        // 应用主题
        applyTheme(theme) {
            const html = document.documentElement;

            if (theme === 'dark') {
                html.classList.remove('light');
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
            }

            this.currentTheme = theme;
            this.saveTheme(theme);
            this.updateToggleButton();
        }

        // 保存主题设置
        saveTheme(theme) {
            localStorage.setItem('theme', theme);
            this.setCookie('theme', theme);
        }

        // 切换主题
        toggleTheme() {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);

            // 触发自定义事件，通知其他组件主题已更改
            window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: newTheme }
            }));
        }

        // 更新切换按钮状态
        updateToggleButton() {
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-label',
                    this.currentTheme === 'dark' ? '切换到亮色模式' : '切换到深色模式'
                );
            }
        }

        // 设置事件监听器
        setupEventListeners() {
            // 主题切换按钮
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggleTheme());
            }

            // 监听系统主题变化
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    if (!this.getStoredTheme()) {
                        this.applyTheme(e.matches ? 'dark' : 'light');
                    }
                });
            }

            // 监听存储变化 (用于跨标签页同步)
            window.addEventListener('storage', (e) => {
                if (e.key === 'theme' && e.newValue !== this.currentTheme) {
                    this.applyTheme(e.newValue);
                }
            });
        }

        // 与其他页面同步主题
        syncWithOtherPages() {
            // 监听其他页面的主题变化
            window.addEventListener('themeChanged', (e) => {
                if (e.detail.theme !== this.currentTheme) {
                    this.applyTheme(e.detail.theme);
                }
            });
        }

        // 获取当前主题
        getCurrentTheme() {
            return this.currentTheme;
        }

        // 强制设置主题
        setTheme(theme) {
            if (theme === 'dark' || theme === 'light') {
                this.applyTheme(theme);
            }
        }
    }

    // 在 DOM 加载后创建全局主题管理器实例
    window.themeManager = new ThemeManager();
});