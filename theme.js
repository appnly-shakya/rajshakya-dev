/**
 * Smart Theme Manager
 * Automatically detects day/night based on local time
 * Allows manual override with localStorage persistence
 */

class ThemeManager {
    constructor() {
        this.STORAGE_KEY = 'theme-preference';
        this.THEME_DAY = 'light';
        this.THEME_NIGHT = 'dark';
        this.init();
    }

    /**
     * Initialize theme on page load
     */
    init() {
        // Check if user has manual preference stored
        const userPreference = localStorage.getItem(this.STORAGE_KEY);
        
        if (userPreference) {
            // Use user's manual preference
            this.applyTheme(userPreference);
        } else {
            // Auto-detect based on current time
            const detectedTheme = this.detectThemeByTime();
            this.applyTheme(detectedTheme);
        }

        // Setup theme toggle button
        this.setupThemeToggle();
    }

    /**
     * Detect theme based on local time (6 AM - 6 PM = day, else night)
     * You can adjust these hours as needed
     */
    detectThemeByTime() {
        const now = new Date();
        const hour = now.getHours();

        // 6 AM to 6 PM = Light theme
        // 6 PM to 6 AM = Dark theme
        const isDayTime = hour >= 6 && hour < 18;
        
        return isDayTime ? this.THEME_DAY : this.THEME_NIGHT;
    }

    /**
     * Get current time for debugging
     */
    getCurrentTime() {
        const now = new Date();
        return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    /**
     * Apply theme to the document
     */
    applyTheme(theme) {
        const isDark = theme === this.THEME_NIGHT;
        
        if (isDark) {
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
        }

        this.updateThemeToggle(isDark);
    }

    /**
     * Update theme toggle button icon
     */
    updateThemeToggle(isDark) {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        if (isDark) {
            toggle.innerHTML = '<span class="moon">🌙</span>';
        } else {
            toggle.innerHTML = '<span class="sun">☀️</span>';
        }
    }

    /**
     * Setup click handler for theme toggle button
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    /**
     * Toggle between light and dark themes
     * Saves user preference to localStorage
     */
    toggleTheme() {
        const isCurrentlyLight = document.body.classList.contains('light');
        const newTheme = isCurrentlyLight ? this.THEME_NIGHT : this.THEME_DAY;
        
        // Save user preference
        localStorage.setItem(this.STORAGE_KEY, newTheme);
        
        // Apply new theme
        this.applyTheme(newTheme);

        // Optional: Log for debugging
        console.log(`Theme switched to: ${newTheme} at ${this.getCurrentTime()}`);
    }

    /**
     * Clear user preference and go back to auto-detection
     */
    resetToAuto() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.init();
        console.log('Theme reset to auto-detection');
    }

    /**
     * Get current theme status
     */
    getStatus() {
        const isLight = document.body.classList.contains('light');
        const userPreference = localStorage.getItem(this.STORAGE_KEY);
        const currentTime = this.getCurrentTime();
        const autoDetected = this.detectThemeByTime();

        return {
            currentTheme: isLight ? this.THEME_DAY : this.THEME_NIGHT,
            userPreference: userPreference || 'auto-detected',
            autoDetected: autoDetected,
            currentTime: currentTime,
            isDayLight: autoDetected === this.THEME_DAY
        };
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}

// Optional: Log theme status to console for debugging
// Uncomment to see theme detection info
// console.log(window.themeManager.getStatus());
