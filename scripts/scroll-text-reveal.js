// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all elements with the class 'reveal-type'
const splitTypes = document.querySelectorAll("#reveal-type");

// Iterate over each selected element
splitTypes.forEach((char, i) => {
  // Split text into characters and words using Splitting.js
  const text = Splitting({ target: char, by: "chars" }); // Splitting the text into characters

  console.log(text); // For debugging purposes

  // GSAP animation for each character
  gsap.from(text[0].chars, {
    scrollTrigger: {
      trigger: char, // The element that triggers the animation
      start: "top 80%", // When the top of the element is 80% from the top of the viewport
      end: "top 20%", // When the top of the element is 20% from the top of the viewport
      scrub: true, // Smooth scrubbing during scrolling
      // scrub: false, //turn 'ON' on for reveals
      // toggleActions: 'play play reverse reverse' //for the 'coming soon' sign
    },
    opacity: 0, // Start with 0 opacity
    y: 20, // Move characters 20px down
    stagger: 0.1, // Stagger each character by 0.1 seconds
  });
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 8, // Adjust duration (higher values slow the scroll speed)
  easing: (t) => Math.pow(t, 0.8), // Customize easing function for a smooth scroll effect
  smooth: true, // Enable smooth scrolling
  smoothTouch: true, // Enable smooth scrolling for touch devices
});
// Request Animation Frame loop for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
