$(document).ready(() => {
    // Fungsi untuk preview foto
    function readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader()
  
        reader.onload = (e) => {
          const img = $("<img>").attr("src", e.target.result)
          $(".photo-placeholder").html(img)
        }
  
        reader.readAsDataURL(input.files[0])
      }
    }
  
    // Event untuk memilih foto
    $("#choosePhotoBtn").click(() => {
      $("#photoInput").click()
    })
  
    $("#photoInput").change(function () {
      readURL(this)
    })
  
    // Event untuk tombol change password
    $("#changePasswordBtn").click(() => {
      Swal.fire({
        title: "Change Password",
        html: `
                  <input type="password" id="currentPassword" class="swal2-input" placeholder="Current Password">
                  <input type="password" id="newPassword" class="swal2-input" placeholder="New Password">
                  <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm New Password">
              `,
        showCancelButton: true,
        confirmButtonText: "Change Password",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const currentPassword = $("#currentPassword").val()
          const newPassword = $("#newPassword").val()
          const confirmPassword = $("#confirmPassword").val()
  
          if (!currentPassword || !newPassword || !confirmPassword) {
            Swal.showValidationMessage("Please fill all fields")
            return false
          }
  
          if (newPassword !== confirmPassword) {
            Swal.showValidationMessage("New passwords do not match")
            return false
          }
  
          return true
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Success!", "Your password has been changed.", "success")
        }
      })
    })
  
    // Validasi form sebelum submit
    $("#editProfileForm").submit((e) => {
      e.preventDefault()
  
      // Validasi nama
      const name = $("#name").val().trim()
      if (name.length < 3) {
        Swal.fire("Error", "Name must be at least 3 characters long", "error")
        return
      }
  
      // Validasi username
      const username = $("#username").val().trim()
      if (username.length < 3) {
        Swal.fire("Error", "Username must be at least 3 characters long", "error")
        return
      }
  
      // Validasi email
      const email = $("#email").val().trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        Swal.fire("Error", "Please enter a valid email address", "error")
        return
      }
  
      // Validasi nomor telepon
      const phone = $("#phone").val().trim()
      const phoneRegex = /^[0-9]{10,13}$/
      if (!phoneRegex.test(phone)) {
        Swal.fire("Error", "Please enter a valid phone number", "error")
        return
      }
  
      // Simulasi submit form
      Swal.fire({
        title: "Updating Profile",
        text: "Please wait...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
  
      // Simulasi delay network request
      setTimeout(() => {
        Swal.fire("Success!", "Your profile has been updated.", "success")
      }, 1500)
    })
  
    // Validasi input tanggal lahir
    $(".date-input").on("input", function () {
      let value = $(this).val()
      value = value.replace(/\D/g, "")
      if (Number.parseInt(value) > 31) value = "31"
      $(this).val(value)
    })
  
    $(".year-input").on("input", function () {
      let value = $(this).val()
      value = value.replace(/\D/g, "")
      if (value.length > 4) value = value.slice(0, 4)
      $(this).val(value)
    })
  
    // Animasi smooth untuk form inputs
    $(".form-input")
      .focus(function () {
        $(this).parent(".form-group").addClass("focused")
      })
      .blur(function () {
        $(this).parent(".form-group").removeClass("focused")
      })
  
    // Efek hover untuk buttons
    $(".btn").hover(
      function () {
        $(this).css("transform", "translateY(-1px)")
      },
      function () {
        $(this).css("transform", "translateY(0)")
      },
    )
  })
  
  