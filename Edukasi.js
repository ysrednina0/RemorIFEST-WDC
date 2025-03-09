document.addEventListener('DOMContentLoaded', function() {
  // Header icons interaction
  const headerIcons = document.querySelectorAll('.header-icons .icon-button');
  headerIcons.forEach(icon => {
      icon.addEventListener('click', function() {
          const iconId = this.id;
          let message = '';
          
          switch(iconId) {
              case 'cart-btn':
                  message = 'Shopping Cart';
                  break;
              case 'downloads-btn':
                  message = 'Downloads';
                  break;
              case 'notifications-btn':
                  message = 'Notifications';
                  break;
              case 'messages-btn':
                  message = 'Messages';
                  break;
              case 'profile-btn':
                  message = 'Profile';
                  break;
          }
          
          if (message) {
              showNotification(`${message} clicked`);
          }
      });
  });

  // Share buttons functionality
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
      button.addEventListener('click', function() {
          const platform = this.classList[1];
          const url = encodeURIComponent(window.location.href);
          const title = encodeURIComponent(document.title);
          
          let shareUrl = '';
          switch(platform) {
              case 'facebook':
                  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                  showNotification('Sharing to Facebook');
                  break;
              case 'whatsapp':
                  shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                  showNotification('Sharing to WhatsApp');
                  break;
              case 'twitter':
                  shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                  showNotification('Sharing to Twitter');
                  break;
          }
          
          if (shareUrl) {
              window.open(shareUrl, '_blank', 'width=600,height=400');
          }
      });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          showNotification(`Searching for: ${this.value}`);
      }
  });

  // Post card hover effects
  const postCards = document.querySelectorAll('.post-card');
  postCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-4px)';
          this.style.transition = 'transform 0.2s';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });

  // Notification system
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

  // Make placeholder images interactive
  const placeholderImages = document.querySelectorAll('.placeholder-image');
  placeholderImages.forEach(img => {
      img.addEventListener('click', function() {
          showNotification('Image clicked - This would open the full image in a modal');
      });
      
      // Add hover effect
      img.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.02)';
          this.style.transition = 'transform 0.2s';
          this.style.cursor = 'pointer';
      });
      
      img.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
      });
  });

  // Add loading animation for images
  function addLoadingAnimation() {
      const images = document.querySelectorAll('.placeholder-image');
      images.forEach(img => {
          img.style.position = 'relative';
          img.style.overflow = 'hidden';
          
          const shimmer = document.createElement('div');
          shimmer.style.position = 'absolute';
          shimmer.style.top = '0';
          shimmer.style.left = '0';
          shimmer.style.width = '100%';
          shimmer.style.height = '100%';
          shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
          shimmer.style.animation = 'shimmer 1.5s infinite';
          
          const style = document.createElement('style');
          style.textContent = `
              @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
              }
          `;
          document.head.appendChild(style);
          
          img.appendChild(shimmer);
      });
  }

  addLoadingAnimation();
});