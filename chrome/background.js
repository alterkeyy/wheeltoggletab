// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'switchTab') {
    switchTab(request.direction);
  }
});

async function switchTab(direction) {
  try {
    // Get current window's tabs
    const tabs = await chrome.tabs.query({ currentWindow: true });

    if (tabs.length <= 1) {
      return; // No point switching if only one tab
    }

    // Find current active tab
    const activeTab = tabs.find(tab => tab.active);
    if (!activeTab) {
      return;
    }

    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex;

    if (direction === 'next') {
      // Move to next tab, wrap around to first if at end
      nextIndex = (currentIndex + 1) % tabs.length;
    } else {
      // Move to previous tab, wrap around to last if at beginning
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = tabs.length - 1;
      }
    }

    // Switch to the target tab
    await chrome.tabs.update(tabs[nextIndex].id, { active: true });

  } catch (error) {
    console.error('Error switching tab:', error);
  }
}
