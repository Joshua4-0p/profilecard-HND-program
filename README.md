# Frontend Wizards — Profile, Contact & About Pages (HNG13)

I started with a simple profile card for Stage 0 and iteratively improved it to meet the internship requirements. Along the way I fixed semantic/test-id issues, made the layout responsive, improved accessibility, and built the Stage 1/2 pages and form validation so the project is testable and ready for automated checks.

## What I changed (short narrative)
- Began with your original profile card and preserved the visual design while fixing functional problems:
  - Moved the avatar test id to the `<img>` element (tests expect the image to carry `data-testid="test-user-avatar"`).
  - Replaced the ISO timestamp with `Date.now()` (ms) and updated the script to set the time at render.
  - Removed rigid width/height that caused content overlap and used a responsive pattern (`width:100%` + `max-width` + `box-sizing:border-box`).
  - Added visible focus styles and small accessibility improvements (aria attributes, object-fit for avatars, readable contrast).
- Implemented the About page (`about.html`) using semantic markup and the required `data-testid`s:
  - `test-about-bio`, `test-about-goals`, `test-about-confidence`, `test-about-future-note`, `test-about-extra`, and `data-testid="test-about-page"`.
- Built a concise, focused client-side form validator (`index.js`) for the Contact page:
  - Validates email format and message length (>= 10 chars).
  - Emits accessible error messages using `data-testid` names required by the tests:
    - `test-contact-error-email`, `test-contact-error-message`.
  - Shows success in `test-contact-success`.
  - Adds `data-testid="test-contact-submit"` to the submit control if missing.
- Provided a small accessible submit button snippet you can drop into the contact form:
  - `<button type="submit" data-testid="test-contact-submit">Send Message</button>`

## Files added / updated
- profile-card.html — improved, responsive profile card, correct test ids, Date.now() time
- about.html — About Me page (semantic, responsive, all required test ids)
- contact.html — your existing contact page (leave as-is but include the submit button snippet where appropriate)
- index.js — short validation script for contact form (email + message validation)
- README.md — this file

(If you want, I can push these files to a repo/branch for you or adapt the scripts to slightly different markup — just share the contact.html content.)

## How to use / test locally
1. Place the files in the same folder (or adjust paths if assets are in a subfolder).
2. Ensure the contact form has inputs with these data-testids:
   - `test-contact-name`, `test-contact-email`, `test-contact-subject`, `test-contact-message`
3. Include the validator script in your contact page:
   - `<script src="index.js" defer></script>`
4. Add the submit button inside the form where appropriate:
   - `<button type="submit" data-testid="test-contact-submit">Send Message</button>`
5. Open the pages in a browser. The contact form will:
   - Show error messages in elements with `test-contact-error-email` and `test-contact-error-message` (created automatically if missing).
   - Show a success message in `test-contact-success` on valid submit.
6. Automated tests can rely on the exact `data-testid` attributes used across pages (profile, about, contact).

## Accessibility & testing notes
- Semantic elements used: `article`, `main`, `section`, `header`, `nav`, `figure`, `figcaption`.
- Error messages are linked to inputs via `aria-describedby`, errors use `aria-live` for assertive announcements, success uses `role="status"`.
- Keyboard navigation and visible focus outlines are enabled for links and buttons.
- The profile time uses `Date.now()` in milliseconds (suitable for the test that expects the time in ms).

## Next recommendations
- Replace placeholder URLs or avatars with real assets if needed.
- Optionally implement server-side handling for the contact form submission (the current script only validates and shows success client-side).
- If you want the avatar upload flow, I can add a small file-input handler that replaces the avatar `src` with a local blob URL.

Thanks — I focused on keeping the changes minimal, accessible, and test-friendly so you can pass the automated checks for the program. If you'd like, I’ll adapt the validator to any slightly different markup in your existing contact page — paste it here and I’ll tailor the script.
