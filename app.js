// Main application JavaScript with cart, ordering, and Telegram integration

// Configuration
const CONFIG = {
    TELEGRAM_BOT_TOKEN: '',
    TELEGRAM_CHAT_ID: '',
    ADMIN_CREDENTIALS: {
        username: '',
        password: ''
    }
};

// Cart Manager Class
class CartManager {
    constructor() {
        this.items = [];
        this.total = 0;
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.setupCartToggle();
        this.setupOrderButton();
        this.updateDisplay();
        this.extractTableFromURL();
    }

    extractTableFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const tableNumber = urlParams.get('table') || '1';
        const tableNumberElement = document.getElementById('tableNumber');
        if (tableNumberElement) {
            tableNumberElement.textContent = tableNumber;
        }
    }

    setupCartToggle() {
        const cartToggle = document.getElementById('cartToggle');
        const cart = document.getElementById('cart');
        
        if (cartToggle && cart) {
            cartToggle.addEventListener('click', () => {
                this.isExpanded = !this.isExpanded;
                cart.classList.toggle('expanded', this.isExpanded);
            });
        }
    }

    setupOrderButton() {
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => this.placeOrder());
        }
    }

    addItem(itemId) {
        const menuItem = menuManager.getMenuItem(itemId);
        if (!menuItem) return;

        const existingItem = this.items.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: itemId,
                ...menuItem,
                quantity: 1
            });
        }

        this.updateDisplay();
        this.showCartAnimation();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.updateDisplay();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) return;

        if (newQuantity <= 0) {
            this.removeItem(itemId);
        } else {
            item.quantity = newQuantity;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.calculateTotal();
        this.updateCartCount();
        this.renderCartItems();
        this.updateOrderButton();
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('cartTotal');
        if (totalElement) {
            totalElement.textContent = this.total.toFixed(2);
        }
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #6B4E3D;">Your cart is empty</div>';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => {
            const itemName = translator ? translator.getMenuItemTranslation(item, 'name') : item.translations.en.name;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">{itemName}</div>
                        <div class="cart-item-price">{item.price.toFixed(2)} each</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cart.updateQuantity('{item.id}', {item.quantity - 1})">-</button>
                        <span>{item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity('{item.id}', {item.quantity + 1})">+</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateOrderButton() {
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.disabled = this.items.length === 0;
        }
    }

    showCartAnimation() {
        const cartToggle = document.getElementById('cartToggle');
        if (cartToggle) {
            cartToggle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartToggle.style.transform = 'scale(1)';
            }, 200);
        }
    }

    async placeOrder() {
        if (this.items.length === 0) return;

        try {
            const orderBtn = document.getElementById('orderBtn');
            if (orderBtn) {
                orderBtn.disabled = true;
                orderBtn.textContent = translator ? translator.translate('sending') || 'Sending...' : 'Sending...';
            }

            const success = await this.sendToTelegram();
            
            if (success) {
                this.showSuccessModal();
                this.clearCart();
            } else {
                this.showErrorMessage();
            }
        } catch (error) {
            console.error('Order placement error:', error);
            this.showErrorMessage();
        }
    }

    async sendToTelegram() {
        const tableNumber = document.getElementById('tableNumber').textContent || '1';
        const specialInstructions = document.getElementById('specialInstructions').value.trim();
        
        const orderDetails = this.formatOrderMessage(tableNumber, specialInstructions);
        
        const telegramAPI = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        try {
            const response = await fetch(telegramAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CONFIG.TELEGRAM_CHAT_ID,
                    text: orderDetails,
                    parse_mode: 'Markdown'
                })
            });
            
            const result = await response.json();
            return result.ok;
        } catch (error) {
            console.error('Telegram API error:', error);
            return false;
        }
    }

    formatOrderMessage(tableNumber, specialInstructions) {
        const currentTime = new Date().toLocaleString();
        const language = translator ? translator.getCurrentLanguage() : 'en';
        
        let message = `🍽️ *New Order - Table ${tableNumber}*\n`;
        message += `📅 ${currentTime}\n`;
        message += `🌍 Language: ${language.toUpperCase()}\n\n`;
        message += `📋 *Order Details:*\n`;
        
        this.items.forEach((item, index) => {
            const itemName = translator ? translator.getMenuItemTranslation(item, 'name') : item.translations.en.name;
            message += `${index + 1}. ${itemName}\n`;
            message += `   • Quantity: ${item.quantity}\n`;
            message += `   • Price: $${item.price.toFixed(2)} each\n`;
            message += `   • Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
        });
        
        message += `💰 *Total: {this.total.toFixed(2)}*\n\n`;
        
        if (specialInstructions) {
            message += `📝 *Special Instructions:*\n${specialInstructions}\n\n`;
        }
        
        message += `luna Cafe Menu System`;
        
        return message;
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    showErrorMessage() {
        alert(translator ? translator.translate('order_error') || 'Failed to send order. Please try again.' : 'Failed to send order. Please try again.');
        
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.disabled = false;
            orderBtn.textContent = translator ? translator.translate('place_order') : 'Place Order';
        }
    }

    clearCart() {
        this.items = [];
        this.updateDisplay();
        
        const specialInstructions = document.getElementById('specialInstructions');
        if (specialInstructions) {
            specialInstructions.value = '';
        }
    }
}

// Admin Manager Class
class AdminManager {
    constructor() {
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.setupAdminButton();
        this.setupAdminModal();
        this.setupSuccessModal();
    }

    setupAdminButton() {
        const adminBtn = document.getElementById('adminBtn');
        console.log('Setting up admin button, element found:', !!adminBtn);
        if (adminBtn) {
            adminBtn.addEventListener('click', () => {
                console.log('Admin button clicked');
                this.showAdminModal();
            });
        } else {
            console.error('Admin button element not found!');
        }
    }

    setupAdminModal() {
        const adminModal = document.getElementById('adminModal');
        const closeAdminModal = document.getElementById('closeAdminModal');
        const adminLoginForm = document.getElementById('adminLoginForm');
        
        if (closeAdminModal) {
            closeAdminModal.addEventListener('click', () => this.hideAdminModal());
        }
        
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', (e) => this.handleAdminLogin(e));
        }
        
        // Close modal when clicking outside
        if (adminModal) {
            adminModal.addEventListener('click', (e) => {
                if (e.target === adminModal) {
                    this.hideAdminModal();
                }
            });
        }
    }

    setupSuccessModal() {
        const successModal = document.getElementById('successModal');
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        
        if (closeSuccessModal) {
            closeSuccessModal.addEventListener('click', () => this.hideSuccessModal());
        }
        
        if (successModal) {
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    this.hideSuccessModal();
                }
            });
        }
    }

    showAdminModal() {
        const modal = document.getElementById('adminModal');
        console.log('Showing admin modal, element found:', !!modal);
        if (modal) {
            modal.classList.add('active');
            console.log('Admin modal class added, should be visible now');
        } else {
            console.error('Admin modal element not found!');
        }
    }

    hideAdminModal() {
        const modal = document.getElementById('adminModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    hideSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    handleAdminLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === CONFIG.ADMIN_CREDENTIALS.username && 
            password === CONFIG.ADMIN_CREDENTIALS.password) {
            this.isAuthenticated = true;
            this.hideAdminModal();
            this.redirectToAdminPanel();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }

    redirectToAdminPanel() {
        // Redirect to admin panel
        window.location.href = 'admin/index.html';
    }
}

// QR Code Generator Class
class QRCodeGenerator {
    constructor() {
        this.baseURL = window.location.origin + window.location.pathname;
    }

    generateTableURL(tableNumber) {
        return `${this.baseURL}?table=${tableNumber}`;
    }

    generateQRCode(tableNumber) {
        const url = this.generateTableURL(tableNumber);
        // Using a free QR code API service
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    }

    downloadQRCode(tableNumber) {
        const qrURL = this.generateQRCode(tableNumber);
        const link = document.createElement('a');
        link.href = qrURL;
        link.download = `table-${tableNumber}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    generateAllTableQRCodes(numberOfTables = 10) {
        const qrCodes = [];
        for (let i = 1; i <= numberOfTables; i++) {
            qrCodes.push({
                table: i,
                url: this.generateTableURL(i),
                qrCode: this.generateQRCode(i)
            });
        }
        return qrCodes;
    }
}

// Language synchronization
function syncLanguageChanges() {
    if (translator && menuManager && cart) {
        // Update menu items
        menuManager.updateMenuLanguage();
        
        // Update cart display
        cart.updateDisplay();
        
        // Update order button text
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.textContent = translator.translate('place_order');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing managers...');
    
    // Initialize managers immediately
    window.cart = new CartManager();
    window.admin = new AdminManager();
    window.qrGenerator = new QRCodeGenerator();
    
    // Sync language changes
    if (translator) {
        const originalSetLanguage = translator.setLanguage.bind(translator);
        translator.setLanguage = function(langCode) {
            originalSetLanguage(langCode);
            syncLanguageChanges();
        };
    }
    
    console.log('luna Cafe Menu System initialized successfully!');
    
    // For development: log QR codes for all tables
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('QR Codes for all tables:', window.qrGenerator.generateAllTableQRCodes());
    }
});

// Utility function to create QR codes for all tables (for admin use)
function createTableQRCodes() {
    const numberOfTables = parseInt(prompt('How many tables do you need QR codes for?', '10'));
    if (numberOfTables && numberOfTables > 0) {
        const qrCodes = qrGenerator.generateAllTableQRCodes(numberOfTables);
        
        // Open a new window with all QR codes
        const newWindow = window.open('', '_blank');
        let html = `
            <html>
                <head>
                    <title>Table QR Codes</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .qr-container { display: inline-block; margin: 20px; text-align: center; }
                        .qr-container img { border: 1px solid #ccc; }
                        .qr-container h3 { margin: 10px 0; }
                        @media print { .qr-container { page-break-inside: avoid; } }
                    </style>
                </head>
                <body>
                    <h1>QR Codes for Cafe Tables</h1>
        `;
        
        qrCodes.forEach(qr => {
            html += `
                <div class="qr-container">
                    <h3>Table ${qr.table}</h3>
                    <img src="${qr.qrCode}" alt="QR Code for Table ${qr.table}">
                    <p><small>${qr.url}</small></p>
                </div>
            `;
        });
        
        html += `
                </body>
            </html>
        `;
        
        newWindow.document.write(html);
        newWindow.document.close();
    }
}

// Export for global access
window.createTableQRCodes = createTableQRCodes;

// === Admin Panel Fixes: Edit & Delete Menu Items ===

// Utility: Refresh admin menu table (assumes a function renderAdminMenu exists or similar)
function refreshAdminTable() {
    if (typeof renderAdminMenu === "function") {
        renderAdminMenu();
    } else {
        location.reload(); // fallback: simple reload
    }
}

// Delete item by id
function deleteMenuItem(itemId) {
    if (!window.menuData) return;
    window.menuData = window.menuData.filter(item => item.id !== itemId);
    localStorage.setItem("menuData", JSON.stringify(window.menuData));
    refreshAdminTable();
}

// Edit item workflow
let currentEditId = null;

function editMenuItem(itemId) {
    const item = window.menuData.find(i => i.id === itemId);
    if (!item) return;
    currentEditId = itemId;

    // Fill modal fields (ensure modal exists in admin/index.html)
    document.getElementById("editName").value = item.name;
    document.getElementById("editPrice").value = item.price;
    document.getElementById("editDescription").value = item.description || "";
    document.getElementById("editImagePreview").src = item.image || "";

    const modal = document.getElementById("editItemModal");
    if (modal) modal.style.display = "block";
}

function saveEditedItem() {
    if (!currentEditId) return;
    const item = window.menuData.find(i => i.id === currentEditId);
    if (!item) return;

    item.name = document.getElementById("editName").value;
    item.price = document.getElementById("editPrice").value;
    item.description = document.getElementById("editDescription").value;
    const imgInput = document.getElementById("editImage");
    if (imgInput && imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            item.image = e.target.result;
            finalizeSave();
        };
        reader.readAsDataURL(imgInput.files[0]);
    } else {
        finalizeSave();
    }

    function finalizeSave() {
        localStorage.setItem("menuData", JSON.stringify(window.menuData));
        refreshAdminTable();
        const modal = document.getElementById("editItemModal");
        if (modal) modal.style.display = "none";
        currentEditId = null;
    }
}
