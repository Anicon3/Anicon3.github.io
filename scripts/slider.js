
const swiper = new Swiper('.swiper-competitions', {
  // Optional parameters
  grabCursor: true,
  spaceBetween: 34,
  rewind: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
    PauseOnMouseEnter: true,
  },
  centerInsufficientSlides: true,


  // If we need pagination
  pagination: {
    el: '.swiper-pagination-competitions',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-competitions',
    prevEl: '.swiper-button-prev-competitions',
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

const swiper_judges = new Swiper('.swiper-judges', {
  // Optional parameters
  grabCursor: true,
  spaceBetween: 34,
  rewind: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
    PauseOnMouseEnter: true,
  },
  centerInsufficientSlides: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-judges',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-judges',
    prevEl: '.swiper-button-prev-judges',
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

const swiper_collabs = new Swiper('.swiper-collabs', {
  // Optional parameters
  grabCursor: true,
  spaceBetween: 34,
  rewind: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
    PauseOnMouseEnter: true,
  },
  centerInsufficientSlides: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-collabs',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-collabs',
    prevEl: '.swiper-button-prev-collabs',
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