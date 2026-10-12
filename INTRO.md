# Intro loader

A perspective room is drawn line-by-line while a counter runs 000 -> 100 (gated by real
asset loading). The camera then dollies into the back wall, which opens as a window onto
the hero, and the header slides in.

## Files
- `src/components/intro/room.ts`        geometry + canvas drawing (no DOM). Fitted to the reference frame.
- `src/components/intro/IntroLoader.tsx` timeline, counter, scroll lock, hero window reveal (no image in the intro).
- `src/routes/index.tsx`                mounts the loader; `INTRO_ASSETS` = images the counter waits for.
- `src/styles.css`                      `--intro-bg`, `--intro-ink`, counter style, header slide-in, hairline scrollbar.
- `src/components/chrome.tsx`           header got the `site-header` class (parked above the viewport during the intro).

## Tuning
- Colours: `--intro-bg` / `--intro-ink` in `styles.css`. To use the site palette instead of sage/oxblood:
  `--intro-bg: var(--color-paper); --intro-ink: var(--color-primary);`
- Timing: `MIN_LOAD`, `HOLD`, `DOLLY` at the top of `IntroLoader.tsx`.
- Camera rest pose / room shape: `REST_POSE`, `ROWS`, `SLICES` in `room.ts`.
- Plays once per page load (client-side navigation back to "/" skips it). `prefers-reduced-motion` skips it entirely.
