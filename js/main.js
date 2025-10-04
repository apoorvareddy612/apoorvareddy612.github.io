// Wait until the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Typewriter Effect Script Setup ---
    const typewriterText = document.getElementById('typewriter-text');
    const sourceElement = document.getElementById('typewriter-source');

    if (typewriterText && sourceElement) {
        const sourceText = sourceElement.textContent.trim();
        const heroHeadline = document.querySelector('.hero__headline');
        let i = 0;
        const speed = 100; // Typing speed in milliseconds

        function typeWriter() {
            if (i < sourceText.length) {
                // Append the next character to the element
                typewriterText.innerHTML += sourceText.charAt(i);
                i++;
                // Continue typing after a short delay
                setTimeout(typeWriter, speed);
            } else {
                // Once typing is complete, stop the cursor animation
                heroHeadline.classList.remove('typing-active');
            }
        }

        // Add the class to enable the blinking cursor animation
        heroHeadline.classList.add('typing-active'); 
        
        // Delay the start of typing slightly to show the initial cursor
        setTimeout(typeWriter, 500); 
    }
    
    // --- 2. Scroll Fade-In Animation Setup ---
    setupScrollAnimations();
});

/**
 * Initializes the Intersection Observer to add a 'is-visible' class
 * when an element scrolls into the viewport.
 */
function setupScrollAnimations() {
    // Target all elements that should fade in on scroll
    // This includes sections and individual cards/entries
    const fadeTargets = document.querySelectorAll('.section, .project-card, .skills-card, .education-entry, .experience-entry, .research-card');

    // Define the observer options
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Define the observer callback function
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is visible, add the 'is-visible' class (which triggers CSS transition)
                entry.target.classList.add('is-visible');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target); 
            }
        });
    };

    // Create the observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Apply the observer to all target elements
    fadeTargets.forEach(target => {
        observer.observe(target); 
    });
}
