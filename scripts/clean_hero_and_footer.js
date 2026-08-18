const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Cleanly Replace the Hero block (from start of 89caf2a to start of cbfd1f8)
const heroStartIdx = html.indexOf('<div class="elementor-element elementor-element-89caf2a');
const heroEndIdx = html.indexOf('<div class="elementor-element elementor-element-cbfd1f8');

if (heroStartIdx !== -1 && heroEndIdx !== -1) {
  const newHero = `
<div id="home" class="elementor-element elementor-element-89caf2a e-con-full e-flex e-con e-parent" data-id="89caf2a" data-element_type="container" data-e-type="container" style="background: linear-gradient(135deg, #090e17 0%, #111a2e 50%, #060a12 100%); padding: 90px 20px 70px; color: #ffffff; position: relative; overflow: hidden;">
	<!-- Ambient glow effects -->
	<div style="position: absolute; top: -120px; right: -120px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(0, 146, 63, 0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>
	<div style="position: absolute; bottom: -100px; left: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

	<div style="max-width: 1240px; margin: 0 auto; width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 40px; position: relative; z-index: 2;">
		<!-- Left Column: Copy & CTAs -->
		<div style="flex: 1 1 560px; max-width: 650px;">
			<div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 146, 63, 0.18); border: 1px solid rgba(0, 146, 63, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.5px; color: #22c55e; margin-bottom: 24px;">
				<span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></span>
				NEXT-GEN LASER &amp; WATER-GUIDED TECHNOLOGY
			</div>
			
			<h1 style="font-size: clamp(2.5rem, 4.5vw, 3.8rem); font-weight: 800; line-height: 1.12; color: #ffffff; margin: 0 0 20px; font-family: 'Figtree', sans-serif;">
				Your materials.<br/>
				<span style="color: #00c853; text-shadow: 0 0 30px rgba(0, 200, 83, 0.35);">Your way.</span>
			</h1>

			<p style="font-size: 1.15rem; line-height: 1.65; color: #cbd5e1; margin-bottom: 32px; font-weight: 400;">
				When you need to cut the hardest materials on earth, no one gives you the precision and freedom to do it like <strong style="color: #ffffff;">Greenwave Technologies</strong>. Engineered in Surat for global industrial manufacturing.
			</p>

			<!-- Feature Highlights Row -->
			<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 36px;">
				<div style="display: flex; align-items: center; gap: 8px; color: #e2e8f0; font-size: 0.92rem;">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="#00c853"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
					<span><strong>±5µm</strong> Micron Precision</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px; color: #e2e8f0; font-size: 0.92rem;">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="#00c853"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
					<span><strong>Zero</strong> Thermal Distortion</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px; color: #e2e8f0; font-size: 0.92rem;">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="#00c853"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
					<span><strong>32+</strong> Countries Served</span>
				</div>
			</div>

			<!-- Action Buttons -->
			<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
				<a href="#machines" style="background: linear-gradient(135deg, #00923f 0%, #00c853 100%); color: #ffffff; font-weight: 700; font-size: 1rem; padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 10px 25px rgba(0, 146, 63, 0.4); transition: all 0.3s ease;">
					<span>Explore Machines</span>
					<span>→</span>
				</a>
				<a href="#contact" style="background: rgba(255, 255, 255, 0.08); border: 1.5px solid rgba(255, 255, 255, 0.2); color: #ffffff; font-weight: 600; font-size: 1rem; padding: 13px 28px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
					<span>Get a Sample Tested</span>
				</a>
				<a href="https://wa.me/919409090109" target="_blank" style="color: #4ade80; font-size: 0.95rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px;">
					<span>Chat on WhatsApp</span>
					<span>↗</span>
				</a>
			</div>
		</div>

		<!-- Right Column: Hero Machine Visual Showcase -->
		<div style="flex: 1 1 480px; max-width: 540px; text-align: center; position: relative;">
			<div style="background: radial-gradient(circle, rgba(0, 146, 63, 0.15) 0%, rgba(255,255,255,0.02) 70%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 30px; backdrop-filter: blur(10px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
				<div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); border: 1px solid rgba(0, 146, 63, 0.5); padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; color: #4ade80;">
					FLAGSHIP MODEL · SDM-50
				</div>
				<img src="assets/images/machine-sdm50.png" alt="Greenwave SDM-50 Water Guided Laser" style="max-width: 100%; height: auto; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.7));" />
				<div style="margin-top: 15px; display: flex; justify-content: space-around; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; text-align: left;">
					<div>
						<div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Technology</div>
						<div style="font-size: 0.95rem; font-weight: 700; color: #ffffff;">Water-Guided Laser</div>
					</div>
					<div>
						<div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Parallel Kerf</div>
						<div style="font-size: 0.95rem; font-weight: 700; color: #22c55e;">~40µm</div>
					</div>
					<div>
						<div style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">Origin</div>
						<div style="font-size: 0.95rem; font-weight: 700; color: #ffffff;">Surat, India</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;
  html = html.substring(0, heroStartIdx) + newHero + html.substring(heroEndIdx);
  console.log('Cleaned and replaced hero section!');
}

// 2. Cleanly Replace the Footer (find all content inside <footer>...</footer> or the old footer containers)
const footerTagStart = html.indexOf('<footer');
const footerTagEnd = html.indexOf('</footer>');

if (footerTagStart !== -1 && footerTagEnd !== -1) {
  const newFooter = `
<footer class="elementor elementor-footer" style="background: #060a12; color: #94a3b8; padding: 70px 20px 30px; border-top: 1px solid rgba(255,255,255,0.08);">
	<div style="max-width: 1200px; margin: 0 auto;">
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; margin-bottom: 60px;">
			<!-- Col 1: About & Logo -->
			<div>
				<img src="assets/images/greenwave-logo-wp.png" alt="Greenwave Technologies" style="max-height: 48px; width: auto; margin-bottom: 18px; filter: brightness(0) invert(1);" />
				<p style="font-size: 0.92rem; line-height: 1.6; color: #94a3b8; margin-bottom: 20px;">
					Greenwave Technologies is a leading diamond &amp; industrial laser machine manufacturer in India, delivering cutting-edge precision and water-guided laser solutions.
				</p>
				<div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.8;">
					<div><strong>Location:</strong> Surat, Gujarat, India - 395004</div>
					<div><strong>Email:</strong> <a href="mailto:info@greenwave.org.in" style="color: #22c55e; text-decoration: none;">info@greenwave.org.in</a></div>
					<div><strong>Helpline:</strong> <a href="tel:+919409090109" style="color: #22c55e; text-decoration: none;">+91-94090 90109</a></div>
					<div><strong>Hours:</strong> Mon - Sat: 09:00 AM - 06:00 PM</div>
				</div>
			</div>

			<!-- Col 2: Machines Catalog -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px; font-family: 'Figtree', sans-serif;">Machines &amp; Systems</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 2;">
					<li><a href="#sdm50" style="color: #4ade80; text-decoration: none;">★ SDM-50 Water Guided Laser</a></li>
					<li><a href="#spectrum" style="color: #cbd5e1; text-decoration: none;">Spectrum (16W Side Pumped)</a></li>
					<li><a href="#spectra-pro" style="color: #cbd5e1; text-decoration: none;">Spectra Pro (20W End Pumped)</a></li>
					<li><a href="#scorpion" style="color: #cbd5e1; text-decoration: none;">Scorpion (CVD Slicing)</a></li>
					<li><a href="#machines" style="color: #cbd5e1; text-decoration: none;">Sparkle – Fancy 4P/Facet</a></li>
					<li><a href="#machines" style="color: #cbd5e1; text-decoration: none;">Star Lite Galvo System</a></li>
				</ul>
			</div>

			<!-- Col 3: Services & Job Work -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px; font-family: 'Figtree', sans-serif;">Services &amp; Job Shop</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 2;">
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Diamond Machine AMC Service</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Green Laser Sawing Job Work</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Green Fiber Laser Sawing</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Streamline &amp; 4P Sawing</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Tension Removal Process</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Diamond Scanning Job Work</a></li>
				</ul>
			</div>

			<!-- Col 4: Quick Links & Connect -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin: 0 0 16px; font-family: 'Figtree', sans-serif;">Company</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 2;">
					<li><a href="#about" style="color: #cbd5e1; text-decoration: none;">About Greenwave</a></li>
					<li><a href="#materials" style="color: #cbd5e1; text-decoration: none;">Materials &amp; Industries</a></li>
					<li><a href="#case-studies" style="color: #cbd5e1; text-decoration: none;">Production Case Studies</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Sample Testing</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Dealer Inquiry</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Contact Us</a></li>
				</ul>
			</div>
		</div>

		<!-- Bottom Copyright Bar -->
		<div style="padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; font-size: 0.85rem;">
			<div>
				© 2026 Greenwave Technologies. All rights reserved. The Customer is always and Completely right.
			</div>
			<div style="display: flex; gap: 20px;">
				<a href="#" style="color: #94a3b8; text-decoration: none;">Privacy Policy</a>
				<a href="#" style="color: #94a3b8; text-decoration: none;">Terms &amp; Conditions</a>
				<a href="https://wa.me/919409090109" target="_blank" style="color: #22c55e; text-decoration: none;">WhatsApp Support</a>
			</div>
		</div>
	</div>
</footer>
`;
  html = html.substring(0, footerTagStart) + newFooter + html.substring(footerTagEnd + 9);
  console.log('Cleaned and replaced footer!');
}

fs.writeFileSync(indexPath, html);
console.log('Clean hero and footer finished!');
