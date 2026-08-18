const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Ensure #content has no awkward top padding pushing the hero down
html = html.replace(
  '<div id="content" class="site-content" style="background: #f8fafc; padding: 24px 0 0;">',
  '<div id="content" class="site-content" style="background: #050811; padding: 0;">'
);

// 2. Find start of hero (#home) and end of metrics bar (before #materials)
const heroStartIdx = html.indexOf('<div id="home"');
const materialsIdx = html.indexOf('<!-- Section 01: Materials & Industries -->');

if (heroStartIdx === -1 || materialsIdx === -1) {
  console.error('Could not find start or end markers for hero section!', { heroStartIdx, materialsIdx });
  process.exit(1);
}

const newFullsizeHero = `
<div id="home" class="gw-hero-fullscreen-section">
	<!-- Full Coverage Video Background Engine -->
	<div class="gw-video-bg-layer">
		<div class="gw-video-poster" style="background-image: url('assets/images/gw-hero-machine.jpg');"></div>
		
		<div class="gw-video-iframe-scaler">
			<iframe 
				id="gw-hero-bg-video" 
				src="https://www.youtube.com/embed/LNvLWUsKodc?autoplay=1&mute=1&loop=1&playlist=LNvLWUsKodc&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1" 
				title="Greenwave Laser Machinery Production Feed"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				tabindex="-1">
			</iframe>
		</div>

		<!-- Fine Laser Matrix Grid Overlay -->
		<div class="gw-grid-overlay"></div>

		<!-- Cinematic Multi-Stop Dark Vignette Overlay -->
		<div class="gw-vignette-overlay"></div>

		<!-- Ambient Laser Green Corner Glows -->
		<div class="gw-glow-top-right"></div>
		<div class="gw-glow-bottom-left"></div>
	</div>

	<!-- Custom Styles for Full-Size Hero -->
	<style>
		.gw-hero-fullscreen-section {
			position: relative;
			width: 100%;
			min-height: calc(100vh - 80px);
			min-height: 740px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			background: #050811;
			color: #ffffff;
			font-family: 'Inter', sans-serif;
		}
		.gw-video-bg-layer {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			pointer-events: none;
			z-index: 1;
		}
		.gw-video-poster {
			position: absolute;
			inset: 0;
			background-size: cover;
			background-position: center;
			filter: brightness(0.6);
			z-index: 1;
			transition: opacity 0.8s ease;
		}
		.gw-video-iframe-scaler {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100vw;
			height: 56.25vw; /* 16:9 ratio */
			min-height: 100%;
			min-width: 177.77vh; /* 16:9 ratio */
			transform: translate(-50%, -50%);
			z-index: 2;
		}
		.gw-video-iframe-scaler iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: none;
			pointer-events: none;
			transform: scale(1.18);
		}
		.gw-grid-overlay {
			position: absolute;
			inset: 0;
			z-index: 3;
			background-image: 
				linear-gradient(rgba(0, 200, 83, 0.035) 1px, transparent 1px),
				linear-gradient(90deg, rgba(0, 200, 83, 0.035) 1px, transparent 1px);
			background-size: 44px 44px;
			pointer-events: none;
		}
		.gw-vignette-overlay {
			position: absolute;
			inset: 0;
			z-index: 4;
			background: 
				radial-gradient(ellipse at 25% 45%, rgba(5, 8, 17, 0.82) 0%, rgba(5, 8, 17, 0.92) 55%, #050811 100%),
				linear-gradient(180deg, rgba(5, 8, 17, 0.45) 0%, rgba(5, 8, 17, 0.72) 65%, #050811 100%);
			pointer-events: none;
		}
		.gw-glow-top-right {
			position: absolute;
			top: -150px;
			right: -150px;
			width: 750px;
			height: 750px;
			background: radial-gradient(circle, rgba(0, 200, 83, 0.22) 0%, rgba(0,0,0,0) 70%);
			pointer-events: none;
			z-index: 5;
		}
		.gw-glow-bottom-left {
			position: absolute;
			bottom: -100px;
			left: -100px;
			width: 550px;
			height: 550px;
			background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(0,0,0,0) 70%);
			pointer-events: none;
			z-index: 5;
		}

		/* Foreground Layout */
		.gw-hero-foreground {
			position: relative;
			z-index: 10;
			max-width: 1360px;
			width: 100%;
			margin: 0 auto;
			padding: 50px 24px 35px;
			display: grid;
			grid-template-columns: 1.15fr 0.85fr;
			gap: 48px;
			align-items: center;
			flex-grow: 1;
		}

		/* Left Column */
		.gw-hero-badge {
			display: inline-flex;
			align-items: center;
			gap: 10px;
			background: rgba(0, 146, 63, 0.18);
			border: 1px solid rgba(0, 200, 83, 0.45);
			padding: 7px 18px;
			border-radius: 9999px;
			font-size: 0.82rem;
			font-weight: 700;
			letter-spacing: 0.6px;
			color: #4ade80;
			margin-bottom: 24px;
			backdrop-filter: blur(8px);
			box-shadow: 0 0 20px rgba(0, 200, 83, 0.2);
		}
		.gw-pulse-dot {
			display: inline-block;
			width: 8px;
			height: 8px;
			background: #22c55e;
			border-radius: 50%;
			box-shadow: 0 0 10px #22c55e;
			animation: gwBeaconPulse 1.8s infinite;
		}
		.gw-badge-loc {
			color: #94a3b8;
			font-weight: 600;
			padding-left: 6px;
			border-left: 1px solid rgba(255,255,255,0.2);
		}
		@keyframes gwBeaconPulse {
			0% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
			70% { opacity: 0.6; transform: scale(1.15); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
			100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
		}

		.gw-hero-h1 {
			font-size: clamp(2.6rem, 4.4vw, 4.2rem);
			font-weight: 800;
			line-height: 1.1;
			color: #ffffff;
			margin: 0 0 22px;
			font-family: 'Figtree', sans-serif;
			letter-spacing: -0.5px;
		}
		.gw-gradient-laser {
			background: linear-gradient(135deg, #00e676 0%, #00b0ff 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			text-shadow: 0 0 40px rgba(0, 230, 118, 0.35);
			display: inline-block;
		}
		.gw-hero-p {
			font-size: 1.14rem;
			line-height: 1.68;
			color: #cbd5e1;
			margin-bottom: 32px;
			font-weight: 400;
			max-width: 620px;
		}

		/* 4 Spec Highlights Pills */
		.gw-specs-pills-row {
			display: flex;
			flex-wrap: wrap;
			gap: 12px;
			margin-bottom: 38px;
		}
		.gw-spec-pill {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: rgba(15, 23, 42, 0.75);
			backdrop-filter: blur(12px);
			padding: 9px 16px;
			border-radius: 10px;
			border: 1px solid rgba(255, 255, 255, 0.12);
			color: #e2e8f0;
			font-size: 0.88rem;
			box-shadow: 0 4px 15px rgba(0,0,0,0.25);
			transition: all 0.25s ease;
		}
		.gw-spec-pill:hover {
			border-color: rgba(0, 230, 118, 0.5);
			background: rgba(0, 146, 63, 0.15);
			transform: translateY(-2px);
		}
		.gw-spec-pill .gw-icon {
			font-size: 1rem;
		}

		/* CTA Buttons */
		.gw-hero-cta-group {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			align-items: center;
		}
		.gw-btn-primary {
			background: linear-gradient(135deg, #00923f 0%, #00e676 100%);
			color: #ffffff;
			font-weight: 700;
			font-size: 1.02rem;
			padding: 15px 34px;
			border-radius: 10px;
			text-decoration: none;
			display: inline-flex;
			align-items: center;
			gap: 10px;
			box-shadow: 0 12px 30px rgba(0, 230, 118, 0.35), 0 0 15px rgba(0, 146, 63, 0.3);
			transition: all 0.3s ease;
		}
		.gw-btn-primary:hover {
			transform: translateY(-3px) scale(1.02);
			box-shadow: 0 16px 36px rgba(0, 230, 118, 0.5);
			color: #ffffff !important;
		}
		.gw-btn-glass {
			background: rgba(255, 255, 255, 0.08);
			backdrop-filter: blur(12px);
			border: 1.5px solid rgba(255, 255, 255, 0.22);
			color: #ffffff;
			font-weight: 600;
			font-size: 1.02rem;
			padding: 14px 28px;
			border-radius: 10px;
			text-decoration: none;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			transition: all 0.3s ease;
		}
		.gw-btn-glass:hover {
			background: rgba(255, 255, 255, 0.16);
			border-color: #00e676;
			color: #ffffff !important;
			transform: translateY(-2px);
		}
		.gw-btn-wa {
			color: #4ade80;
			font-size: 0.98rem;
			font-weight: 700;
			text-decoration: none;
			display: inline-flex;
			align-items: center;
			gap: 8px;
			padding: 10px 16px;
			border-radius: 8px;
			background: rgba(34, 197, 94, 0.1);
			border: 1px solid rgba(34, 197, 94, 0.25);
			transition: all 0.2s ease;
		}
		.gw-btn-wa:hover {
			background: rgba(34, 197, 94, 0.2);
			color: #ffffff !important;
		}

		/* Right Column HUD Deck */
		.gw-hud-card {
			background: rgba(11, 17, 30, 0.85);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
			border: 1px solid rgba(0, 230, 118, 0.3);
			border-radius: 20px;
			padding: 22px;
			box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 146, 63, 0.2);
			position: relative;
		}
		.gw-hud-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 14px;
			border-bottom: 1px solid rgba(255,255,255,0.08);
			margin-bottom: 14px;
		}
		.gw-hud-status {
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.gw-live-beacon {
			width: 9px;
			height: 9px;
			background: #ef4444;
			border-radius: 50%;
			box-shadow: 0 0 10px #ef4444;
			animation: gwPulseRed 1.5s infinite;
		}
		@keyframes gwPulseRed {
			0% { opacity: 1; transform: scale(1); }
			50% { opacity: 0.4; transform: scale(1.25); }
			100% { opacity: 1; transform: scale(1); }
		}
		.gw-hud-status-text {
			font-size: 0.8rem;
			font-weight: 800;
			color: #f87171;
			letter-spacing: 0.8px;
			text-transform: uppercase;
		}
		.gw-hud-quality {
			display: flex;
			gap: 6px;
		}
		.gw-chip-green {
			font-size: 0.72rem;
			font-weight: 700;
			color: #00e676;
			background: rgba(0, 230, 118, 0.15);
			border: 1px solid rgba(0, 230, 118, 0.35);
			padding: 3px 8px;
			border-radius: 5px;
		}
		.gw-chip-subtle {
			font-size: 0.72rem;
			font-weight: 700;
			color: #94a3b8;
			background: rgba(255,255,255,0.06);
			border: 1px solid rgba(255,255,255,0.1);
			padding: 3px 8px;
			border-radius: 5px;
		}

		/* Active Stream Info */
		.gw-stream-info {
			display: flex;
			align-items: center;
			gap: 8px;
			background: rgba(0, 0, 0, 0.4);
			padding: 10px 14px;
			border-radius: 10px;
			border: 1px solid rgba(255,255,255,0.06);
			margin-bottom: 16px;
		}
		.gw-stream-label {
			font-size: 0.74rem;
			font-weight: 700;
			color: #64748b;
			letter-spacing: 0.5px;
		}
		.gw-stream-title {
			font-size: 0.88rem;
			font-weight: 700;
			color: #ffffff;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		/* Feed buttons grid */
		.gw-feed-buttons-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 10px;
			margin-bottom: 16px;
		}
		.gw-feed-btn {
			background: rgba(255, 255, 255, 0.04);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 10px;
			padding: 10px 12px;
			color: #94a3b8;
			text-align: left;
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 10px;
			transition: all 0.2s ease;
		}
		.gw-feed-btn:hover {
			background: rgba(0, 230, 118, 0.1);
			border-color: rgba(0, 230, 118, 0.4);
			color: #ffffff;
			transform: translateY(-1px);
		}
		.gw-feed-btn.active {
			background: rgba(0, 146, 63, 0.25);
			border-color: #00e676;
			color: #ffffff;
			box-shadow: 0 0 15px rgba(0, 230, 118, 0.2);
		}
		.gw-feed-icon {
			font-size: 1.2rem;
			flex-shrink: 0;
		}
		.gw-feed-meta {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}
		.gw-feed-meta strong {
			font-size: 0.8rem;
			font-weight: 700;
			color: #ffffff;
			line-height: 1.2;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.gw-feed-meta small {
			font-size: 0.7rem;
			color: #94a3b8;
			margin-top: 2px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		/* Media Controls Toolbar */
		.gw-media-controls-bar {
			display: flex;
			align-items: center;
			gap: 10px;
			background: rgba(0, 0, 0, 0.45);
			border: 1px solid rgba(255,255,255,0.08);
			border-radius: 10px;
			padding: 8px 12px;
			margin-bottom: 16px;
		}
		.gw-ctrl-btn {
			background: rgba(255, 255, 255, 0.08);
			border: 1px solid rgba(255, 255, 255, 0.15);
			color: #e2e8f0;
			font-size: 0.78rem;
			font-weight: 600;
			padding: 6px 12px;
			border-radius: 6px;
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			gap: 6px;
			transition: all 0.2s ease;
		}
		.gw-ctrl-btn:hover {
			background: rgba(0, 230, 118, 0.2);
			border-color: #00e676;
			color: #ffffff;
		}
		.gw-modal-trigger-btn {
			margin-left: auto;
			background: rgba(0, 230, 118, 0.15);
			border-color: rgba(0, 230, 118, 0.4);
			color: #4ade80;
		}

		/* Live Telemetry Box */
		.gw-telemetry-hud {
			background: rgba(6, 11, 20, 0.9);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 12px;
			padding: 14px;
		}
		.gw-telem-header {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 0.72rem;
			font-weight: 700;
			color: #94a3b8;
			letter-spacing: 0.8px;
			text-transform: uppercase;
			margin-bottom: 10px;
		}
		.gw-telem-dot {
			width: 6px;
			height: 6px;
			background: #00e676;
			border-radius: 50%;
			box-shadow: 0 0 6px #00e676;
		}
		.gw-telem-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 8px;
			text-align: center;
			margin-bottom: 12px;
		}
		.gw-telem-item {
			background: rgba(255,255,255,0.03);
			border: 1px solid rgba(255,255,255,0.06);
			border-radius: 8px;
			padding: 8px 4px;
		}
		.gw-telem-val {
			display: block;
			font-size: 0.85rem;
			font-weight: 800;
			color: #00e676;
			font-family: 'Figtree', sans-serif;
		}
		.gw-telem-lbl {
			display: block;
			font-size: 0.65rem;
			color: #94a3b8;
			text-transform: uppercase;
			margin-top: 2px;
		}
		.gw-demo-call-link {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: rgba(0, 146, 63, 0.15);
			border: 1px solid rgba(0, 200, 83, 0.3);
			padding: 8px 12px;
			border-radius: 8px;
			color: #4ade80;
			font-size: 0.8rem;
			font-weight: 700;
			text-decoration: none;
			transition: all 0.2s ease;
		}
		.gw-demo-call-link:hover {
			background: rgba(0, 146, 63, 0.3);
			color: #ffffff !important;
		}

		/* Bottom Integrated Metrics Bar */
		.gw-hero-metrics-bar {
			position: relative;
			z-index: 10;
			width: 100%;
			background: rgba(6, 10, 18, 0.88);
			backdrop-filter: blur(16px);
			-webkit-backdrop-filter: blur(16px);
			border-top: 1px solid rgba(255, 255, 255, 0.08);
			padding: 26px 24px;
		}
		.gw-hero-metrics-container {
			max-width: 1320px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 24px;
			text-align: center;
		}
		.gw-metric-col {
			position: relative;
		}
		.gw-metric-col:not(:last-child)::after {
			content: '';
			position: absolute;
			right: 0;
			top: 15%;
			height: 70%;
			width: 1px;
			background: rgba(255, 255, 255, 0.1);
		}
		.gw-metric-number {
			font-size: clamp(2rem, 2.6vw, 2.6rem);
			font-weight: 800;
			color: #00e676;
			font-family: 'Figtree', sans-serif;
			line-height: 1;
		}
		.gw-metric-label {
			font-size: 0.82rem;
			font-weight: 700;
			letter-spacing: 0.8px;
			color: #94a3b8;
			text-transform: uppercase;
			margin-top: 8px;
		}

		/* HD Video Lightbox Modal */
		.gw-modal-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.88);
			backdrop-filter: blur(12px);
			z-index: 99999;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
		}
		.gw-modal-content {
			background: #0b111e;
			border: 1px solid rgba(0, 230, 118, 0.4);
			border-radius: 16px;
			width: 100%;
			max-width: 960px;
			overflow: hidden;
			box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(0, 230, 118, 0.2);
		}
		.gw-modal-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 16px 20px;
			background: #060a12;
			border-bottom: 1px solid rgba(255,255,255,0.08);
		}
		.gw-modal-close-btn {
			background: rgba(255,255,255,0.1);
			border: none;
			color: #ffffff;
			font-size: 1.1rem;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s ease;
		}
		.gw-modal-close-btn:hover {
			background: #ef4444;
		}
		.gw-modal-video-box {
			position: relative;
			width: 100%;
			padding-top: 56.25%; /* 16:9 */
			background: #000000;
		}
		.gw-modal-video-box iframe {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			border: none;
		}

		/* Responsiveness */
		@media (max-width: 1024px) {
			.gw-hero-foreground {
				grid-template-columns: 1fr;
				gap: 40px;
				padding-top: 40px;
			}
			.gw-hero-fullscreen-section {
				min-height: auto;
			}
			.gw-hero-metrics-container {
				grid-template-columns: repeat(2, 1fr);
				gap: 20px;
			}
			.gw-metric-col:nth-child(2)::after {
				display: none;
			}
		}
		@media (max-width: 640px) {
			.gw-hero-badge {
				font-size: 0.72rem;
				padding: 6px 12px;
				gap: 6px;
				max-width: 100%;
				flex-wrap: wrap;
			}
			.gw-badge-loc {
				display: none;
			}
			.gw-hero-h1 {
				font-size: 2.2rem;
				line-height: 1.15;
			}
			.gw-hero-p {
				font-size: 0.96rem;
				line-height: 1.6;
				margin-bottom: 24px;
			}
			.gw-specs-pills-row {
				gap: 8px;
				margin-bottom: 28px;
			}
			.gw-spec-pill {
				font-size: 0.78rem;
				padding: 7px 10px;
				width: calc(50% - 4px);
				justify-content: center;
				text-align: center;
			}
			.gw-hero-cta-group {
				flex-direction: column;
				align-items: stretch;
				gap: 10px;
			}
			.gw-btn-primary, .gw-btn-glass, .gw-btn-wa {
				justify-content: center;
				text-align: center;
				padding: 12px 20px;
			}
			.gw-hud-card {
				padding: 16px;
				border-radius: 16px;
			}
			.gw-feed-buttons-grid {
				grid-template-columns: 1fr;
			}
			.gw-media-controls-bar {
				flex-wrap: wrap;
				gap: 8px;
			}
			.gw-modal-trigger-btn {
				margin-left: 0;
				width: 100%;
				justify-content: center;
			}
			.gw-telem-grid {
				grid-template-columns: repeat(2, 1fr);
			}
			.gw-hero-metrics-container {
				grid-template-columns: 1fr 1fr;
				gap: 16px;
			}
			.gw-metric-col::after {
				display: none;
			}
			.gw-metric-number {
				font-size: 1.8rem;
			}
			.gw-metric-label {
				font-size: 0.7rem;
			}
		}
	</style>

	<!-- Foreground Interactive Grid -->
	<div class="gw-hero-foreground">
		
		<!-- Left: Core High-Impact Brand Messaging & CTAs -->
		<div>
			<div class="gw-hero-badge">
				<span class="gw-pulse-dot"></span>
				<span>NEXT-GEN LASER &amp; WATER-GUIDED TECHNOLOGY</span>
				<span class="gw-badge-loc">SURAT · GLOBAL</span>
			</div>
			
			<h1 class="gw-hero-h1">
				Your materials.<br/>
				<span class="gw-gradient-laser">Your way.</span>
			</h1>

			<p class="gw-hero-p">
				When you need to cut the hardest materials on earth, no one gives you the precision and freedom to do it like <strong style="color: #ffffff;">Greenwave Technologies</strong>. High-yield diamond sawing and micron-accurate water-guided laser systems engineered in Surat for global production.
			</p>

			<!-- 4 Tech Specs Pills -->
			<div class="gw-specs-pills-row">
				<div class="gw-spec-pill">
					<span class="gw-icon" style="color: #00e676; font-weight: 800;">✓</span>
					<span><strong>±5µm</strong> Cutting Precision</span>
				</div>
				<div class="gw-spec-pill">
					<span class="gw-icon" style="color: #00e676; font-weight: 800;">✓</span>
					<span><strong>Zero</strong> Thermal Distortion</span>
				</div>
				<div class="gw-spec-pill">
					<span class="gw-icon" style="color: #00e676; font-weight: 800;">✓</span>
					<span><strong>Max Yield</strong> Diamond Slicing</span>
				</div>
				<div class="gw-spec-pill">
					<span class="gw-icon" style="color: #00e676; font-weight: 800;">✓</span>
					<span><strong>32+</strong> Countries Served</span>
				</div>
			</div>

			<!-- Action CTAs -->
			<div class="gw-hero-cta-group">
				<a href="#machines" class="gw-btn-primary">
					<span>Explore Machines</span>
					<span>→</span>
				</a>
				<a href="#contact" class="gw-btn-glass">
					<span>Get Sample Tested</span>
				</a>
				<a href="https://wa.me/919409090109" target="_blank" class="gw-btn-wa">
					<span>WhatsApp Consult</span>
					<span>↗</span>
				</a>
			</div>
		</div>

		<!-- Right: Interactive Control Deck & Live Telemetry HUD -->
		<div>
			<div class="gw-hud-card">
				
				<!-- Top Status Bar of Control Deck -->
				<div class="gw-hud-header">
					<div class="gw-hud-status">
						<span class="gw-live-beacon"></span>
						<span class="gw-hud-status-text">LIVE PRODUCTION FEED</span>
					</div>
					<div class="gw-hud-quality">
						<span class="gw-chip-green">1080P 60FPS</span>
						<span class="gw-chip-subtle">SURAT HUB</span>
					</div>
				</div>

				<!-- Active Feed Description Banner -->
				<div class="gw-stream-info">
					<span class="gw-stream-label">CURRENT FEED:</span>
					<span id="gw-active-feed-title" class="gw-stream-title">01 · Production Facility &amp; Assembly</span>
				</div>

				<!-- 4 Quick Feed Switcher Buttons -->
				<div class="gw-feed-buttons-grid">
					<button type="button" class="gw-feed-btn active" onclick="switchHeroVideo('LNvLWUsKodc', '01 · Production Facility &amp; Assembly', this)">
						<span class="gw-feed-icon">🎬</span>
						<span class="gw-feed-meta">
							<strong>01. Production Facility</strong>
							<small>Cleanroom &amp; Assembly</small>
						</span>
					</button>
					<button type="button" class="gw-feed-btn" onclick="switchHeroVideo('GQgQXJs_BhY', '02 · Spectra Pro High-Power Sawing', this)">
						<span class="gw-feed-icon">💎</span>
						<span class="gw-feed-meta">
							<strong>02. Spectra Pro Sawing</strong>
							<small>20W End-Pumped Precision</small>
						</span>
					</button>
					<button type="button" class="gw-feed-btn" onclick="switchHeroVideo('Fb1lAQVOcfA', '03 · Scorpion CVD Diamond Slicing', this)">
						<span class="gw-feed-icon">⚡</span>
						<span class="gw-feed-meta">
							<strong>03. Scorpion CVD Slicing</strong>
							<small>Sub-25µm Kerf Loss</small>
						</span>
					</button>
					<button type="button" class="gw-feed-btn" onclick="switchHeroVideo('MSdX62pUI3Q', '04 · Spectrum 532nm Green Laser', this)">
						<span class="gw-feed-icon">🔬</span>
						<span class="gw-feed-meta">
							<strong>04. Spectrum Green Laser</strong>
							<small>16W Side-Pumped System</small>
						</span>
					</button>
				</div>

				<!-- Video Controls Toolbar (Sound, Playback & HD Lightbox) -->
				<div class="gw-media-controls-bar">
					<button type="button" id="gw-audio-toggle-btn" class="gw-ctrl-btn" onclick="toggleHeroAudio()" title="Toggle Background Machine Audio">
						<span id="gw-audio-icon">🔇</span>
						<span id="gw-audio-label">Muted</span>
					</button>
					<button type="button" id="gw-play-toggle-btn" class="gw-ctrl-btn" onclick="toggleHeroPlay()" title="Pause / Resume Video">
						<span id="gw-play-icon">⏸️</span>
						<span id="gw-play-label">Playing</span>
					</button>
					<button type="button" class="gw-ctrl-btn gw-modal-trigger-btn" onclick="openHeroVideoModal()" title="Watch High Definition Video with Player Controls">
						<span>⛶</span>
						<span>Watch HD Modal</span>
					</button>
				</div>

				<!-- Live Machine Telemetry HUD -->
				<div class="gw-telemetry-hud">
					<div class="gw-telem-header">
						<span class="gw-telem-dot"></span>
						<span>LIVE MACHINE TELEMETRY (ONLINE)</span>
					</div>
					<div class="gw-telem-grid">
						<div class="gw-telem-item">
							<span class="gw-telem-val">±5 µm</span>
							<span class="gw-telem-lbl">Accuracy</span>
						</div>
						<div class="gw-telem-item">
							<span class="gw-telem-val">&lt; 25 µm</span>
							<span class="gw-telem-lbl">Kerf Loss</span>
						</div>
						<div class="gw-telem-item">
							<span class="gw-telem-val">532 nm</span>
							<span class="gw-telem-lbl">Green Beam</span>
						</div>
						<div class="gw-telem-item">
							<span class="gw-telem-val">Water Jet</span>
							<span class="gw-telem-lbl">Co-Axial Guide</span>
						</div>
					</div>
					<a href="#contact" class="gw-demo-call-link">
						<span>📹 Schedule Live Video Machine Tour</span>
						<span>→</span>
					</a>
				</div>
			</div>
		</div>

	</div>

	<!-- Seamless Industrial Performance Metric Strip at Hero Base -->
	<div class="gw-hero-metrics-bar">
		<div class="gw-hero-metrics-container">
			<div class="gw-metric-col">
				<div class="gw-metric-number">1,200+</div>
				<div class="gw-metric-label">Machines Deployed</div>
			</div>
			<div class="gw-metric-col">
				<div class="gw-metric-number">32+</div>
				<div class="gw-metric-label">Countries Served</div>
			</div>
			<div class="gw-metric-col">
				<div class="gw-metric-number">25+ yrs</div>
				<div class="gw-metric-label">Laser Engineering Heritage</div>
			</div>
			<div class="gw-metric-col">
				<div class="gw-metric-number">±5µm</div>
				<div class="gw-metric-label">Micron Cutting Accuracy</div>
			</div>
		</div>
	</div>
</div>

<!-- HD Video Lightbox Modal -->
<div id="gw-hero-lightbox-modal" class="gw-modal-backdrop" style="display: none;" onclick="if(event.target === this) closeHeroVideoModal()">
	<div class="gw-modal-content">
		<div class="gw-modal-header">
			<h4 id="gw-modal-title" style="margin: 0; color: #ffffff; font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
				<span style="color: #00e676;">🔴</span>
				<span>Greenwave Laser Machine Live Demo</span>
			</h4>
			<button type="button" class="gw-modal-close-btn" onclick="closeHeroVideoModal()" title="Close Modal">✕</button>
		</div>
		<div class="gw-modal-video-box">
			<iframe id="gw-modal-video-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	</div>
</div>

<!-- Hero Video & HUD Logic Script -->
<script>
let gwCurrentVideoId = 'LNvLWUsKodc';
let gwIsMuted = true;
let gwIsPlaying = true;

function switchHeroVideo(videoId, title, btn) {
	gwCurrentVideoId = videoId;
	const iframe = document.getElementById('gw-hero-bg-video');
	if (iframe) {
		const muteParam = gwIsMuted ? 1 : 0;
		iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=' + muteParam + '&loop=1&playlist=' + videoId + '&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1';
	}
	const titleEl = document.getElementById('gw-active-feed-title');
	if (titleEl && title) {
		titleEl.textContent = title;
	}
	const btns = document.querySelectorAll('.gw-feed-btn');
	btns.forEach(b => b.classList.remove('active'));
	if (btn) btn.classList.add('active');
}

function toggleHeroAudio() {
	const iframe = document.getElementById('gw-hero-bg-video');
	const audioIcon = document.getElementById('gw-audio-icon');
	const audioLabel = document.getElementById('gw-audio-label');
	if (!iframe) return;

	gwIsMuted = !gwIsMuted;
	if (gwIsMuted) {
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
		if (audioIcon) audioIcon.textContent = '🔇';
		if (audioLabel) audioLabel.textContent = 'Muted';
	} else {
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
		if (audioIcon) audioIcon.textContent = '🔊';
		if (audioLabel) audioLabel.textContent = 'Audio On';
	}
}

function toggleHeroPlay() {
	const iframe = document.getElementById('gw-hero-bg-video');
	const playIcon = document.getElementById('gw-play-icon');
	const playLabel = document.getElementById('gw-play-label');
	if (!iframe) return;

	gwIsPlaying = !gwIsPlaying;
	if (gwIsPlaying) {
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
		if (playIcon) playIcon.textContent = '⏸️';
		if (playLabel) playLabel.textContent = 'Playing';
	} else {
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
		if (playIcon) playIcon.textContent = '▶️';
		if (playLabel) playLabel.textContent = 'Paused';
	}
}

function openHeroVideoModal() {
	const modal = document.getElementById('gw-hero-lightbox-modal');
	const modalIframe = document.getElementById('gw-modal-video-iframe');
	const activeTitle = document.getElementById('gw-active-feed-title')?.textContent || 'Greenwave Laser Machine Demo';
	const modalTitle = document.getElementById('gw-modal-title');

	if (modal && modalIframe) {
		modalIframe.src = 'https://www.youtube.com/embed/' + gwCurrentVideoId + '?autoplay=1&controls=1&rel=0&modestbranding=1';
		if (modalTitle) {
			modalTitle.innerHTML = '<span style="color: #00e676;">🔴</span> <span>' + activeTitle + '</span>';
		}
		modal.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	}
}

function closeHeroVideoModal() {
	const modal = document.getElementById('gw-hero-lightbox-modal');
	const modalIframe = document.getElementById('gw-modal-video-iframe');
	if (modal && modalIframe) {
		modalIframe.src = '';
		modal.style.display = 'none';
		document.body.style.overflow = '';
	}
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closeHeroVideoModal();
	}
});
</script>
`;

html = html.substring(0, heroStartIdx) + newFullsizeHero + '\n' + html.substring(materialsIdx);

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated index.html with refined mobile hero section!');
