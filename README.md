# Purtill Woulfe Murphy Solicitors — website concept

Client review build of the proposed visual direction for Purtill Woulfe Murphy Solicitors LLP.

The site is a static GitHub Pages preview. It preserves the supplied design-system tokens, typography, blueprint frames, responsive layout and reveal animations while removing the authoring export's runtime errors and external JavaScript/font dependencies.

## Local preview

Run a static server from the repository root:

```sh
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080/`.

Run the dependency-free static checks with:

```sh
npm run check
```

## Review status

- Colours follow the supplied `PWM_Colour_Palette.pdf`: Inky Blue `#142036`, Red `#ea5151`, Sky Blue `#96d4e6`, supporting teal `#1f5167` and warm neutral `#f4f3ef` (from the PDF's RGB values; its final HEX label is duplicated in error). The original supplied logo SVG colours are preserved. Red is reserved for large display text and primary actions; small text uses navy or teal. Button lettering uses a slightly darker navy for readable contrast on the exact brand red.

- The site is intentionally marked `noindex` and `robots.txt` disallows crawling.
- Portraits and the hero image remain design placeholders until approved photography is supplied.
- Team size, biographies, testimonials, accreditations, service copy and enquiry routing require solicitor approval before a production launch.
- The enquiry form opens the visitor's email application; it does not transmit or store data on GitHub Pages.

Barlow and Barlow Condensed are included under the SIL Open Font License in `assets/fonts/OFL.txt`.
