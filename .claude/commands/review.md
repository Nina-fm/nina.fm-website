Perform a thorough code review of the current changes.

$ARGUMENTS

If $ARGUMENTS contains a PR number (e.g., `42`), fetch the PR diff via GitHub MCP and post the review as a PR comment at the end.

---

### Step 1 — Gather the diff

```bash
BASE=${BASE:-main}
git diff $BASE...HEAD
git diff $BASE...HEAD --stat
git log $BASE..HEAD --oneline
```

If $ARGUMENTS specifies a PR number, use the GitHub MCP `get_pull_request_files` tool to get the list of changed files, and `get_pull_request` to get context.

---

### Step 2 — Review each changed file

Go through each changed file systematically. Apply the relevant checks below based on file type.

#### TypeScript — all files
- [ ] No `any` types — strict TypeScript throughout
- [ ] No unused variables, imports, or parameters
- [ ] Error handling uses `catch (error: unknown)` — never `catch (error: any)`
- [ ] No hardcoded values that belong in constants or env vars
- [ ] Interfaces/types are explicit and well-named

#### Architecture — Nuxt/Vue files (`.vue`, `.ts` in composables/pages/components)
- [ ] Logic in composables, not in components (components stay thin)
- [ ] No business logic or API calls directly in `.vue` files (use composables)
- [ ] New composable check: does an existing composable already cover this need?
- [ ] Lucide icons imported from `lucide-vue-next` (tree-shakeable)
- [ ] Shadcn/reka-ui components used for UI primitives (no reinventing)

#### Vue 3 Composition API
- [ ] `ref()` and `reactive()` used appropriately
- [ ] `computed()` for derived state (not plain variables)
- [ ] `watch()` / `watchEffect()` only for side effects, not for derived values
- [ ] `defineProps()` and `defineEmits()` with explicit types
- [ ] `v-if` / `v-for` not combined on the same element (use template wrapper)
- [ ] `key` attribute present on all `v-for` items

#### Pinia stores (website)
- [ ] Store defined with `defineStore()` and `setup()` syntax (not options API)
- [ ] No direct state mutation outside the store
- [ ] Getters use `computed()`, actions use `async function`
- [ ] Store not imported directly in components — use composables or `useXxxStore()` in setup

#### API calls / server routes
- [ ] Nuxt server routes in `server/api/` use `defineEventHandler`
- [ ] `$fetch` / `useFetch` / `useAsyncData` used (no raw `fetch`)
- [ ] SSR-safe: `useRuntimeConfig()` for env vars, never `process.env` in client code
- [ ] No hardcoded API URLs — use runtime config

#### Architecture — NestJS files (API repo)
- [ ] DTO validation decorators present (`@IsString()`, `@IsOptional()`, etc.)
- [ ] Response wrapped in `{ data: T }` format
- [ ] Guards applied appropriately (`@Auth()`, `@Roles()`)
- [ ] New endpoint has a corresponding `.bru` file in `bruno/`

#### Tests
- [ ] New features have corresponding test files
- [ ] Tests follow `it('should [behavior] when [condition]')` naming
- [ ] No snapshot tests

#### Security & Performance
- [ ] No sensitive data in console logs or error messages
- [ ] No synchronous blocking operations in server routes
- [ ] SSR-safe code (no `window`/`document` without `import.meta.client` guard)

---

### Step 3 — Write the structured review

Format your review output **exactly** as follows:

---

## Code Review

**Branch:** `[branch]` → `main`
**Files changed:** [n] | **Commits:** [n]
**Overall:** ✅ LGTM | ⚠️ Minor issues | ❌ Changes required

### Strengths
- [what is done particularly well]

### Issues

| Severity | File | Issue | Suggestion |
|----------|------|-------|------------|
| 🔴 Critical | `path/to/file.vue` | [issue description] | [how to fix] |
| 🟡 Warning | `path/to/file.ts` | [issue description] | [how to fix] |
| 🔵 Suggestion | `path/to/file.ts` | [improvement idea] | [how to improve] |

_If no issues: "No issues found."_

### Summary
[2–3 sentence overall assessment — quality, risks, readiness to merge]

---

### Step 4 — Post as PR comment (if PR number provided)

If $ARGUMENTS contains a PR number, use the GitHub MCP `add_issue_comment` tool to post the review content as a comment on that PR.

Report: "Review posted on PR #[number]" with the PR URL.
