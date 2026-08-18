const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Find the header area
const headerStart = html.indexOf('<header  data-elementor-type="header"');
const headerEnd = html.indexOf('</header>', headerStart) + 9;

console.log('Header start:', headerStart, 'Header end:', headerEnd);

const cleanHeaderHtml = `
<header data-elementor-type="header" class="elementor elementor-15 elementor-location-header" style="position: sticky; top: 0; z-index: 9999; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.06); font-family: 'Inter', sans-serif;">
	
	<!-- Top Information Bar -->
	<div style="background: #0f172a; color: #94a3b8; font-size: 0.82rem; padding: 7px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);">
		<div style="max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
			<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
				<a href="mailto:info@greenwave.org.in" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s;">
					<span>✉️</span>
					<span>info@greenwave.org.in</span>
				</a>
				<a href="tel:+919409090109" style="color: #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s;">
					<span>📞</span>
					<span>+91-94090 90109</span>
				</a>
				<span style="color: #64748b;">📍 Surat, Gujarat, India</span>
			</div>
			<div style="display: flex; align-items: center; gap: 16px;">
				<span style="color: #22c55e; font-weight: 600; font-size: 0.8rem;">★ Diamond &amp; Laser Machine Manufacturer</span>
				<a href="https://wa.me/919409090109" target="_blank" style="color: #4ade80; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
					<span>WhatsApp Chat ↗</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar (Clean Crisp White) -->
	<div style="background: #ffffff; padding: 0 20px; border-bottom: 1px solid #e2e8f0;">
		<div style="max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 80px; gap: 20px;">
			
			<!-- Brand Logo -->
			<div style="flex-shrink: 0;">
				<a href="#home" style="display: flex; align-items: center; text-decoration: none;">
					<img src="assets/images/greenwave-logo-wp.png" alt="Greenwave Technologies" style="height: 48px; width: auto; object-fit: contain;" />
				</a>
			</div>

			<!-- Main Nav Links Desktop -->
			<nav class="gw-desktop-nav" style="display: flex; align-items: center; gap: 6px; flex-wrap: nowrap;">
				<style>
					.gw-nav-link {
						color: #0f172a;
						font-weight: 600;
						font-size: 0.93rem;
						text-decoration: none;
						padding: 10px 14px;
						border-radius: 6px;
						transition: all 0.2s ease;
						display: inline-flex;
						align-items: center;
						gap: 4px;
						position: relative;
					}
					.gw-nav-link:hover, .gw-nav-link.active {
						color: #00923f !important;
						background-color: rgba(0, 146, 63, 0.06);
					}
					.gw-dropdown {
						position: relative;
						display: inline-block;
					}
					.gw-dropdown-menu {
						display: none;
						position: absolute;
						top: 100%;
						left: 0;
						min-width: 250px;
						background: #ffffff;
						border: 1px solid #e2e8f0;
						border-radius: 10px;
						box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
						padding: 8px 0;
						z-index: 1000;
					}
					.gw-dropdown:hover .gw-dropdown-menu {
						display: block;
					}
					.gw-dropdown-item {
						display: block;
						padding: 10px 18px;
						color: #334155;
						font-size: 0.88rem;
						font-weight: 600;
						text-decoration: none;
						transition: all 0.15s ease;
					}
					.gw-dropdown-item:hover {
						background: rgba(0, 146, 63, 0.08);
						color: #00923f !important;
						padding-left: 22px;
					}
					@media (max-width: 1024px) {
						.gw-desktop-nav { display: none !important; }
						.gw-mobile-toggle { display: block !important; }
					}
					@media (min-width: 1025px) {
						.gw-mobile-toggle { display: none !important; }
					}
				</style>

				<a href="#home" class="gw-nav-link active">Home</a>
				
				<!-- Machines Dropdown -->
				<div class="gw-dropdown">
					<a href="#machines" class="gw-nav-link">
						<span>Machines</span>
						<span style="font-size: 0.7rem;">▼</span>
					</a>
					<div class="gw-dropdown-menu">
						<a href="#sdm50" class="gw-dropdown-item" style="color: #00923f; font-weight: 700;">★ SDM-50 Water-Guided Laser</a>
						<a href="#spectrum" class="gw-dropdown-item">Spectrum (16W Side Pumped)</a>
						<a href="#spectra-pro" class="gw-dropdown-item">Spectra Pro (20W End Pumped)</a>
						<a href="#scorpion" class="gw-dropdown-item">Scorpion (CVD Slicing &amp; Coring)</a>
						<a href="#machines" class="gw-dropdown-item">Sparkle (Fancy 4P/Facet)</a>
						<a href="#machines" class="gw-dropdown-item">Star Lite (Galvo System)</a>
					</div>
				</div>

				<a href="#materials" class="gw-nav-link">Materials</a>
				<a href="#case-studies" class="gw-nav-link">Case Studies</a>

				<!-- Services Dropdown -->
				<div class="gw-dropdown">
					<a href="#services" class="gw-nav-link">
						<span>Services</span>
						<span style="font-size: 0.7rem;">▼</span>
					</a>
					<div class="gw-dropdown-menu">
						<a href="#services" class="gw-dropdown-item">Laser Machine AMC &amp; Maintenance</a>
						<a href="#services" class="gw-dropdown-item">Green Laser Sawing Job Work</a>
						<a href="#services" class="gw-dropdown-item">Green Fiber Laser Sawing</a>
						<a href="#services" class="gw-dropdown-item">Streamline &amp; 4P Sawing</a>
						<a href="#services" class="gw-dropdown-item">Diamond Scanning Job Work</a>
					</div>
				</div>

				<a href="#about" class="gw-nav-link">About</a>
				<a href="#contact" class="gw-nav-link">Contact</a>
			</nav>

			<!-- Right CTA & Mobile Toggle -->
			<div style="display: flex; align-items: center; gap: 12px;">
				<a href="#contact" style="background: linear-gradient(135deg, #00923f 0%, #00c853 100%); color: #ffffff; font-weight: 700; font-size: 0.92rem; padding: 11px 24px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 15px rgba(0, 146, 63, 0.25); transition: all 0.2s ease;">
					<span>Request Quote</span>
					<span>→</span>
				</a>
			</div>
		</div>
	</div>
</header>
`;

html = html.substring(0, headerStart) + cleanHeaderHtml + html.substring(headerEnd);

// Also add a clean margin-top and padding to the hero section so it separates cleanly from the header
html = html.replace(
  'id="home" class="elementor-element elementor-element-89caf2a e-con-full e-flex e-con e-parent" data-id="89caf2a" data-element_type="container" data-e-type="container" style="background: linear-gradient(135deg, #090e17 0%, #111a2e 50%, #060a12 100%); padding: 90px 20px 70px;',
  'id="home" class="elementor-element elementor-element-89caf2a e-con-full e-flex e-con e-parent" data-id="89caf2a" data-element_type="container" data-e-type="container" style="background: linear-gradient(135deg, #090e17 0%, #111a2e 50%, #060a12 100%); margin-top: 16px; margin-bottom: 24px; border-radius: 16px; max-width: 1280px; margin-left: auto; margin-right: auto; padding: 80px 40px 70px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);'
);

fs.writeFileSync(indexPath, html);
console.log('Rebuilt clean white header and enhanced spacing with Hero section!');
