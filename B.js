// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 數字動畫
    animateNumbers();
    
    // 滾動動畫觀察器
    setupScrollAnimations();
    
    // 回到頂部按鈕
    setupBackToTop();
    
    // 平滑滾動
    setupSmoothScroll();
});

// 數字計數動畫
function animateNumbers() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const target = parseInt(card.dataset.count);
                const numberElement = card.querySelector('.stat-number');
                animateNumber(numberElement, 0, target, 2000);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = end >= 30 ? '+' : '';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用緩動函數
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// 滾動動畫設定
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 回到頂部按鈕功能
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // 點擊事件
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 平滑滾動設定
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 項目懸停效果增強
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.01)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// 統計卡片點擊效果
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            // 添加點擊動畫
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// 鍵盤導航支援
document.addEventListener('keydown', function(e) {
    // 按 Home 鍵回到頂部
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // 按 End 鍵到底部
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// 視窗大小改變時的處理
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // 可以在這裡添加響應式調整邏輯
        console.log('視窗大小已調整');
    }, 250);
});

// 頁面載入進度顯示
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('頁面已完全載入');
});

// 偵測使用者偏好的配色方案
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('使用者偏好深色模式');
    // 可以在這裡添加深色模式切換邏輯
}

// 效能監控 (開發用)
if (window.performance) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`頁面載入時間: ${pageLoadTime}ms`);
    });
}