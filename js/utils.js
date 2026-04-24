// js/utils.js — бізнес-логіка сторінки посилань

/**
 * Повертає CSS-клас анімації для картки за її типом
 */
export function getCardClass(type) {
  const types = {
    slide: 'card-slide',
    glitch: 'card-glitch',
    spot: 'card-spot',
    border: 'card-border',
    float: 'card-float',
    spin: 'card-spin',
    type: 'card-type',
    bounce: 'card-bounce',
    wipe: 'card-wipe',
    neon: 'card-neon',
    ripple: 'card-ripple',
  };
  if (!type || !types[type]) {
    throw new Error(`Unknown card type: "${type}"`);
  }
  return types[type];
}

/**
 * Будує об'єкт картки-посилання
 */
export function buildCard({ label, url, type, icon }) {
  if (!label || label.trim() === '') {
    throw new Error('Card label cannot be empty');
  }
  if (!url || !url.startsWith('http')) {
    throw new Error(`Invalid URL: "${url}"`);
  }
  return {
    label: label.trim(),
    url,
    icon: icon || '🔗',
    className: getCardClass(type),
  };
}

/**
 * Фільтрує картки за типом анімації
 */
export function filterCardsByType(cards, type) {
  if (!Array.isArray(cards)) { return []; }
  return cards.filter(c => c.type === type);
}

/**
 * Рахує кількість карток
 */
export function countCards(cards) {
  if (!Array.isArray(cards)) { return 0; }
  return cards.length;
}

/**
 * Валідує URL картки
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') { return false; }
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Обчислює розмір кола для Ripple-ефекту
 */
export function calculateRippleSize(width, height) {
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new Error('Width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be positive');
  }
  return Math.max(width, height);
}

/**
 * Обчислює позицію Ripple відносно картки
 */
export function calculateRipplePosition(clickX, clickY, rectLeft, rectTop, size) {
  return {
    left: clickX - rectLeft - size / 2,
    top: clickY - rectTop - size / 2,
  };
}