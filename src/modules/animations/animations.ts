// ============================================
// Модуль для роботи з анімаціями
// ============================================

import { handleScroll } from '../scroll/scroll';

/**
 * Ініціалізація анімацій при завантаженні сторінки
 */
export function initPageAnimations(): void {
    window.addEventListener('DOMContentLoaded', (): void => {
        // Перевіряємо видимість карток при завантаженні
        handleScroll();
        
        // Додаємо анімацію для hero секції
        const heroTitle: HTMLElement | null = document.querySelector('.hero-title');
        const heroText: HTMLElement | null = document.querySelector('.hero-text');
        
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
export function initHoverEffects(): void {
    document.addEventListener('mouseover', (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('post-card')) {
            target.style.transition = 'transform 0.3s ease';
        }
    });
}
