// tests/unit/utils.test.js
import { describe, it, expect, vi } from 'vitest';
import {
  getCardClass,
  buildCard,
  filterCardsByType,
  countCards,
  isValidUrl,
  calculateRippleSize,
  calculateRipplePosition,
} from '../../js/utils.js';

// ── getCardClass ──
describe('getCardClass', () => {
  it('повертає правильний клас для "slide"', () => {
    expect(getCardClass('slide')).toBe('card-slide');
  });

  it('повертає правильний клас для "neon"', () => {
    expect(getCardClass('neon')).toBe('card-neon');
  });

  it('кидає помилку для невідомого типу', () => {
    expect(() => getCardClass('rainbow')).toThrow('Unknown card type: "rainbow"');
  });

  it('кидає помилку якщо тип не передано', () => {
    expect(() => getCardClass()).toThrow();
  });
});

// ── buildCard ──
describe('buildCard', () => {
  it('будує коректний об\'єкт картки', () => {
    const card = buildCard({
      label: 'GitHub',
      url: 'https://github.com',
      type: 'slide',
      icon: '🌿',
    });
    expect(card).toEqual({
      label: 'GitHub',
      url: 'https://github.com',
      icon: '🌿',
      className: 'card-slide',
    });
  });

  it('обрізає пробіли в label', () => {
    const card = buildCard({ label: '  MDN  ', url: 'https://mdn.io', type: 'spot' });
    expect(card.label).toBe('MDN');
  });

  it('використовує іконку за замовчуванням якщо не передана', () => {
    const card = buildCard({ label: 'Test', url: 'https://test.com', type: 'slide' });
    expect(card.icon).toBe('🔗');
  });

  it('кидає помилку якщо label порожній', () => {
    expect(() => buildCard({ label: '', url: 'https://test.com', type: 'slide' }))
      .toThrow('Card label cannot be empty');
  });

  it('кидає помилку для невалідного URL', () => {
    expect(() => buildCard({ label: 'Test', url: 'ftp://invalid', type: 'slide' }))
      .toThrow('Invalid URL');
  });
});

// ── filterCardsByType ──
describe('filterCardsByType', () => {
  const mockCards = [
    { label: 'GitHub', type: 'slide' },
    { label: 'Dribbble', type: 'float' },
    { label: 'Figma', type: 'slide' },
  ];

  it('повертає картки правильного типу', () => {
    const result = filterCardsByType(mockCards, 'slide');
    expect(result).toHaveLength(2);
  });

  it('повертає порожній масив якщо таких немає', () => {
    expect(filterCardsByType(mockCards, 'neon')).toHaveLength(0);
  });

  it('повертає порожній масив якщо не масив', () => {
    expect(filterCardsByType(null, 'slide')).toEqual([]);
  });
});

// ── countCards ──
describe('countCards', () => {
  it('рахує правильну кількість карток', () => {
    expect(countCards([1, 2, 3])).toBe(3);
  });

  it('повертає 0 для порожнього масиву', () => {
    expect(countCards([])).toBe(0);
  });

  it('повертає 0 якщо не масив', () => {
    expect(countCards(null)).toBe(0);
  });

  // Демонстрація Spy
  it('Spy: відстежує виклик countCards', () => {
    const spy = vi.fn(countCards);
    spy([1, 2]);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith([1, 2]);
  });
});

// ── isValidUrl ──
describe('isValidUrl', () => {
  it('повертає true для https URL', () => {
    expect(isValidUrl('https://github.com')).toBe(true);
  });

  it('повертає true для http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  it('повертає false для ftp URL', () => {
    expect(isValidUrl('ftp://files.com')).toBe(false);
  });

  it('повертає false для null', () => {
    expect(isValidUrl(null)).toBe(false);
  });
});

// ── calculateRippleSize ──
describe('calculateRippleSize', () => {
  it('повертає більшу зі сторін', () => {
    expect(calculateRippleSize(300, 80)).toBe(300);
    expect(calculateRippleSize(100, 200)).toBe(200);
  });

  it('кидає помилку для від\'ємних значень', () => {
    expect(() => calculateRippleSize(-10, 50)).toThrow('positive');
  });

  it('кидає помилку якщо передано не числа', () => {
    expect(() => calculateRippleSize('a', 50)).toThrow('numbers');
  });
});

// ── calculateRipplePosition ──
describe('calculateRipplePosition', () => {
  it('правильно обчислює позицію', () => {
    const pos = calculateRipplePosition(150, 100, 50, 20, 300);
    expect(pos).toEqual({ left: -50, top: -70 });
  });
});