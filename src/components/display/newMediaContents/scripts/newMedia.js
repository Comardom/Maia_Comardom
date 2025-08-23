// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {

    // 选取所有部门卡片
    const departmentCards = document.querySelectorAll('.department-card');

    if (departmentCards.length > 0) {
        // 添加鼠标事件监听
        departmentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
                // 添加轻微的抖动效果
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = '';
                }, 10);
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });

            // 添加点击波纹效果
            card.addEventListener('click', function (e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    } else {
        console.warn('警告：没有找到任何 class 为 "department-card" 的元素。');
    }

    // 添加鼠标移动视差效果
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // 浮动元素视差
        const floatingElements = document.querySelectorAll('.floating-circle');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 15;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });

        // 几何形状视差
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Logo点击彩蛋效果
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.animation = 'spin 1s ease-in-out';
            setTimeout(() => {
                logo.style.animation = '';
            }, 1000);
        });
    }

    // 动态调整字体大小以确保内容适配
    function adjustContentSize() {
        const contentPanel = document.getElementById('content-panel');
        const container = document.getElementById('page-container');

        if (contentPanel && container) {
            const containerHeight = container.offsetHeight;
            const contentHeight = contentPanel.scrollHeight;

            if (contentHeight > containerHeight) {
                contentPanel.style.fontSize = '0.9em';
            }
        }
    }

    // 初始调整和窗口大小变化时调整
    adjustContentSize();
    window.addEventListener('resize', adjustContentSize);

    // 防止右键菜单（增强沉浸感）
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // 添加快速连点三下彩蛋
    let clickCount = 0;
    let clickTimer = null;
    const clickTimeout = 500; // 500ms内完成三次点击

    document.addEventListener('click', function (e) {
        clickCount++;

        // 如果是第一次点击，开始计时
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0; // 超时重置计数
            }, clickTimeout);
        }

        // 如果达到三次点击
        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;

            // 彩蛋：让所有元素短暂变成彩虹色
            document.body.style.filter = 'hue-rotate(0deg)';
            let hue = 0;
            const rainbow = setInterval(() => {
                hue += 10;
                document.body.style.filter = `hue-rotate(${hue}deg)`;
                if (hue >= 360) {
                    clearInterval(rainbow);
                    document.body.style.filter = '';
                }
            }, 100);
        }
    });
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);