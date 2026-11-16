# Webapp, navigation and delivery

Purpose / keywords: heatmap, plans 2D, bâtiment, étage, mobile, PC, couleurs, trouver du frais/chaud, compte, hébergement gratuit.

## Confirmed initial experience

- Public, responsive webapp for phone and desktop, deployable on free hosting.
- 2D plans, not a 3D modeling project. Three buildings and floor-by-floor browsing.
- Heatmap visible from the overview of buildings, then a detailed room-colored plan when selecting a floor. Exact overview composition is still to design; do not reduce it to a single averaged building score.
- Calculation is per room; consultation is per floor. No room-click interaction or individual room-detail panel is required.
- Same color scale across the school, never independently normalized per floor/building.
- Colors express relative colder-to-warmer conditions, not Celsius readings. User wants a sufficiently broad, distinguishable spectrum, including visible weather changes when ordering is unchanged.
- Switch between without-equipment and with-equipment views: [indicator rules](indicator.md).

## Two journeys

1. **Explore:** navigate buildings/floors and inspect room colors and identifiers.
2. **Find a place:** choose 'find cool' or 'find warm', see suitable room identifiers/building/floor, and open the relevant plan with the destination located. This does not require clicking a room on the plan.

Thermally favorable does not mean unoccupied, reserved or physically accessible. Do not imply live availability. The general-public recommendation eligibility/access policy remains to define; no profile filters can be assumed in the account-free release.

## Visual decisions still open

- Overview layout that exposes room-level heatmap previews while remaining readable on mobile.
- Exact palette, legend, score boundaries, equipment-optimal treatment and accessibility alternatives to color alone.
- No-data appearance: gray was proposed, not explicitly approved. Missing-data state must not be confused with a favorable room.
- A school-wide scale is confirmed. Freezing absolute score/color boundaries as coverage grows was proposed, not explicitly approved; no per-view rescaling should be inferred.
- Search/filter details, shortlist length, tie handling and plan destination highlighting.

## Architecture boundary

No database or accounts in the first release. Selected stack: React + TypeScript + Vite, SVG plans, JSON application data, responsive CSS and Vitest. CSV collection data is being prepared; its columns are not yet defined. An AI agent will reproduce photo plans as schematic SVGs.

See [technical architecture](technical.md) for selected technologies, asset/data boundaries, common outdoor temperature and approved primary/backup weather behavior. Host and weather providers remain unselected; no implementation or deployment is verified.

## Deferred personalization

- Optional account creation with a form for self-declared status and intended uses; public viewing remains available without login.
- Login gives a personalized view and recommendations; it does not change the common thermal meaning of colors.
- Self-declaration is sufficient for advice; no school identity approval or actual access authorization is required.
- Rooms incompatible with a profile remain visible but marked as not accessible to that profile and excluded from its recommendations. This is not live occupancy status or door control.
- Auth/profile persistence will require a later architecture decision; do not add it to the initial static scope.

Evidence: user-approved brainstorming requirements. Historical [project proposal](../../idée_de_Projet.md) includes earlier personalized/real-time ambitions, not delivered features. Existing plans: [asset routes](index.md#existing-evidence--assets). No verified UI/source/test owners yet.
