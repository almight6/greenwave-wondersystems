const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Replace all remaining wonder systems URLs and emails
html = html.replace(/https:\/\/www\.wondersystemsindia\.com\/?/g, '#');
html = html.replace(/https:\/\/api\.whatsapp\.com\/send\/\?phone=\d+/g, 'https://wa.me/919409090109');
html = html.replace(/hk@wondersystemsindia\.com/g, 'info@greenwave.org.in');
html = html.replace(/info@wondersystemsindia\.com/g, 'info@greenwave.org.in');
html = html.replace(/Wonder Systems India/g, 'Greenwave Technologies');
html = html.replace(/Wonder Systems/g, 'Greenwave Technologies');
html = html.replace(/WSIPL/g, 'Greenwave Technologies');

// Update secondary mobile menu lists if any
const greenwaveMobileNav = `
<li class="menu-item"><a href="#home" class="ast-menu-item">Home</a></li>
<li class="menu-item"><a href="#sdm50" class="ast-menu-item">SDM-50 Water-Guided Laser</a></li>
<li class="menu-item"><a href="#spectrum" class="ast-menu-item">Spectrum (16W Laser)</a></li>
<li class="menu-item"><a href="#spectra-pro" class="ast-menu-item">Spectra Pro (20W Laser)</a></li>
<li class="menu-item"><a href="#scorpion" class="ast-menu-item">Scorpion (CVD Slicing)</a></li>
<li class="menu-item"><a href="#materials" class="ast-menu-item">Materials &amp; Industries</a></li>
<li class="menu-item"><a href="#case-studies" class="ast-menu-item">Case Studies</a></li>
<li class="menu-item"><a href="#services" class="ast-menu-item">Services &amp; AMC</a></li>
<li class="menu-item"><a href="#about" class="ast-menu-item">About Greenwave</a></li>
<li class="menu-item"><a href="#contact" class="ast-menu-item">Contact Us</a></li>
`;

// Replace menu-primary and menu-primary-1 contents
html = html.replace(/(<ul id="ast-hf-menu-[^>]*>)[\s\S]*?(<\/ul>)/g, `$1${greenwaveMobileNav}$2`);
html = html.replace(/(<ul id="menu-primary[^>]*>)[\s\S]*?(<\/ul>)/g, `$1${greenwaveMobileNav}$2`);

// Replace remaining ABB references
html = html.replace(/ABB Products/gi, 'Laser Machines');
html = html.replace(/ABB AC Drives/gi, 'SDM-50 System');
html = html.replace(/ABB DC Drives/gi, 'Spectrum Laser');
html = html.replace(/ABB Servo Drives/gi, 'Spectra Pro');
html = html.replace(/ABB Motors/gi, 'Scorpion Laser');
html = html.replace(/ABB Switch Gears/gi, 'Sparkle 4P Sawing');
html = html.replace(/ABB/g, 'Greenwave');

fs.writeFileSync(indexPath, html);
console.log('Cleaned all remaining legacy references!');
