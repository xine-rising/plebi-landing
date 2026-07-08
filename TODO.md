# Plebi Landing Page — TODO

## Pre-launch blockers

- [ ] Privacy Policy page (real content, not stub link)
- [ ] Terms of Service page (real content, not stub link)
- [ ] Update footer `href="#"` links to point to real pages
- [ ] Driver verification flow: background check vendor integration (Checkr or Sterling), document upload, admin review workflow
- [ ] OG image: replace sips-generated version with a proper designed image (logo + wordmark + tagline)
- [ ] Plebi mobile app rebrand: codebase still named `all-hail-app`, bundle ID (`app.allhail`) needs to change to `app.plebi` before App Store submission
- [ ] Server-side rate limiting on `POST /api/v1/auth/request-otp` — client-side 30s cooldown exists but the endpoint itself is unprotected. Twilio SMS costs are a real attack surface. Add per-IP and per-phone throttling.
- [ ] Update `.env.example` in the Laravel backend with `APP_STORE_LIVE=false` and `APP_STORE_URL=` entries
- [ ] Review and revise section copy: How It Works steps, Features descriptions, Passengers descriptions, and Mission paragraphs are all Claude-authored placeholders. Hero tagline/subtagline are final (Christine-provided).

## Future improvements

- [ ] International phone support: Twilio Fraud Guard configuration, country allowlist, libphonenumber-js for validation, country selector UI in SignupFlow component
- [ ] CSRF token hardening for any future public (unauthenticated) endpoints
- [ ] Minor users with parental consent: policy and flow design, separate from tonight's 18+ age gate
- [ ] Add locale files when translations are available
- [ ] Language switcher in footer (when locales are added)
- [ ] Email verification flow for collected emails
- [ ] Welcome email on signup completion
- [ ] "App is live" batch email to users with `launch_notified_at IS NULL`
- [ ] Universal Links / deep-link auto-login from web signup to app
- [ ] Lighthouse audit at 375px and 1280px — target 95+ all categories
- [ ] Real device testing (iPhone, Android)
- [ ] VoiceOver screen reader testing
- [ ] Newsletter sync to email marketing service (vendor TBD)

## Location sharing and panic button — architectural commitments

### Principles

- Plebi servers never store driver location data
- Panic button dials 911 directly from the driver's phone (no server involvement)
- E911 handles location-to-PSAP routing at the carrier/OS level
- Optional emergency contacts: driver can designate 1-2 contacts who receive SMS with location if panic pressed

### Decided (driver-facing controls)

- Location sharing is opt-in, defaults off
- Driver chooses visibility: connections only, or all riders
- Driver chooses when: always-on, business-hours-only, or toggle-available
- Always approximate (~3 mile radius), never precise coordinates

### Open questions

- How does "all riders can see nearby drivers" work without server-side location storage? Options: (A) accept server storage for this feature only, (B) build peer-to-peer beacon, (C) restrict location visibility to connections only and drop "all riders" option
- Definition of "connection" — past customers, QR code holders, other?
- Backup for panic when phone is destroyed/dead: accept limitation, or notify emergency contacts at ride start with auto-expire?
- Privacy policy language for location data handling
