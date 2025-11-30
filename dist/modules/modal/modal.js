// ============================================
// Модуль для роботи з модальними вікнами
// ============================================
/**
 * Функція відкриття модального вікна
 */
export function openModal(modal) {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
    }
}
/**
 * Функція закриття модального вікна
 */
export function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Повертаємо прокрутку
    }
}
/**
 * Ініціалізація модального вікна
 */
export function initModal() {
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalSpan = document.querySelector('.close');
    // Event listeners для модального вікна
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            openModal(modal);
        });
    }
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    if (closeModalSpan && modal) {
        closeModalSpan.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    // Закриття модального вікна при кліку поза його межами
    if (modal) {
        modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target === modal) {
                closeModal(modal);
            }
        });
    }
}
