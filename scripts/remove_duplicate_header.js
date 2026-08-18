const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Find end of main header
const headerEnd = html.indexOf('</header>') + 9;

// Find start of hero container
const heroStart = html.indexOf('<div id="home"');

console.log('headerEnd:', headerEnd, 'heroStart:', heroStart);

if (headerEnd !== -1 && heroStart !== -1) {
  // Retain the clean wrapper tags:
  const middleWrapper = `
			<div id="content" class="site-content" style="background: #f8fafc; padding: 24px 0 0;">
		<div class="ast-container" style="max-width: 100%; padding: 0;">
	<div id="primary" class="content-area primary">
		<main id="main" class="site-main">
			<article class="post-47 page type-page status-publish ast-article-single" id="post-47">
				<div class="entry-content clear">
					<div data-elementor-type="wp-page" class="elementor elementor-47">
`;
  html = html.substring(0, headerEnd) + middleWrapper + html.substring(heroStart);
  console.log('Removed duplicate second header container cleanly!');
  fs.writeFileSync(indexPath, html);
}
