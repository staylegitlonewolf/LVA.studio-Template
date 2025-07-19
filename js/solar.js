// Solar Panels Service Page Script

function showSolarPage() {
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
  // Show solar-root only
  let solarRoot = document.getElementById('solar-root');
  if (!solarRoot) {
    solarRoot = document.createElement('div');
    solarRoot.id = 'solar-root';
    document.body.appendChild(solarRoot);
  }
  solarRoot.style.display = 'block';
  solarRoot.innerHTML = `
    <section class="solar-hero" style="background: linear-gradient(120deg, #ffe082 0%, #fffde7 100%); text-align: center; padding: 3rem 1rem 2rem; border-radius: 0 0 2rem 2rem; box-shadow: 0 4px 24px rgba(255, 193, 7, 0.08);">
      <h1 style="font-size: clamp(2.2rem, 6vw, 3.2rem); color: #ffb300;">Solar Panel Systems — Powering a Greener Future</h1>
      <p style="font-size: 1.2rem; color: #b28704; max-width: 700px; margin: 0 auto 1.5rem;">Save energy and money with solar systems for home or business. Clean, renewable, and future-ready.</p>
    </section>
    <div class="solar-cards" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin: 2rem 0;">
      <div class="solar-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Residential Solutions</h2>
        <p>Custom solar installations for homes. Lower your bills and your carbon footprint.</p>
      </div>
      <div class="solar-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Commercial Projects</h2>
        <p>Scalable solar systems for businesses and organizations. Boost sustainability and savings.</p>
      </div>
      <div class="solar-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #ffb300;">Expert Installation</h2>
        <p>Professional assessment, design, and installation for maximum efficiency.</p>
      </div>
    </div>
    <div class="solar-cta" style="text-align: center; margin: 3rem 0 1rem;">
      <button class="solar-cta-btn" style="background: #ffb300; color: #fff; font-size: 1.1rem; padding: 0.9rem 2.2rem; border: none; border-radius: 2rem; box-shadow: 0 2px 12px rgba(255,193,7,0.13); cursor: pointer;" onclick="window.open('mailto:contact@lva.studio?subject=Solar%20Panels%20Inquiry')">Get a Solar Quote</button>
    </div>
  `;
  // Scroll to top when this page is shown
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 