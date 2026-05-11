# Vivacqua Odontologia - Landing Page

Institutional website for Vivacqua Odontologia focused on patient conversion, local SEO, and mobile experience.

## Overview

- Single-page landing site with presentation, services, gallery, contact, and booking sections.
- Optimized for local search (Taguatinga/DF) with metadata, Open Graph, and structured data.
- Responsive interface with accessibility and interactive components.

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (no framework)

## Project Structure

- index.html: page structure, local styles, and SEO.
- script.js: interactions (mobile menu, carousel, gallery, animations, and virtual agent).
- assets/: clinic and service images.
- robots.txt and sitemap.xml: indexing support.
- ACESSIBILIDADE.md and COMO_TESTAR_ACESSIBILIDADE.md: accessibility guides (Portuguese).

## Run Locally

1. Download/clone the project.
2. Open the folder in VS Code.
3. Open index.html in your browser.

## Main Features

- Responsive navigation with mobile menu.
- Hero section with carousel and conversion CTAs.
- Gallery with modal, keyboard navigation, and swipe.
- Booking section with WhatsApp links.
- Accessibility menu (dark mode, high contrast, and font size).

## Dental Virtual Agent

A virtual assistant was added for initial customer support.

### What it does

- Introduces itself automatically with a welcome message.
- Shows a quick hint near the chat button.
- Answers common questions about:
  services, sports dentistry, whitening, endodontics, prevention, hours, location, contact, and pricing.
- Redirects users to WhatsApp booking.

### Where it is implemented

- Chat structure and styles: index.html.
- Conversation and response logic: script.js ("Dental Virtual Agent" block).

### Quick customization

- Change initial messages: initialMessages array in script.js.
- Change quick questions: buttons with dental-chip class in index.html.
- Adjust responses: getReply function in script.js.
- Change WhatsApp link: whatsappUrl constant in script.js.

## Notes

- The virtual agent does not replace in-person dental evaluation.
- To upgrade to real generative AI, integrate an external API in a backend service.
