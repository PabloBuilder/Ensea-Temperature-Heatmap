# Thermal indicator contract

Purpose / keywords: formule custom, hiérarchie, météo, température extérieure, chauffage, climatisation, indice.

## Confirmed requirements

- Rank rooms thermally, not predict or display indoor temperatures in degrees Celsius.
- Initial inputs: fixed room characteristics and one current outdoor weather temperature shared across the entire school. No live indoor measurements or occupancy inputs. Primary/backup API and last-known-value behavior: [technical weather contract](technical.md#approved-weather-behavior).
- The indicator must work year-round; no separate user-facing winter/summer comfort profile is required.
- A room's color may change with outdoor weather even when its ranking stays the same.
- Recent temperature history/inertia modeling and actual weather irradiance are deferred. Static orientation, glazing and protections remain candidate room characteristics; they are not live solar measurements.

## Two views of the same underlying method

1. **Without equipment:** evaluate room characteristics without credit for heating or air conditioning.
2. **With equipment:** retain the same underlying method but treat rooms with relevant operating equipment as optimal: air conditioning in cooling periods, heating in heating periods. This is a priority/override rule, not a second physical model or equipment-power simulation.

Assume installed equipment works, per user decision. Ask the school for operating periods/hours and differences by room/building; those facts are currently unavailable. Do not invent season dates or activation thresholds. A room may be optimal by equipment assumption without having a known indoor temperature.

The user expects this distinction to be most useful in summer because cooling is less widespread than heating; actual equipment inventory is pending.

## Scientific boundaries / recurring traps

- The original T_ext + P_solaire / H_total is a historical sketch, not the approved final equation. Do not implement it blindly or attach Celsius labels to it.
- Adding the same outdoor temperature term to every room changes values but not ordering. Weather-dependent reordering requires justified room-specific responses.
- Whether/how ordering should change with weather remains undecided; the user asked for clarification, not approval of a particular model.
- Construction year alone does not establish insulation performance, thermal inertia or summer overheating quality.
- Do not simulate stored heat in the initial model while historical weather inputs are explicitly deferred.
- Without-equipment behavior may be counterfactual when heating actually operates; measured indoor temperature is not automatically a valid observation of that scenario.

## Decisions still required

- Exact criteria, score meanings, normalization, formula, coefficients and their justification.
- Quantitative role of current outdoor temperature and response of each room category.
- Mapping from scores to colors, contrast, handling near-ties and uncertain/missing data.
- How optimal equipment rooms appear in both warm-seeking and cool-seeking recommendations without implying a temperature or an intra-group ranking not calculated.
- Validation protocol and acceptable ranking error: see [data and validation](data-validation.md).

Evidence: current user decisions/corrections in brainstorming; historical equation in [formula sketch](../../formule%20de%20la%20température%20intérieur.md) and [original proposal](../../idée_de_Projet.md). No approved calculation implementation, symbols or tests exist in verified context.
