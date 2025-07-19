// TEST: Second test for workflow verification
// TEST: This is a live site test fdfd
// --- Portal Quotes ---
export const quotes = [
  "Health test Insurance — Trust in Every Policy.",
  "Solar Panel Systems — Powering a Greener Future.",
  "General Contracting — Built to Last.",
  "3D Modeling — Ideas in High Definition.",
  "Wix Studio Websites — Fast, Smart, Secure.",
  "NIL Branding — Student Athletes Powered.",
  "LVA.studio™ — Your Fullstack Partner."
];
export function startQuotes() {
  const quotesEl = document.getElementById('quotes');
  let quoteIndex = 0;
  setInterval(() => {
    if (!quotesEl) return;
    quotesEl.style.opacity = 0;
    setTimeout(() => {
      quotesEl.textContent = `“${quotes[quoteIndex]}”`;
      quotesEl.style.opacity = 1;
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }, 300);
  }, 3500);
}
export async function initLoading() {
  document.getElementById('progress').textContent = 'This is a test';
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts?_limit=1');
  } catch (e) {}
  document.getElementById('progress').textContent = '✅ Ready to Launch ';
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('enterBtn').classList.add('show');
}
export function enterPortal(generateCard, attachCardEvents) {
  const content = `
    <section class="hero" style="text-align: center; padding: 4rem 2rem 2rem;">
      <h1 style="font-size: clamp(2rem, 5vw, 3rem); color: #00bfff; text-shadow: 0 0 20px #00e5ff; margin-bottom: 1rem;">
         Our Services
      </h1>
      <p style="font-size: 1.1rem; color: #aadfff; max-width: 800px; margin: 0 auto;">
        Explore our premium solutions — from insurance to web design — with expert care and futuristic style.
      </p>
    </section>
    <section class="shop-container">
      ${generateCard('Health Insurance', 'fas fa-notes-medical', 'Plans that protect your future.', '', 'Custom plans for individuals and businesses. Secure your tomorrow today.')}
      ${generateCard('Solar Panels', 'fas fa-solar-panel', 'Powering a greener future.', '', 'Save energy and money with solar systems for home or business.')}
      ${generateCard('Contracting', 'fas fa-hard-hat', 'We build with integrity.', '', 'Licensed contracting for residential and commercial needs.')}
      ${generateCard('3D Modeling', 'fas fa-cube', 'Visualize in high-def.', 'September', 'High-quality models for architecture, gaming, and product mockups.')}
      ${generateCard('Wix Websites', 'fas fa-globe', 'Design. SEO. Speed.', 'New', 'Custom-built Wix Studio sites with branding and optimization.', true)}
      ${generateCard('NIL Partners', 'fas fa-star', 'Athlete success.', 'NIL', 'Monetize your name, image, and likeness with confidence.')}
    </section>
    <div class="footer-cta" style="text-align: center; margin: 3rem; font-size: 1rem;">
      Ready to grow with LVA.studio™? <a href="#">Apply Now</a> or <a href="mailto:contact@lva.studio">Contact Us</a>
    </div>
  `;
  document.getElementById('layout').style.display = 'none';
  const portalContent = document.getElementById('portalContent');
  portalContent.style.display = 'block';
  portalContent.innerHTML = content;
  attachCardEvents();
} 