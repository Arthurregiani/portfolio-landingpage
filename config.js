/**
 * Frontend Configuration
 * 
 * Handles cold-start delays from free-tier hosting services like Render/Railway
 * that can take 30-60 seconds to "wake up" after inactivity periods.
 */

const CONFIG = {
  // Request timeout configuration (AWS EC2 - no cold start)
  REQUEST_TIMEOUT_MS: 30000, // 30 seconds - EC2 always running
  
  // Retry configuration for failed requests
  MAX_RETRIES: 1,
  RETRY_DELAYS: [1000], // Single retry after 1s
  
  // Keep-alive (disabled for AWS EC2 - always running)
  KEEP_ALIVE_ENABLED: false,
  KEEP_ALIVE_INTERVAL: 0, // Disabled
  
  // Backend configuration - AWS EC2 with HTTPS
  // Note: Uses self-signed certificate - users need to accept it first
  BACKEND_URL: 'https://18.228.193.155/api/contact',
  HEALTH_CHECK_URL: 'https://18.228.193.155/health',
  
  // UI Messages
  MESSAGES: {
    SENDING: '$ enviando...',
    COLD_START_WARNING: '$ enviando... (AWS EC2)',
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