const swiper = new Swiper('.swiper', {
  // Optional parameters
  grabCursor: true,
  spaceBetween: 34,


  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    breakpoints : {
      0: {
        hiddenClass: true
      },
      730: {
        hiddenClass: false
      },
    }
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    730: {
      slidesPerView: 2
    },
    1055: {
      slidesPerView: 3
    },
  }
});