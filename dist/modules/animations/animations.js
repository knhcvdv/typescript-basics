// ============================================
// Модуль для роботи з анімаціями
// ============================================
import { handleScroll } from '../scroll/scroll';
/**
 * Ініціалізація анімацій при завантаженні сторінки
 */
export function initPageAnimations() {
    window.addEventListener('DOMContentLoaded', () => {
        // Перевіряємо видимість карток при завантаженні
        handleScroll();
        // Додаємо анімацію для hero секції
        const heroTitle = document.querySelector('.hero-title');
        const heroText = document.querySelector('.hero-text');
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInDown 1s ease';
        }
        if (heroText) {
            heroText.style.animation = 'fadeInUp 1s ease';
        }
    });
}
/**
 * Ефект hover для карток постів
 */
export function initHoverEffects() {
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.classList.contains('post-card')) {
            target.style.transition = 'transform 0.3s ease';
        }
    });
}
