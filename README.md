# Retna Portfolio

A responsive, editorial-style personal portfolio website designed with a pastel pink-and-green aesthetic.

## Files

- `index.html` — page structure and content
- `css/style.css` — visual design, layout, responsive styling, and accessibility rules
- `js/script.js` — mobile navigation, reveal animations, and project modal logic
- `assets/images/retna-portrait.svg` — local portrait fallback placeholder
- `assets/images/favicon.svg` — browser favicon
- `assets/images/tulip-field-background.jpg`, `assets/images/tulip-petals-closeup.jpeg`, and `assets/images/tulip-bokeh-field.jpeg` — hero slideshow backgrounds

## Notes

- The workspace did not include the original `assets/images/retna.jpg` asset, so a local SVG placeholder was added as a graceful fallback.
- Replace the three hero background files above to use different photos. Adjust `HERO_SLIDE_INTERVAL` in `js/script.js` to change the interval in milliseconds, and `--hero-fade-duration` in `css/style.css` to change the crossfade duration. Set `HERO_SLIDESHOW_ENABLED` to `false` in `js/script.js` to keep the first image static.
- The contact form submits to Formspree form `xaeqalog` using its vanilla-JavaScript CDN integration, with a standard HTML POST action as a fallback.
- Update the email and LinkedIn placeholder links in `index.html` with your actual contact details when available.
- Open the site in a browser or serve it locally via a static server.
