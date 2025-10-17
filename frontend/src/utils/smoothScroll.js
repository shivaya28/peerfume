let isScrolling = false;
let velocity = 0;
let lastScrollY = 0;
let targetY = 0;

export const initSmoothScroll = () => {
  let scrollTimeout;

  // Handle wheel events
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    // Calculate target position with easing
    targetY = window.scrollY + e.deltaY;
    velocity = e.deltaY * 0.8; // Momentum factor
    
    // Start smooth animation
    smoothScrollTo(targetY);
    
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set timeout to stop momentum
    scrollTimeout = setTimeout(() => {
      velocity = 0;
    }, 100);
  }, { passive: true });

  // Handle touch events for mobile
  let touchStartY = 0;
  
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    targetY = window.scrollY + deltaY;
    touchStartY = touchY;
  }, { passive: true });
};

function smoothScrollTo(target) {
  if (isScrolling) return;
  
  isScrolling = true;
  const start = window.scrollY;
  const distance = target - start;
  const duration = 800; // milliseconds
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Ease out cubic function for smooth end
    const easing = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, start + distance * easing);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      isScrolling = false;
      lastScrollY = window.scrollY;
    }
  }
  
  requestAnimationFrame(animation);
}
