---
disable-model-invocation: true
name: writing-plans
description: Create an actionable implementation plan from requirements; invoked manually.
---

# Writing Plans

Create a practical implementation plan for an engineer unfamiliar with the project. This skill is standalone: it does not require prior brainstorming or invoke an execution skill.

Announce that you are creating the plan. Inspect the relevant code and requirements first; identify uncertainties rather than inventing details. Ask for clarification when a consequential choice cannot be resolved from the available context.

## Plan

- State the goal, relevant architecture, technology and constraints.
- Divide the work into small, ordered tasks with exact file paths and dependencies.
- For each task, specify the intended changes, relevant examples or interfaces, and focused verification commands with expected results.
- Include tests for meaningful behavior and regression risks; prefer a failing test before implementation where practical.
- Include final integration checks and note risks or unresolved decisions.
- Keep the plan proportionate: avoid speculative features, unnecessary boilerplate and mandatory commits.

Save the plan to `docs/plans/YYYY-MM-DD-<feature-name>.md` unless the user requests another location or format. Present its location and key decisions when finished. Execution requires the user's direction and does not depend on any particular skill.
