Run quality checks and create a pull request for the current branch.

## Instructions

$ARGUMENTS

---

### Step 1 — Identify the current context

```bash
BRANCH=$(git branch --show-current)
REPO_URL=$(git remote get-url origin 2>/dev/null || echo "no-remote")
echo "Branch: $BRANCH"
echo "Remote: $REPO_URL"
```

If there are no uncommitted changes and the branch has no commits ahead of `main`, stop and tell the user there is nothing to PR.

---

### Step 2 — Run quality checks

Run all checks in sequence. **Stop and report failures** before creating the PR.

```bash
pnpm lint
```

If any check fails:
1. Report exactly which check failed and the error output
2. Fix the issues (unless they are pre-existing and unrelated to the current branch)
3. Re-run the checks to confirm they pass

---

### Step 3 — Collect what will be in the PR

```bash
BASE="main"
git log $BASE..$BRANCH --oneline
git diff $BASE...$BRANCH --stat
```

Read the commits and diff to understand what the PR contains.

---

### Step 3.5 — Changeset

Check if a changeset is needed based on the commit types in this branch:

```bash
BASE="main"
git log $BASE..$BRANCH --oneline --format="%s"
```

- If any commit starts with `feat:`, `fix:`, or `refactor:` → a changeset is **required**
- If commits are only `chore:`, `docs:`, `test:` → changeset is **optional** (skip if not relevant to end users)
- `refactor:` always generates a `patch` bump
- Check if a changeset was already added: `ls .changeset/*.md 2>/dev/null | grep -v README | grep -v config`

If a changeset is needed and none exists, create one interactively:

```bash
pnpm changeset
```

Select the appropriate bump type:
- `patch` — bug fix or minor improvement
- `minor` — new feature, backwards compatible
- `major` — breaking change

Then commit the generated changeset file:

```bash
git add .changeset/*.md
git commit -m "chore: add changeset for [short description]"
```

---

### Step 4 — Push the branch

```bash
git push -u origin $BRANCH
```

---

### Step 5 — Create the PR via GitHub MCP

Use the `create_pull_request` GitHub MCP tool with:

- **title**: Derive from the branch name and commits. Follow the format: `type(scope): description`
- **base**: `main`
- **head**: current branch name
- **body**: structured description (see template below)

#### PR body template

```markdown
## Summary

- [bullet point 1 — what changed]
- [bullet point 2]
- [bullet point 3]

## Type

- [ ] feat — new feature
- [ ] fix — bug fix
- [ ] refactor — code refactoring
- [ ] chore — tooling / config
- [ ] docs — documentation
- [ ] test — tests only

## How to test

1. [step 1]
2. [step 2]
3. Expected result: [...]

## Checklist

- [ ] Lint passes (`pnpm lint`)
- [ ] Changeset added if `feat:` or `fix:` commits present (`pnpm changeset`)
```

---

### Step 6 — Report to user

Show:
- ✅ PR URL
- Branch → base
- Number of commits included
- Any warnings (e.g., lint auto-fixes applied)
