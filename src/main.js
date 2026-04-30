// src/main.js — точка входу Vite

import './css/style.css';
// Імпортуємо реальні функції з вашого utils.js
import { buildCard, countCards } from './js/utils.js';

const appStatus = import.meta.env.VITE_APP_STATUS || 'Development';
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Знаходимо елементи, які вже є в index.html
const badge = document.getElementById('env-badge');
const versionDisplay = document.getElementById('app-version');

if (badge) {
  badge.textContent = appStatus;
  
  // Очищаємо старі класи та додаємо потрібний
  badge.className = ''; 
  if (appStatus.toLowerCase().includes('prod')) {
    badge.classList.add('env-production');
  } else {
    badge.classList.add('env-development');
  }
}

if (versionDisplay) {
  versionDisplay.textContent = `v${appVersion}`;
}

/**
 * 2. Ініціалізація існуючої логіки зі script.js
 * (Vite автоматично запустить код з імпортованого script.js)
 */
import './js/script.js';

/**
 * 3. Демонстрація використання бізнес-логіки з utils.js
 * Створимо віртуальну картку для перевірки працездатності функцій
 */
try {
  const testCard = buildCard({
    label: 'Тестова картка',
    url: 'https://google.com',
    type: 'slide',
    icon: '🧪'
  });
  
  console.log('Бизнес-логіка працює. Створено об\'єкт:', testCard);
  
  // Рахуємо картки, які вже є в HTML
  const cardsInHtml = document.querySelectorAll('.link-card').length;
  console.log(`На сторінці знайдено карток: ${countCards(new Array(cardsInHtml))}`);
} catch (error) {
  console.error('Помилка валідації в utils.js:', error.message);
}

/**
 * 4. Обробка Spotlight для всіх карток (додаткове покращення)
 */
const spotCards = document.querySelectorAll('.card-spot');
spotCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--y', (e.clientY - rect.top) + 'px');
  });
});