export function setupSnapSectionObserver() {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".snap-section"));
    if (sections.length === 0) return;

    // 创建隐藏状态元素（如果不存在）
    let hiddenState = document.getElementById("snap-state");
    if (!hiddenState) {
        hiddenState = document.createElement("div");
        hiddenState.id = "snap-state";
        hiddenState.style.display = "none";
        document.body.appendChild(hiddenState);
    }

    let currentSectionId: string | null = null;

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const sectionId = el.getAttribute("id");
                    const sectionIndex = el.getAttribute("data-section");

                    // 避免重复更新
                    if (sectionId && sectionId !== currentSectionId) {
                        currentSectionId = sectionId;

                        // 更新地址栏（不添加历史记录）
                        window.history.replaceState(null, "", `#${sectionId}`);

                        // 更新隐藏状态
                        if (sectionIndex) {
                            hiddenState.setAttribute("data-current-section", sectionIndex);
                        }
                    }

                    break; // 只处理第一个可见块
                }
            }
        },
        {
            root: null,
            threshold: 0.6, // 60% 可视时触发
        }
    );

    sections.forEach((section) => observer.observe(section));
}
