// --- Portal Card Generator ---
export function generateCard(title, icon, frontText, ribbon = '', backText = '', isWix = false) {
  const learnMoreBtn = isWix
    ? `<button class="learn-more-btn" onclick="event.stopPropagation(); loadShopContent()">Learn More</button>`
    : `<button class="learn-more-btn" onclick="event.stopPropagation(); alert('Redirect to ${title}')">Learn More</button>`;
  return `
    <div class="flip-card">
      <div class="flip-inner">
        <div class="flip-front">
          ${ribbon ? `<div class="ribbon">${ribbon}</div>` : ''}
          <div class="card-icon"><i class="${icon}"></i></div>
          <div class="card-title">${title}</div>
          <p class="card-desc">${frontText}</p>
        </div>
        <div class="flip-back">
          <div class="card-title">${title}</div>
          <p class="card-desc">${backText}</p>
          ${learnMoreBtn}
        </div>
      </div>
    </div>
  `;
}
export function attachCardEvents() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      this.classList.toggle('flipped');
    });
  });
} 