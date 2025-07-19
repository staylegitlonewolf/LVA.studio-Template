// NIL Partners Service Page Script

function showNILPartnersPage() {
  // Hide all service-specific sections
  const serviceSections = [
    'health-root',
    'solar-root',
    'contracting-root',
    'model-root',
    'wix-root',
    'nil-root',
    'portalContent',
    'layout'
  ];
  serviceSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Show nil-root only
  let nilRoot = document.getElementById('nil-root');
  if (!nilRoot) {
    nilRoot = document.createElement('div');
    nilRoot.id = 'nil-root';
    document.body.appendChild(nilRoot);
  }
  nilRoot.style.display = 'block';
  nilRoot.innerHTML = `
    <section class="nil-hero" style="background: linear-gradient(120deg, #ffd54f 0%, #fffde7 100%); text-align: center; padding: 3rem 1rem 2rem; border-radius: 0 0 2rem 2rem; box-shadow: 0 4px 24px rgba(255, 213, 79, 0.08);">
      <h1 style="font-size: clamp(2.2rem, 6vw, 3.2rem); color: #ffb300;">NIL Branding — Student Athletes Powered</h1>
      <p style="font-size: 1.2rem; color: #b28704; max-width: 700px; margin: 0 auto 1.5rem;">Monetize your name, image, and likeness with confidence. Athlete success, powered by LVA.studio™.</p>
    </section>
    <div class="nil-cards" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin: 2rem 0;">
      <div class="nil-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Brand Building</h2>
        <p style='color:#111;'>Develop your personal brand and maximize your NIL opportunities.</p>
      </div>
      <div class="nil-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Sponsorships</h2>
        <p style='color:#111;'>Connect with sponsors and monetize your athletic achievements.</p>
      </div>
      <div class="nil-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Legal Guidance</h2>
        <p style='color:#111;'>Expert advice to protect your rights and maximize your value.</p>
      </div>
    </div>
    <div class="nil-cta" style="text-align: center; margin: 3rem 0 1rem;">
      <button class="nil-cta-btn" style="background: #ffb300; color: #fff; font-size: 1.1rem; padding: 0.9rem 2.2rem; border: none; border-radius: 2rem; box-shadow: 0 2px 12px rgba(255,179,0,0.13); cursor: pointer;" onclick="window.open('mailto:contact@lva.studio?subject=NIL%20Branding%20Inquiry')">Get NIL Help</button>
    </div>
  `;
  // Scroll to top when this page is shown
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 