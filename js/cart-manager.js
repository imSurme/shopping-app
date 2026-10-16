// Cart Management System
class CartManager {
    constructor() {
        this.cartKey = 'shoppingCart';
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

    addToCart(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => 
            item.id === product.id && 
            item.size === product.size && 
            item.color === product.color
        );

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
