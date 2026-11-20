# Project scope

Purpose / keywords: idée globale, école, confort thermique, réorganisation, déploiement progressif.

## Confirmed user decisions

- Build a serious, documented thermal hierarchy of ENSEA spaces that the school can use for future activity/room reorganization.
- Support all three uses from the same foundation: building diagnosis, guidance for occupants, and organizational decisions. The heatmap is a presentation tool, not the entire research contribution.
- Operate year-round; strongest value during hot weather. Users may seek cooler or warmer places, rather than a single seasonal comfort ranking.
- Target the whole school, implemented incrementally as data becomes available. No initial building/floor has been selected; collection is incomplete.
- User-described scale: three buildings, four floors per building, approximately 17–40 rooms per floor. Coverage and actual inventory still require confirmation from school records.
- Calculate at room level and browse at floor level. Do not replace room scores with building/floor averages.
- Publish a free-hostable webapp usable on phones and computers, initially without accounts or a database.

## Initial release boundaries

- Static room characteristics plus shared outdoor temperature, solar irradiance and date/time-based solar position drive the planned indicator. Open-Meteo + SunCalc are selected; calculation details remain to define.
- Colors convey thermal hierarchy, not estimated/measured indoor temperatures in degrees Celsius.
- Two equipment views and two navigation journeys: see [indicator](indicator.md) and [webapp](webapp.md).
- No indoor sensor feed, real-time occupancy tracking, reservation system or physical access control.
- Measurements are for experimental validation only.

## Deferred evolution

Recent weather history/accumulation and optional profile-based personalization remain deferred. Actual solar inputs were subsequently promoted into the approved design scope. Whole-school coverage grows with available data. See [future directions](future.md) for goals, prerequisites, boundaries and unapproved possibilities; no schedule or implementation order is agreed.

## Quality and open work

Record provenance, assumptions and uncertainty; justify model choices and test rankings before claiming reliability. No formula, coefficient set or indoor temperature prediction has been approved. School decisions also need pedagogical, equipment, capacity and access constraints; thermal ranking alone cannot settle allocation.

Evidence: user decisions in the project brainstorming conversation; historical motivation in [original proposal](../../idée_de_Projet.md). That proposal's implementation-like language is not proof of delivered features. No verified implementation owners or tests yet.
