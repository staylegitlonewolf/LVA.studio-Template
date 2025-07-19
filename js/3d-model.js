// 3D Modeling Service Page Script

function show3DModelPage() {
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
  // Show model-root only
  let modelRoot = document.getElementById('model-root');
  if (!modelRoot) {
    modelRoot = document.createElement('div');
    modelRoot.id = 'model-root';
    document.body.appendChild(modelRoot);
  }
  modelRoot.style.display = 'block';
  modelRoot.innerHTML = `
    <section class="model-hero" style="background: linear-gradient(120deg, #b388ff 0%, #ede7f6 100%); text-align: center; padding: 3rem 1rem 2rem; border-radius: 0 0 2rem 2rem; box-shadow: 0 4px 24px rgba(103, 58, 183, 0.08);">
      <h1 style="font-size: clamp(2.2rem, 6vw, 3.2rem); color: #7c43bd;">3D Modeling — Ideas in High Definition</h1>
      <p style="font-size: 1.2rem; color: #512da8; max-width: 700px; margin: 0 auto 1.5rem;">High-quality models for architecture, gaming, and product mockups. Bring your vision to life.</p>
    </section>
    <div class="model-cards" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin: 2rem 0;">
      <div class="model-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #7c43bd;">Architectural Models</h2>
        <p style='color:#111;'>Detailed 3D models for buildings, interiors, and landscapes.</p>
      </div>
      <div class="model-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #7c43bd;">Product Mockups</h2>
        <p style='color:#111;'>Visualize products before manufacturing. Perfect for pitches and marketing.</p>
      </div>
      <div class="model-card" style="background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 16px rgba(0,0,0,0.07); padding: 2rem 1.5rem; max-width: 340px; flex: 1 1 300px;">
        <h2 style="color: #7c43bd;">Game Assets</h2>
        <p style='color:#111;'>Custom 3D assets for games and interactive experiences.</p>
      </div>
    </div>
    <div class="model-cta" style="text-align: center; margin: 3rem 0 1rem;">
      <button class="model-cta-btn" style="background: #7c43bd; color: #fff; font-size: 1.1rem; padding: 0.9rem 2.2rem; border: none; border-radius: 2rem; box-shadow: 0 2px 12px rgba(124,67,189,0.13); cursor: pointer;" onclick="window.open('mailto:contact@lva.studio?subject=3D%20Modeling%20Inquiry')">Start a 3D Project</button>
    </div>
  `;
  // Scroll to top when this page is shown
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 