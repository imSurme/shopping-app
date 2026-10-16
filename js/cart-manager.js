// Cart Management System

// Shipping: free above the threshold, otherwise a flat fee
const SHIPPING_FEE = 49.90;
const FREE_SHIPPING_THRESHOLD = 1000;

// Demo coupon codes
const COUPONS = {
    'HOSGELDIN10': { type: 'percent', value: 10, minTotal: 0, label: '%10 indirim' },
    'INDIRIM100': { type: 'fixed', value: 100, minTotal: 750, label: '₺100 indirim (min. ₺750)' },
    'KARGOBEDAVA': { type: 'shipping', value: 0, minTotal: 0, label: 'Ücretsiz kargo' }
};

// Price formatting shared by all pages: ₺1.760 or ₺1.809,90
function formatPrice(amount) {
    const decimals = Number.isInteger(Math.round(amount * 100) / 100) ? 0 : 2;
    return '₺' + amount.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

class CartManager {
    constructor() {
        this.cartKey = 'shoppingCart';
        this.couponKey = 'appliedCoupon';
        this.savedCartKey = 'savedCart';
        this.maxQuantity = 10; // Max adet per cart item (sepet sayfasıyla aynı)
        this.init();
    }

    init() {
        // Initialize cart if it doesn't exist
        if (!this.getCart()) {
            this.setCart([]);
        }
        this.updateCartBadge();
    }

    getCart() {
        try {
            const cart = localStorage.getItem(this.cartKey);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error getting cart:', error);
            return [];
        }
    }

    setCart(cart) {
        try {
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
            this.updateCartBadge();
        } catch (error) {
            console.error('Error setting cart:', error);
        }
    }

    findItem(cart, product) {
        return cart.find(item =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );
    }

    addToCart(product) {
        const cart = this.getCart();
        const existingItem = this.findItem(cart, product);

        const currentQuantity = existingItem ? existingItem.quantity : 0;
        const newQuantity = Math.min(currentQuantity + product.quantity, this.maxQuantity);

        if (newQuantity === currentQuantity) {
            this.showMessage(`Bu üründen en fazla ${this.maxQuantity} adet ekleyebilirsiniz.`, 'error');
            return cart;
        }

        if (existingItem) {
            existingItem.quantity = newQuantity;
        } else {
            cart.push({
                ...product,
                quantity: newQuantity,
                cartId: Date.now() + Math.random() // Unique cart item ID
            });
        }

        this.setCart(cart);
        if (newQuantity < currentQuantity + product.quantity) {
            this.showMessage(`Sepetteki adet en fazla ${this.maxQuantity} olabilir.`, 'info');
        } else {
            this.showMessage('Ürün sepete eklendi!', 'success');
        }
        return cart;
    }

    // Adds several items at once without toasts (reorder, restore saved cart)
    mergeItems(items) {
        const cart = this.getCart();
        items.forEach(product => {
            const existingItem = this.findItem(cart, product);
            if (existingItem) {
                existingItem.quantity = Math.min(existingItem.quantity + product.quantity, this.maxQuantity);
            } else {
                cart.push({
                    ...product,
                    quantity: Math.min(product.quantity, this.maxQuantity),
                    cartId: Date.now() + Math.random()
                });
            }
        });
        this.setCart(cart);
        return cart;
    }

    removeFromCart(cartId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.cartId != cartId); // Use != for type coercion
        this.setCart(updatedCart);
        this.showMessage('Ürün sepetten çıkarıldı!', 'info');
        return updatedCart;
    }

    updateQuantity(cartId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(cartId);
            return;
        }

        const cart = this.getCart();
        const item = cart.find(item => item.cartId == cartId); // Use == for type coercion

        if (item) {
            item.quantity = newQuantity;
            this.setCart(cart);
        }

        return cart;
    }

    clearCart() {
        this.setCart([]);
        this.removeCoupon();
        this.showMessage('Sepet temizlendi!', 'info');
    }

    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Saved cart ("Daha sonra için kaydet")
    getSavedCart() {
        try {
            return JSON.parse(localStorage.getItem(this.savedCartKey) || '[]');
        } catch (error) {
            return [];
        }
    }

    saveCartForLater() {
        localStorage.setItem(this.savedCartKey, JSON.stringify(this.getCart()));
        this.setCart([]);
    }

    restoreSavedCart() {
        const saved = this.getSavedCart();
        this.mergeItems(saved);
        localStorage.removeItem(this.savedCartKey);
        return saved.length;
    }

    // Coupons
    getAppliedCoupon() {
        const code = localStorage.getItem(this.couponKey);
        return code && COUPONS[code] ? { code, ...COUPONS[code] } : null;
    }

    applyCoupon(rawCode) {
        // Codes are ASCII: 'hosgeldin10' and Turkish-keyboard 'HOSGELDİN10' both match
        const code = (rawCode || '').trim().toUpperCase().replace(/İ/g, 'I');
        const coupon = COUPONS[code];
        if (!coupon) {
            return { ok: false, message: 'Geçersiz kupon kodu.' };
        }
        if (this.getCartTotal() < coupon.minTotal) {
            return { ok: false, message: `Bu kupon için sepet tutarı en az ${formatPrice(coupon.minTotal)} olmalı.` };
        }
        localStorage.setItem(this.couponKey, code);
        return { ok: true, message: `Kupon uygulandı: ${coupon.label}` };
    }

    removeCoupon() {
        localStorage.removeItem(this.couponKey);
    }

    // All price figures for cart, checkout and saved orders
    getSummary() {
        const cart = this.getCart();
        let originalSubtotal = 0;
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const unitOriginal = item.originalPrice && item.originalPrice > item.price ? item.originalPrice : item.price;
            originalSubtotal += unitOriginal * item.quantity;
        });

        // Coupon stays stored but only applies while its minimum is met
        const coupon = this.getAppliedCoupon();
        const couponActive = coupon && subtotal >= coupon.minTotal;
        let couponDiscount = 0;
        if (couponActive && coupon.type === 'percent') {
            couponDiscount = Math.round(subtotal * coupon.value) / 100;
        } else if (couponActive && coupon.type === 'fixed') {
            couponDiscount = Math.min(coupon.value, subtotal);
        }

        const freeShipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || (couponActive && coupon.type === 'shipping');
        const shipping = freeShipping ? 0 : SHIPPING_FEE;

        return {
            originalSubtotal,
            productSavings: originalSubtotal - subtotal,
            subtotal,
            coupon: couponActive ? coupon : null,
            couponInactive: coupon && !couponActive ? coupon : null,
            couponDiscount,
            shipping,
            amountForFreeShipping: freeShipping ? 0 : FREE_SHIPPING_THRESHOLD - subtotal,
            total: Math.round((subtotal - couponDiscount + shipping) * 100) / 100
        };
    }

    updateCartBadge() {
        const count = this.getCartCount();
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    }

    showMessage(message, type = 'success') {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-primary',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };

        toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Global functions for cart operations
window.addToCart = function(product) {
    return cartManager.addToCart(product);
};

window.removeFromCart = function(cartId) {
    return cartManager.removeFromCart(cartId);
};

window.updateCartQuantity = function(cartId, quantity) {
    return cartManager.updateQuantity(cartId, quantity);
};

window.clearCart = function() {
    return cartManager.clearCart();
};

window.getCart = function() {
    return cartManager.getCart();
};

window.getCartCount = function() {
    return cartManager.getCartCount();
};

window.getCartTotal = function() {
    return cartManager.getCartTotal();
};
