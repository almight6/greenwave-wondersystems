const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Find the hero section container
const heroStartIdx = html.indexOf('<div id="home"');
const heroEndIdx = html.indexOf('<div class="elementor-element elementor-element-cbfd1f8');

console.log('Hero start:', heroStartIdx, 'Hero end:', heroEndIdx);

const newHeroWithVideo = `
<div id="home" class="elementor-element elementor-element-89caf2a e-con-full e-flex e-con e-parent" data-id="89caf2a" data-element_type="container" data-e-type="container" style="background: linear-gradient(145deg, #070b13 0%, #0d1527 50%, #05080e 100%); margin: 20px auto 35px; border-radius: 24px; max-width: 1320px; padding: 70px 40px 60px; color: #ffffff; position: relative; overflow: hidden; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6), 0 0 1px 1px rgba(255,255,255,0.08); font-family: 'Inter', sans-serif;">
	
	<!-- Ambient Glow Highlights -->
	<div style="position: absolute; top: -150px; right: -150px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(0, 146, 63, 0.28) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>
	<div style="position: absolute; bottom: -120px; left: -120px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

	<div style="max-width: 1240px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.05fr 1.15fr; align-items: center; gap: 50px; position: relative; z-index: 2;">
		
		<!-- Left Column: Copy, Highlights & CTAs -->
		<div>
			<div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 146, 63, 0.18); border: 1px solid rgba(0, 146, 63, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.5px; color: #22c55e; margin-bottom: 24px;">
				<span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></span>
				NEXT-GEN LASER &amp; WATER-GUIDED TECHNOLOGY
			</div>
			
			<h1 style="font-size: clamp(2.4rem, 4.2vw, 3.8rem); font-weight: 800; line-height: 1.12; color: #ffffff; margin: 0 0 20px; font-family: 'Figtree', sans-serif;">
				Your materials.<br/>
				<span style="color: #00c853; text-shadow: 0 0 35px rgba(0, 200, 83, 0.4);">Your way.</span>
			</h1>

			<p style="font-size: 1.12rem; line-height: 1.65; color: #cbd5e1; margin-bottom: 30px; font-weight: 400;">
				When you need to cut the hardest materials on earth, no one gives you the precision and freedom to do it like <strong style="color: #ffffff;">Greenwave Technologies</strong>. High-yield diamond sawing and micron-accurate water-guided laser systems engineered in Surat for global production.
			</p>

			<!-- 3 Tech Specs Highlights -->
			<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 36px;">
				<div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 0.88rem;">
					<span style="color: #00c853; font-weight: 800;">✓</span>
					<span><strong>±5µm</strong> Precision</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 0.88rem;">
					<span style="color: #00c853; font-weight: 800;">✓</span>
					<span><strong>Zero</strong> Thermal Distortion</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 0.88rem;">
					<span style="color: #00c853; font-weight: 800;">✓</span>
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
					<span>Get Sample Tested</span>
				</a>
				<a href="https://wa.me/919409090109" target="_blank" style="color: #4ade80; font-size: 0.95rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px;">
					<span>WhatsApp</span>
					<span>↗</span>
				</a>
			</div>
		</div>

		<!-- Right Column: Hero Video Showcase & Interactive Switcher -->
		<div>
			<div style="background: #0b111e; border: 1px solid rgba(0, 146, 63, 0.35); border-radius: 18px; padding: 12px; box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 146, 63, 0.15); position: relative;">
				
				<!-- Top Status Bar of Video Card -->
				<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px 12px;">
					<div style="display: flex; align-items: center; gap: 8px;">
						<span style="display: inline-block; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 8px #ef4444; animation: gwPulse 1.5s infinite;"></span>
						<span style="font-size: 0.78rem; font-weight: 700; color: #f87171; letter-spacing: 0.5px; text-transform: uppercase;">LIVE DEMO · LASER PROCESSING</span>
					</div>
					<div style="font-size: 0.75rem; font-weight: 700; color: #4ade80; background: rgba(0, 146, 63, 0.2); border: 1px solid rgba(0, 146, 63, 0.4); padding: 3px 8px; border-radius: 4px;">
						HD 1080P
					</div>
				</div>

				<style>
					@keyframes gwPulse {
						0% { opacity: 1; transform: scale(1); }
						50% { opacity: 0.4; transform: scale(1.2); }
						100% { opacity: 1; transform: scale(1); }
					}
					.gw-video-tab-btn {
						background: rgba(255,255,255,0.06);
						border: 1px solid rgba(255,255,255,0.12);
						color: #94a3b8;
						font-size: 0.78rem;
						font-weight: 600;
						padding: 7px 12px;
						border-radius: 6px;
						cursor: pointer;
						transition: all 0.2s ease;
					}
					.gw-video-tab-btn:hover, .gw-video-tab-btn.active {
						background: rgba(0, 146, 63, 0.2);
						border-color: #00c853;
						color: #ffffff;
					}
					@media (max-width: 960px) {
						.elementor-element-89caf2a > div {
							grid-template-columns: 1fr !important;
						}
					}
				</style>

				<!-- Video Player Embed Container (16:9 Aspect Ratio) -->
				<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000000; border: 1px solid rgba(255,255,255,0.1);">
					<iframe 
						id="gw-hero-video-frame"
						src="https://www.youtube.com/embed/LNvLWUsKodc?autoplay=1&mute=1&loop=1&playlist=LNvLWUsKodc&controls=1&rel=0&modestbranding=1" 
						title="Greenwave Technologies Laser Machine Production" 
						style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
						allowfullscreen>
					</iframe>
				</div>

				<!-- Video Switcher Bar (Interactive Demos) -->
				<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; padding: 4px;">
					<button type="button" class="gw-video-tab-btn active" onclick="switchHeroVideo('LNvLWUsKodc', this)">
						🎬 Production Facility
					</button>
					<button type="button" class="gw-video-tab-btn" onclick="switchHeroVideo('GQgQXJs_BhY', this)">
						💎 Spectra Pro Sawing
					</button>
					<button type="button" class="gw-video-tab-btn" onclick="switchHeroVideo('Fb1lAQVOcfA', this)">
						⚡ Scorpion CVD Slicing
					</button>
					<button type="button" class="gw-video-tab-btn" onclick="switchHeroVideo('MSdX62pUI3Q', this)">
						🔬 Spectrum Green Laser
					</button>
				</div>
			</div>
		</div>

	</div>
</div>

<script>
function switchHeroVideo(videoId, btn) {
	const iframe = document.getElementById('gw-hero-video-frame');
	if (iframe) {
		iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1';
	}
	const btns = document.querySelectorAll('.gw-video-tab-btn');
	btns.forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
}
</script>
`;

html = html.substring(0, heroStartIdx) + newHeroWithVideo + html.substring(heroEndIdx);

fs.writeFileSync(indexPath, html);
console.log('Hero section replaced with high-tech Video Hero and interactive switcher!');
