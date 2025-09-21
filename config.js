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
  
  // Backend configuration - Multiple endpoints for maximum reliability
  // Primary: DuckDNS with Let's Encrypt (preferred)
  // Fallback: Direct IP with self-signed certificate
  BACKEND_ENDPOINTS: [
    {
      name: 'DuckDNS + Let\'s Encrypt (Preferred)',
      baseUrl: 'https://arthurlandingapi.duckdns.org',
      contactUrl: 'https://arthurlandingapi.duckdns.org/api/contact',
      healthUrl: 'https://arthurlandingapi.duckdns.org/health',
      priority: 1
    },
    {
      name: 'Direct IP + Self-signed (Fallback)',
      baseUrl: 'https://18.228.193.155',
      contactUrl: 'https://18.228.193.155/api/contact', 
      healthUrl: 'https://18.228.193.155/health',
      priority: 2
    }
  ],
  
  // Legacy config for compatibility
  BACKEND_URL: 'https://arthurlandingapi.duckdns.org/api/contact',
  HEALTH_CHECK_URL: 'https://arthurlandingapi.duckdns.org/health',
  
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