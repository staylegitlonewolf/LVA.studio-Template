// Health Insurance Page Script

function showHealthInsurancePage() {
  document.getElementById('layout').style.display = 'none';
  document.getElementById('portalContent').style.display = 'none';
  const healthRoot = document.getElementById('health-root');
  healthRoot.style.display = 'block';
  healthRoot.innerHTML = `
    <section class="health-hero">
      <h1>Health Insurance — Trust in Every Policy</h1>
      <p>Custom plans for individuals and businesses. Secure your tomorrow today with LVA.studio™.</p>
    </section>
    <div class="health-cards">
      <div class="health-card">
        <h2>Personal Coverage</h2>
        <p>Affordable, flexible plans for individuals and families. Get the protection you need, when you need it.</p>
      </div>
      <div class="health-card">
        <h2>Business Solutions</h2>
        <p>Comprehensive group health insurance for small businesses and organizations. Support your team’s well-being.</p>
      </div>
      <div class="health-card">
        <h2>Expert Guidance</h2>
        <p>Our licensed agents help you compare, choose, and enroll in the best plan for your needs.</p>
      </div>
    </div>
    <div class="health-cta">
      <button class="health-cta-btn" id="health-cta-btn">Get Started</button>
    </div>
  `;
  document.getElementById('health-cta-btn').addEventListener('click', function () {
    window.open('https://staylegit.wixstudio.com/lvadavidhealthinsur/', '_blank');
  });
  // Scroll to top when this page is shown
  window.scrollTo({ top: 0, behavior: 'smooth' });
} 