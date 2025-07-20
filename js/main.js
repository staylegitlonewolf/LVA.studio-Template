// Remove ES6 imports and use global functions from other script files
// These functions are already available from the script tags in index.html

// Initialize the application
if (typeof startQuotes !== 'undefined') startQuotes();
if (typeof initLoading !== 'undefined') initLoading();
if (typeof setupThemeAndLogo !== 'undefined') setupThemeAndLogo(restorePortalContent, attachCardEvents);

// Expose for HTML onclicks
window.enterPortal = () => {
  if (typeof enterPortal !== 'undefined') enterPortal(generateCard, attachCardEvents);
};
window.loadShopContent = () => {
  if (typeof loadShopContent !== 'undefined') loadShopContent();
};
window.restorePortalContent = () => {
  if (typeof restorePortalContent !== 'undefined') restorePortalContent(attachCardEvents);
};
window.toggleFontMode = (element) => {
  if (typeof toggleFontMode !== 'undefined') toggleFontMode(element);
}; 