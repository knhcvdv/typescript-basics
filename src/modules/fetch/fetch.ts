// ============================================
// Модуль для роботи з Fetch API
// ============================================

import type { Post } from '../../types/types';

/**
 * Функція для відображення спінера завантаження
 */
function showLoading(loadingSpinner: HTMLElement | null, postsContainer: HTMLElement | null): void {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
    if (postsContainer) {
        postsContainer.innerHTML = '';
    }
}

/**
 * Функція для приховування спінера
 */
function hideLoading(loadingSpinner: HTMLElement | null): void {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Функція для створення HTML елемента поста
 */
function createPostCard(post: Post): HTMLElement {
    const postCard: HTMLElement = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>ID: ${post.id} | User ID: ${post.userId}</small>
    `;
    
    // Додаємо анімацію при кліку на картку
    postCard.addEventListener('click', (): void => {
        postCard.style.transform = 'scale(0.95)';
        setTimeout((): void => {
            postCard.style.transform = 'scale(1)';
        }, 200);
    });
    
    return postCard;
}

/**
 * Функція для завантаження та відображення постів
 */
export async function loadPosts(): Promise<void> {
    const loadPostsBtn: HTMLElement | null = document.getElementById('loadPostsBtn');
    const postsContainer: HTMLElement | null = document.getElementById('postsContainer');
    const loadingSpinner: HTMLElement | null = document.getElementById('loadingSpinner');

    try {
        showLoading(loadingSpinner, postsContainer);
        
        // Fetch даних з JSONPlaceholder API
        const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts: Post[] = await response.json();
        
        hideLoading(loadingSpinner);
        
        // Відображення постів з анімацією
        if (postsContainer) {
            posts.forEach((post: Post, index: number): void => {
                const postCard: HTMLElement = createPostCard(post);
                postCard.style.opacity = '0';
                postCard.style.transform = 'translateY(20px)';
                postsContainer.appendChild(postCard);
                
                // Анімація появи з затримкою
                setTimeout((): void => {
                    postCard.style.transition = 'all 0.5s ease';
                    postCard.style.opacity = '1';
                    postCard.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        // Ховаємо кнопку після завантаження
        if (loadPostsBtn) {
            loadPostsBtn.style.display = 'none';
        }
        
    } catch (error: unknown) {
        hideLoading(loadingSpinner);
        console.error('Помилка завантаження постів:', error);
        
        if (postsContainer) {
            postsContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: red;">
                    <p>Помилка завантаження даних. Спробуйте пізніше.</p>
                </div>
            `;
        }
    }
}

/**
 * Ініціалізація fetch функцій
 */
export function initFetch(): void {
    const loadPostsBtn: HTMLElement | null = document.getElementById('loadPostsBtn');
    
    // Event listener для кнопки завантаження постів
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener('click', loadPosts);
    }
}
