// Listen for wheel events with Alt key held down
let lastWheelTime = 0;
const DEBOUNCE_DELAY = 150; // milliseconds to prevent multiple rapid switches

document.addEventListener('wheel', (event) => {
  // Check if Alt key is pressed
  if (event.altKey) {
    // Prevent default Firefox behavior (back/forward navigation)
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Debounce to prevent too many rapid tab switches
    const now = Date.now();
    if (now - lastWheelTime < DEBOUNCE_DELAY) {
      return;
    }
    lastWheelTime = now;

    // Determine direction: negative deltaY = wheel up, positive = wheel down
    const direction = event.deltaY < 0 ? 'previous' : 'next';

    // Send message to background script to switch tabs
    browser.runtime.sendMessage({
      action: 'switchTab',
      direction: direction
    }).catch(() => {
      // Ignore errors (e.g., extension context invalidated)
    });
  }
}, { passive: false, capture: true }); // capture: true to catch event early
