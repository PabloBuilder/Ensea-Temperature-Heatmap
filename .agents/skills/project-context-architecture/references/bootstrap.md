# Bootstrap workflow

1. **Scope and evidence.** Identify project goal, lifecycle, users, technologies, domains, entry points, constraints, and intended agent environment from available project instructions, manifests, existing docs and targeted source/tests. For a new or empty project, use user-stated decisions only; label open questions and do not invent components. Search by relevant terms before viewing source; full-file reads are a last resort.
2. **Design minimally.** Reuse the active entry point and conventions. Select only domains supported by evidence; group by real intent and ownership rather than a fixed template. For each domain, identify its index, likely task vocabulary, source owners and high-value risks. Create deep topic nodes only for independent complexity. A UI surface/deep-logic split is optional, not universal. If no compatible entry exists, propose an agent-supported root entry and paths appropriate to the environment; do not assume an arbitrary file is automatically loaded.
3. **Plan and write within authorization.** Summarize proposed paths, reuse, conflicts and gaps. Create a concise dispatcher, domain indexes and only necessary leaves, or make the smallest compatible additions to an existing graph. Each route states when to follow it. Each leaf records purpose, keywords -> owner/symbol/test paths when verified, boundaries, and source references. Prefer relative links; retain existing instructions and avoid duplication. Do not overwrite README or rules. Ask before changing an established topology or files outside scope.
4. **Validate.** Check links and existence of referenced paths, verify representative claims against sources, and trace at least two relevant intents from active entry to owner (or all if fewer). Test that growth to 50 leaves needs index changes, not root catalog changes. Report missing evidence and any agent discovery mechanism not verified.

## Default layout (adapt, do not duplicate an existing graph)

Use this layout when the target agent supports the entry point and the project has no established equivalent. Verify the actual discovery convention first; otherwise place or link the root where that agent loads it. Create only domains and leaves justified by evidence, not empty placeholder folders.

```text
AGENTS.md                         # L0: short intent dispatcher and shared rules
.agents/
  <domain>-index.md               # L1: intent / keywords -> relevant leaves
  contexts/
    <domain>/
      <topic>.md                  # L2: focused owner, symbols, boundaries, tests
      <topic>-logic.md            # optional: complex internals, linked from topic
```

For each domain index, use compact routes: `intent / user terms -> [topic](contexts/<domain>/<topic>.md) -> when to read`. A topic maps user vocabulary to confirmed source paths and symbols, relevant tests, constraints and deeper links. Paths and names are examples, not a mandatory framework. For a small or empty project start with the root and only the needed index/leaf; add branches as evidence appears. Keep the README for human overview, not the graph's sole entry point.

## Split and route when context grows

- Review a node for splitting when it exceeds roughly 150 lines or 1,500 words, or earlier when it covers independent intents, owners, or expensive details rarely needed together. These are review triggers, not rigid limits or targets; preserve coherence and honor project-specific constraints.
- Extract cohesive, independently useful topics into focused leaves. Keep the parent as a short router with an intent/keyword, a relative link and a condition for each child; retain shared invariants only once. Split UI surface from deeper logic only when separately useful. Do not create chains of single-link routers or split tightly coupled facts merely to meet a number.
- If a domain index itself grows, group routes into bounded subdomain indexes; the root still routes by stable domain, never enumerates leaves. At every split update inbound links, remove stale duplicate content, preserve source evidence, verify all relative links and trace affected intents to owners. Do not delete or relocate existing material outside authorized scope; propose migrations if necessary.

Done when an authorized minimal graph is reachable, evidence-backed and navigable, or a proposal/blocker is reported without implying implementation.
