# Project context index

## Status and evidence

Requirements/design discovery. React + TypeScript + Vite and supporting technologies are selected; no application implementation, executable tests or finalized formula verified. Evidence: user decisions in the initial brainstorming and subsequent technical discussion (stack, AI-produced SVGs, CSV preparation and weather failover). These are requirements, not implemented behavior. Read only the branch needed.

## Intent routes

| User intent / keywords | Next node | Read when |
|---|---|---|
| idée globale, objectif, réorganisation, périmètre | [Project scope](project.md) | Establish purpose and first-release boundaries |
| voies futures, évolution, roadmap, étapes, historique, ensoleillement, personnalisation | [Future directions](future.md) | Explore deferred directions, prerequisites and non-commitments |
| formule, indice, classement, température extérieure, climatisation, chauffage | [Thermal indicator](indicator.md) | Discuss calculation, scientific limits or equipment rules |
| données, patrimoine, isolation, construction, capteur, tests | [Data and validation](data-validation.md) | Prepare collection, resolve missing evidence or design experiments |
| heatmap, couleurs, bâtiment, étage, téléphone, meilleurs endroits, compte | [Webapp and delivery](webapp.md) | Design navigation, recommendations or personalization |
| code, React, TypeScript, Vite, SVG, CSV, JSON, API météo, Open-Meteo, SunCalc, soleil, fallback, hébergement | [Technical architecture](technical.md) | Select implementation boundaries, prepare assets/data or implement weather resilience |

## Existing evidence / assets

- [Original project proposal](../../idée_de_Projet.md): historical motivation, organization, survey and initial formula. Not evidence that an app or survey is currently operational.
- [Original temperature formula](../../formule%20de%20la%20température%20intérieur.md): initial formula sketch, not a validated or finalized specification.
- [School plans PDF](../../Plans%20ENSEA.pdf) and [building D floor image](../../Batiment%20D-%203%20éme%20etage%20.png): existing assets; contents, coverage, geometry and reuse suitability not inspected during bootstrap.

Later user decisions refine the original documents: year-round ranking rather than exact temperatures; Open-Meteo temperature/irradiance plus SunCalc solar position (superseding temperature-only scope); equipment priority rather than equipment simulation; accounts deferred. Do not silently restore superseded historical assumptions.

## Navigation boundaries

Each leaf lists evidence, boundaries and unresolved decisions. Implementation owners/symbols/tests do not yet have verified routes. Add those routes once implementation exists; do not invent paths. Grow domain routing here rather than turning the root AGENTS.md into a leaf catalog.
