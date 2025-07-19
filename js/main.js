import { startQuotes, initLoading, enterPortal } from './portal.js';
import { generateCard, attachCardEvents } from './cards.js';
import { loadShopContent, restorePortalContent } from './shop.js';
import { toggleFontMode, setupThemeAndLogo } from './theme.js';

startQuotes();
initLoading();
setupThemeAndLogo(restorePortalContent, attachCardEvents);

// Expose for HTML onclicks
window.enterPortal = () => enterPortal(generateCard, attachCardEvents);
window.loadShopContent = () => loadShopContent();
window.restorePortalContent = () => restorePortalContent(attachCardEvents);
window.toggleFontMode = toggleFontMode; 