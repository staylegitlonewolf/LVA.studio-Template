// Contracting Service Page Script

function showContractingPage() {
  document.getElementById('layout').style.display = 'none';
  document.getElementById('portalContent').style.display = 'none';
  let contractingRoot = document.getElementById('contracting-root');
  if (!contractingRoot) {
    contractingRoot = document.createElement('div');
    contractingRoot.id = 'contracting-root';
    document.body.appendChild(contractingRoot);
  }
  contractingRoot.style.display = 'block';
  contractingRoot.innerHTML = `
    <section class="contracting-hero" style="background: linear-gradient(120deg, #bdbdbd 0%, #f5f5f5 100%); text-align: center; padding: 3rem 1rem 2rem; border-radius: 0 0 2rem 2rem; box-shadow: 0 4px 24px rgba(158, 158, 158, 0.08);">
      <h1 style="font-size: clamp(2.2rem, 6vw, 3.2rem); color: #757575;">General Contracting — Built to Last</h1>
      <p style="font-size: 1.2rem; color: #424242; max-width: 700px; margin: 0 auto 1.5rem;">Licensed contracting for residential and commercial needs. Quality, reliability, and integrity in every project.</p>
    </section>
    <div class="contracting-cards" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin: 2rem 0;">
      <div class="contracting-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #757575;">Residential Builds</h2>
        <p>Custom homes, renovations, and additions. Built with care and craftsmanship.</p>
      </div>
      <div class="contracting-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #757575;">Commercial Projects</h2>
        <p>Office, retail, and industrial construction. On time, on budget, on spec.</p>
      </div>
      <div class="contracting-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #757575;">Project Management</h2>
        <p>From permits to punch list, we handle every detail for a smooth build.</p>
      </div>
    </div>
    <div class="contracting-cta" style="text-align: center; margin: 3rem 0 1rem;">
      <button class="contracting-cta-btn" style="background: #757575; color: #fff; font-size: 1.1rem; padding: 0.9rem 2.2rem; border: none; border-radius: 2rem; box-shadow: 0 2px 12px rgba(117,117,117,0.13); cursor: pointer;" onclick="window.open('mailto:contact@lva.studio?subject=Contracting%20Inquiry')">Request a Quote</button>
    </div>
  `;
  // Scroll to top when this page is shown
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 