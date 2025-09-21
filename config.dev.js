/**
 * Development Configuration
 * 
 * This config is for local testing only. It uses a local backend instead
 * of the production backend to avoid CORS issues during development.
 */

const CONFIG = {
  // Request timeout configuration
  REQUEST_TIMEOUT_MS: 30000, // Shorter timeout for local testing
  
  // Retry configuration for failed requests
  MAX_RETRIES: 1, // Fewer retries for local testing
  RETRY_DELAYS: [1000], // Shorter delay for local testing
  
  // Keep-alive disabled for local testing
  KEEP_ALIVE_ENABLED: false, // No need for keep-alive in local development
  KEEP_ALIVE_INTERVAL: 0,
  
  // Backend configuration - LOCAL BACKEND
  BACKEND_URL: 'http://localhost:5000/api/contact',
  HEALTH_CHECK_URL: 'http://localhost:5000/health',
  
  // UI Messages
  MESSAGES: {
    SENDING: '$ enviando...',
    COLD_START_WARNING: '$ enviando... (conectando ao servidor local)',
    RETRYING: (attempt, max) => `$ tentativa ${attempt}/${max + 1}...`,
    SUCCESS: '$ enviado ✓',
    ERROR: '$ erro ✗'
  }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}