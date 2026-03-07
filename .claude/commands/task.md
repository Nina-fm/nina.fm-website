Analyze the codebase and create a detailed implementation plan for: $ARGUMENTS

## Instructions

You are in **plan mode**. Your goal is to explore the codebase, understand the context, and present a structured implementation plan. Do NOT write any code until the user explicitly approves the plan.

---

### Step 1 — Explore the codebase

Before writing anything:
- Read `CLAUDE.md` (and parent `CLAUDE.md` files) to understand current conventions
- Search for files relevant to the task: existing composables, components, types, pages that may apply
- Identify patterns to follow (look at similar existing implementations)
- Check that no existing composable/component already covers part of the need

---

### Step 2 — Create the branch

Detect the Conventional Commit type from `$ARGUMENTS` and create the branch accordingly:

```bash
ARGS="$ARGUMENTS"
# Detect type prefix (feat/fix/refactor/chore/docs/test)
if echo "$ARGS" | grep -qE '^(feat|fix|refactor|chore|docs|test)(\([^)]*\))?:'; then
  TYPE=$(echo "$ARGS" | sed -E 's/^(feat|fix|refactor|chore|docs|test)(\([^)]*\))?:.*/\1/')
  DESCRIPTION=$(echo "$ARGS" | sed -E 's/^(feat|fix|refactor|chore|docs|test)(\([^)]*\))?:\s*//')
else
  TYPE="feat"
  DESCRIPTION="$ARGS"
fi
SLUG=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | cut -c1-50 | sed 's/-$//')
git checkout -b $TYPE/$SLUG
echo "Branch created: $TYPE/$SLUG"
```

---

### Step 3 — Present the implementation plan

Structure your plan **exactly** as follows:

---

**Task:** $ARGUMENTS
**Branch:** `[type]/[slug]`

#### Summary
[2–3 sentences: what will be built/fixed/changed, why, and what it changes for the user/developer]

#### Files to create
| File | Purpose |
|------|---------|
| `...` | [description] |

#### Files to modify
| File | Changes |
|------|---------|
| `...` | [what changes and why] |

#### Tests to write
| File | Scenarios |
|------|-----------|
| `....test.ts` | [key test cases] |

#### API impact
[Changes needed in `nina.fm-api`, or **None** if purely frontend]

#### Open questions
[Any ambiguity or decision needed from the user — or "None"]

#### Estimated scope
[ ] Small (< 2h) [ ] Medium (2–4h) [ ] Large (> 4h)

---

### Step 4 — Wait for approval

End your response with exactly this line:

> ✅ Plan ready — should I proceed with implementation?

Do NOT write any code, create any file, or make any change until the user responds with an approval ("go", "yes", "proceed", "ok", or equivalent).
