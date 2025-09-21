/**
 * Frontend Configuration
 * 
 * Handles cold-start delays from free-tier hosting services like Render/Railway
 * that can take 30-60 seconds to "wake up" after inactivity periods.
 */

const CONFIG = {
  // Request timeout configuration
  REQUEST_TIMEOUT_MS: 120000, // 120 seconds (2 minutes) - handles worst-case cold starts
  
  // Retry configuration for failed requests
  MAX_RETRIES: 2,
  RETRY_DELAYS: [2000, 5000], // Exponential backoff: 2s, then 5s
  
  // Keep-alive to prevent server sleep (only enable in production)
  KEEP_ALIVE_ENABLED: true,
  KEEP_ALIVE_INTERVAL: 14 * 60 * 1000, // 14 minutes (Render sleeps after ~15min)
  
  // Backend configuration
  BACKEND_URL: 'https://landingpage-backend-rw9p.onrender.com/api/contact',
  HEALTH_CHECK_URL: 'https://landingpage-backend-rw9p.onrender.com/health',
  
  // UI Messages
  MESSAGES: {
    SENDING: '$ enviando...',
    COLD_START_WARNING: '$ enviando... (servidor inicializando, pode demorar até 2 min)',
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