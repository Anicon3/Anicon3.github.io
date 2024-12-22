
// function toggleTheme() {
//     document.documentElement.classList.toggle('dark');
// }

// // Add intersection observer for animations
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// }, { threshold: 0.1 });

// document.querySelectorAll('.slide-up').forEach(el => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(20px)';
//     observer.observe(el);
// });
function toggleTheme() {
document.documentElement.classList.toggle('dark');
localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Check user's preferred theme on load
document.addEventListener('DOMContentLoaded', () => {
const savedTheme = localStorage.getItem('theme') || 
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme === 'dark') {
document.documentElement.classList.add('dark');
}
});
// New script additions
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 2000);

    // Horizontal scroll handling
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        });
    });

    // Initialize intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.slide-up, .competition-card, .team-card').forEach(el => {
        observer.observe(el);
    });
});

        // Team Carousel functionality
        const carousel = document.querySelector('.team-carousel');
const cards = document.querySelectorAll('.team-card');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;

// Create dots
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentIndex = index;
    const offset = index * -(300 + 32); // card width + gap
    carousel.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-advance carousel
setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    goToSlide(currentIndex);
}, 5000);

// Form submission handling

//this event listener is commented because this is for google forms. But we use spreadsheet./////////////////////////////////////////////////

//document.getElementById('registrationForm').addEventListener('submit', function(e) {
    //e.preventDefault();
    //const formData = new FormData(this);
    
    // Replace with your Google Form URL
    /*const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSccxOidaNVLvtcHWpygACCES0PnXTuJ31Z40tOeZI7vyCyzAA/viewform?usp=header';
    
    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(() => {
        alert('Registration successful! We will contact you shortly.');
        this.reset();
    })
    .catch(error => {
        alert('There was an error submitting your registration. Please try again.');
        console.error('Error:', error);
    });*//*
    $.ajax({
        url: googleFormUrl,
        data: {"entry.1651719000": document.getElementsByClassName('form-input')[0].value,
        "entry.981728256": document.getElementsByClassName('form-input')[1].value,
        "entry.626594595": document.getElementsByClassName('form-input')[2].value,
        "entry.1435712067": document.getElementsByClassName('form-input')[3].value,
        "entry.1664994852": "asdf"},
        type: "POST",
        dataType: "xml",
        success: function(d) {},
        error: function(x, y, z) {
            $('#success-msg').show()
            $('#form').show()
        },
        mode: "no-cors"
    });*/
//});


const scrollObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('visible');
}
});
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => {
scrollObserver.observe(el);
});

class Slideshow {
constructor() {
this.wrapper = document.querySelector('.slideshow-wrapper');
this.slides = document.querySelectorAll('.slideshow-item');
this.navContainer = document.querySelector('.slideshow-nav');
this.currentSlide = 0;
this.slideCount = this.slides.length;
this.autoScrollInterval = null;
this.isTransitioning = false;
this.isMobile = window.innerWidth < 768;

this.init();
this.handleResize();
}

init() {
// Create navigation dots
this.slides.forEach((_, index) => {
const dot = document.createElement('div');
dot.className = 'nav-dot' + (index === 0 ? ' active' : '');
dot.addEventListener('click', () => this.goToSlide(index));
this.navContainer.appendChild(dot);
});

// Initialize slide positions
this.updateSlides();

// Start auto-scroll
this.startAutoScroll();

// Add touch support
this.addTouchSupport();

// Add resize handler
window.addEventListener('resize', () => this.handleResize());

// Add scroll handler for desktop
if (!this.isMobile) {
this.handleScroll();
}
}

handleResize() {
const wasMobile = this.isMobile;
this.isMobile = window.innerWidth < 768;

// Adjust layout if switching between mobile and desktop
if (wasMobile !== this.isMobile) {
this.updateSlides();
}
}

handleScroll() {
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
const scrollPosition = window.scrollY;
if (scrollPosition > 50) {
scrollIndicator.style.opacity = '0';
} else {
scrollIndicator.style.opacity = '0.8';
}
});
}

updateSlides() {
this.slides.forEach((slide, index) => {
const offset = index - this.currentSlide;
const rotateY = this.isMobile ? offset * 45 : offset * 60; // Less rotation on mobile
const translateZ = Math.abs(offset) * (this.isMobile ? -50 : -100); // Less depth on mobile
const opacity = 1 - Math.abs(offset) * 0.3;

slide.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
slide.style.opacity = opacity;
slide.style.zIndex = this.slideCount - Math.abs(offset);
});

// Update navigation dots
const dots = this.navContainer.querySelectorAll('.nav-dot');
dots.forEach((dot, index) => {
dot.classList.toggle('active', index === this.currentSlide);
});
}

goToSlide(index) {
if (this.isTransitioning || index === this.currentSlide) return;

this.isTransitioning = true;
this.currentSlide = index;
this.updateSlides();

setTimeout(() => {
this.isTransitioning = false;
}, 800);
}

nextSlide() {
this.goToSlide((this.currentSlide + 1) % this.slideCount);
}

previousSlide() {
this.goToSlide((this.currentSlide - 1 + this.slideCount) % this.slideCount);
}

startAutoScroll() {
this.autoScrollInterval = setInterval(() => {
this.nextSlide();
}, 5000);
}

stopAutoScroll() {
clearInterval(this.autoScrollInterval);
}

addTouchSupport() {
let touchStartX = 0;
let touchEndX = 0;

this.wrapper.addEventListener('touchstart', (e) => {
touchStartX = e.touches[0].clientX;
this.stopAutoScroll();
}, false);

this.wrapper.addEventListener('touchmove', (e) => {
touchEndX = e.touches[0].clientX;
}, false);

this.wrapper.addEventListener('touchend', () => {
const difference = touchStartX - touchEndX;
if (Math.abs(difference) > 50) {
if (difference > 0) {
  this.nextSlide();
} else {
  this.previousSlide();
}
}
this.startAutoScroll();
}, false);
}
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
new Slideshow();
});
