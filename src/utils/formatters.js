/**
 * Format year with proper suffix (1st, 2nd, 3rd, 4th)
 * @param {number} year - Year number (1-4)
 * @returns {string} Formatted year with suffix
 */
export const getYearSuffix = (year) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = year % 100;
    return year + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param {Date|Timestamp} timestamp - Firebase timestamp or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Recently';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format date to readable string
 * @param {Date|Timestamp} date - Date or Firebase timestamp
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
