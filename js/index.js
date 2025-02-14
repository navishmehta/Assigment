
function toggleMenu() {
    let menuContainer = document.getElementById("menuContainer");
    let toggleButton = document.querySelector(".toggle-btn");

    menuContainer.classList.toggle("show");
    toggleButton.classList.toggle("active");
}




const slides = document.querySelectorAll(".slider-item");
const dots = document.querySelectorAll(".dot");
const sliderTrack = document.querySelector(".slider-track");
const sliderWrapper = document.querySelector(".slider-wrapper");

// Background gradients for each slide
const gradients = [
"linear-gradient(rgba(187, 235, 209, 1), rgba(207, 249, 255, 1))",
"linear-gradient(rgb(200, 180, 255), rgb(235, 200, 255))",
"linear-gradient(rgba(200, 180, 255, 1), rgba(180, 220, 255, 1))"
];

// Duplicate the first slide to create an infinite loop effect
const firstSlideClone = slides[0].cloneNode(true);
sliderTrack.appendChild(firstSlideClone);

let currentSlide = 0;
let isTransitioning = false;

function switchSlide(index, instant = false) {
if (isTransitioning) return;
isTransitioning = true;

// Apply transition if not instant
sliderTrack.style.transition = instant ? "none" : "transform 1s ease-in-out";

// Move the slider track smoothly
sliderTrack.style.transform = `translateX(-${index * 100}%)`;

// Change background smoothly
if (index < gradients.length) {
    sliderWrapper.style.transition = "background 1s ease-in-out";
    sliderWrapper.style.background = gradients[index];
}

currentSlide = index;

// Reset transition if on duplicate last slide
if (index === slides.length) {
    setTimeout(() => {
        sliderTrack.style.transition = "none";
        sliderTrack.style.transform = `translateX(0%)`; // Instantly reset to first slide
        sliderWrapper.style.background = gradients[0]; // Reset background
        currentSlide = 0;
        isTransitioning = false;
    }, 1000); // Delay reset until transition completes
} else {
    setTimeout(() => (isTransitioning = false), 1000);
}

// Update active dot indicator
dots.forEach(dot => dot.classList.remove("active"));
if (index < dots.length) dots[index].classList.add("active");
}

// Auto-slide functionality
let autoSlideInterval = setInterval(() => {
switchSlide(currentSlide + 1);
}, 5000);

// Handle dot click events
dots.forEach((dot, index) => {
dot.addEventListener("click", () => {
    clearInterval(autoSlideInterval); // Stop auto-slide on manual click
    switchSlide(index);
    autoSlideInterval = setInterval(() => switchSlide(currentSlide + 1), 5000);
});
});


