// frontend/src/utils/helpers.js

/**
 * Format a number as currency
 * @param {number} value - The number to format
 * @param {string} currency - Currency code (INR, USD, etc.)
 * @param {number} precision - Decimal places
 */
export function formatCurrency(value, currency = 'INR', precision = 0) {
  if (value === null || value === undefined) return '-';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

/**
 * Format a number with units
 * @param {number} value - The number to format
 * @param {string} unit - Unit to append (%, INR, etc.)
 * @param {number} precision - Decimal places
 */
export function formatValue(value, unit = '', precision = 0) {
  if (value === null || value === undefined) return '-';
  
  if (unit === 'INR') {
    return formatCurrency(value, 'INR', precision);
  }
  
  const formatted = value.toLocaleString('en-IN', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  
  return unit ? `${formatted}${unit}` : formatted;
}

/**
 * Format a percentage with + or - sign
 * @param {number} value - Decimal value (0.12 = 12%)
 */
export function formatPercent(value) {
  if (value === null || value === undefined) return '-';
  
  const percent = (value * 100).toFixed(1);
  const sign = value >= 0 ? '+' : '';
  return `${sign}${percent}%`;
}

/**
 * Format a date string
 * @param {string} dateString - ISO date string
 * @param {string} format - 'short', 'long', or 'time'
 */
export function formatDate(dateString, format = 'short') {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  if (format === 'time') {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return dateString;
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return `w${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function - delays execution until user stops typing
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Merge CSS classes (used with Tailwind)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}