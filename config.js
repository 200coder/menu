// Easy Configuration for Modern Cafe Menu System
// Change these settings to customize for your business

const CAFE_CONFIG = {
    // ===== BUSINESS INFORMATION =====
    business: {
        // Cafe names in different languages
        names: {
            en: "luna cafe",           // English name
            ku: "چایخانەی مۆدێرن",        // Kurdish name  
            ar: "المقهى العصري"          // Arabic name
        },
        
        // Welcome messages
        welcomeMessages: {
            en: "Welcome to our premium coffee experience",
            ku: "بەخێربێن بۆ ئەزموونی قاوەی تایبەتمان",
            ar: "مرحباً بكم في تجربة القهوة المميزة"
        },
        
        // Business contact info (optional)
        contact: {
            phone: "+1-234-567-8900",
            email: "info@moderncafe.com",
            address: "123 Coffee Street, City"
        }
    },

    // ===== SERVER SETTINGS =====
    server: {
        // Telegram Bot Configuration
        telegramBot: {
            token: "7263049326:AAH3Z4-L3orbFEhlQQiW-LfwPct_FT0JDgg", // Your bot token
            chatId: "5873158543" // Your chat ID to receive orders
        },
        
        // Admin login credentials
        admin: {
            username: "admin",
            password: "cafe2024"
        }
    },

    // ===== APPEARANCE SETTINGS =====
    appearance: {
        // Primary colors (CSS color values)
        colors: {
            primary: "#8B4513",      // Brown
            secondary: "#D4A574",    // Light brown
            accent: "#6B4E3D",       // Dark brown
            background: "#FAF9F6",   // Cream white
            text: "#333333"          // Dark gray
        },
        
        // Logo settings
        logo: {
            enabled: false,
            url: "assets/images/logo.png",
            width: "120px",
            height: "auto"
        },
        
        // Custom CSS file (optional)
        customCSS: null // "assets/css/custom.css"
    },

    // ===== SYSTEM SETTINGS =====
    system: {
        // Default number of tables
        defaultTables: 10,
        
        // Default language
        defaultLanguage: "en",
        
        // Available languages
        availableLanguages: ["en", "ku", "ar"],
        
        // Currency symbol
        currency: "$",
        
        // Order settings
        orderSettings: {
            enableSpecialInstructions: true,
            enableOrderHistory: false,
            autoCloseCartAfterOrder: true
        }
    },

    // ===== FEATURES TOGGLE =====
    features: {
        languageSelector: true,
        adminPanel: true,
        qrCodeGeneration: true,
        mobileOptimized: true,
        darkMode: false,
        printReceipts: false
    }
};

// Export configuration for use in other files
if (typeof window !== 'undefined') {
    window.CAFE_CONFIG = CAFE_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CAFE_CONFIG;
}