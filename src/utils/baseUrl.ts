/**
 * Base URL Detection Utility
 * 
 * This utility provides a function to get the appropriate base URL for QR code generation.
 * It handles different scenarios:
 * 1. Production: Uses the actual domain (e.g., example.com)
 * 2. Development with --host: Uses machine's network IP for mobile access
 * 3. Development localhost: Falls back to localhost (but won't work on mobile)
 * 
 * Key Insight:
 * When Vite runs with --host flag, it listens on 0.0.0.0:port, making it accessible
 * via the machine's IP address on the local network. The browser automatically detects
 * this and window.location.hostname contains the IP address.
 */

/**
 * Gets the base URL for QR code generation
 * 
 * Returns:
 * - Full URL with protocol: "http://192.168.1.100:5177" or "https://example.com"
 * - Safe to use directly in QR codes for mobile scanning
 * 
 * How it works:
 * 1. Reads current window.location (protocol, hostname, port)
 * 2. If on localhost/127.0.0.1 in dev mode → suggests using machine IP
 * 3. If accessed via IP → uses that IP directly
 * 4. If in production → uses the actual domain
 */
export function getBaseUrl(): string {
  const protocol = window.location.protocol; // "http:" or "https:"
  const hostname = window.location.hostname; // IP, localhost, or domain
  const port = window.location.port; // Port number or empty string
  
  // Build the base URL from current browser location
  // This automatically gives us the right address that the browser used to load the page
  let baseUrl = `${protocol}//${hostname}`;
  
  // Add port if it exists (important for localhost and local IPs)
  if (port) {
    baseUrl += `:${port}`;
  }
  
  return baseUrl;
}

/**
 * Gets a formatted message for the user explaining how to access via mobile
 * 
 * Returns a string explaining:
 * - What URL to use if on localhost
 * - What URL is being used if on a network IP
 */
export function getAccessInstructions(): string {
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // Production domain check (not localhost or 127.0.0.1)
  const isProduction = hostname !== 'localhost' && 
                       hostname !== '127.0.0.1' &&
                       !hostname.startsWith('192.168') &&
                       !hostname.startsWith('10.') &&
                       !hostname.startsWith('172.');
  
  if (isProduction) {
    // Already on a real domain
    return `App is accessible at: ${getBaseUrl()}`;
  }
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // On localhost - mobile needs machine IP
    return `To scan QR on mobile: 
1. Find your machine's IP address (usually starts with 192.168.x.x or 10.x.x.x)
2. On mobile, access: http://[YOUR-MACHINE-IP]:${port || '5177'}
3. Make sure both devices are on the same WiFi network`;
  }
  
  // Already on network IP
  return `Accessible on local network at: ${getBaseUrl()}
Make sure mobile is on the same WiFi network`;
}

/**
 * Environment-based URL builder
 * 
 * This can be extended for different environments (dev, staging, production)
 * For now, it provides automatic detection based on current location
 */
export function getQRCodeUrl(path: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}
