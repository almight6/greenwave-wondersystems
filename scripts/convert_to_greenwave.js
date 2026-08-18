const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

console.log('Reading index.html, size:', html.length);

// 1. Header & Navigation Updates
// Replace all instances of Wonder Systems logo with Greenwave logo
html = html.replace(/src="assets\/images\/Layer-1-logo-1[^"]*"/g, 'src="assets/images/greenwave-logo-wp.png"');
html = html.replace(/srcset="assets\/images\/Layer-1-logo-1[^"]*"/g, 'srcset="assets/images/greenwave-logo-wp.png 592w"');
html = html.replace(/src="assets\/images\/logowonder[^"]*"/g, 'src="assets/images/greenwave-logo-wp.png"');
html = html.replace(/src="assets\/images\/wonderlogo[^"]*"/g, 'src="assets/images/greenwave-logo-wp.png"');
html = html.replace(/aria-label="Read more about mainlogo"/g, 'aria-label="Greenwave Technologies"');
html = html.replace(/href="https:\/\/www\.wondersystemsindia\.com"/g, 'href="#"');
html = html.replace(/href="https:\/\/www\.wondersystemsindia\.com\/"/g, 'href="#"');

// Replace top bar phone, email, and location
html = html.replace(/info@wondersystemsindia\.com/g, 'info@greenwave.org.in');
html = html.replace(/sales@wondersystemsindia\.com/g, 'info@greenwave.org.in');
html = html.replace(/\+91\s*88265\s*11135/g, '+91-94090 90109');
html = html.replace(/\+91\s*129\s*4165535/g, '+91-94090 90109');
html = html.replace(/Plot No\.\s*77[^\n<]+/g, 'Surat, Gujarat, India - 395004');

// Replace main navigation menu items
const greenwaveNavHtml = `
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home"><a href="#home" class="elementor-item elementor-item-active">Home</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"><a href="#machines" class="elementor-item elementor-item-anchor">Machines</a>
	<ul class="sub-menu elementor-nav-menu--dropdown">
		<li class="menu-item"><a href="#sdm50" class="elementor-sub-item"><strong style="color:#00923f;">★ SDM-50 Water-Guided Laser</strong></a></li>
		<li class="menu-item"><a href="#spectrum" class="elementor-sub-item">Spectrum (16W Side-Pumped)</a></li>
		<li class="menu-item"><a href="#spectra-pro" class="elementor-sub-item">Spectra Pro (20W End-Pumped)</a></li>
		<li class="menu-item"><a href="#scorpion" class="elementor-sub-item">Scorpion (CVD Slicing & Coring)</a></li>
		<li class="menu-item"><a href="#machines" class="elementor-sub-item">Sparkle (Fancy 4P/Facet)</a></li>
	</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="#materials" class="elementor-item elementor-item-anchor">Materials & Industries</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="#technology" class="elementor-item elementor-item-anchor">Technology</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="#case-studies" class="elementor-item elementor-item-anchor">Case Studies</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"><a href="#services" class="elementor-item elementor-item-anchor">Services</a>
	<ul class="sub-menu elementor-nav-menu--dropdown">
		<li class="menu-item"><a href="#services" class="elementor-sub-item">Laser Machine AMC & Maintenance</a></li>
		<li class="menu-item"><a href="#services" class="elementor-sub-item">Green Laser Sawing Job Work</a></li>
		<li class="menu-item"><a href="#services" class="elementor-sub-item">Green Fiber Laser Sawing</a></li>
		<li class="menu-item"><a href="#services" class="elementor-sub-item">Diamond Scanning Job Work</a></li>
	</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="#about" class="elementor-item elementor-item-anchor">About</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom"><a href="#contact" class="elementor-item elementor-item-anchor">Contact</a></li>
`;

// Replace menu-1-0c4c55f and menu-1-7084693 contents
html = html.replace(/(<ul id="menu-1-0c4c55f"[^>]*>)[\s\S]*?(<\/ul>)/, `$1${greenwaveNavHtml}$2`);
html = html.replace(/(<ul id="menu-1-7084693"[^>]*>)[\s\S]*?(<\/ul>)/, `$1${greenwaveNavHtml}$2`);

// Replace header CTA buttons ("E-mart" or "Get in touch" -> "Request a Quote")
html = html.replace(/<span class="elementor-button-text">E-mart<\/span>/g, '<span class="elementor-button-text">Request Quote</span>');
html = html.replace(/<span class="elementor-button-text">Get in Touch<\/span>/g, '<span class="elementor-button-text">Request Quote</span>');
html = html.replace(/<a class="elementor-button elementor-button-link elementor-size-sm" href="[^"]*"/g, '<a class="elementor-button elementor-button-link elementor-size-sm" href="#contact"');

fs.writeFileSync(indexPath, html);
console.log('Header and menus updated successfully.');
