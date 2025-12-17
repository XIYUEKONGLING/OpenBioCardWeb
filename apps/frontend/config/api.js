/**
 * API Configuration
 * Centralized API endpoint configuration
 */
export const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
    getUrl(path) {
        return `${this.baseUrl}${path}`
    }
}

if (import.meta.env.DEV) {
    console.log('API Config:', API_CONFIG)
}
