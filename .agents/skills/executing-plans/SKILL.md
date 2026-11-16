---
name: executing-plans
description: Execute an existing implementation plan with focused verification; invoked manually.
user-invocable: true
disable-model-invocation: true
---

# Executing Plans

Execute an existing plan directly, task by task. This skill is standalone: it does not require other skills, specialized scripts, a shared ledger or a particular workspace layout.

## Process

1. Read the plan and any referenced requirements. Inspect relevant project context and the working tree before changing files.
2. Identify task dependencies, risks and verification commands. Use a simple task list when useful; no special tracking infrastructure is required.
3. Implement tasks in order. Follow the plan where sound; resolve minor ambiguities from project evidence and record material deviations in the final report.
4. For meaningful behavior changes, add or update focused tests and, where practical, observe them fail before implementing the change. Run the relevant checks and inspect their results.
5. Run appropriate integration or regression checks after implementation. Review the changes against the plan and report results, deviations and remaining risks.

Continue without unnecessary check-ins. Stop and ask when the plan leaves a consequential decision unresolved, or an action is destructive, security-sensitive, or has an external side effect that requires permission. Do not commit, push, merge or create a worktree unless requested or otherwise authorized.

If delegation is genuinely useful and native subagents are available, follow the project's `pendant-subagents` conventions; delegation is optional, not a prerequisite for execution.
