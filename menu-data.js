// Menu data with multilingual support
const menuData = {
    items: [
        // Hot Drinks
        {
            id: 'espresso',
            category: 'hot-drinks',
            price: 3.50,
            icon: 'fas fa-coffee',
            image: 'https://images.wallpaperscraft.com/image/single/coffee_espresso_cup_115582_3840x2400.jpg' ,
            translations: {
                en: {
                    name: 'Espresso',
                    description: 'Rich and bold espresso shot with perfect crema'
                },
                ku: {
                    name: 'ئێسپرێسۆ',
                    description: 'قاوەی توند و خۆش تامی ئێسپرێسۆ لەگەڵ کرێمای تەواو'
                },
                ar: {
                    name: 'إسبريسو',
                    description: 'قهوة إسبريسو غنية وقوية مع رغوة مثالية'
                }
            }
        },
        {
            id: 'cappuccino',
            category: 'hot-drinks',
            price: 4.50,
            icon: 'fas fa-coffee',
            image: 'https://recettes.vedrenne.fr/1269-large_default/gingerbread-cappuccino.jpg',
            translations: {
                en: {
                    name: 'Cappuccino',
                    description: 'Perfect blend of espresso, steamed milk and foam'
                },
                ku: {
                    name: 'کاپوچینۆ',
                    description: 'تێکەڵەیەکی تەواوی ئێسپرێسۆ، شیری گەرم و کەف'
                },
                ar: {
                    name: 'كابتشينو',
                    description: 'مزيج مثالي من الإسبريسو والحليب المبخر والرغوة'
                }
            }
        },
        {
            id: 'latte',
            category: 'hot-drinks',
            price: 4.25,
            icon: 'fas fa-coffee',
            image: null,
            translations: {
                en: {
                    name: 'Café Latte',
                    description: 'Smooth espresso with plenty of steamed milk'
                },
                ku: {
                    name: 'کافێ لاتێ',
                    description: 'ئێسپرێسۆی نەرم لەگەڵ شیری گەرمی زۆر'
                },
                ar: {
                    name: 'لاتيه',
                    description: 'إسبريسو ناعم مع الكثير من الحليب المبخر'
                }
            }
        },
        {
            id: 'turkish-coffee',
            category: 'hot-drinks',
            price: 3.75,
            icon: 'fas fa-coffee',
            image: null,
            translations: {
                en: {
                    name: 'Turkish Coffee',
                    description: 'Traditional Turkish coffee prepared with finley ground beans'
                },
                ku: {
                    name: 'قاوەی تورکی',
                    description: 'قاوەی نەریتی تورکی لەگەڵ دانەی وردکراوی نازک'
                },
                ar: {
                    name: 'قهوة تركية',
                    description: 'قهوة تركية تقليدية محضرة بحبوب مطحونة ناعماً'
                }
            }
        },
        {
            id: 'kurdish-tea',
            category: 'hot-drinks',
            price: 2.50,
            icon: 'fas fa-mug-hot',
            image: null,
            translations: {
                en: {
                    name: 'Kurdish Tea',
                    description: 'Traditional Kurdish black tea served in small glasses'
                },
                ku: {
                    name: 'چایی کوردی',
                    description: 'چایی ڕەشی نەریتی کوردی لە گڵاسە بچووکەکاندا'
                },
                ar: {
                    name: 'شاي كردي',
                    description: 'شاي أسود كردي تقليدي يقدم في أكواب صغيرة'
                }
            }
        },

        // Cold Drinks
        {
            id: 'iced-coffee',
            category: 'cold-drinks',
            price: 4.00,
            icon: 'fas fa-glass-whiskey',
            image: null,
            translations: {
                en: {
                    name: 'Iced Coffee',
                    description: 'Refreshing cold brew coffee served over ice'
                },
                ku: {
                    name: 'قاوەی سارد',
                    description: 'قاوەی سارد و سەرسوڕهێنەر لەسەر سەهۆڵ'
                },
                ar: {
                    name: 'قهوة مثلجة',
                    description: 'قهوة باردة منعشة تقدم على الثلج'
                }
            }
        },
        {
            id: 'iced-latte',
            category: 'cold-drinks',
            price: 4.75,
            icon: 'fas fa-glass-whiskey',
            image: null,
            translations: {
                en: {
                    name: 'Iced Latte',
                    description: 'Creamy iced latte with cold milk and espresso'
                },
                ku: {
                    name: 'لاتێی سارد',
                    description: 'لاتێی سارد و کرێمدار لەگەڵ شیری سارد و ئێسپرێسۆ'
                },
                ar: {
                    name: 'لاتيه مثلج',
                    description: 'لاتيه مثلج كريمي مع الحليب البارد والإسبريسو'
                }
            }
        },
        {
            id: 'fresh-juice',
            category: 'cold-drinks',
            price: 3.50,
            icon: 'fas fa-glass-whiskey',
            image: null,
            translations: {
                en: {
                    name: 'Fresh Orange Juice',
                    description: 'Freshly squeezed orange juice, no additives'
                },
                ku: {
                    name: 'شەربەتی پرتەقاڵی تازە',
                    description: 'شەربەتی پرتەقاڵی تازە گوشراو، بێ زیادکراو'
                },
                ar: {
                    name: 'عصير برتقال طازج',
                    description: 'عصير برتقال طازج معصور، بدون إضافات'
                }
            }
        },
        {
            id: 'sparkling-water',
            category: 'cold-drinks',
            price: 2.25,
            icon: 'fas fa-glass-whiskey',
            image: null,
            translations: {
                en: {
                    name: 'Sparkling Water',
                    description: 'Refreshing sparkling mineral water'
                },
                ku: {
                    name: 'ئاوی گازدار',
                    description: 'ئاوی کانزایی گازداری سەرسوڕهێنەر'
                },
                ar: {
                    name: 'مياه غازية',
                    description: 'مياه معدنية غازية منعشة'
                }
            }
        },

        // Desserts
        {
            id: 'tiramisu',
            category: 'desserts',
            price: 6.50,
            icon: 'fas fa-birthday-cake',
            image: null,
            translations: {
                en: {
                    name: 'Tiramisu',
                    description: 'Classic Italian dessert with coffee and mascarpone'
                },
                ku: {
                    name: 'تیرامیسو',
                    description: 'شیرینی کلاسیکی ئیتالی لەگەڵ قاوە و ماسکارپۆنێ'
                },
                ar: {
                    name: 'تيراميسو',
                    description: 'حلوى إيطالية كلاسيكية بالقهوة والماسكاربوني'
                }
            }
        },
        {
            id: 'chocolate-cake',
            category: 'desserts',
            price: 5.75,
            icon: 'fas fa-birthday-cake',
            image: null,
            translations: {
                en: {
                    name: 'Chocolate Cake',
                    description: 'Rich dark chocolate cake with ganache frosting'
                },
                ku: {
                    name: 'کێکی شۆکۆلاتە',
                    description: 'کێکی شۆکۆلاتە تاریکی دەوڵەمەند لەگەڵ گاناشی سەرەوە'
                },
                ar: {
                    name: 'كيك الشوكولاتة',
                    description: 'كيك الشوكولاتة الداكنة الغني مع كريمة الجاناش'
                }
            }
        },
        {
            id: 'baklava',
            category: 'desserts',
            price: 4.25,
            icon: 'fas fa-birthday-cake',
            image: null,
            translations: {
                en: {
                    name: 'Baklava',
                    description: 'Traditional Middle Eastern pastry with honey and nuts'
                },
                ku: {
                    name: 'بەقلاوا',
                    description: 'شیرینی نەریتی ڕۆژهەڵاتی ناوەڕاست لەگەڵ هەنگوین و گوێز'
                },
                ar: {
                    name: 'بقلاوة',
                    description: 'حلوى شرق أوسطية تقليدية بالعسل والمكسرات'
                }
            }
        },

        // Snacks
        {
            id: 'sandwich',
            category: 'snacks',
            price: 7.50,
            icon: 'fas fa-hamburger',
            image: null,
            translations: {
                en: {
                    name: 'Club Sandwich',
                    description: 'Triple-layer sandwich with chicken, bacon, lettuce and tomato'
                },
                ku: {
                    name: 'سێندویچی کلەب',
                    description: 'سێندویچی سێ قاتی لەگەڵ مریشک، بەیکن، کاهو و تەماتە'
                },
                ar: {
                    name: 'ساندويش كلوب',
                    description: 'ساندويش ثلاث طبقات بالدجاج واللحم المقدد والخس والطماطم'
                }
            }
        },
        {
            id: 'croissant',
            category: 'snacks',
            price: 4.50,
            icon: 'fas fa-bread-slice',
            image: null,
            translations: {
                en: {
                    name: 'Butter Croissant',
                    description: 'Flaky, buttery French croissant'
                },
                ku: {
                    name: 'کرۆیسانتی کەرە',
                    description: 'کرۆیسانتی فەرەنسی کەرەیی و ورد'
                },
                ar: {
                    name: 'كرواسون بالزبدة',
                    description: 'كرواسون فرنسي رقيق بالزبدة'
                }
            }
        },

        // Pastries
        {
            id: 'danish',
            category: 'pastries',
            price: 3.75,
            icon: 'fas fa-cookie-bite',
            image: null,
            translations: {
                en: {
                    name: 'Fruit Danish',
                    description: 'Flaky pastry topped with fresh seasonal fruit'
                },
                ku: {
                    name: 'دانیشی میوە',
                    description: 'ناشتایی ورد لەگەڵ میوەی تازەی وەرز'
                },
                ar: {
                    name: 'دانش بالفواكه',
                    description: 'معجنات رقيقة مغطاة بالفواكه الطازجة الموسمية'
                }
            }
        },
        {
            id: 'muffin',
            category: 'pastries',
            price: 3.25,
            icon: 'fas fa-cookie-bite',
            image: null,
            translations: {
                en: {
                    name: 'Blueberry Muffin',
                    description: 'Soft, moist muffin loaded with fresh blueberries'
                },
                ku: {
                    name: 'ماڤینی شینەتووک',
                    description: 'ماڤینی نەرم و شێدار پڕ لە شینەتووکی تازە'
                },
                ar: {
                    name: 'مافن التوت الأزرق',
                    description: 'مافن طري ورطب محشو بالتوت الأزرق الطازج'
                }
            }
        }
    ]
};

// Menu manager class
class MenuManager {
    constructor() {
        this.menuData = menuData;
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        console.log('MenuManager initializing...');
        console.log('Menu data items:', this.menuData.items.length);
        this.renderMenu();
        this.setupCategoryButtons();
        console.log('MenuManager initialized successfully');
    }

    renderMenu(category = 'all') {
        console.log('Rendering menu for category:', category);
        const menuGrid = document.getElementById('menuGrid');
        console.log('Menu grid element found:', !!menuGrid);
        if (!menuGrid) {
            console.error('Menu grid element not found!');
            return;
        }

        menuGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? this.menuData.items 
            : this.menuData.items.filter(item => item.category === category);
            
        console.log('Filtered items count:', filteredItems.length);

        filteredItems.forEach(item => {
            const menuItemElement = this.createMenuItemElement(item);
            menuGrid.appendChild(menuItemElement);
        });
        
        console.log('Menu items added to DOM');

        // Apply filter animation
        this.animateMenuItems(category);
    }

    createMenuItemElement(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);

        const currentLang = translator ? translator.getCurrentLanguage() : 'en';
        const itemName = translator ? translator.getMenuItemTranslation(item, 'name') : item.translations.en.name;
        const itemDescription = translator ? translator.getMenuItemTranslation(item, 'description') : item.translations.en.description;

        menuItem.innerHTML = `
            <div class="menu-item-image">
                ${item.image ? `<img src="${item.image}" alt="${itemName}">` : `<i class="${item.icon}"></i>`}
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-name">${itemName}</h3>
                <p class="menu-item-description">${itemDescription}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="cart.addItem('${item.id}')">
                        ${translator ? translator.translate('add_to_cart') : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;

        return menuItem;
    }

    setupCategoryButtons() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get category and render menu
                const category = button.getAttribute('data-category');
                this.currentCategory = category;
                this.renderMenu(category);
            });
        });
    }

    animateMenuItems(category) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.animationDelay = `${index * 50}ms`;
            } else {
                item.classList.add('hidden');
            }
        });
    }

    getMenuItem(id) {
        return this.menuData.items.find(item => item.id === id);
    }

    updateMenuLanguage() {
        this.renderMenu(this.currentCategory);
    }
}

// Initialize menu manager
let menuManager;
document.addEventListener('DOMContentLoaded', () => {
    menuManager = new MenuManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MenuManager, menuData };
}