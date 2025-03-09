// HOME PAGE
document.addEventListener("DOMContentLoaded", () => {

  // Check on load and resize
  checkScreenSize()
  window.addEventListener("resize", checkScreenSize)

  // Simulate loading products (for demonstration)
  function simulateLoading() {
    const productCards = document.querySelectorAll(".product-card")

    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
      }, 100 * index)
    })
  }

  // Initialize with products having 0 opacity
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transition = "opacity 0.3s ease"
  })

  // Simulate loading after a short delay
  setTimeout(simulateLoading, 500)
})

// SELL ITEM PAGE
document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const form = document.getElementById('sell-form');
  const uploadBtn = document.getElementById('upload-btn');
  const fileInput = document.getElementById('file-input');
  const uploadArea = document.getElementById('upload-area');
  const previewContainer = document.getElementById('preview-container');

  // Header icons
  const cartBtn = document.getElementById('cart-btn');
  const downloadsBtn = document.getElementById('downloads-btn');
  const notificationsBtn = document.getElementById('notifications-btn');
  const messagesBtn = document.getElementById('messages-btn');
  const profileBtn = document.getElementById('profile-btn');

  // File upload handling
  uploadBtn.addEventListener('click', () => {
      fileInput.click();
  });

  fileInput.addEventListener('change', handleFileSelect);

  // Drag and drop handling
  uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      handleFiles(files);
  });

  function handleFileSelect(e) {
      const files = e.target.files;
      handleFiles(files);
  }

  function handleFiles(files) {
      if (previewContainer.children.length + files.length > 20) {
          alert('You can only upload up to 20 photos');
          return;
      }

      // Show preview container if it was empty
      if (previewContainer.children.length === 0) {
          previewContainer.style.display = 'grid';
      }

      Array.from(files).forEach(file => {
          if (!file.type.startsWith('image/')) {
              alert('Please upload only image files');
              return;
          }

          const reader = new FileReader();
          reader.onload = function(e) {
              const previewItem = document.createElement('div');
              previewItem.className = 'preview-item';
              
              const img = document.createElement('img');
              img.src = e.target.result;
              
              const removeBtn = document.createElement('button');
              removeBtn.className = 'remove-btn';
              removeBtn.innerHTML = '×';
              removeBtn.addEventListener('click', (event) => {
                  event.stopPropagation();
                  previewContainer.removeChild(previewItem);
                  
                  // Hide preview container if it's empty
                  if (previewContainer.children.length === 0) {
                      previewContainer.style.display = 'none';
                  }
              });

              previewItem.appendChild(img);
              previewItem.appendChild(removeBtn);
              previewContainer.appendChild(previewItem);
          };
          reader.readAsDataURL(file);
      });
  }

  // Form interaction
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
          input.parentElement.classList.remove('focused');
      });
      
      // Add input validation visual feedback
      input.addEventListener('input', () => {
          if (input.value.trim() !== '') {
              input.classList.add('has-value');
          } else {
              input.classList.remove('has-value');
          }
      });
  });

  // Header icons interaction with tooltip effect
  const headerIcons = [cartBtn, downloadsBtn, notificationsBtn, messagesBtn, profileBtn];
  const tooltips = ['Cart', 'Downloads', 'Notifications', 'Messages', 'Profile'];
  
  headerIcons.forEach((icon, index) => {
      icon.addEventListener('click', () => {
          showTooltip(icon, tooltips[index]);
      });
  });
  
  function showTooltip(element, text) {
      // Remove any existing tooltips
      const existingTooltip = document.querySelector('.tooltip');
      if (existingTooltip) {
          document.body.removeChild(existingTooltip);
      }
      
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = text;
      
      // Position tooltip
      const rect = element.getBoundingClientRect();
      tooltip.style.position = 'absolute';
      tooltip.style.top = `${rect.bottom + 5}px`;
      tooltip.style.left = `${rect.left + rect.width/2}px`;
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '4px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.zIndex = '1000';
      
      // Add tooltip to body
      document.body.appendChild(tooltip);
      
      // Remove tooltip after delay
      setTimeout(() => {
          if (document.body.contains(tooltip)) {
              document.body.removeChild(tooltip);
          }
      }, 1500);
  }

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          alert(`Searching for: ${searchInput.value}`);
      }
  });

  // Initially hide the preview container
  previewContainer.style.display = 'none';
});

// CART PAGE
document.addEventListener('DOMContentLoaded', function() {
  // Cart functionality
  const cartItems = document.querySelectorAll('.cart-item');
  const itemsCountElement = document.querySelector('.items-count');
  const totalPriceElement = document.querySelector('.total-price');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Update cart totals
  function updateCartTotals() {
      const checkedItems = document.querySelectorAll('.item-checkbox:checked');
      const totalItems = checkedItems.length;
      
      let totalPrice = 0;
      checkedItems.forEach(checkbox => {
          const item = checkbox.closest('.cart-item');
          const price = parseInt(item.querySelector('.item-price').textContent.replace(/\D/g, ''));
          const quantity = parseInt(item.querySelector('.quantity').textContent);
          totalPrice += price * quantity;
      });

      itemsCountElement.textContent = `${totalItems} items`;
      totalPriceElement.textContent = `Rp${totalPrice.toLocaleString()}`;
  }

  // Quantity controls
  cartItems.forEach(item => {
      const minusBtn = item.querySelector('.minus');
      const plusBtn = item.querySelector('.plus');
      const quantityElement = item.querySelector('.quantity');
      const checkbox = item.querySelector('.item-checkbox');

      minusBtn.addEventListener('click', () => {
          let quantity = parseInt(quantityElement.textContent);
          if (quantity > 1) {
              quantityElement.textContent = quantity - 1;
              updateCartTotals();
          }
      });

      plusBtn.addEventListener('click', () => {
          let quantity = parseInt(quantityElement.textContent);
          quantityElement.textContent = quantity + 1;
          updateCartTotals();
      });

      checkbox.addEventListener('change', updateCartTotals);
  });

  // Checkout button
  checkoutBtn.addEventListener('click', () => {
      const checkedItems = document.querySelectorAll('.item-checkbox:checked');
      if (checkedItems.length === 0) {
          alert('Please select items to checkout');
          return;
      }
      alert('Proceeding to checkout...');
  });

  // Initialize cart totals
  updateCartTotals();

  // Add hover effect to cart items
  cartItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
          item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      });

      item.addEventListener('mouseleave', () => {
          item.style.boxShadow = 'none';
      });
  });

  // Make checkboxes more interactive
  const checkboxes = document.querySelectorAll('.item-checkbox');
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          const item = this.closest('.cart-item');
          if (this.checked) {
              item.style.backgroundColor = '#f8fafc';
          } else {
              item.style.backgroundColor = '#fff';
          }
      });
  });
});


// ORDER PAGE
document.addEventListener('DOMContentLoaded', function() {
  // Payment method selection
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
      option.addEventListener('click', () => {
          // Update visual feedback
          paymentOptions.forEach(opt => opt.style.borderColor = '#e5e7eb');
          option.style.borderColor = '#4299e1';
      });
  });

  // Carbon offset checkbox
  const carbonCheckbox = document.querySelector('.carbon-offset input');
  const totalPayment = document.querySelector('.summary-total span:last-child');
  const baseTotal = 35000; // Base total without carbon offset
  
  carbonCheckbox.addEventListener('change', () => {
      const carbonOffset = 5000;
      const newTotal = carbonCheckbox.checked ? baseTotal : baseTotal - carbonOffset;
      totalPayment.textContent = `Rp${newTotal.toLocaleString()}`;
  });


  // Place order button
  const placeOrderBtn = document.querySelector('.place-order-btn');
  placeOrderBtn.addEventListener('click', () => {
      // Get selected payment method
      const selectedPayment = document.querySelector('input[name="payment"]:checked');
      const paymentMethod = selectedPayment.value;
      
      // Get carbon offset status
      const includesCarbonOffset = carbonCheckbox.checked;
      
      // Simulate order placement
      alert(`Order placed successfully!\nPayment Method: ${paymentMethod}\nCarbon Offset: ${includesCarbonOffset ? 'Yes' : 'No'}`);
  });

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('.payment-option, .edit-btn, .place-order-btn');
  interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
          element.style.transition = 'transform 0.2s';
      });

      element.addEventListener('mouseleave', () => {
          element.style.transform = 'translateY(0)';
      });
  });

  // Simulate loading state for place order button
  placeOrderBtn.addEventListener('click', function() {
      const originalText = this.textContent;
      this.disabled = true;
      this.textContent = 'Processing...';

      setTimeout(() => {
          this.disabled = false;
          this.textContent = originalText;
      }, 1000);
  });
});