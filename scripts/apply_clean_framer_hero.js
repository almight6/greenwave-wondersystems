const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Ensure #content has background: #000000 and padding: 0
html = html.replace(
  /<div id="content" class="site-content"[^>]*>/,
  '<div id="content" class="site-content" style="background: #000000; padding: 0;">'
);

// 2. Find start of hero (#home) and end of hero section (before #materials)
const heroStartIdx = html.indexOf('<div id="home"');
const materialsIdx = html.indexOf('<!-- Section 01: Materials & Industries -->');

if (heroStartIdx === -1 || materialsIdx === -1) {
  console.error('Markers not found!', { heroStartIdx, materialsIdx });
  process.exit(1);
}

const cleanFramerHero = `
<div id="home" class="gw-hero-fullscreen-section">
	<!-- Native HTML5 Video Background Loop (From Framer App) -->
	<div class="gw-hero-video-bg">
		<video 
			autoplay 
			loop 
			muted 
			playsinline 
			poster="assets/images/hero-loop-poster.jpg" 
			class="gw-hero-video-element">
			<source src="assets/images/hero-loop.mp4" type="video/mp4">
			<source src="https://framerusercontent.com/assets/L7mVaWPG3QCXpAPHzzeOfb6zeNs.mp4" type="video/mp4">
		</video>

		<!-- Subtle Left-to-Right Soft Gradient for Text Contrast (No heavy color tint) -->
		<div class="gw-hero-soft-vignette"></div>
	</div>

	<!-- Custom Styles for Framer-Style Clean Video Hero -->
	<style>
		.gw-hero-fullscreen-section {
			position: relative;
			width: 100%;
			min-height: calc(100vh - 80px);
			min-height: 720px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			background: #000000;
			color: #ffffff;
			font-family: 'Inter', sans-serif;
		}
		.gw-hero-video-bg {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			pointer-events: none;
			z-index: 1;
		}
		.gw-hero-video-element {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			display: block;
		}
		.gw-hero-soft-vignette {
			position: absolute;
			inset: 0;
			background: 
				linear-gradient(to right, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.38) 45%, rgba(0, 0, 0, 0) 75%),
				linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 35%);
			pointer-events: none;
		}
		.gw-hero-content-wrap {
			position: relative;
			z-index: 10;
			max-width: 1360px;
			width: 100%;
			margin: 0 auto;
			padding: 90px 30px 60px;
			flex-grow: 1;
			display: flex;
			align-items: center;
		}
		.gw-hero-text-col {
			max-width: 680px;
		}
		.gw-hero-pill-tag {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: rgba(0, 146, 63, 0.25);
			border: 1px solid rgba(0, 200, 83, 0.5);
			padding: 6px 16px;
			border-radius: 9999px;
			font-size: 0.82rem;
			font-weight: 700;
			letter-spacing: 0.6px;
			color: #22c55e;
			margin-bottom: 24px;
			backdrop-filter: blur(8px);
		}
		.gw-hero-pill-dot {
			width: 8px;
			height: 8px;
			background: #22c55e;
			border-radius: 50%;
			box-shadow: 0 0 8px #22c55e;
		}
		.gw-hero-title-clean {
			font-size: clamp(3rem, 5.2vw, 4.8rem);
			font-weight: 800;
			line-height: 1.05;
			color: #ffffff;
			margin: 0 0 24px;
			font-family: 'Figtree', sans-serif;
			letter-spacing: -1px;
			text-shadow: 0 2px 25px rgba(0, 0, 0, 0.6);
		}
		.gw-hero-desc-clean {
			font-size: clamp(1.05rem, 1.3vw, 1.2rem);
			line-height: 1.6;
			color: #e2e8f0;
			margin-bottom: 36px;
			font-weight: 400;
			text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
			max-width: 600px;
		}
		.gw-hero-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			align-items: center;
		}
		.gw-btn-explore {
			background: #00c853;
			color: #ffffff;
			font-weight: 700;
			font-size: 1.02rem;
			padding: 15px 34px;
			border-radius: 8px;
			text-decoration: none;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			box-shadow: 0 10px 25px rgba(0, 200, 83, 0.4);
			transition: all 0.25s ease;
		}
		.gw-btn-explore:hover {
			background: #00e676;
			transform: translateY(-2px);
			color: #ffffff !important;
			box-shadow: 0 14px 30px rgba(0, 200, 83, 0.6);
		}
		.gw-btn-sample {
			background: rgba(255, 255, 255, 0.12);
			backdrop-filter: blur(12px);
			border: 1.5px solid rgba(255, 255, 255, 0.3);
			color: #ffffff;
			font-weight: 600;
			font-size: 1.02rem;
			padding: 14px 28px;
			border-radius: 8px;
			text-decoration: none;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			transition: all 0.25s ease;
		}
		.gw-btn-sample:hover {
			background: rgba(255, 255, 255, 0.22);
			border-color: #ffffff;
			color: #ffffff !important;
			transform: translateY(-2px);
		}
		@media (max-width: 640px) {
			.gw-hero-fullscreen-section {
				min-height: 560px;
			}
			.gw-hero-content-wrap {
				padding: 50px 20px 40px;
			}
			.gw-hero-title-clean {
				font-size: 2.5rem;
			}
			.gw-hero-desc-clean {
				font-size: 1rem;
				margin-bottom: 24px;
			}
			.gw-hero-actions {
				flex-direction: column;
				align-items: stretch;
			}
			.gw-btn-explore, .gw-btn-sample {
				justify-content: center;
				text-align: center;
			}
		}
	</style>

	<div class="gw-hero-content-wrap">
		<div class="gw-hero-text-col">
			<div class="gw-hero-pill-tag">
				<span class="gw-hero-pill-dot"></span>
				<span>NEXT-GEN LASER &amp; WATER-GUIDED TECHNOLOGY</span>
			</div>

			<h1 class="gw-hero-title-clean">
				Your materials.<br/>
				<span>Your way.</span>
			</h1>

			<p class="gw-hero-desc-clean">
				When you need to cut the hardest materials on earth, no one gives you the precision and freedom to do it like <strong style="color: #ffffff;">Greenwave Technologies</strong>. High-yield diamond sawing and micron-accurate water-guided laser systems engineered in Surat for global production.
			</p>

			<div class="gw-hero-actions">
				<a href="#machines" class="gw-btn-explore">
					<span>Explore Machines</span>
					<span>→</span>
				</a>
				<a href="#contact" class="gw-btn-sample">
					<span>Get Sample Tested</span>
				</a>
			</div>
		</div>
	</div>

	<!-- Seamless Metric Strip at Bottom -->
	<div class="elementor-element elementor-element-cbfd1f8 e-flex e-con-boxed e-con e-parent" data-id="cbfd1f8" data-element_type="container" data-e-type="container" style="position: relative; z-index: 10; background: rgba(6, 10, 18, 0.88); backdrop-filter: blur(16px); padding: 32px 20px; border-top: 1px solid rgba(255,255,255,0.08);">
		<div style="max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center;">
			<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
				<div style="font-size: 2.6rem; font-weight: 800; color: #00c853; font-family: 'Figtree', sans-serif; line-height: 1;">1,200+</div>
				<div style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Machines Deployed</div>
			</div>
			<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
				<div style="font-size: 2.6rem; font-weight: 800; color: #ffffff; font-family: 'Figtree', sans-serif; line-height: 1;">32+</div>
				<div style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Countries Served</div>
			</div>
			<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
				<div style="font-size: 2.6rem; font-weight: 800; color: #00c853; font-family: 'Figtree', sans-serif; line-height: 1;">25+ yrs</div>
				<div style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">In Precision Operation</div>
			</div>
			<div>
				<div style="font-size: 2.6rem; font-weight: 800; color: #ffffff; font-family: 'Figtree', sans-serif; line-height: 1;">±5µm</div>
				<div style="font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Micron Cutting Accuracy</div>
			</div>
		</div>
	</div>
</div>
`;

html = html.substring(0, heroStartIdx) + cleanFramerHero + '\n' + html.substring(materialsIdx);

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated index.html with clean framer live video hero!');
