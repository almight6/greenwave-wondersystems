# Wonder Systems India - Cloned Homepage

This repository contains a local clone of the homepage from [Wonder Systems India](https://www.wondersystemsindia.com/) with all stylesheets, scripts, fonts, and images localized.

## Project Structure

```
├── index.html                  # Cloned homepage with localized asset paths
├── package.json                # Project config & scripts
├── README.md                   # Project documentation
├── assets/
│   ├── css/                    # Localized stylesheets (Astra, Elementor, WooCommerce, etc.)
│   ├── js/                     # Localized JavaScript libraries (Swiper, Smartmenus, jQuery, etc.)
│   ├── images/                 # Localized logos, product visuals, customer logos, icons
│   └── fonts/                  # Localized web fonts (Poppins, Roboto, Inter, etc.)
└── scripts/
    ├── clone_site.js           # Re-cloning script with automated asset localized pipeline
    ├── validate_assets.js      # Validator for HTML asset paths
    └── validate_css.js         # Validator for CSS URL references
```

## Running Locally

To run the site locally:

```bash
npm start
# or
npx serve -l 3000 .
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Re-scraping / Re-cloning

If you ever need to fetch updated assets or markup from the live website again:

```bash
npm run clone
```
