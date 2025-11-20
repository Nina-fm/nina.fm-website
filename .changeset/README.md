# Changesets

This directory contains changesets for the Nina.fm Website project.

## How to create a changeset

When you make changes that should be released, create a changeset:

```bash
pnpm changeset
```

This will prompt you to:

1. Select the type of change (patch, minor, major)
2. Write a description of the change

## Types of changes

- **patch**: Bug fixes, small improvements
- **minor**: New features that don't break existing functionality
- **major**: Breaking changes

## Release process

Changesets are automatically processed during deployment:

1. Changesets are detected
2. Version is bumped according to changeset types
3. CHANGELOG.md is updated
4. Git tag is created
5. Docker image is tagged with the version
6. GitHub release is created
