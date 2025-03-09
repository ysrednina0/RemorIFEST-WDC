$(document).ready(() => {
    // Toggle password visibility
    $(".toggle-password").click(function () {
      const passwordInput = $(this).prev("input")
      const type = passwordInput.attr("type") === "password" ? "text" : "password"
      passwordInput.attr("type", type)
  
      // Toggle eye icon
      $(this).toggleClass("fa-eye fa-eye-slash")
  
      // Add animation
      $(this).addClass("animate__animated animate__fadeIn")
      setTimeout(() => {
        $(this).removeClass("animate__animated animate__fadeIn")
      }, 500)
    })
  
    // Form input focus animation
    $(".form-input")
      .focus(function () {
        $(this).parent().addClass("input-focused")
      })
      .blur(function () {
        $(this).parent().removeClass("input-focused")
      })
  
    // Login form validation
    $("#loginForm").submit((e) => {
      e.preventDefault()
  
      let isValid = true
      const email = $("#email").val().trim()
      const password = $("#password").val().trim()
  
      // Email validation
      if (email === "") {
        $("#emailError").text("Email is required").parent().addClass("shake")
        isValid = false
      } else if (!isValidEmail(email)) {
        $("#emailError").text("Please enter a valid email address").parent().addClass("shake")
        isValid = false
      } else {
        $("#emailError").text("")
      }
  
      // Password validation
      if (password === "") {
        $("#passwordError").text("Password is required").parent().addClass("shake")
        isValid = false
      } else if (password.length < 6) {
        $("#passwordError").text("Password must be at least 6 characters").parent().addClass("shake")
        isValid = false
      } else {
        $("#passwordError").text("")
      }
  
      // Remove shake animation after a delay
      setTimeout(() => {
        $(".form-group").removeClass("shake")
      }, 500)
  
      // If form is valid, submit
      // if (isValid) {
      //   // Show loading state
      //   const loginBtn = $(".btn-login")
      //   loginBtn.addClass("loading")
  
      //   // Simulate API call
      //   setTimeout(() => {
      //     loginBtn.removeClass("loading")
  
      //     // Show success message
      //     Swal.fire({
      //       icon: "success",
      //       title: "Login Successful",
      //       // text: "Redirecting to your dashboard...",
      //       timer: 2000,
      //       timerProgressBar: true,
      //       showConfirmButton: false,
      //     }).then(() => {
      //       // Redirect to dashboard (in a real app)
      //       window.location.href = "index.html"
      //     })
      //   }, 2000)
      // }
    })
  
    // Register form validation
    $("#registerForm").submit((e) => {
      e.preventDefault()
  
      let isValid = true
      const fullName = $("#fullName").val().trim()
      const email = $("#registerEmail").val().trim()
      const password = $("#registerPassword").val().trim()
      const confirmPassword = $("#confirmPassword").val().trim()
      const termsAgreed = $("#termsAgreement").is(":checked")
  
      // Name validation
      if (fullName === "") {
        $("#nameError").text("Full name is required").parent().addClass("shake")
        isValid = false
      } else if (fullName.length < 3) {
        $("#nameError").text("Name must be at least 3 characters").parent().addClass("shake")
        isValid = false
      } else {
        $("#nameError").text("")
      }
  
      // Email validation
      if (email === "") {
        $("#registerEmailError").text("Email is required").parent().addClass("shake")
        isValid = false
      } else if (!isValidEmail(email)) {
        $("#registerEmailError").text("Please enter a valid email address").parent().addClass("shake")
        isValid = false
      } else {
        $("#registerEmailError").text("")
      }
  
      // Password validation
      if (password === "") {
        $("#registerPasswordError").text("Password is required").parent().addClass("shake")
        isValid = false
      } else if (password.length < 8) {
        $("#registerPasswordError").text("Password must be at least 8 characters").parent().addClass("shake")
        isValid = false
      } else {
        $("#registerPasswordError").text("")
      }
  
      // Confirm password validation
      if (confirmPassword === "") {
        $("#confirmPasswordError").text("Please confirm your password").parent().addClass("shake")
        isValid = false
      } else if (confirmPassword !== password) {
        $("#confirmPasswordError").text("Passwords do not match").parent().addClass("shake")
        isValid = false
      } else {
        $("#confirmPasswordError").text("")
      }
  
      // Terms agreement validation
      if (!termsAgreed) {
        $("#termsError").text("You must agree to the terms and conditions").parent().addClass("shake")
        isValid = false
      } else {
        $("#termsError").text("")
      }
  
      // Remove shake animation after a delay
      setTimeout(() => {
        $(".form-group").removeClass("shake")
      }, 500)
  
      // If form is valid, submit
      if (isValid) {
        // Show loading state
        const registerBtn = $(".btn-register")
        registerBtn.addClass("loading")
  
        // Simulate API call
        setTimeout(() => {
          registerBtn.removeClass("loading")
  
          // Show success message
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Your account has been created!",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            // Redirect to login page (in a real app)
            window.location.href = "index.html"
          })
        }, 2000)
      }
    })
  
    // Password strength meter
    $("#registerPassword").on("input", function () {
      const password = $(this).val()
      const strength = calculatePasswordStrength(password)
  
      // Update strength meter
      const strengthMeter = $("#strengthMeter")
      const strengthText = $("#strengthText")
  
      strengthMeter.css("width", `${strength.score * 25}%`)
  
      if (password === "") {
        strengthMeter.css("background-color", "#e0e0e0")
        strengthText.text("Password strength")
        strengthText.css("color", "#666")
      } else {
        strengthMeter.css("background-color", strength.color)
        strengthText.text(strength.label)
        strengthText.css("color", strength.color)
      }
    })
  
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    function calculatePasswordStrength(password) {
      // Simple password strength calculation
      if (password.length === 0) {
        return { score: 0, label: "Password strength", color: "#e0e0e0" }
      } else if (password.length < 6) {
        return { score: 1, label: "Weak", color: "#f44336" }
      } else if (password.length < 10) {
        return { score: 2, label: "Fair", color: "#ff9800" }
      } else if (password.length < 14) {
        return { score: 3, label: "Good", color: "#4caf50" }
      } else {
        return { score: 4, label: "Strong", color: "#2e7d32" }
      }
    }
  
    // Add ripple effect to buttons
    $(".btn").on("mousedown", function (e) {
      const button = $(this)
      const ripple = $('<span class="ripple-effect"></span>')
      const size = Math.max(button.width(), button.height())
      const pos = button.offset()
  
      ripple
        .css({
          width: size,
          height: size,
          top: e.pageY - pos.top - size / 2,
          left: e.pageX - pos.left - size / 2,
        })
        .appendTo(button)
  
      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  
    // Social login buttons hover effect
    $(".btn-social").hover(
      function () {
        $(this).addClass("animate__animated animate__pulse")
      },
      function () {
        $(this).removeClass("animate__animated animate__pulse")
      },
    )
  
    // Add CSS for ripple effect
    const style = document.createElement("style")
    style.textContent = `
          .btn {
              position: relative;
              overflow: hidden;
          }
          
          .ripple-effect {
              position: absolute;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.4);
              transform: scale(0);
              animation: ripple 0.6s linear;
              pointer-events: none;
          }
          
          @keyframes ripple {
              to {
                  transform: scale(2.5);
                  opacity: 0;
              }
          }
      `
    document.head.appendChild(style)
  })
  
  