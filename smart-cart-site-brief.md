# Smart Cart — Scroll-Driven 3D Product Site
### Creative + Technical Brief for Antigravity build (Illoca-matched, full detail)

---

## 0. Confirmed real data on Illoca (not guesswork)

Pulled from Illoca's Awwwards entry (illoca.unseen.co, by Unseen Studio, Honorable Mention 2026) — this is factual, not inferred:

- **Real palette:** `#3B60C5` (a saturated cobalt/royal blue) + `#FDF2DE` (warm cream/paper). Two colors, used boldly — Awwwards tags the site **"Colorful,"** not restrained/monochrome. The blue is a real, confident brand color, not a faint accent.
- **Category tags:** Culture & Education, Architecture, Startups, **Animation, Scrolling, 3D, Microinteractions, WebGL**.
- **Named interaction elements on the live site** (confirmed from the site's own Awwwards element breakdown):
  1. **Reveal Interaction** (category: Mouse Interaction)
  2. **Homepage Scrolling Motion** (category: Interaction)
  3. **Feature Demo Pullout** (category: UI Components)
  4. **Interactive Blocks** (category: Mouse Interaction, WebGL, 3D)
  5. **Overlapping Sections** (category: Footer)

That's five distinct, named interaction systems on one page — this is a **busy, rich, microinteraction-dense site**, not a minimal one. Below, each of your cart's scenes is built using these five confirmed patterns directly, so the result tracks the real thing closely rather than a softened guess.

---

## 1. The core concept

Illoca is dense with motion: scroll-driven motion **and** cursor-driven motion happening simultaneously, layered UI blocks that respond to the mouse, content that pulls out/slides in on interaction, sections that physically overlap and stack rather than sitting in clean vertical rhythm. Nothing here is quiet. Translate that density onto the cart directly — don't thin it out.

Visual register: warm paper/cream base (`#FDF2DE`-family) with confident cobalt blue (`#3B60C5`-family) doing real work as an active UI/accent color throughout — not a whisper-thin single "signal" touch, but a real second brand color appearing in UI chrome, annotation marks, interactive states, and highlight fills.

---

## 2. Art direction

### Palette (locked to the real thing)
- **Base canvas:** `#FDF2DE` warm cream/paper — used as the dominant background across nearly every section.
- **Ink:** a warm near-black graphite (`#221F1A`ish) for type and linework — not pure black.
- **Primary accent — cobalt blue `#3B60C5`:** used liberally — section backgrounds can flip to full blue panels (not just a thin highlight line), UI pullout panels, interactive block faces, hover fills, cursor-follow elements, button/CTA fills, annotation highlight marks. Treat blue as a real second "room" the page moves into, the same way the cream room does.
- Occasional **full-bleed color-swap sections**: some scenes go entirely cream, others flip to entirely cobalt-background-with-cream-type — that alternation itself is a pacing device (confirms the "Colorful" tag — this isn't one static background the whole way down).

### Materials on the model
- Frame tubing: brushed stainless PBR, lit warm and clean — reads well against both the cream and blue backgrounds.
- Panels: matte warm plastic.
- Wire basket: real geometry, casts genuine crosshatch shadow — worth a dedicated Interactive Block moment (see §4).
- Electronics/device box: semi-gloss dark — the natural anchor point for the blue accent (a blue-lit indicator, blue scan-line, blue UI callout attached to it).
- Casters: soft chrome highlight.

### Lighting
Single soft, warm, even light — consistent through the whole page, no dramatic mood swings. Visual variety comes from the **cream/blue background alternation and dense microinteractions**, not from lighting.

---

## 3. Typography

- **Display serif** — architectural/editorial serif, warm graphite ink, large sizes for section headlines.
- **Technical monospace** — uppercase, wide-tracked, small — section numbers, dimension labels, annotation tags, UI micro-copy inside the pullout panels and interactive blocks.
- **Body grotesk** — short, restrained paragraphs.
- On blue-background sections, type flips to the cream tone for contrast — full color inversion per section, not just a tint shift.

---

## 4. Scroll + interaction choreography — built from the 5 confirmed Illoca patterns

Every scene below is explicitly one (or a combination) of Illoca's five named patterns, applied to your cart, rather than an invented generic beat.

**Scene 1 — Hero (Homepage Scrolling Motion)**
Cream background. Cart centered, three-quarter angle. As the user starts scrolling, the model and headline type move at **different rates from each other** (true parallax — type moves faster/slower than the 3D layer, background elements drift at a third rate) — this multi-speed-layer scroll is exactly what "Homepage Scrolling Motion" as a named, awarded pattern means: several independently-paced elements moving together, not a single locked group.

**Scene 2 — Reveal Interaction (mouse-driven, not just scroll)**
As the cart comes into full view, content **reveals in response to cursor position**, not only scroll position — e.g. moving the mouse across the model area reveals hidden annotation labels, a subtle spotlight/gradient follows the cursor across the frame, or a masked reveal (clip-path/mask wipes open) tracks pointer movement. This is a genuinely mouse-reactive layer running concurrently with scroll — build it as its own event listener (pointermove), independent of the scroll-triggered timeline.

**Scene 3 — Interactive Blocks (WebGL, mouse interaction, 3D)**
A dedicated section presenting the cart broken into **individually interactive 3D sub-blocks** — frame, basket, panel, device housing, casters — each rendered/framed as its own hoverable block (grid or staggered layout) that responds to the cursor with real 3D tilt/rotation (subtle perspective tilt following pointer position, like a card that leans toward the cursor), plus a hover-triggered material highlight or label reveal per block. This directly mirrors Illoca's confirmed "Interactive Blocks" element and gives you a natural home for material/spec breakdown by component.

**Scene 4 — Feature Demo Pullout (the "smart" reveal)**
The device housing gets a **UI panel that physically pulls out** from the model on scroll or click — a drawer/panel sliding out from behind or beside the 3D object showing the "smart" feature demo (screen mockup, scan animation, sensor readout) — literally a **pullout**, not a fade-in overlay. This is the named UI-component pattern from Illoca and it's the strongest home for your product's actual smart-feature story.

**Scene 5 — Full color-swap section**
Background flips entirely to cobalt blue, type flips to cream. Cart continues in view (relit slightly cooler to sit against blue, or rendered as a flat cream silhouette against the blue field for contrast). Dimension/spec callouts in monospace. This section exists purely to deliver the "Colorful" alternation Illoca is tagged for.

**Scene 6 — Mobility beat, cursor-parallax**
Camera tracks near the casters; background elements (floor lines, dimension marks) parallax at yet another independent rate as in Scene 1's Homepage Scrolling Motion pattern, and a light cursor-follow parallax tilts the whole scene fractionally toward the pointer — Illoca layers scroll-parallax and cursor-parallax simultaneously, so this scene should too.

**Scene 7 — Overlapping Sections (footer transition)**
Instead of the page ending in a clean, separated footer, the final section **physically overlaps and stacks on top of the previous one** as you scroll into it — the incoming section slides up and over the outgoing one with a visible overlap/shadow, rather than the two simply sitting adjacent. This is Illoca's confirmed named footer pattern — build it as a pinned/sticky outgoing section with the footer sliding over it, not a normal document-flow footer.

**Scene 8 — CTA**
Full-bleed blue or cream (alternate from Scene 7's resolved tone), cart reduced to a simple mark/silhouette, CTA button using the accent blue as a solid fill with a Reveal-Interaction-style cursor-reactive hover state.

---

## 5. Motion language — dense, not damped

- **Two simultaneous animation systems running at once, always:** (1) a scroll-triggered timeline (GSAP ScrollTrigger, scrubbed) for camera/section choreography, and (2) an independent pointer/cursor-driven layer (raw `pointermove`, lightly damped) for tilt, reveal-masks, and Interactive Blocks hover — these should never be merged into a single timeline; they run in parallel the whole time, which is what makes Illoca feel "alive" under the cursor even when you're not scrolling.
- **Multi-speed parallax:** at minimum 3 independent speed layers per scene (background/far, model/mid, type/UI/near), each with its own scroll multiplier (e.g. 0.6x / 1x / 1.4x) — not a single locked group moving together.
- **Camera/section easing:** `power2`–`power3` in/out for scroll-scrubbed moves; snappier `power4.out`/short-duration for click-triggered pullouts and block-hover states (150–250ms) so interactive elements feel immediately responsive, not slow.
- **Interactive Block tilt:** on pointermove within a block's bounds, apply a small 3D rotateX/rotateY tilt proportional to cursor offset from center (max ~6–10°), spring-damped back to neutral on pointer leave — classic "leaning card" physics, fast response (~150ms spring).
- **Pullout panel:** slide + fade, `power3.out`, 400–550ms, triggered either by scroll-threshold or explicit click/hover — make it feel like a drawer, with a slight overshoot-then-settle if you want extra polish.
- **Overlapping-section footer:** the incoming section pins and slides over the outgoing one with a soft drop-shadow that intensifies as the overlap increases — scroll-scrubbed, not a fixed-duration animation.
- **Color-swap section transitions:** background/type color inversion animated together (`power2.inOut`, 400–600ms) exactly at the section boundary — sharp enough to register as a deliberate "room change," not a slow fade.
- **Reveal/mask interactions:** cursor-tracked reveal masks should lag the cursor very slightly (a small damped follow, not 1:1) so it feels alive rather than glued to the pointer.

---

## 6. Technical build pipeline (your model is CAD, not web-ready)

1. Open the STEP in **Blender** (CAD import, or via **FreeCAD** first) or export directly from the original CAD tool (SolidWorks/Fusion 360).
2. Export **glTF/GLB** with separate named meshes per component (frame, panels, basket, device box, wheels) — required for the Interactive Blocks section, where each component needs to be independently hoverable/tiltable.
3. **Decimate/retopologize** — target tens of thousands of triangles, not the raw CAD tessellation.
4. **Draco-compress**, lazy-load behind a branded loading state.
5. Assign PBR materials manually (CAD exports carry none).

**Stack:** React Three Fiber + `@react-three/drei`, GSAP + ScrollTrigger (scroll timeline), a separate lightweight pointer-tracking layer (raw listeners or a small spring/lerp utility — not tied to ScrollTrigger) for cursor-driven interactions, Lenis for smooth scroll, CSS `clip-path`/canvas masks for reveal interactions.

---

## 7. The prompt — paste this into Antigravity

```
Build a scroll-and-cursor-driven 3D product page for a "smart shopping cart" 
in React Three Fiber + GSAP ScrollTrigger + Lenis, art-directed to closely 
match illoca.unseen.co (by Unseen Studio) — confirmed real palette #3B60C5 
(cobalt blue) + #FDF2DE (warm cream), tagged Colorful/Animation/Scrolling/
3D/Microinteractions/WebGL. This should be a DENSE, richly interactive site 
— multiple animation systems running simultaneously, not a minimal one.

CART MODEL: A tube-steel frame cart with a wire-mesh basket, curved matte 
cream/off-white plastic side panels, a semi-gloss black electronics/device 
enclosure mounted low on the frame under the basket, and four chrome swivel 
casters. GLB provided, materials named: frame_steel, panel_plastic, 
basket_wire, device_housing, caster_chrome.

ART DIRECTION:
- Base canvas #FDF2DE (warm cream/paper), ink #221F1A (warm near-black), 
  primary accent #3B60C5 (cobalt blue) used boldly and confidently — full 
  section backgrounds flip entirely to blue with cream type at points in 
  the page, not just a thin accent line. Alternating cream/blue full-bleed 
  sections is a deliberate pacing device.
- Single soft warm consistent lighting on the model across all scenes — 
  visual variety comes from color-alternation and interaction density, not 
  lighting mood.
- Typography: architectural editorial serif for headlines, uppercase wide-
  tracked monospace for labels/annotations/dimensions, clean grotesk body. 
  Full color-inversion of type on blue-background sections.

BUILD THESE FIVE NAMED INTERACTION SYSTEMS (matching Illoca's actual 
confirmed site elements), applied to the cart:

1. HOMEPAGE SCROLLING MOTION — multi-speed parallax. At least 3 independent 
   scroll-speed layers per scene (background/far ~0.6x, 3D model/mid ~1x, 
   type-UI/near ~1.4x), never locked into a single moving group.

2. REVEAL INTERACTION — a cursor/pointermove-driven reveal layer running 
   PARALLEL to and independent from the scroll timeline at all times (not 
   merged into ScrollTrigger). Moving the mouse over the model reveals 
   hidden annotation labels via a damped cursor-follow spotlight/mask 
   (clip-path or shader mask), lagging the cursor slightly rather than 
   snapping 1:1.

3. INTERACTIVE BLOCKS — a dedicated section presenting the cart's named 
   mesh components (frame, basket, panel, device housing, casters) as 
   individually hoverable 3D blocks in a grid/staggered layout. On 
   pointermove within a block, apply proportional 3D tilt (rotateX/Y, max 
   6-10°) toward the cursor, spring-damped back to neutral on pointer leave 
   (~150ms), plus a hover-triggered material highlight and label reveal.

4. FEATURE DEMO PULLOUT — the device-housing "smart" feature reveal as a 
   literal sliding drawer/panel that pulls out from behind/beside the 3D 
   model (not a fade-in overlay), triggered by scroll-threshold or click, 
   power3.out, 400-550ms, showing the smart-feature demo (screen mockup, 
   scan animation, sensor readout) inside the pulled-out panel.

5. OVERLAPPING SECTIONS (footer) — the final section physically overlaps 
   and stacks on top of the previous section as the user scrolls into it 
   (pinned outgoing section, incoming section slides up and over it with a 
   scroll-scrubbed drop-shadow that intensifies with overlap) rather than a 
   normal document-flow footer.

SCENE SEQUENCE (~120vh each unless noted):
1. Hero — cream bg, Homepage Scrolling Motion (3-layer parallax) on cart + 
   headline + background.
2. Reveal Interaction layer becomes active as cart comes into full view — 
   cursor-tracked annotation reveals.
3. Interactive Blocks section — cart broken into hoverable/tiltable 3D 
   component blocks.
4. Feature Demo Pullout — device housing smart-feature drawer.
5. Full color-swap section — background flips to #3B60C5, type flips cream, 
   dimension/spec callouts in monospace.
6. Mobility beat near casters — Homepage-Scrolling-Motion-style multi-speed 
   parallax again, plus subtle cursor-parallax tilt on the whole scene.
7. Overlapping Sections footer transition — pinned/sliding-overlap into 
   final CTA.
8. CTA — full-bleed color block, cart reduced to a simple mark, CTA button 
   with Reveal-Interaction-style cursor-reactive hover.

MOTION RULES:
- Two animation systems always running in parallel: (1) GSAP ScrollTrigger 
  scrubbed timeline for scroll-driven camera/section choreography, (2) an 
  independent lightly-damped pointermove layer for tilt/reveal/parallax — 
  never merge these into one timeline.
- Scroll-scrubbed moves: power2/power3 inOut easing.
- Click/hover-triggered UI (pullout panel, block hover, CTA hover): snappier 
  power4.out or spring physics, 150-550ms depending on element size.
- Interactive Block tilt: proportional rotateX/Y toward cursor, max 6-10°, 
  spring-damped return (~150ms) on pointer leave.
- Color-swap section transitions: power2.inOut, 400-600ms, sharp enough to 
  register as a deliberate scene/room change.
- Cursor-follow reveal masks lag the pointer slightly (damped, not 1:1).
- Lenis smooth scroll, lerp ~0.09.

TECHNICAL:
- React Three Fiber + drei, GSAP + ScrollTrigger, Lenis, a separate 
  lightweight pointer-tracking utility (independent of ScrollTrigger) for 
  cursor-driven interactions, CSS clip-path or shader-based masks for 
  reveal interactions.
- Draco-compressed GLB, named-mesh targeting per component (frame, panels, 
  basket, device housing, casters) required for the Interactive Blocks 
  section.
- Mobile-responsive: pointer-driven interactions (tilt, reveal) degrade to 
  scroll-triggered or tap-triggered equivalents since there's no persistent 
  cursor; parallax layer count can reduce from 3 to 2 on small viewports.
```

---

## 8. What's confirmed vs. what's extrapolated

**Confirmed directly from Illoca's Awwwards data (used above as fact):** the real hex palette, the "Colorful" tag, and the five named interaction elements (Reveal Interaction, Homepage Scrolling Motion, Feature Demo Pullout, Interactive Blocks, Overlapping Sections) and their categories.

**Extrapolated** (I still can't play the live compiled WebGL frame-by-frame): the exact easing curve values, exact tilt degrees, exact parallax multipliers, and exact panel slide distances are genre-accurate estimates for this pattern set, not measured off the live site. Worth a final pass: open illoca.unseen.co, trigger each of the five named interactions once, and eyeball-match your timing/degree values against what you see before calling it done.