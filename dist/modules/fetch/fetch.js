// ============================================
// Модуль для роботи з Fetch API
// ============================================
/**
 * Функція для відображення спінера завантаження
 */
function showLoading(loadingSpinner, postsContainer) {
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
function hideLoading(loadingSpinner) {
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
}
/**
 * Функція для створення HTML елемента поста
 */
function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>ID: ${post.id} | User ID: ${post.userId}</small>
    `;
    // Додаємо анімацію при кліку на картку
    postCard.addEventListener('click', () => {
        postCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            postCard.style.transform = 'scale(1)';
        }, 200);
    });
    return postCard;
}
/**
 * Функція для завантаження та відображення постів
 */
export async function loadPosts() {
    const loadPostsBtn = document.getElementById('loadPostsBtn');
    const postsContainer = document.getElementById('postsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    try {
        showLoading(loadingSpinner, postsContainer);
        // Fetch даних з JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        hideLoading(loadingSpinner);
        // Відображення постів з анімацією
        if (postsContainer) {
            posts.forEach((post, index) => {
                const postCard = createPostCard(post);
                postCard.style.opacity = '0';
                postCard.style.transform = 'translateY(20px)';
                postsContainer.appendChild(postCard);
                // Анімація появи з затримкою
                setTimeout(() => {
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
    }
    catch (error) {
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
export function initFetch() {
    const loadPostsBtn = document.getElementById('loadPostsBtn');
    // Event listener для кнопки завантаження постів
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener('click', loadPosts);
    }
}
