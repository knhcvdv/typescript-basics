// ============================================
// Модуль для роботи з навігацією та click подіями
// ============================================

/**
 * Обробка кліків на навігаційні посилання з плавною прокруткою
 */
export function initNavigation(): void {
    const navLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link');

    navLinks.forEach((link: HTMLElement): void => {
        link.addEventListener('click', (e: MouseEvent): void => {
            e.preventDefault();
            const href: string | null = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetId: string = href.substring(1);
                const targetElement: HTMLElement | null = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Плавна прокрутка для всіх внутрішніх посилань
 */
export function initSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element): void => {
        anchor.addEventListener('click', function (e: Event): void {
            e.preventDefault();
            const href: string | null = anchor.getAttribute('href');
            if (href) {
                const target: HTMLElement | null = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
