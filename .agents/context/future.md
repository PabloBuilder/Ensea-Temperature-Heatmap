# Future directions

Purpose / keywords: voies futures, évolution, roadmap, personnalisation, compte, historique météo, inertie, ensoleillement, extension école.

Evidence: user decisions in project and technical brainstorming. These are deferred directions, not implemented features, scheduled milestones or approval to implement them now. No delivery order or dates are agreed.

## Confirmed deferred directions

### Actual solar conditions

- Extend the initial current-outdoor-temperature input with actual weather irradiance/solar conditions.
- Goal: distinguish sunny and cloudy conditions and refine exposure effects across rooms.
- Boundary: static window orientation, glazing and protections may already inform the initial indicator; actual solar weather is deferred.
- Before implementation: select data/provider, define how weather relates to each facade and protections, justify coefficients, and test improvement in room ranking. Do not equate horizontal irradiance directly with that received by every window.
- Current contract: [indicator](indicator.md); provider architecture: [technical context](technical.md).

### Recent weather history and thermal accumulation

- Incorporate recent outdoor temperature history to represent persistent heat/cold and incomplete overnight recovery.
- No permanent indoor sensor network is implied; history can come from weather providers.
- Before implementation: choose history duration, obtain dependable records, define category-specific response assumptions and validate whether history improves the hierarchy.
- Do not automatically amplify only poorly insulated rooms: insulation, inertia and cooling opportunities are different properties, not all known from construction year.
- Physical characterization and experiment boundaries: [data and validation](data-validation.md).

### Optional accounts and personalized guidance

- Public map remains available without login. Logged-in users receive a view/recommendations adapted to their self-declared profile and intended uses.
- A profile form may capture school role, individual/group work and equipment needs; exact questions and stored fields remain undefined.
- Self-declaration is enough for advice. No school identity approval, physical access authorization or door-control integration is intended.
- Incompatible rooms remain visible but marked as inaccessible to that profile and excluded from its recommendations. Do not describe this as live occupancy availability.
- The shared thermal calculation/color meaning does not change by user; recommendation eligibility does.
- Before implementation: define room eligibility rules, authentication/profile storage, privacy/data minimization, account deletion and hosting implications. These are design questions, not selected services or an approved database schema.
- Detailed experience boundary: [webapp](webapp.md#deferred-personalization).

## Incremental school coverage

Whole-school coverage is the confirmed target, not an additional feature beyond the project. Extend buildings/floors as inventories, CSV characteristics and checked SVGs become available. No first floor or expansion sequence is selected.

Use the same room identity and school-wide color semantics across coverage; do not substitute floor/building averages. Revisit validation as new room types appear. Exact missing-data styling and score/color boundaries still need approval.

## Possible enabling work, not separately approved features

- Persistent profile storage and authentication may be needed for accounts; do not introduce them into the initial account-free release preemptively.
- Model comparison, richer validation and documented uncertainty can support later scientific improvements; methods and acceptance criteria remain open.
- School reorganization is an existing core purpose, not approval for an automated scheduling engine. Any future allocation feature would require separate discussion of pedagogical, capacity, equipment and access constraints.

## Not promised by this roadmap

No agreed live occupancy tracking, reservations, permanent indoor sensor feed, exact indoor-temperature predictions, 3D model or actual access-rights management. These exclusions must not silently turn into backlog commitments.

## Update rule

When an evolution is selected for implementation, explicitly approve its scope and dependencies, revise the relevant current contract, and add verified code/test owners once they exist. Keep deferred ideas separate from current runtime behavior. Architectural choices must be justified by the active release, not speculative future scale.
