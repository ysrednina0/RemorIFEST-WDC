const $ = jQuery;

$(document).ready(() => {

  $(".product-card, .review-item, .tab, .btn").addClass("transition-element");

  $(".tab").click(function () {
    const tabId = $(this).data("tab");

    $(".tab").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").fadeOut(300);

    setTimeout(() => {
      $(`#${tabId}-content`).fadeIn(400);
    }, 300);
  });


  $('.tab[data-tab="reviews"]').click(() => {

    $("#products-content").fadeOut(300, () => {
      $("#reviews-content").fadeIn(400);

      $('.review-stars i').each(function (index) {
        $(this)
          .css({ opacity: 0, transform: 'scale(0.5)' })
          .delay(100 * index)
          .animate(
            { opacity: 1, transform: 'scale(1)' },
            {
              duration: 300,
              step: function (now, fx) {
                if (fx.prop === "transform") {
                  $(this).css('transform', `scale(${now})`);
                }
              }
            }
          );
      });

      let startRating = 0;
      const targetRating = 5.0;
      const $ratingNumber = $('.rating-number');
      $ratingNumber.text('0.0');

      $({ ratingValue: startRating }).animate(
        { ratingValue: targetRating },
        {
          duration: 1500,
          easing: 'easeOutCubic',
          step: function () {
            $ratingNumber.text(this.ratingValue.toFixed(1));
          },
          complete: function () {
            $ratingNumber.text(targetRating.toFixed(1));
          }
        }
      );

      $('.review-item').each(function (index) {
        $(this)
          .css({ opacity: 0, transform: 'translateY(20px)' })
          .delay(500 + (index * 200))
          .animate(
            { opacity: 1, transform: 'translateY(0)' },
            {
              duration: 500,
              step: function (now, fx) {
                if (fx.prop === "transform") {
                  $(this).css('transform', `translateY(${now}px)`);
                }
              }
            }
          );
      });
    });
  });


  $(".btn-edit-profile").click(function (e) {

    const $this = $(this);
    const offset = $this.offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    const $ripple = $("<span class='ripple'></span>");
    $ripple.css({
      top: y,
      left: x
    });

    $this.append($ripple);

    setTimeout(() => {
      $ripple.remove();
    }, 700);

  });

  $(".product-card").hover(
    function () {
      $(this).css({
        "box-shadow": "0 10px 25px rgba(0,0,0,0.1)",
        "transform": "translateY(-5px)"
      });
    },
    function () {
      $(this).css({
        "box-shadow": "0 2px 5px rgba(0,0,0,0.05)",
        "transform": "translateY(0)"
      });
    }
  );

  $(".search-input").on("keypress", function (e) {
    if (e.which === 13) {
      const searchValue = $(this).val();
      $(this).blur();

      $(this).addClass("search-flash");
      setTimeout(() => {
        $(this).removeClass("search-flash");
        alert("Mencari: " + searchValue);
      }, 300);
    }
  });

  let lastScrollTop = 0;
  $(window).scroll(function () {
    const st = $(this).scrollTop();

    if (st > 50) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }

    if (st > lastScrollTop && st > 200) {

      $(".navbar").addClass("navbar-hidden");
    } else {

      $(".navbar").removeClass("navbar-hidden");
    }
    lastScrollTop = st;
  });

  $(".review-item").hover(
    function () {
      $(this).css({
        "background-color": "#f9f9f9",
        "transform": "translateY(-3px) scale(1.01)",
        "box-shadow": "0 5px 15px rgba(0,0,0,0.05)"
      });
    },
    function () {
      $(this).css({
        "background-color": "transparent",
        "transform": "translateY(0) scale(1)",
        "box-shadow": "none"
      });
    }
  );

  $.extend($.easing, {
    easeOutCubic: function (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  });

  setTimeout(() => {
    if ($('.tab[data-tab="reviews"]').hasClass('active')) {
      $('.tab[data-tab="reviews"]').click();
    }
  }, 300);
});