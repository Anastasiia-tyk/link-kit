// src/main.js — точка входу Vite

import './style.css';
// Імпортуємо реальні функції з вашого utils.js
import { buildCard, countCards } from './utils.js';

/**
 * 1. Робота зі змінними оточення
 */
const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Відображення статусу (якщо ви додасте ці елементи в HTML)
const footer = document.querySelector('.site-footer');
if (footer) {
  // Додаємо бейдж статусу та версію до існуючого футера
  const info = document.createElement('div');
  info.style.marginTop = '10px';
  info.innerHTML = `
    <span class="env-badge">Status: ${appStatus}</span> | 
    <span id="app-version">v${appVersion}</span>
  `;
  footer.appendChild(info);
}

/**
 * 2. Ініціалізація існуючої логіки зі script.js
 * (Vite автоматично запустить код з імпортованого script.js)
 */
import './script.js';

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