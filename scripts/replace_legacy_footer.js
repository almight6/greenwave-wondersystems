const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const footStart = html.indexOf('<div class="elementor-element elementor-element-23c9846');
const pageEnd = html.indexOf('</div><!-- #page -->');

if (footStart !== -1 && pageEnd !== -1) {
  const newFooter = `
<footer class="elementor-element elementor-element-23c9846" style="background: #060a12; color: #94a3b8; padding: 80px 20px 30px; border-top: 1px solid rgba(255,255,255,0.08); font-family: 'Inter', sans-serif;">
	<div style="max-width: 1200px; margin: 0 auto;">
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; margin-bottom: 60px;">
			<!-- Col 1: About & Logo -->
			<div>
				<img src="assets/images/greenwave-logo-wp.png" alt="Greenwave Technologies" style="max-height: 48px; width: auto; margin-bottom: 20px; filter: brightness(0) invert(1);" />
				<p style="font-size: 0.92rem; line-height: 1.65; color: #94a3b8; margin-bottom: 24px;">
					Greenwave Technologies is a premier manufacturer of advanced diamond cutting machines, SDM-50 water-guided laser systems, and high-precision material processing technologies in India.
				</p>
				<div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.8;">
					<div style="margin-bottom: 4px;">📍 <strong>Location:</strong> Surat, Gujarat, India - 395004</div>
					<div style="margin-bottom: 4px;">✉️ <strong>Email:</strong> <a href="mailto:info@greenwave.org.in" style="color: #22c55e; text-decoration: none;">info@greenwave.org.in</a></div>
					<div style="margin-bottom: 4px;">📞 <strong>Helpline:</strong> <a href="tel:+919409090109" style="color: #22c55e; text-decoration: none;">+91-94090 90109</a></div>
					<div>🕒 <strong>Hours:</strong> Mon - Sat: 09:00 AM - 06:00 PM</div>
				</div>
			</div>

			<!-- Col 2: Machines Catalog -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 20px; font-family: 'Figtree', sans-serif; border-left: 3px solid #00923f; padding-left: 10px;">Machines &amp; Systems</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.92rem; line-height: 2.1;">
					<li><a href="#sdm50" style="color: #4ade80; font-weight: 700; text-decoration: none;">★ SDM-50 Water-Guided Laser</a></li>
					<li><a href="#spectrum" style="color: #cbd5e1; text-decoration: none;">Spectrum (16W Side Pumped)</a></li>
					<li><a href="#spectra-pro" style="color: #cbd5e1; text-decoration: none;">Spectra Pro (20W End Pumped)</a></li>
					<li><a href="#scorpion" style="color: #cbd5e1; text-decoration: none;">Scorpion (CVD Slicing &amp; Coring)</a></li>
					<li><a href="#machines" style="color: #cbd5e1; text-decoration: none;">Sparkle – Fancy 4P/Facet</a></li>
					<li><a href="#machines" style="color: #cbd5e1; text-decoration: none;">Star Lite Galvo System</a></li>
				</ul>
			</div>

			<!-- Col 3: Services & Job Work -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 20px; font-family: 'Figtree', sans-serif; border-left: 3px solid #00923f; padding-left: 10px;">Services &amp; Job Shop</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.92rem; line-height: 2.1;">
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Diamond Machine AMC Services</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Green Laser Sawing Job Work</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Green Fiber Laser Sawing</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Streamline &amp; 4P Sawing</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Tension Removal Process</a></li>
					<li><a href="#services" style="color: #cbd5e1; text-decoration: none;">Diamond Scanning Job Work</a></li>
				</ul>
			</div>

			<!-- Col 4: Quick Links & Connect -->
			<div>
				<h4 style="color: #ffffff; font-size: 1.15rem; font-weight: 700; margin: 0 0 20px; font-family: 'Figtree', sans-serif; border-left: 3px solid #00923f; padding-left: 10px;">Company</h4>
				<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.92rem; line-height: 2.1;">
					<li><a href="#about" style="color: #cbd5e1; text-decoration: none;">About Greenwave</a></li>
					<li><a href="#materials" style="color: #cbd5e1; text-decoration: none;">Materials &amp; Industries</a></li>
					<li><a href="#case-studies" style="color: #cbd5e1; text-decoration: none;">Production Case Studies</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Get Sample Tested</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Dealer &amp; Distributor Inquiry</a></li>
					<li><a href="#contact" style="color: #cbd5e1; text-decoration: none;">Contact Us</a></li>
				</ul>
			</div>
		</div>

		<!-- Bottom Copyright Bar -->
		<div style="padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; font-size: 0.85rem;">
			<div>
				© 2026 Greenwave Technologies. All rights reserved. <span style="color: #64748b;">The Customer is always and Completely right.</span>
			</div>
			<div style="display: flex; gap: 20px;">
				<a href="#" style="color: #94a3b8; text-decoration: none;">Privacy Policy</a>
				<a href="#" style="color: #94a3b8; text-decoration: none;">Terms &amp; Conditions</a>
				<a href="https://wa.me/919409090109" target="_blank" style="color: #22c55e; font-weight: 600; text-decoration: none;">WhatsApp Support</a>
			</div>
		</div>
	</div>
</footer>
`;
  html = html.substring(0, footStart) + newFooter + '\n' + html.substring(pageEnd);
  console.log('Successfully replaced legacy footer!');
  fs.writeFileSync(indexPath, html);
} else {
  console.error('Could not find boundaries for footer:', footStart, pageEnd);
}
