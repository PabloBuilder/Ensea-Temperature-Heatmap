# Technical architecture decisions

Purpose / keywords: React, TypeScript, Vite, CSS, Vitest, SVG, CSV, JSON, API météo, fallback, hébergement gratuit.

Evidence: user-approved technical brainstorming after the initial context bootstrap. All items describe intended design, not implemented code. No package manifest, application source, executable tests or deployment was found in the inspected root inventory. Do not invent source owners/symbols; add targeted routes when implementation exists.

## Selected stack and boundaries

- React + TypeScript + Vite; user explicitly approved the proposed stack.
- SVG floor plans, JSON application data, responsive CSS and Vitest for calculation tests.
- Initial release: publicly viewable phone/desktop webapp, no accounts, database or application server required. Free hosting is a requirement, not a verified deployment.
- Open-Meteo is selected as primary weather API; SunCalc is selected for local solar-position calculation. See the weather contract below.
- Exact package versions, host, backup weather provider, mobile pan/zoom library and build/deployment configuration remain unselected.
- Agent-assisted development is intended; user skill level is not a reason to avoid the selected stack. Maintainability still matters.

## Plans: photos to schematic SVG

Confirmed: the team supplies photos of reference plans; an AI agent reproduces them as SVGs. Visual geometry may simplify actual proportions and is based on the plans, not a survey-grade reconstruction. Actual dimensions are being collected independently.

Boundary: visual room geometry must not be treated as measured physical area or an input from which to infer real dimensions.

Recommended workflow, not yet separately approved:
1. Identify room labels, boundaries and circulation; flag unreadable/ambiguous content instead of inventing it.
2. Produce one SVG per floor with stable room identifiers matching data identifiers.
3. Have the team check the reconstruction before integration; label diagrams as schematic/not to scale.
4. Apply computed colors by identifier and validate missing/duplicate mappings.

Existing [plan assets](index.md#existing-evidence--assets) have not been assessed for legibility or completeness. No SVG assets are verified yet.

## Collection and application data

Confirmed: the team is preparing CSVs for AI-assisted processing; columns have not yet been defined. JSON was approved as the application data format. Do not invent a schema or claim the CSVs already exist in the repository.

Recommended, pending approval: preserve source CSVs; use AI to help specify/write a deterministic conversion and validation script, rather than reinterpreting data on every update. Proposed chain: CSV -> validation/conversion -> JSON -> application.

Proposed checks: identifier uniqueness, units/ranges, missing values, and SVG/data correspondence. Unknowns must not be fabricated. Detailed data requirements and scientific validation: [data and validation](data-validation.md).

Proposed separation of concerns: building/floor inventory, room characteristics, SVG assets, model configuration, pure calculation functions, weather adapters and React presentation. File/folder structure and module names are not yet selected.

## Approved weather behavior

- Shared school-level inputs: outdoor temperature plus solar irradiance from Open-Meteo. Date/time and school coordinates drive local SunCalc solar azimuth/elevation calculations. No per-room/building weather requests are needed.
- This supersedes the earlier temperature-only / solar-deferred scope. Solar inputs are now approved design inputs, not an implemented or validated model.
- Open-Meteo fields: temperature_2m (Celsius), shortwave_radiation (W/m²); sunrise/sunset are available but do not replace solar-position calculations. Direct/diffuse radiation variables may support facade exposure; exact fields and projection method remain to choose.
- Weather values are model-based estimates for the location, not on-site real-time sensor observations. Radiation interval/reference timestamps matter; do not assume instantaneous irradiance or fresh observations on every client refresh.
- Use a primary provider, falling back to a secondary if the primary fails. The user accepted the discussed failure behavior: request failure, timeout or invalid data triggers fallback.
- If both fail, retain the last known temperature and visibly show its age.
- If no previous value exists, explicitly mark the weather-dependent indicator unavailable; never invent a temperature.
- No manual-temperature simulation mode was approved.

Recommended adapter output: temperature, reference timestamp and provider. Distinguish observation/reference time from retrieval time when selecting APIs. Both providers should offer comparable data for the school's location.

Still open: backup provider, coordinates, refresh cadence, timeout/retry policy, validation/freshness limits, cache persistence and expiry, and treatment of recommendations when weather is unavailable or old. Do not assume an indefinitely usable stale value or infer a silent default.

The backup must be assessed for both temperature and radiation. Temperature-only degraded operation was suggested, not separately approved; do not silently fabricate radiation or claim full equivalence between providers.

Reference documentation: [Open-Meteo API](https://open-meteo.com/en/docs), [usage terms](https://open-meteo.com/en/terms). Free no-key access is subject to non-commercial terms, quotas and attribution; confirm institutional eligibility before deployment. Exact quota/cadence is not frozen in this context.

Before integration, verify free-tier conditions, browser CORS support and credentials: a static client must not expose provider secrets. If a provider requires a secret, revisit the provider or architecture rather than adding an unapproved server implicitly.

## Implementation tests to design, not existing coverage

Vitest is selected. Candidate tests: model rules and equipment overrides, primary/backup weather paths, malformed responses, no-history and stale-data states, CSV validation and SVG/data identity consistency. Exact protocol, fixtures and source/test owners remain to create. Passing software tests would not establish scientific validity of the thermal ranking.
