// Translation data for multilingual support
const translations = {
    en: {
        // Basic UI
        cafe_name: "luna Cafe",
        welcome_message: "Welcome to our premium coffee experience",
        table: "Table",
        all: "All",
        your_order: "Your Order",
        total: "Total",
        place_order: "Place Order",
        special_instructions_placeholder: "Special instructions...",
        close: "Close",
        
        // Categories
        hot_drinks: "Hot Drinks",
        cold_drinks: "Cold Drinks",
        desserts: "Desserts",
        snacks: "Snacks",
        pastries: "Pastries",
        
        // Order confirmations
        order_sent: "Order Sent Successfully!",
        order_confirmation: "Your order has been sent to the kitchen. We'll prepare it shortly.",
        
        // Menu items
        add_to_cart: "Add to Cart",
        quantity: "Qty",
        remove: "Remove",
        
        // Admin
        admin_login: "Admin Login",
        username: "Username",
        password: "Password",
        login: "Login"
    },
    
    ku: {
        // Basic UI - Kurdish
        cafe_name: "چایخانەی مۆدێرن",
        welcome_message: "بەخێربێن بۆ ئەزموونی قاوەی تایبەتمان",
        table: "مێز",
        all: "هەموو",
        your_order: "داواکارییەکەت",
        total: "کۆی گشتی",
        place_order: "داواکاری بکە",
        special_instructions_placeholder: "ڕێنماییە تایبەتەکان...",
        close: "داخستن",
        
        // Categories
        hot_drinks: "خواردنەوەی گەرم",
        cold_drinks: "خواردنەوەی سارد",
        desserts: "شیرینی",
        snacks: "خواردنی سووک",
        pastries: "کێک و شیرینی",
        
        // Order confirmations
        order_sent: "داواکارییەکە بە سەرکەوتوویی نێردرا!",
        order_confirmation: "داواکارییەکەت بۆ چێشتخانەکە نێردراوە. بەزوویی ئامادەی دەکەین.",
        
        // Menu items
        add_to_cart: "زیادکردن",
        quantity: "ژمارە",
        remove: "لابردن",
        
        // Admin
        admin_login: "چوونەژوورەوەی بەڕێوەبەر",
        username: "ناوی بەکارهێنەر",
        password: "وشەی نهێنی",
        login: "چوونەژوورەوە"
    },
    
    ar: {
        // Basic UI - Arabic
        cafe_name: "المقهى العصري",
        welcome_message: "مرحباً بكم في تجربة القهوة المميزة",
        table: "طاولة",
        all: "الكل",
        your_order: "طلبك",
        total: "المجموع",
        place_order: "تأكيد الطلب",
        special_instructions_placeholder: "تعليمات خاصة...",
        close: "إغلاق",
        
        // Categories
        hot_drinks: "المشروبات الساخنة",
        cold_drinks: "المشروبات الباردة",
        desserts: "الحلويات",
        snacks: "الوجبات الخفيفة",
        pastries: "المعجنات",
        
        // Order confirmations
        order_sent: "تم إرسال الطلب بنجاح!",
        order_confirmation: "تم إرسال طلبك إلى المطبخ. سنقوم بتحضيره قريباً.",
        
        // Menu items
        add_to_cart: "أضف للسلة",
        quantity: "الكمية",
        remove: "إزالة",
        
        // Admin
        admin_login: "دخول المدير",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        login: "تسجيل الدخول"
    }
};

// Translation manager
class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        // Check for saved language preference
        const savedLang = localStorage.getItem('cafe-language');
        if (savedLang && this.translations[savedLang]) {
            this.setLanguage(savedLang);
        }
        
        // Apply initial translations
        this.applyTranslations();
        this.setupLanguageSelector();
    }

    setLanguage(langCode) {
        if (!this.translations[langCode]) return;
        
        this.currentLanguage = langCode;
        localStorage.setItem('cafe-language', langCode);
        
        // Update document direction for RTL languages
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
        
        this.applyTranslations();
        this.updateLanguageSelector();
    }

    translate(key) {
        return this.translations[this.currentLanguage][key] || 
               this.translations.en[key] || 
               key;
    }

    applyTranslations() {
        // Translate all elements with data-lang-key attribute
        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update page title
        document.title = this.translate('cafe_name');
        
        // Update special instructions placeholder
        const specialInstructions = document.getElementById('specialInstructions');
        if (specialInstructions) {
            specialInstructions.placeholder = this.translate('special_instructions_placeholder');
        }
    }

    setupLanguageSelector() {
        const languageOptions = document.querySelectorAll('.language-option');
        const currentFlag = document.getElementById('currentFlag');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageSelector = document.getElementById('languageSelector');
        const currentLanguage = document.getElementById('currentLanguage');
        
        console.log('Setting up language selector:');
        console.log('- Language options found:', languageOptions.length);
        console.log('- Current flag found:', !!currentFlag);
        console.log('- Language dropdown found:', !!languageDropdown);
        console.log('- Language selector found:', !!languageSelector);
        console.log('- Current language element found:', !!currentLanguage);
        
        // Initialize dropdown as hidden
        if (languageDropdown) {
            languageDropdown.style.opacity = '0';
            languageDropdown.style.visibility = 'hidden';
            languageDropdown.style.transform = 'translateY(-10px)';
        }
        
        // Add click handler to toggle dropdown
        if (currentLanguage && languageDropdown) {
            currentLanguage.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Language selector clicked, toggling dropdown');
                
                // Check current visibility state
                const isHidden = languageDropdown.style.visibility === 'hidden' || 
                                languageDropdown.style.opacity === '0' || 
                                languageDropdown.style.opacity === '';
                
                if (isHidden) {
                    // Show dropdown
                    languageDropdown.style.opacity = '1';
                    languageDropdown.style.visibility = 'visible';
                    languageDropdown.style.transform = 'translateY(0)';
                    console.log('Dropdown shown');
                } else {
                    // Hide dropdown
                    languageDropdown.style.opacity = '0';
                    languageDropdown.style.visibility = 'hidden';
                    languageDropdown.style.transform = 'translateY(-10px)';
                    console.log('Dropdown hidden');
                }
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (languageSelector && !languageSelector.contains(e.target) && languageDropdown) {
                languageDropdown.style.opacity = '0';
                languageDropdown.style.visibility = 'hidden';
                languageDropdown.style.transform = 'translateY(-10px)';
                console.log('Dropdown closed by outside click');
            }
        });
        
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                console.log('Language option clicked:', lang);
                this.setLanguage(lang);
                
                // Hide dropdown after selection
                if (languageDropdown) {
                    languageDropdown.style.opacity = '0';
                    languageDropdown.style.visibility = 'hidden';
                    languageDropdown.style.transform = 'translateY(-10px)';
                }
            });
        });
    }

    updateLanguageSelector() {
        const currentFlag = document.getElementById('currentFlag');
        const flagMap = {
            'en': 'assets/icons/en-flag.svg',
            'ku': 'assets/icons/ku-flag.svg',
            'ar': 'assets/icons/ar-flag.svg'
        };
        
        if (currentFlag && flagMap[this.currentLanguage]) {
            currentFlag.src = flagMap[this.currentLanguage];
            currentFlag.alt = this.currentLanguage.toUpperCase();
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to get translations for menu items
    getMenuItemTranslation(item, field) {
        if (item.translations && item.translations[this.currentLanguage] && item.translations[this.currentLanguage][field]) {
            return item.translations[this.currentLanguage][field];
        }
        
        // Fallback to English
        if (item.translations && item.translations.en && item.translations.en[field]) {
            return item.translations.en[field];
        }
        
        // Final fallback
        return item[field] || '';
    }
}

// Initialize translation manager when DOM is loaded
let translator;
document.addEventListener('DOMContentLoaded', () => {
    translator = new TranslationManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationManager, translations };
}