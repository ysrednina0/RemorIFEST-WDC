// Import jQuery library (assuming it's included in your HTML file)
// or include it via a CDN like this:
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// Declare jQuery variable if not already globally available.  This is a safer approach than assuming it's included.
const $ = window.$ || jQuery // Check if $ or jQuery is already defined, otherwise use jQuery.

$(document).ready(() => {
  // Scroll chat to bottom on load
  function scrollToBottom() {
    const chatMessages = document.getElementById("chatMessages")
    chatMessages.scrollTop = chatMessages.scrollHeight
  }
  scrollToBottom()

  // Handle message input
  $(".message-input").keypress((e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  $(".btn-send").click(() => {
    sendMessage()
  })

  function sendMessage() {
    const input = $(".message-input")
    const message = input.val().trim()

    if (message) {
      // Create new message element
      const messageHtml = `
                <div class="message buyer">
                    <div class="message-content">${message}</div>
                </div>
            `

      // Add message to chat
      $("#chatMessages").append(messageHtml)

      // Clear input
      input.val("")

      // Scroll to bottom
      scrollToBottom()

      // Simulate reply after delay
      setTimeout(() => {
        simulateTyping()
        setTimeout(() => {
          sendAutoReply()
        }, 2000)
      }, 1000)
    }
  }

  function simulateTyping() {
    const typingHtml = `
            <div class="message-group typing">
                <div class="chat-avatar" style="background-color: #e57373;">
                    <span>L</span>
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `

    $("#chatMessages").append(typingHtml)
    scrollToBottom()
  }

  function sendAutoReply() {
    // Remove typing indicator
    $(".typing").remove()

    // Add reply message
    const replyHtml = `
          <div class="message-group">
              <div class="chat-avatar" style="background-color: #e57373;">
                  <span>L</span>
              </div>
              <div class="message seller">
                  <div class="message-content">Thank you for your message. How can I help you?</div>
              </div>
          </div>
        `

    $("#chatMessages").append(replyHtml)
    scrollToBottom()
  }

  // Handle attachment button
  $(".btn-attachment").click(() => {
    // Simulate file upload
    const input = $('<input type="file" accept="image/*" style="display: none;">')
    input.click()

    input.on("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const imageHtml = `
                        <div class="message buyer">
                            <div class="message-content">
                                <img src="${e.target.result}" style="max-width: 200px; border-radius: 8px;">
                            </div>
                        </div>
                    `

          $("#chatMessages").append(imageHtml)
          scrollToBottom()
        }

        reader.readAsDataURL(e.target.files[0])
      }
    })
  })

  // Handle options button
  $(".btn-options").click((e) => {
    e.stopPropagation()
    // Add your options menu logic here
  })

  // Handle chat item click
  $(".chat-item").click(function () {
    $(".chat-item").removeClass("active")
    $(this).addClass("active")

    // On mobile, show chat area and hide sidebar
    if ($(window).width() <= 576) {
      $(".sidebar").removeClass("active")
      $(".chat-area").addClass("active")
    }
  })

  // Handle mobile back button (you'll need to add this button in the HTML for mobile view)
  $(".btn-back").click(() => {
    $(".chat-area").removeClass("active")
    $(".sidebar").addClass("active")
  })

  // Add smooth transitions
  $(".message, .chat-item, .btn").addClass("transition-all")
})

// Add CSS class for transitions
const style = document.createElement("style")
style.textContent = `
    .transition-all {
        transition: all 0.3s ease;
    }
    
    .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 10px 15px;
        background: #f0f0f0;
        border-radius: 16px;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: #999;
        border-radius: 50%;
        animation: typing 1s infinite ease-in-out;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }
`
document.head.appendChild(style)

