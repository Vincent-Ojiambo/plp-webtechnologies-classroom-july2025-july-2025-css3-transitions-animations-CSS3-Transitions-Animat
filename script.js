/**
 * ===================================
 * Part 2: Functions & Scope
 * ===================================
 */

// Global variables
const interactiveBox = document.getElementById('interactiveBox');
const pulseBox = document.getElementById('pulseBox');
let isPulsing = true;

/**
 * Changes the color of an element with a smooth transition and returns a status message
 * @param {HTMLElement} element - The DOM element to modify
 * @param {string} color - The color to set
 * @returns {string} Status message
 */
function changeElementColor(element, color) {
  if (!element) return 'Element not found';
  
  // Remove any animation classes that might be setting the background color
  element.classList.remove('pulse', 'bounce', 'flip');
  
  // Add transition for smooth color change
  element.style.transition = 'background-color 0.3s ease';
  element.style.backgroundColor = color;
  
  // Re-add any animation class that was removed
  if (element.classList.contains('pulse-animation')) {
    element.classList.add('pulse');
  } else if (element.classList.contains('bounce-animation')) {
    element.classList.add('bounce');
  } else if (element.classList.contains('flip-animation')) {
    element.classList.add('flip');
  }
  
  // Remove the transition after it's done to prevent interference with other animations
  setTimeout(() => {
    element.style.transition = '';
  }, 300);
  
  return `Element color changed to ${color}`;
}

/**
 * Toggles animation on an element
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationClass - The CSS class with the animation
 * @param {string} animationType - Type of animation (for status message)
 * @returns {string} Status message
 */
function toggleAnimation(element, animationClass, animationType) {
  if (!element) return 'Element not found';
  
  if (element.classList.contains(animationClass)) {
    element.classList.remove(animationClass);
    return `${animationType} animation stopped`;
  } else {
    element.classList.add(animationClass);
    return `${animationType} animation started`;
  }
}

/**
 * Resets all animations on the interactive box
 * @returns {string} Status message
 */
function resetAnimations() {
  if (!interactiveBox) return 'Interactive box not found';
  
  // Remove all animation classes
  interactiveBox.className = 'animation-box';
  interactiveBox.style.transition = '';
  interactiveBox.style.backgroundColor = '';
  
  return 'All animations have been reset';
}

/**
 * ===================================
 * Part 3: CSS + JS Combined
 * ===================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set initial animation for pulse box
  if (pulseBox) {
    pulseBox.classList.add('pulse');
  }
  
  // Color change functionality
  const colorButtons = document.querySelectorAll('.btn-color-option');
  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const color = button.dataset.color;
      const status = changeElementColor(interactiveBox, color);
      console.log(status);
    });
  });
  
  // Toggle pulse animation on the pulse box
  const togglePulseBtn = document.getElementById('togglePulse');
  if (togglePulseBtn && pulseBox) {
    let isPaused = false;
    
    togglePulseBtn.addEventListener('click', () => {
      if (isPaused) {
        // Resume animation
        pulseBox.style.animationPlayState = 'running';
        togglePulseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Animation';
        isPaused = false;
      } else {
        // Pause animation
        pulseBox.style.animationPlayState = 'paused';
        togglePulseBtn.innerHTML = '<i class="fas fa-play"></i> Resume Animation';
        isPaused = true;
      }
    });
    
    // Initialize button text
    togglePulseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Animation';
  }
  
  // Modal functionality
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  let isModalOpen = false;

  function openModal(e) {
    if (e) e.preventDefault();
    if (isModalOpen || !modal) return;
    
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      isModalOpen = true;
      if (closeModalBtn) closeModalBtn.focus();
    }, 10);
  }

  function closeModal(e) {
    if (e) e.preventDefault();
    if (!isModalOpen || !modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = '';
    isModalOpen = false;
    
    setTimeout(() => {
      if (!isModalOpen && modal) {
        modal.style.display = 'none';
      }
    }, 300);
  }
  
  // Event listeners for modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
    openModalBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(e);
      }
    });
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Close when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(e);
      }
    });
  }
  
  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal(e);
    }
  });

  // Bounce animation
  const bounceBtn = document.getElementById('bounceBtn');
  if (bounceBtn) {
    bounceBtn.addEventListener('click', () => {
      if (!interactiveBox) return;
      
      // First reset any existing animations
      interactiveBox.className = 'animation-box bounce';
      // Then add the bounce animation
      setTimeout(() => {
        interactiveBox.classList.add('bounce-animation');
      }, 10);
      console.log('Bounce animation started');
    });
  }

  // Flip animation
  const flipBtn = document.getElementById('flipBtn');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      if (!interactiveBox) return;
      
      // First reset any existing animations
      interactiveBox.className = 'animation-box flip';
      // Then add the flip animation
      setTimeout(() => {
        interactiveBox.classList.add('flip-animation');
      }, 10);
      console.log('Flip animation started');
    });
  }

  // Reset animations
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const status = resetAnimations();
      console.log(status);
    });
  }
});
