const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

console.log('Original size:', html.length);

// 1. Hero Section (data-id="89caf2a")
const heroSectionRegex = /<div class="elementor-element elementor-element-89caf2a[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*(?=<div class="elementor-element elementor-element-cbfd1f8)/i;

const newHeroSection = `
<div id="home" class="elementor-element elementor-element-89caf2a e-con-full e-flex e-con e-parent" data-id="89caf2a" data-element_type="container" data-e-type="container" style="background: linear-gradient(135deg, #090e17 0%, #111a2e 50%, #060a12 100%); padding: 80px 20px 60px; color: #ffffff; position: relative; overflow: hidden;">
	<!-- Subtle ambient glow background -->
	<div style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0, 146, 63, 0.22) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>
	<div style="position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

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

html = html.replace(heroSectionRegex, newHeroSection);
console.log('Replaced Hero section');

// 2. Stats & Materials Section (data-id="cbfd1f8" & data-id="4c0e682")
const statsMaterialsRegex = /<div class="elementor-element elementor-element-cbfd1f8[\s\S]*?(?=<div class="elementor-element elementor-element-856c69b)/i;

const newStatsMaterialsSection = `
<!-- Impact Metrics Counter Bar -->
<div class="elementor-element elementor-element-cbfd1f8 e-flex e-con-boxed e-con e-parent" data-id="cbfd1f8" data-element_type="container" data-e-type="container" style="background: #0f172a; padding: 45px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; text-align: center;">
		<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
			<div style="font-size: 2.8rem; font-weight: 800; color: #00c853; font-family: 'Figtree', sans-serif; line-height: 1;">1,200+</div>
			<div style="font-size: 0.9rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Machines Deployed</div>
		</div>
		<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
			<div style="font-size: 2.8rem; font-weight: 800; color: #ffffff; font-family: 'Figtree', sans-serif; line-height: 1;">32+</div>
			<div style="font-size: 0.9rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Countries Served</div>
		</div>
		<div style="border-right: 1px solid rgba(255,255,255,0.1); padding-right: 15px;">
			<div style="font-size: 2.8rem; font-weight: 800; color: #00c853; font-family: 'Figtree', sans-serif; line-height: 1;">25+ yrs</div>
			<div style="font-size: 0.9rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">In Precision Operation</div>
		</div>
		<div>
			<div style="font-size: 2.8rem; font-weight: 800; color: #ffffff; font-family: 'Figtree', sans-serif; line-height: 1;">±5µm</div>
			<div style="font-size: 0.9rem; font-weight: 700; letter-spacing: 1px; color: #94a3b8; text-transform: uppercase; margin-top: 8px;">Micron Cutting Accuracy</div>
		</div>
	</div>
</div>

<!-- Section 01: Materials & Industries -->
<div id="materials" class="elementor-element elementor-element-4c0e682 e-flex e-con-boxed e-con e-parent" data-id="4c0e682" data-element_type="container" data-e-type="container" style="background: #ffffff; padding: 90px 20px 80px;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div style="text-align: center; max-width: 760px; margin: 0 auto 60px;">
			<div style="color: #00923f; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">/ 01 MATERIALS &amp; INDUSTRIES</div>
			<h2 style="font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 800; color: #0f172a; line-height: 1.2; font-family: 'Figtree', sans-serif;">
				Beyond diamond.<br/>Into every hard material.
			</h2>
			<p style="font-size: 1.1rem; color: #64748b; margin-top: 16px;">
				Our specialized laser systems process ultra-hard, fragile, and sensitive materials where conventional mechanical sawing and traditional tooling fail.
			</p>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
			<!-- Card 1: Diamond -->
			<div class="gw-hover-card" style="padding: 32px 28px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
				<div>
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<span style="font-size: 0.9rem; font-weight: 800; color: #00923f;">01</span>
						<img src="assets/images/icon-diamond.svg" alt="Diamond icon" style="width: 38px; height: 38px;" />
					</div>
					<h3 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Diamond</h3>
					<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
						Natural, CVD, PCD, and SCD processing for gem and industrial applications with exceptional yield recovery.
					</p>
				</div>
				<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.82rem; font-weight: 600; color: #00923f;">
					Natural · Lab-Grown CVD · PCD · SCD
				</div>
			</div>

			<!-- Card 2: Tool Manufacturing -->
			<div class="gw-hover-card" style="padding: 32px 28px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
				<div>
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<span style="font-size: 0.9rem; font-weight: 800; color: #00923f;">02</span>
						<img src="assets/images/icon-tools.svg" alt="Tools icon" style="width: 38px; height: 38px;" />
					</div>
					<h3 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Tool Manufacturing</h3>
					<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
						SCD, PCD, carbides, and precision cutting tools application with fine parallel kerf precision and clean cutting edges.
					</p>
				</div>
				<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.82rem; font-weight: 600; color: #00923f;">
					Tungsten Carbide · Inserts · Micro-tools
				</div>
			</div>

			<!-- Card 3: Advanced Materials -->
			<div class="gw-hover-card" style="padding: 32px 28px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
				<div>
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<span style="font-size: 0.9rem; font-weight: 800; color: #00923f;">03</span>
						<img src="assets/images/icon-materials.svg" alt="Materials icon" style="width: 38px; height: 38px;" />
					</div>
					<h3 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Advanced Materials</h3>
					<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
						Technical ceramics, composites, superalloys, and refractory metals cut with zero thermal damage.
					</p>
				</div>
				<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.82rem; font-weight: 600; color: #00923f;">
					Ceramics · Composites · Specialized Alloys
				</div>
			</div>

			<!-- Card 4: Emerging Sectors -->
			<div class="gw-hover-card" style="padding: 32px 28px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
				<div>
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<span style="font-size: 0.9rem; font-weight: 800; color: #00923f;">04</span>
						<img src="assets/images/icon-sectors.svg" alt="Sectors icon" style="width: 38px; height: 38px;" />
					</div>
					<h3 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Emerging Sectors</h3>
					<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
						High-specification cutting for semiconductor substrates, medical devices, precision watchmaking, and aerospace.
					</p>
				</div>
				<div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.82rem; font-weight: 600; color: #00923f;">
					Semiconductor · Medical · Aerospace · Horology
				</div>
			</div>
		</div>
	</div>
</div>
`;

html = html.replace(statsMaterialsRegex, newStatsMaterialsSection);
console.log('Replaced Stats and Materials section');

// 3. Flagship SDM-50 Water-Guided Laser Spotlight (data-id="856c69b")
const flagshipRegex = /<div class="elementor-element elementor-element-856c69b[\s\S]*?(?=<div class="elementor-element elementor-element-6e6a14c)/i;

const newFlagshipSection = `
<!-- Flagship Machine Spotlight: SDM-50 -->
<div id="sdm50" class="elementor-element elementor-element-856c69b e-flex e-con-boxed e-con e-parent" data-id="856c69b" data-element_type="container" data-e-type="container" style="background: #0b0f19; padding: 100px 20px; color: #ffffff; position: relative;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 50px;">
		
		<!-- Left: Machine Visual Showcase -->
		<div style="flex: 1 1 500px; max-width: 560px; text-align: center;">
			<div style="background: radial-gradient(circle, rgba(0, 146, 63, 0.2) 0%, rgba(255,255,255,0.02) 75%); border: 1px solid rgba(0, 146, 63, 0.3); border-radius: 20px; padding: 40px 30px; position: relative;">
				<div style="display: inline-block; background: #00923f; color: #ffffff; font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 4px; position: absolute; top: 20px; left: 20px;">
					PROPRIETARY SYSTEM
				</div>
				<img src="assets/images/machine-sdm50.png" alt="SDM-50 Water Guided Laser" style="max-width: 100%; height: auto; object-fit: contain; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.8));" />
			</div>
		</div>

		<!-- Right: Flagship Copy and Specifications -->
		<div style="flex: 1 1 520px; max-width: 580px;">
			<div style="color: #00c853; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">
				/ 02 OUR FLAGSHIP TECHNOLOGY
			</div>
			
			<h2 style="font-size: clamp(2.2rem, 3.5vw, 3rem); font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 10px; font-family: 'Figtree', sans-serif;">
				SDM-50
			</h2>
			<div style="font-size: 1.4rem; font-weight: 600; color: #22c55e; margin-bottom: 20px;">
				Water-Guided Laser System (WGL)
			</div>

			<p style="font-size: 1.08rem; line-height: 1.7; color: #94a3b8; margin-bottom: 28px;">
				A laminar water jet acts as an optical waveguide for the laser beam via total internal reflection, delivering micron-level precision with <strong style="color:#ffffff;">zero thermal distortion</strong>. The only system of its kind, engineered in Surat.
			</p>

			<!-- 4-Grid Specs Box -->
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 30px;">
				<div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid #00c853; padding: 14px 18px; border-radius: 0 8px 8px 0; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">
					<div style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">ACCURACY</div>
					<div style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-top: 4px;">±5µm</div>
				</div>
				<div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid #00c853; padding: 14px 18px; border-radius: 0 8px 8px 0; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">
					<div style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">KERF</div>
					<div style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-top: 4px;">~40µm parallel</div>
				</div>
				<div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid #00c853; padding: 14px 18px; border-radius: 0 8px 8px 0; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">
					<div style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">TOLERANCE</div>
					<div style="font-size: 1.35rem; font-weight: 800; color: #ffffff; margin-top: 4px;">±10µm</div>
				</div>
				<div style="background: rgba(255, 255, 255, 0.04); border-left: 3px solid #00c853; padding: 14px 18px; border-radius: 0 8px 8px 0; border: 1px solid rgba(255,255,255,0.06); border-left-width: 3px;">
					<div style="font-size: 0.75rem; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">THERMAL</div>
					<div style="font-size: 1.35rem; font-weight: 800; color: #22c55e; margin-top: 4px;">Zero distortion</div>
				</div>
			</div>

			<div style="font-size: 0.85rem; color: #64748b; margin-bottom: 30px;">
				<strong style="color: #cbd5e1;">Compatible Materials:</strong> Natural diamond · CVD · PCD · SCD · Carbides · Ceramics · Metals · Alloys · Composites
			</div>

			<div style="display: flex; flex-wrap: wrap; gap: 16px;">
				<a href="#contact" style="background: #00923f; color: #ffffff; font-weight: 700; font-size: 0.95rem; padding: 12px 28px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
					<span>Request SDM-50 Demo</span>
					<span>→</span>
				</a>
				<a href="https://wa.me/919409090109" target="_blank" style="background: transparent; border: 1.5px solid #00c853; color: #00c853; font-weight: 700; font-size: 0.95rem; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
					<span>Direct WhatsApp Inquiry</span>
				</a>
			</div>
		</div>
	</div>
</div>
`;

html = html.replace(flagshipRegex, newFlagshipSection);
console.log('Replaced Flagship SDM-50 section');

// 4. Core Laser Machine Lineup (data-id="6e6a14c")
const machinesRegex = /<div class="elementor-element elementor-element-6e6a14c[\s\S]*?(?=<div class="elementor-element elementor-element-3d01a82)/i;

const newMachinesSection = `
<!-- Machine Series Lineup -->
<div id="machines" class="elementor-element elementor-element-6e6a14c e-flex e-con-boxed e-con e-parent" data-id="6e6a14c" data-element_type="container" data-e-type="container" style="background: #ffffff; padding: 100px 20px 90px;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div style="text-align: center; max-width: 720px; margin: 0 auto 60px;">
			<div style="color: #00923f; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">/ 03 OUR MACHINES</div>
			<h2 style="font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 800; color: #0f172a; line-height: 1.2; font-family: 'Figtree', sans-serif;">
				Four laser systems. One mission: precision.
			</h2>
			<p style="font-size: 1.1rem; color: #64748b; margin-top: 14px;">
				Engineered for continuous industrial throughput, minimal kerf loss, and high yield across rough diamonds, lab-grown CVDs, and advanced hard materials.
			</p>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
			<!-- Machine 1: Spectrum -->
			<div id="spectrum" class="gw-hover-card" style="border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff; display: flex; flex-direction: column;">
				<div style="background: #f8fafc; padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0; position: relative;">
					<span style="position: absolute; top: 16px; left: 16px; font-size: 0.75rem; font-weight: 700; color: #00923f; background: rgba(0, 146, 63, 0.1); padding: 4px 10px; border-radius: 4px;">
						SIDE PUMPED
					</span>
					<img src="assets/images/machine-spectrum.png" alt="Spectrum Laser Machine" style="height: 190px; width: auto; object-fit: contain;" />
				</div>
				<div style="padding: 28px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
					<div>
						<div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Side Pumped Green Nanosecond Laser</div>
						<h3 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0 0 10px;">SPECTRUM</h3>
						<div style="display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 700; font-size: 0.85rem; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px;">
							16W · 0.6mm beam
						</div>
						<p style="font-size: 0.98rem; line-height: 1.6; color: #64748b; margin: 0;">
							Precision green-laser cutting and sawing for rough &amp; polished diamonds and hard materials with consistent beam profile.
						</p>
					</div>
					<div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9;">
						<a href="#contact" style="color: #00923f; font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
							<span>Request Machine Specs</span>
							<span>→</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Machine 2: Spectra Pro -->
			<div id="spectra-pro" class="gw-hover-card" style="border: 2px solid #00923f; border-radius: 16px; overflow: hidden; background: #ffffff; display: flex; flex-direction: column; position: relative;">
				<div style="background: linear-gradient(135deg, #00923f 0%, #00c853 100%); color: #ffffff; text-align: center; font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; padding: 6px; text-transform: uppercase;">
					⚡ 70% LESS ELECTRICITY · HIGHEST EFFICIENCY
				</div>
				<div style="background: #f8fafc; padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0; position: relative;">
					<span style="position: absolute; top: 16px; left: 16px; font-size: 0.75rem; font-weight: 700; color: #00923f; background: rgba(0, 146, 63, 0.1); padding: 4px 10px; border-radius: 4px;">
						END PUMPED
					</span>
					<img src="assets/images/machine-spectra-pro.png" alt="Spectra Pro Laser Machine" style="height: 190px; width: auto; object-fit: contain;" />
				</div>
				<div style="padding: 28px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
					<div>
						<div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">End Pumped Green Nanosecond Laser</div>
						<h3 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0 0 10px;">SPECTRA PRO</h3>
						<div style="display: inline-block; background: rgba(0, 146, 63, 0.1); color: #00923f; font-weight: 700; font-size: 0.85rem; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px;">
							20W · 0.4mm finest beam
						</div>
						<p style="font-size: 0.98rem; line-height: 1.6; color: #64748b; margin: 0;">
							Finest beam diameter in the entire range for production-grade cutting with massive energy savings and reduced operational costs.
						</p>
					</div>
					<div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9;">
						<a href="#contact" style="color: #00923f; font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
							<span>Request Machine Specs</span>
							<span>→</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Machine 3: Scorpion -->
			<div id="scorpion" class="gw-hover-card" style="border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff; display: flex; flex-direction: column;">
				<div style="background: #f8fafc; padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0; position: relative;">
					<span style="position: absolute; top: 16px; left: 16px; font-size: 0.75rem; font-weight: 700; color: #00923f; background: rgba(0, 146, 63, 0.1); padding: 4px 10px; border-radius: 4px;">
						CVD DIAMOND SPECIALIST
					</span>
					<img src="assets/images/machine-scorpion.png" alt="Scorpion Laser Machine" style="height: 190px; width: auto; object-fit: contain;" />
				</div>
				<div style="padding: 28px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
					<div>
						<div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Side Pumped Green Nanosecond Laser</div>
						<h3 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0 0 10px;">SCORPION</h3>
						<div style="display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 700; font-size: 0.85rem; padding: 4px 10px; border-radius: 6px; margin-bottom: 16px;">
							16W · 1.0mm beam
						</div>
						<p style="font-size: 0.98rem; line-height: 1.6; color: #64748b; margin: 0;">
							Engineered specifically for heavy CVD Diamond slicing, coring, multi-angle shaping, and face cutting with deep penetration.
						</p>
					</div>
					<div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9;">
						<a href="#contact" style="color: #00923f; font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
							<span>Request Machine Specs</span>
							<span>→</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

html = html.replace(machinesRegex, newMachinesSection);
console.log('Replaced Machines section');

// 5. Case Studies Section (data-id="3d01a82")
const caseStudiesRegex = /<div class="elementor-element elementor-element-3d01a82[\s\S]*?(?=<div class="elementor-element elementor-element-5157b80)/i;

const newCaseStudiesSection = `
<!-- Production Case Studies -->
<div id="case-studies" class="elementor-element elementor-element-3d01a82 e-flex e-con-boxed e-con e-parent" data-id="3d01a82" data-element_type="container" data-e-type="container" style="background: #f8fafc; padding: 90px 20px 80px; border-top: 1px solid #e2e8f0;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; gap: 20px;">
			<div>
				<div style="color: #00923f; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">/ 04 CASE STUDIES</div>
				<h2 style="font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 800; color: #0f172a; line-height: 1.2; margin: 0; font-family: 'Figtree', sans-serif;">
					Proof in production.
				</h2>
			</div>
			<div style="font-size: 1.05rem; color: #64748b; max-width: 480px;">
				Measurable precision results delivered in active manufacturing facilities across diamond, tooling, and electronics sectors.
			</div>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;">
			<!-- Case 1: SCD Hole -->
			<div class="gw-hover-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
				<img src="assets/images/case-scd-hole.jpeg" alt="Single Crystal Diamond Micro Hole" style="width: 100%; height: 220px; object-fit: cover;" />
				<div style="padding: 24px;">
					<div style="font-size: 1.6rem; font-weight: 800; color: #00923f; font-family: 'Figtree', sans-serif;">~10µm</div>
					<div style="font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">HOLE DIAMETER TOLERANCE</div>
					<div style="font-size: 0.85rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">DIAMOND · SCD</div>
					<p style="font-size: 0.92rem; color: #64748b; line-height: 1.5; margin: 0 0 16px;">
						Micron-accurate micro through-holes drilled in single crystal diamond plates with pristine edge quality and zero micro-cracking.
					</p>
					<div style="display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 600; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px;">
						System: SDM-50 Water-Guided Laser
					</div>
				</div>
			</div>

			<!-- Case 2: CVD Taperless -->
			<div class="gw-hover-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
				<img src="assets/images/case-cvd-taperless.jpeg" alt="CVD Diamond Taperless Profile" style="width: 100%; height: 220px; object-fit: cover;" />
				<div style="padding: 24px;">
					<div style="font-size: 1.6rem; font-weight: 800; color: #00923f; font-family: 'Figtree', sans-serif;">Taperless</div>
					<div style="font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">CUT GEOMETRY</div>
					<div style="font-size: 0.85rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">DIAMOND · CVD</div>
					<p style="font-size: 0.92rem; color: #64748b; line-height: 1.5; margin: 0 0 16px;">
						Taperless 2D profile and boundary cutting in lab-grown CVD diamond plate with perpendicular walls and minimal material waste.
					</p>
					<div style="display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 600; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px;">
						System: SDM-50 Water-Guided Laser
					</div>
				</div>
			</div>

			<!-- Case 3: Carbide Angle -->
			<div class="gw-hover-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
				<img src="assets/images/case-carbide-angle.jpeg" alt="Carbide Tooling Insert" style="width: 100%; height: 220px; object-fit: cover;" />
				<div style="padding: 24px;">
					<div style="font-size: 1.6rem; font-weight: 800; color: #00923f; font-family: 'Figtree', sans-serif;">±0.25°</div>
					<div style="font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">ANGLE ACCURACY</div>
					<div style="font-size: 0.85rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">TOOLING · CARBIDE</div>
					<p style="font-size: 0.92rem; color: #64748b; line-height: 1.5; margin: 0 0 16px;">
						Ultra-high precision SCD and tungsten carbide tooling insert processing with smooth surface finish and razor-sharp geometries.
					</p>
					<div style="display: inline-block; background: #f1f5f9; color: #0f172a; font-weight: 600; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px;">
						System: Water-Guided Laser Platform
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

html = html.replace(caseStudiesRegex, newCaseStudiesSection);
console.log('Replaced Case Studies section');

// 6. "Why Greenwave" & Action CTA (data-id="5157b80" & data-id="b20e107")
const whyCtaRegex = /<div class="elementor-element elementor-element-5157b80[\s\S]*?(?=<div class="elementor-element elementor-element-23c9846)/i;

const newWhyCtaSection = `
<!-- Why Greenwave Section -->
<div id="about" class="elementor-element elementor-element-5157b80 e-flex e-con-boxed e-con e-parent" data-id="5157b80" data-element_type="container" data-e-type="container" style="background: #ffffff; padding: 90px 20px;">
	<div style="max-width: 1200px; margin: 0 auto; width: 100%;">
		<div style="text-align: center; max-width: 760px; margin: 0 auto 60px;">
			<div style="color: #00923f; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">/ 05 WHY GREENWAVE</div>
			<h2 style="font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 800; color: #0f172a; line-height: 1.2; font-family: 'Figtree', sans-serif;">
				Engineering you can build a factory on.
			</h2>
			<p style="font-size: 1.1rem; color: #64748b; margin-top: 14px;">
				Decades of laser engineering excellence, proven production yields, and responsive global customer support.
			</p>
		</div>

		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
			<!-- Pillar 1 -->
			<div style="padding: 28px 24px; background: #f8fafc; border-left: 4px solid #00923f; border-radius: 0 10px 10px 0;">
				<h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 10px;">Proven Yield</h3>
				<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
					Measurable improvements in kerf reduction and stone yield documented across hundreds of global industrial installations.
				</p>
			</div>

			<!-- Pillar 2 -->
			<div style="padding: 28px 24px; background: #f8fafc; border-left: 4px solid #00923f; border-radius: 0 10px 10px 0;">
				<h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 10px;">Global Support &amp; AMC</h3>
				<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
					Direct machine AMC, scheduled preventative maintenance, spare parts, and on-site training teams across 32 countries.
				</p>
			</div>

			<!-- Pillar 3 -->
			<div style="padding: 28px 24px; background: #f8fafc; border-left: 4px solid #00923f; border-radius: 0 10px 10px 0;">
				<h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 10px;">Built to Last</h3>
				<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
					Heavy-duty industrial-grade cast frames and optical enclosures engineered specifically for continuous 24/7 production environments.
				</p>
			</div>

			<!-- Pillar 4 -->
			<div style="padding: 28px 24px; background: #f8fafc; border-left: 4px solid #00923f; border-radius: 0 10px 10px 0;">
				<h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 10px;">Future-Ready Platform</h3>
				<p style="font-size: 0.95rem; line-height: 1.6; color: #64748b; margin: 0;">
					Modular laser hardware and intelligent software architectures expanding continuously into new material and semiconductor frontiers.
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Ready to Begin / Sample Testing CTA Block -->
<div id="contact" class="elementor-element elementor-element-b20e107 e-flex e-con-boxed e-con e-parent" data-id="b20e107" data-element_type="container" data-e-type="container" style="background: linear-gradient(135deg, #090e17 0%, #111a2e 100%); padding: 80px 20px; color: #ffffff; border-radius: 20px; margin: 80px 20px 80px; max-width: 1200px; margin-left: auto; margin-right: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
	<div style="max-width: 900px; margin: 0 auto; text-align: center;">
		<div style="display: inline-block; background: rgba(0, 146, 63, 0.2); border: 1px solid rgba(0, 146, 63, 0.5); color: #4ade80; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; padding: 4px 14px; border-radius: 9999px; margin-bottom: 20px;">
			/ READY TO BEGIN
		</div>
		<h2 style="font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 16px; font-family: 'Figtree', sans-serif;">
			Tell us your material.<br/>
			<span style="color: #00c853;">We’ll help you cut it.</span>
		</h2>
		<p style="font-size: 1.15rem; line-height: 1.6; color: #cbd5e1; margin: 0 auto 36px; max-width: 700px;">
			Share your material and process requirements. Our engineers will recommend the right system or test your sample directly at our Surat R&amp;D facility.
		</p>
		
		<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
			<a href="mailto:info@greenwave.org.in" style="background: linear-gradient(135deg, #00923f 0%, #00c853 100%); color: #ffffff; font-weight: 700; font-size: 1rem; padding: 14px 34px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 10px 25px rgba(0, 146, 63, 0.4);">
				<span>Get a Sample Tested</span>
				<span>→</span>
			</a>
			<a href="tel:+919409090109" style="background: rgba(255, 255, 255, 0.08); border: 1.5px solid rgba(255, 255, 255, 0.2); color: #ffffff; font-weight: 600; font-size: 1rem; padding: 13px 28px; border-radius: 8px; text-decoration: none;">
				<span>Call +91-94090 90109</span>
			</a>
			<a href="https://wa.me/919409090109" target="_blank" style="background: #25D366; color: #ffffff; font-weight: 700; font-size: 1rem; padding: 13px 28px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
				<span>WhatsApp</span>
			</a>
		</div>
	</div>
</div>
`;

html = html.replace(whyCtaRegex, newWhyCtaSection);
console.log('Replaced Why Greenwave & CTA section');

// 7. Footer Overhauls (data-id="23c9846", "5983e10", "17605e48")
const footerRegex = /<footer[\s\S]*?<\/footer>/i;

const newFooterHtml = `
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

html = html.replace(footerRegex, newFooterHtml);
console.log('Replaced Footer');

fs.writeFileSync(indexPath, html);
console.log('Updated index.html successfully! Final size:', html.length);
