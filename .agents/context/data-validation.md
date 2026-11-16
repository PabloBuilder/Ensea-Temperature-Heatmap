# Data collection and experimental validation

Purpose / keywords: fiche salle, patrimoine, matériaux, isolation, construction, ventilation, ombrage, capteur, fiabilité.

## Confirmed constraints and decisions

- Exact wall materials, construction assemblies and ventilation rates are not known. Do not fabricate physical parameters.
- Consult the school's estate/facilities service (patrimoine) to establish useful constructive categories, renovations and known defects. Do not infer insulation quality from short room-temperature tests.
- Known period labels: approximately 1995, 2009–2010, 2011. Keep these as descriptive categories until patrimoine evidence supports differences in scoring; do not assume chronological thermal ordering.
- A critical-insulation/thermal-defect zone is a separate attribute, not necessarily a fourth construction period. Record the reason for that designation and avoid double-counting the same defect.
- No real-time occupant counts or activity-dependent equipment loads. A fixed exception for substantial permanent heat sources is accepted where relevant.
- Ventilation capacity is unknown. Observable openable windows and potential cross-ventilation are acceptable descriptors, not measured airflow rates.
- Simplify external shading: record only important exceptions if observed. Keep window protections distinct from shadows cast by surrounding buildings. Negligible mutual shading is an assumption to check, not a verified site fact.
- Inventory air-conditioned/heated spaces and obtain their operating periods from the school; operation is assumed functional, not measured live.

## Working collection fields, not a finalized schema

Room/building/floor identifiers; construction period and evidence; renovations; known defects; direct roof exposure; floor area; glazing area by orientation; solar protections; equipment presence; window-opening/cross-ventilation potential; important permanent heat sources; exceptional shading.

These fields were discussed as a collection baseline, not all guaranteed available or approved as weighted inputs. Define units or consistent observation categories before collection. Record unknowns explicitly, never silently as zero or absence. Track source/estimate/uncertainty to support defensible school decisions.

## Validation, not operation

- No permanent indoor sensor network is planned. A sensor is used only during tests of indicator reliability.
- No multi-room continuous logging deployment was committed. Sensor count, timing, comparison design and equipment conditions remain open.
- Experiments should assess the hierarchy; do not confuse them with measuring wall insulation or directly supplying map values.
- Sequential room measurements can be confounded by changing weather, time and usage. Protocol must account for those differences before claiming room-to-room ranking accuracy.
- Assess both scenarios honestly: a measurement under heating/cooling does not directly validate the counterfactual without equipment.

## Evidence and next owners

Current source: user brainstorming and technical decisions. The team is preparing CSVs containing collected room data for AI-assisted processing. CSV is the chosen collection format, but headers/schema are not yet defined and no files or validated dataset were inspected. JSON is selected for application data. A reproducible CSV-to-JSON converter and checks were recommended, not yet explicitly approved or implemented; see [technical architecture](technical.md).

External evidence still to obtain: patrimoine records, equipment inventory, operating calendars, room inventory, field observations and test records. No completed collection or experimental test owner is verified.

Available plan assets are linked from [context index](index.md); their contents have not been inspected. Historical visual A–D/1–4 insulation descriptions in the original documents are not the current evidence-backed classification method.
