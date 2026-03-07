Explore and break down a large feature into actionable sub-features: $ARGUMENTS

## Instructions

You are in **exploration mode**. Your goal is to understand the scope of a large feature, discuss trade-offs, and produce a structured breakdown into smaller implementable features. Do NOT create branches or write code.

---

### Step 1 — Understand the request

Read the feature description carefully: `$ARGUMENTS`

Ask yourself:
- Is the scope clear enough to break down, or are there ambiguities to resolve first?
- Does this touch multiple layers (API, frontend, auth, infra)?
- Are there multiple valid technical approaches worth comparing?

If there are blocking ambiguities, ask the user before proceeding.

---

### Step 2 — Explore the codebase

Read `CLAUDE.md` and relevant source files to understand:
- What already exists that relates to this feature
- What would need to be created vs modified
- What external dependencies or API changes are involved
- Any constraints (performance, auth, existing patterns to follow)

---

### Step 3 — Present the epic analysis

Structure your response **exactly** as follows:

---

**Epic:** $ARGUMENTS

#### Context
[2–4 sentences: what this feature is, why it matters, what system areas it touches]

#### Technical approaches
[If multiple valid approaches exist, compare them briefly — 2–3 options max]

| Approach | Pros | Cons |
|----------|------|------|
| Option A | ... | ... |
| Option B | ... | ... |

**Recommended:** [Option X — why]

#### Breakdown into sub-features

| # | Feature | Scope | Depends on |
|---|---------|-------|-----------|
| 1 | `[short name]` — [1 sentence description] | Small/Medium/Large | — |
| 2 | `[short name]` — [1 sentence description] | Small/Medium/Large | #1 |
| 3 | `[short name]` — [1 sentence description] | Small/Medium/Large | #1, #2 |

#### API impact
[List endpoints to create/modify, or **None** if purely frontend]

#### Open questions
[Decisions that need user input before implementation can start — or **None**]

#### Suggested order
[Recommended implementation sequence with rationale]

---

### Step 4 — Wait for direction

After presenting the analysis, ask the user:

> Which sub-feature should we start with? (or: do you want to adjust the breakdown first?)

Do NOT create branches, write code, or call `/task` automatically. The user decides what to tackle next.
