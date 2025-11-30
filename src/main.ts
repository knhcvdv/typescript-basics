// ============================================
// Головний файл інтерактивного додатку
// Імпортує всі модулі та ініціалізує функціональність
// ============================================

// Імпорт модулів для модальних вікон
import { initModal } from './modules/modal/modal';

// Імпорт модулів для scroll
import { initScroll } from './modules/scroll/scroll';

// Імпорт модулів для навігації
import { initNavigation, initSmoothScroll } from './modules/navigation/navigation';

// Імпорт модулів для fetch
import { initFetch } from './modules/fetch/fetch';

// Імпорт модулів для анімацій
import { initPageAnimations, initHoverEffects } from './modules/animations/animations';

/**
 * Ініціалізація всієї інтерактивності
 */
function initApp(): void {
    // Ініціалізація модальних вікон
    initModal();

    // Ініціалізація scroll функцій
    initScroll();

    // Ініціалізація навігації
    initNavigation();
    initSmoothScroll();

    // Ініціалізація fetch функцій
    initFetch();

    // Ініціалізація анімацій
    initPageAnimations();
    initHoverEffects();

    console.log('TypeScript інтерактивність ініціалізована!');
}

// Запуск додатку
initApp();