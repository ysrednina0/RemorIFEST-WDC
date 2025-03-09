document.addEventListener('DOMContentLoaded', function() {
    // Product Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    // Simulate image switching
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Change main image color to simulate different images
            const colors = ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280'];
            mainImage.style.backgroundColor = colors[index];
        });
    });

    // Action Buttons
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const chatSellerBtn = document.getElementById('chat-seller');

    function animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = 'scale(1)', 100);
    }

    addToCartBtn.addEventListener('click', function() {
        animateButton(this);
        showNotification('Item added to cart!');
    });

    buyNowBtn.addEventListener('click', function() {
        animateButton(this);
        showNotification('Proceeding to checkout...');
    });

    chatSellerBtn.addEventListener('click', function() {
        animateButton(this);
        showNotification('Opening chat with seller...');
    });

    // Follow Button
    const followBtn = document.querySelector('.follow-btn');
    let isFollowing = false;

    followBtn.addEventListener('click', function() {
        isFollowing = !isFollowing;
        this.textContent = isFollowing ? 'Following' : 'Follow';
        this.style.color = isFollowing ? '#6b7280' : '#4299e1';
        
        if (isFollowing) {
            showNotification('You are now following Lyra Store');
        }
    });

    // Generate Similar Items
    const productsGrid = document.getElementById('similar-products');
    const similarProducts = [
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' },
        { price: 'Rp25.000', title: 'POLO - XXL', location: 'Sleman, Yogyakarta' }
    ];

    similarProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"></div>
            <div class="product-card-price">${product.price}</div>
            <div class="product-card-details">${product.title}</div>
            <div class="product-card-details">${product.location}</div>
        `;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        card.addEventListener('click', function() {
            showNotification(`Viewing ${product.title} product details`);
        });
        
        productsGrid.appendChild(card);
    });

    // Header Icons Interaction
    const headerIcons = document.querySelectorAll('.icon-button');
    
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Animate icon
            this.style.transform = 'scale(0.9)';
            setTimeout(() => this.style.transform = 'scale(1)', 100);
            
            // Show notification based on icon
            const iconId = this.id;
            if (iconId === 'cart-btn') {
                showNotification('Shopping Cart');
            } else if (iconId === 'downloads-btn') {
                showNotification('Downloads');
            } else if (iconId === 'notifications-btn') {
                showNotification('Notifications');
            } else if (iconId === 'messages-btn') {
                showNotification('Messages');
            } else if (iconId === 'profile-btn') {
                showNotification('Profile');
            }
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            showNotification(`Searching for: ${this.value}`);
        }
    });

    // Notification System
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            document.body.removeChild(existingNotification);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4299e1';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Add to body
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Simulate loading effect
    window.addEventListener('load', function() {
        // Fade in content
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});