// --- Portal Quotes ---
const quotes = [
  "Health Insurance — Trust in Every Policy.",
  "Solar Panel Systems — Powering a Greener Future.",
  "General Contracting — Built to Last.",
  "3D Modeling — Ideas in High Definition.",
  "Wix Studio Websites — Fast, Smart, Secure.",
  "NIL Branding — Student Athletes Powered.",
  "LVA.studio™ — Your Fullstack Partner."
];
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
// --- Portal Loading Spinner ---
async function initLoading() {
  document.getElementById('progress').textContent = 'Fetching resources...';
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts?_limit=1');
  } catch (e) {
    // ignore
  }
  document.getElementById('progress').textContent = '✅ Ready to Launch';
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('enterBtn').classList.add('show');
}
// --- Portal Entry ---
function enterPortal() {
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
  // Hide all service-specific sections
  document.getElementById('layout').style.display = 'none';
  document.getElementById('portalContent').style.display = 'block';
  const serviceSections = [
    'health-root',
    'solar-root',
    'contracting-root',
    'model-root',
    'wix-root',
    'nil-root'
  ];
  serviceSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Show portal content
  const portalContent = document.getElementById('portalContent');
  portalContent.style.display = 'block';
  portalContent.innerHTML = content;
  attachCardEvents();
}
// --- Card Generator ---
function generateCard(title, icon, frontText, ribbon = '', backText = '', isWix = false) {
  let learnMoreBtn;
  if (isWix) {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); showWixPage()">Learn More</button>`;
  } else if (title === 'Health Insurance') {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); showHealthInsurancePage()">Learn More</button>`;
  } else if (title === 'Solar Panels') {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); showSolarPage()">Learn More</button>`;
  } else if (title === 'Contracting') {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); showContractingPage()">Learn More</button>`;
  } else if (title === '3D Modeling') {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); show3DModelPage()">Learn More</button>`;
  } else if (title === 'NIL Partners') {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); showNILPartnersPage()">Learn More</button>`;
  } else {
    learnMoreBtn = `<button class="learn-more-btn" onclick="event.stopPropagation(); alert('Redirect to ${title}')">Learn More</button>`;
  }
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
// --- Attach Card Events (for dynamic content) ---
function attachCardEvents() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent flipping if clicking a button inside the card
      if (e.target.closest('button')) return;
      this.classList.toggle('flipped');
    });
  });
}
// --- LVA Package Shop Content (from first script, minus top menu) ---
const shopContent = `
  <header>⚡️ Experience the Future of Web Builds</header>
  <div class="shop-container">
    <div class="product-card">
      <div class="badge">Most Popular</div>
      <h2 class="product-title basic-title">📦 BASIC Package</h2>
      <ul>
        <li>1-Year LVA Website Management <div class="tooltip">Includes full support, updates, and hosting assistance for one year.</div></li>
        <li>Full Wix Studio Setup <div class="tooltip">Includes full Wix Studio custom site build with mobile optimization.</div></li>
        <li>No Business Email <div class="tooltip">Does not include a branded email address like name@yourdomain.com.</div></li>
        <li>No Private Domain <div class="tooltip">Domain registration is public. Private protection is not enabled.</div></li>
        <li>$50 Google Ads Credit <div class="tooltip">Bonus Google Ads credit for your marketing launch.<span class="ribbon">Limited Time Offer</span></div></li>
        <li>Perfect for Portfolios <div class="tooltip">Ideal for small teams, portfolios, or personal brands.</div></li>
      </ul>
      <div class="price">$1,747.35</div>
      <div class="deposit">💰 Deposit Required: $600.00</div>
      <button class="buy-btn" onclick="window.location.href = 'https://staylegit.wixstudio.com/lvadavidhealthinsur/admin'">Engage Now</button>
    </div>
    <div class="product-card">
      <div class="badge" style="background-color: #00e676;">Best Value</div>
      <h2 class="product-title standard-title">🛒 STANDARD Package</h2>
      <ul>
        <li>1-Year LVA Website Management <div class="tooltip">Includes full support, updates, and hosting assistance for one year.</div></li>
        <li>Store + Wix Studio Setup <div class="tooltip">Includes online store setup, product listings, and secure checkout.</div></li>
        <li>Business Email + Domain <div class="tooltip">Includes a professional business email and domain setup.</div></li>
        <li>Private Domain + DNSSEC <div class="tooltip">Includes WHOIS protection and DNSSEC for enhanced domain security.</div></li>
        <li>$50 Google Ads Credit <div class="tooltip">Bonus Google Ads credit for your marketing launch.<span class="ribbon">Limited Time Offer</span></div></li>
        <li>Payments Enabled <div class="tooltip">Includes payment gateways to accept cards or PayPal online.</div></li>
      </ul>
      <div class="price">$1,940.25</div>
      <div class="deposit">💰 Deposit Required: $600.00</div>
      <button class="buy-btn" onclick="window.location.href = 'https://staylegit.wixstudio.com/lvadavidhealthinsur/admin'">Unleash Power</button>
    </div>
  </div>
  <h2 class="section-title">Invoice Breakdown</h2>
  <div class="section-content">
    <h3>Basic Package 1</h3>
    <table>
      <thead>
        <tr><th>Item / Service Description</th><th>Rate</th><th>Total</th></tr>
      </thead>
      <tbody>
        <tr><td>Design + Setup (no business email)</td><td>$1,500.00</td><td>$1,747.35</td></tr>
      </tbody>
    </table>
    <h3>Basic Package 2</h3>
    <table>
      <thead>
        <tr><th>Item / Service Description</th><th>Rate</th><th>Total</th></tr>
      </thead>
      <tbody>
        <tr><td>Design + Business Email + Private Reg</td><td>$1,500.00</td><td>$1,841.00</td></tr>
      </tbody>
    </table>
    <h3>Standard Package 1</h3>
    <table>
      <thead>
        <tr><th>Item / Service Description</th><th>Rate</th><th>Total</th></tr>
      </thead>
      <tbody>
        <tr><td>Design + Business Email + Store + Private Reg</td><td>$1,500.00</td><td>$1,940.25</td></tr>
      </tbody>
    </table>
    <p style="margin-top: 2rem; font-weight: bold; color: #66ccff;"> LVA.studio™ | Living Victorious Always</p>
  </div>
  <h2 class="section-title">FAQ</h2>
  <div class="section-content faq-section">
    <div class="faq-item"><h3>1. Is there support after launch?</h3><p>You get 1 year of support under the LVA Website Management Plan.</p></div>
    <div class="faq-item"><h3>2. What happens after the first year?</h3><p>You can either renew your LVA Plan or take full ownership — we’ll help either way.</p></div>
    <div class="faq-item"><h3>3. Can I sell products or book appointments later?</h3><p>Yes — if you start with Basic, you can upgrade to Standard or request add-ons anytime.</p></div>
    <div class="faq-item"><h3>4. What’s included in the package?</h3><p>A full custom Wix website (design, structure, content), plus setup of your domain, email (if applicable), and mobile responsiveness with 1 year LVA Website Management.</p></div>
    <div class="faq-item"><h3>5. What is Wix.Studio?</h3><p>Wix is a leading website builder that lets us build your site quickly, securely, and with great design flexibility. You’ll have full access.</p></div>
    <div class="faq-item"><h3>6. Do I own the site when it’s done?</h3><p>Yes — you fully own the domain, content, and site. We can transfer it to your Wix account.</p></div>
    <div class="faq-item"><h3>7. Can I edit it later?</h3><p>Yes! We’ll show you how to update text, photos, and products after launch.</p></div>
    <div class="faq-item"><h3>8. How long does it take?</h3><p>Typically 1–2 weeks depending on package.</p></div>
    <div class="faq-item"><h3>9. What if I want changes later?</h3><p>You can book a maintenance package or request updates anytime.</p></div>
    <div class="faq-item"><h3>10. Can you help me get found on Google?</h3><p>Yes — we set up basic SEO and submit your site to Google. We also apply a $50 ad credit to help you start showing up in searches quickly.<span class="ribbon">Limited Time Offer</span></p></div>
  </div>
  <h2 class="section-title">Timeline Overview</h2>
  <div class="section-content">
    <h3>Week 1 — V1.0 Draft & Setup</h3>
    <p>After you complete the Website Build Tool, we pull submitted data from the CMS to generate your first draft site. You’ll review the V1.0 draft and provide feedback for edits.</p>
    <h3>Week 2 — Final Edits & SEO</h3>
    <p>We finalize layout/content, optimize for mobile, and configure SEO (meta titles, descriptions, indexing).</p>
    <h3>Week 3 — Google Campaign Launch</h3>
    <p>Once approved, we activate your $50 Google Ads credit with targeting to get initial traffic.</p>
    <span class="ribbon">Limited Time Offer</span>
  </div>
  <h2 class="section-title">What We Handle vs What You Own</h2>
  <div class="section-content">
    <p><strong>We Handle 🧑‍💻</strong></p>
    <ul>
      <li>✅ Custom website structure & layout</li>
      <li>✅ Wix Studio environment setup</li>
      <li>✅ Business email configuration (if included)</li>
      <li>✅ Mobile-optimized responsiveness</li>
      <li>✅ Basic SEO setup + Google launch</li>
      <li>🧩 CMS setup and dynamic content design (if applicable)</li>
      <li>🛠 Custom interactions or toggles (Velo Code)</li>
    </ul>
    <p><strong>You Own ✅</strong></p>
    <ul>
      <li>✅ Domain name and registration</li>
      <li>✅ Your Wix account & login credentials</li>
      <li>✅ Full access to purchased business email</li>
      <li>✅ Full ownership of all website content & media</li>
    </ul>
  </div>
  <h2 class="section-title">Wix Hosting, Domain & Email Costs</h2>
  <div class="section-content">
    <h1><strong>✅ Wix Annual Renewals</strong></h1>
    <p>Wix renews automatically each year for:<br>• Premium Plan (hosting)<br>• Domain Name<br>• Business Email (if selected)<br><br>✅ Auto-Renews Annually (can be canceled anytime)</p>
    <h1><strong>🔹 Basic Package</strong></h1>
    <p>$228.00/year ($19.00/mo)<br>Features: 10 GB Media, 3 Collaborators, 1,500 CMS Items, Analytics</p>
    <h1><strong>🔸 Standard Package</strong></h1>
    <p>$324.00/year ($27.00/mo)<br>Features: 120 GB Media, 10 Collaborators, 20,000 CMS Items, Payments, Priority Support</p>
    <h1><strong>🌐 Domain Name</strong></h1>
    <p>This is your website’s main address (e.g., <em>yourbrand.com</em>).<br>Choose a name that’s easy to remember and represents your business well.</p>
    <p>$19.35/year</p>
    <h1><strong>🌍 Public Registration</strong></h1>
    <p>Displays your contact information publicly:<br>• Full Name<br>• Business Email<br>• Address<br>• Phone Number</p>
    <p>$0.00</p>
    <h1><strong>🔒 Private Registration</strong></h1>
    <p>✅ Protects against domain name hijacking<br>✅ Prevents identity theft<br>✅ Reduces domain-related spam emails</p>
    <p>$9.90</p>
    <h1><strong>🛡️ Private + DNSSEC</strong></h1>
    <p>✅ Adds a secure digital signature to your domain<br>✅ Ensures traffic isn’t redirected to malicious sites<br>✅ Secures your visitors’ personal data<br>✅ Provides advanced identity and spam protection</p>
    <p>$12.90</p>
    <h1><strong>📧 Business Email</strong></h1>
    <p>Professional email address (e.g., info@yourwebsite.com)<br>Builds credibility and strengthens your brand's trust factor.</p>
    <p>$84.00/year (1 user)</p>
  </div>
`;
// --- Load Shop Content (Wix Websites) ---
let portalContentBackup = null;
function loadShopContent() {
  // Backup portal content for restoration
  const portalContent = document.getElementById('portalContent');
  if (!portalContentBackup) {
    portalContentBackup = portalContent.innerHTML;
  }
  portalContent.innerHTML = shopContent;
  // Attach FAQ toggles
  document.querySelectorAll('.faq-item h3').forEach((h3) => {
    h3.addEventListener('click', () => {
      h3.parentElement.classList.toggle('active');
    });
  });
}
// --- Restore Portal Content (logo click) ---
function restorePortalContent() {
  if (portalContentBackup) {
    const portalContent = document.getElementById('portalContent');
    portalContent.innerHTML = portalContentBackup;
    attachCardEvents();
  }
}
// --- Theme Toggle Logic ---
// (Removed top menu toggle logic, handled by button in side menu)
// --- Side Menu and Fullscreen Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('side-menu-overlay');
  const openBtn = document.getElementById('side-menu-toggle');
  const closeBtn = document.getElementById('close-side-menu');
  const fullscreenBtn = document.getElementById('fullscreen-toggle');
  const themeBtn = document.querySelector('.toggle-mode-btn');

  function openMenu() {
    sideMenu.style.display = 'flex';
    overlay.style.display = 'block';
    setTimeout(() => sideMenu.classList.add('open'), 10);
  }
  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.style.display = 'none';
    setTimeout(() => sideMenu.style.display = 'none', 300);
  }
  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  if (fullscreenBtn) {
    // Detect iPhone/iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      fullscreenBtn.disabled = true;
      fullscreenBtn.textContent = 'Fullscreen not supported on iPhone';
    } else {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        closeMenu(); // Close sidebar after click
      });
    }
  }
  // Ensure theme toggle works in side menu
  if (themeBtn) {
    // Set correct class on load
    const isClean = document.body.classList.contains('clean-mode');
    themeBtn.classList.remove('light-btn', 'epic-btn');
    themeBtn.classList.add(isClean ? 'light-btn' : 'epic-btn');
    themeBtn.addEventListener('click', closeMenu);
  }
});
// --- Init Loading Spinner ---
initLoading();

// Expose key functions to the window object for global access
window.enterPortal = enterPortal;
window.generateCard = generateCard;
window.attachCardEvents = attachCardEvents;
window.loadShopContent = loadShopContent;
window.restorePortalContent = restorePortalContent;
