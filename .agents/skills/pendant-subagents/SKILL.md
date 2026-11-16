---
name: pendant-subagents
description: Enforce explicit model allocation, profile selection, tool sandboxing, cold-start context handoff, and strict write perimeter isolation when dispatching native Pi child sessions via pendant_agent.
---

# Universal Skill: Pi Pendant Subagent Orchestration

## Core Invariant: Explicit Model Declaration (CRITICAL)

In Pi Pendant, calling `tools.pendant_agent` without an explicit `model` argument **silently inherits the parent session's model**. This is strictly prohibited. Every subagent dispatch MUST explicitly declare:
1. `model`: Specific target model string from the allocation matrix.
2. `thinkingLevel`: Appropriate reasoning effort (`off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`).

---

## Tool Reference (`pendant_agent`)

### 1. Dispatch Signature
```typescript
tools.pendant_agent({
  kind: "new",                            // "new" | "resume"
  profileId: "general-purpose",           // Required for "new": "explore" | "plan" | "general-purpose" | "reviewer" | "verifier"
  context: "fresh",                       // Required for "new": "fresh" (isolated) | "fork" (inherits history)
  model: "provider/model-id",             // CRITICAL: Explicit model ID (e.g., "antigravity/gemini-3.8-flash", "openai-codex/gpt-6.1-terra")
  thinkingLevel: "medium",                // "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max"
  name: "task-name",                      // Optional short UI label
  task: "Clear, bounded prompt...",       // Specific instruction with inputs and expected output format
  background: true                        // Optional: true (async background report) | false (blocking wait)
});
```

#### Profiles & Runtime Tool Sandboxing Matrix:
In Pi Pendant, `profileId` enforces hardware/runtime tool availability in the child worker sandbox:

| `profileId` | Allowed Tools (`tools`) | Blocked Tools (`disallowedTools`) | Runtime Sandbox Guarantee |
| :--- | :--- | :--- | :--- |
| **`explore`** | `["read", "grep", "find", "ls"]` | All others (`edit`, `write`, `bash`, `codemode` withheld) | **Guaranteed Read-Only**: physically impossible for the agent to modify files or execute shell commands. |
| **`plan`** | `["read", "grep", "find", "ls"]` | All others withheld | **Guaranteed Read-Only**: architectural investigation without file mutation. |
| **`reviewer`** | `["read", "grep", "find", "ls"]` | All others withheld | **Guaranteed Read-Only**: independent audit; cannot alter code. |
| **`verifier`** | Inherited (including `bash`) | `["write", "edit", "pendant_agent", "subagent"...]` | **Execution Without Mutation**: can run tests via `bash`, but physically blocked from modifying source code. |
| **`general-purpose`** | All inherited tools | None | **Full Capability**: has `edit`, `write`, `bash`, and MCP tools (via `codemode`). Requires prompt boundary perimeter. |

---

### 2. Coordination & Lifecycle Tools

| Action | Tool Call | Notes |
| :--- | :--- | :--- |
| **Wait** | `pendant_agent_wait({ invocationIds: ["id1", "id2"] })` | Blocks until specified background runs complete. |
| **Poll Status** | `pendant_agent_status()` | Returns all active and recent terminal invocations. |
| **Steer / Follow-up** | `pendant_agent_message({ childId: "...", mode: "steer", text: "..." })` | `steer` interrupts active turn; `follow_up` queues message. |
| **Cancel** | `pendant_agent_stop({ invocationId: "..." })` | Cancels specific invocation and descendants (or all if omitted). |

---

## Orchestrator Best Practices & Isolation Rules

### 1. Strict Write Perimeter Partitioning (CRITICAL)
- **Shared Working Directory**: Subagents and the orchestrator share the exact same filesystem.
- **Exclusive Write Boundaries**: When dispatching an agent with write/edit permissions, the prompt MUST explicitly define the strict file/folder perimeter it is allowed to touch.
- **Zero Collision Guarantee**:
  - Never allow a subagent to write to files currently being edited by the orchestrator.
  - Never assign overlapping file paths to concurrent subagents.
  - Subagents must not modify shared configuration files without explicit orchestrator lock.
- **Violation Risk**: Concurrent or overlapping writes cause git conflicts, clobbered edits, corrupted ASTs, and race conditions.

### 2. Context Isolation (`fresh` vs `fork`)
- Default to `context: "fresh"` for bounded tasks to prevent context pollution and maximize reasoning tokens.
- Use `context: "fork"` strictly when deep conversational context or uncommitted in-memory findings are essential.

### 3. Structured Compact Returns
- Subagents should return dense, factual summaries, JSON diffs, or explicit pass/fail reports rather than dumping raw file contents or verbose terminal logs into the orchestrator context.

### 4. Cold-Start & Context Handoff Protocol (MANDATORY)
- Subagents launched with `context: "fresh"` start cold on task context, but the Pi runtime automatically loads `agents.md` into their instructions. Do NOT tell subagents to read `agents.md` or general agent rules.
- Cut all conversational filler (do NOT say "you have a fresh context"). Go straight to instructions:
  1. **Domain Subplan Reading Only**: Specific topic subplan file the subagent must read before acting (e.g. *"FIRST STEP: Read `docs/superpowers/plans/subplans/topic-1-doc-extraction-ai.md` before coding."*).
  2. **Explicit Target Paths**: Full relative paths to all input files and destination files.
  3. **Strict Perimeter Bounds**: Strict list of files authorized to create/edit, prohibiting touching any other files.
  4. **No Guessing**: Subagents must follow the specifications in the plan strictly, without inventing alternative architectures.

### 5. Execution Mode Control (`background: false` vs `true`)
- Default profile preference in Pi Pendant is `background: true`.
- **Set `background: false` explicitly** for sequential, blocking tasks where the orchestrator cannot proceed without the immediate result.
- **Use `background: true`** for independent audits, background research, or concurrent parallel tasks.

### 6. MCP Tool Access via `codemode`
- Subagents with `general-purpose` profile access MCP tools (e.g., `mcp__agentic_axelor`, `mcp__google_alter_si`) via `codemode` (`await tools.mcp__...(...)`).
- Do NOT attempt raw curl or shell scripts to interact with MCP services; use the sandbox tools directly.

### 7. Self-Verification on Significant Changes
- For significant or non-trivial code mutations, the subagent must execute a validation check (e.g., test runner or syntax assertion) and resolve failures before concluding.
- Trivial changes or minor edits do not require validation loops.

### 8. Dense, Non-Bloated Reporting
- Keep final reports dense, concise, and informative. Never dump full source code files or giant JSON blobs into the response.
- No rigid template is forced, but reports should naturally convey what was done, verification evidence (if applicable), and any critical findings.

### 9. Scratch File Cleanup vs Test Persistence
- Transient debug files, temporary scratchpads, or throwaway dumps created during execution must be deleted before completion to keep `git status` clean.
- Permanent test files (e.g., test suites inside `tests/` intended as deliverables or regression safeguards) must be preserved.
