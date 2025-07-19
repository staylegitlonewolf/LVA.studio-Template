export function toggleFontMode(button) {
  const isClean = document.body.classList.toggle('clean-mode');
  // Epic mode is when NOT clean mode
  const isEpic = !isClean;
  button.classList.remove('light-btn', 'epic-btn');
  button.classList.add(isClean ? 'light-btn' : 'epic-btn');
  // Toggle epic-mode class for background video
  document.body.classList.toggle('epic-mode', isEpic);
  const bgVideo = document.getElementById('epic-bg-video');
  if (bgVideo) {
    bgVideo.style.display = isEpic ? 'block' : 'none';
  }
  // No text or icon changes needed, just class toggle for animation
}
export function setupThemeAndLogo(restorePortalContent, attachCardEvents) {
  window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-mode-btn');
    const isClean = document.body.classList.contains('clean-mode');
    button.classList.remove('light-btn', 'epic-btn');
    button.classList.add(isClean ? 'light-btn' : 'epic-btn');
    document.getElementById('logo-btn').addEventListener('click', () => {
      if (typeof window.enterPortal === 'function') {
        window.enterPortal();
      }
    });
  });
} 