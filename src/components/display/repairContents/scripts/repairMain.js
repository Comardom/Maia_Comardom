// 主应用脚本
class RepairDepartmentApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupQRCode();
        this.setupAnimations();
        this.setupScrollEffects();
    }

    // 设置导航功能
    setupNavigation() {
        // 平滑滚动到锚点
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 导航栏高度偏移
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 更新活跃状态
                    this.updateActiveNavLink(link);
                }
            });
        });

        // 滚动时更新导航状态
        window.addEventListener('scroll', () => {
            this.updateNavOnScroll();
        });
    }

    // 更新活跃的导航链接
    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // 滚动时更新导航状态
    updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    this.updateActiveNavLink(correspondingLink);
                }
            }
        });
    }

    // 设置二维码交互
    setupQRCode() {
        // 为二维码添加交互效果
        const qrImage = document.querySelector('.qr-code-image');
        if (qrImage) {
            qrImage.addEventListener('click', () => {
                this.showModal('扫码说明', `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 1.5rem; display: inline-block;">
                            <img src="/displayRepair/qq-group-qr.jpg" alt="维修部QQ群二维码" 
                                 style="max-width: 300px; max-height: 300px; width: auto; height: auto; 
                                        border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                                        object-fit: contain; display: block;">
                        </div>
                        <p style="font-size: 1.1rem; margin-bottom: 1rem;"><strong>🔍 使用手机QQ扫描二维码</strong></p>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                            1. 打开手机QQ<br>
                            2. 点击右上角"+"号<br>
                            3. 选择"扫一扫"<br>
                            4. 对准二维码扫描即可加群
                        </p>
                    </div>
                `);
            });

            // 添加悬停提示
            qrImage.style.cursor = 'pointer';
            qrImage.title = '点击查看扫码说明';
        }
    }

    // 显示简单提示
    showToast(message) {
        // 移除现有提示
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // 创建提示元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 2000;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 设置动画效果
    setupAnimations() {
        // 观察器用于触发进入动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 为需要动画的元素添加观察
        const animateElements = document.querySelectorAll(
            '.service-card, .stat-item, .about-text, .join-reasons, .form-container'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        // 添加动画CSS类
        this.addAnimationStyles();
    }

    // 添加动画样式
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .service-card.animate-on-scroll {
                transition-delay: 0.1s;
            }
            
            .service-card:nth-child(2).animate-on-scroll {
                transition-delay: 0.2s;
            }
            
            .service-card:nth-child(3).animate-on-scroll {
                transition-delay: 0.3s;
            }
            
            .stat-item:nth-child(1).animate-on-scroll {
                transition-delay: 0.1s;
            }
            
            .stat-item:nth-child(2).animate-on-scroll {
                transition-delay: 0.2s;
            }
            
            .stat-item:nth-child(3).animate-on-scroll {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    // 设置滚动效果
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-visual');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    // 显示模态框
    showModal(title, content) {
        // 创建模态框
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="关闭">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 设置关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        const handleClose = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', handleClose);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) handleClose();
        });

        // ESC键关闭
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // 工具方法：节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 工具方法：防抖函数
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.repairApp = new RepairDepartmentApp();
    
    // 为按钮添加事件监听
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        if (btn.textContent.includes('立即加入')) {
            btn.addEventListener('click', () => {
                document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    const secondaryBtns = document.querySelectorAll('.btn-secondary');
    secondaryBtns.forEach(btn => {
        if (btn.textContent.includes('了解更多')) {
            btn.addEventListener('click', () => {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
});

// 导出应用类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RepairDepartmentApp;
}
