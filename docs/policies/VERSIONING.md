# Spark UI Versioning Policy

This document defines how Spark UI versions, releases, release notes, and related website content are managed.

## Philosophy

Spark UI follows [Semantic Versioning](https://semver.org/) using the following format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
2.3.0
```

Version numbers communicate the expected impact of a release:

- `MAJOR` versions introduce breaking changes.
- `MINOR` versions introduce backward-compatible features.
- `PATCH` versions introduce backward-compatible fixes.

Every release should be predictable, documented, and reproducible.

## Version Types

### Major Release (`X.0.0`)

Increase the major version when introducing changes that require users to update their existing implementations.

Examples include:

- Removing published components
- Removing or renaming public properties
- Changing public APIs incompatibly
- Changing installation behavior incompatibly
- Changing the registry format incompatibly
- Removing deprecated functionality
- Introducing major architectural changes that affect consumers

Example:

```text
1.9.4 → 2.0.0
```

Major releases should include migration instructions whenever users must update existing code.

### Minor Release (`x.Y.0`)

Increase the minor version when adding backward-compatible functionality.

Examples include:

- Adding new components
- Adding new component variants
- Adding optional properties
- Adding animations or interactions
- Adding new registry items
- Introducing backward-compatible performance improvements
- Introducing significant backward-compatible accessibility improvements

Example:

```text
2.2.0 → 2.3.0
```

Existing implementations should continue to work without modification after a minor release.

### Patch Release (`x.y.Z`)

Increase the patch version when publishing backward-compatible fixes.

Examples include:

- Fixing component behavior
- Fixing TypeScript types
- Fixing styles or responsive layouts
- Fixing animations
- Fixing accessibility defects
- Fixing registry metadata
- Applying safe dependency updates
- Correcting documentation associated with a published release

Example:

```text
2.3.0 → 2.3.1
```

Documentation-only website changes do not require a package release unless they correct or accompany a change to a published artifact.

## Prerelease Versions

Use prerelease versions for changes that are not ready for general production use.

Examples:

```text
3.0.0-alpha.1
3.0.0-beta.1
3.0.0-rc.1
```

Use the following stages consistently:

- `alpha` for early development and incomplete APIs
- `beta` for feature-complete releases that still require testing
- `rc` for release candidates expected to become stable

Prerelease versions must not replace an existing stable release.

## Package Versioning

The version in `package.json` is the source of truth for the current Spark UI release.

Example:

```json
{
  "version": "2.3.0"
}
```

The version must be updated before creating the corresponding Git tag and GitHub release.

Application code may read this value when it needs to display the current package version.

## Website Versioning

The Spark UI website does not require its own public semantic version.

The website is continuously deployed and identified internally through:

- Git commit hashes
- Deployment identifiers
- Build timestamps
- Hosting-provider deployment history

The website may display the current Spark UI package version, but that value represents the package release rather than the website deployment.

Website updates such as copy changes, layout adjustments, blog corrections, and search improvements do not automatically require a new package version.

## Blog Versioning

Each release blog post represents a specific historical release.

A published release post must retain its original version permanently.

Correct:

```ts
{
  version: "2.3.0",
}
```

Avoid:

```ts
{
  version: CURRENT_VERSION,
}
```

Using `CURRENT_VERSION` for a historical post would cause its displayed version to change whenever `package.json` is updated.

`CURRENT_VERSION` may still be used for interface elements that intentionally display the latest available release, such as:

- Navigation badges
- Installation pages
- Current-release banners
- Registry metadata
- Documentation headers

Editing a blog post for spelling, clarity, or formatting does not change the release version associated with that post.

## Release Dates

Release dates should use the ISO 8601 calendar-date format in source data:

```text
YYYY-MM-DD
```

Example:

```text
2026-07-17
```

Dates may be formatted into a more readable form when displayed on the website:

```text
July 17, 2026
```

The recorded release date should represent the date on which the version became publicly available.

## Release Notes

Every public release should include:

- Version number
- Release date
- Summary
- Added functionality
- Improvements
- Fixes
- Breaking changes, when applicable
- Migration instructions, when applicable
- Relevant installation or upgrade instructions

Example:

```md
## 2.3.0

Released July 17, 2026.

### Added

- Redesigned Masonry component
- Templates page

### Improved

- Showcase layout
- Entry and hover animations

### Fixed

- Responsive layout issues
```

Sections without relevant changes may be omitted.

## Changelog

Maintain a chronological `CHANGELOG.md` at the repository root.

The newest release should appear first.

Recommended categories include:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

Example:

```md
## 2.3.0 - 2026-07-17

### Added

- Redesigned Masonry component
- Templates page

### Changed

- Showcase now uses the shared Masonry layout

### Fixed

- Responsive tile-placement issues
```

Do not rewrite historical changelog entries in a way that changes what was included in a published release. Small spelling and link corrections are acceptable.

## Git Tags

Every stable and prerelease version must have a corresponding Git tag.

Tag format:

```text
v<version>
```

Examples:

```text
v1.0.0
v2.0.0
v2.3.0
v2.3.1
v3.0.0-beta.1
```

A tag must point to the exact commit used to produce the release.

Published tags should not be moved or reused.

## GitHub Releases

Each Git tag should have a corresponding GitHub release.

A GitHub release should contain:

- A concise summary
- Added features
- Improvements
- Fixes
- Breaking changes
- Migration instructions
- Installation or upgrade notes
- Links to relevant documentation

Prerelease versions should be marked as prereleases on GitHub.

## Deprecation Policy

Public functionality should normally be deprecated before it is removed.

A deprecation should:

- Identify the deprecated API or component
- Explain why it is deprecated
- Recommend a replacement
- State the expected removal version when possible
- Remain available until an appropriate major release

Deprecated functionality may be removed immediately only when necessary to address a serious security, legal, or operational issue.

## Release Checklist

Before publishing a release:

- [ ] Confirm the intended `MAJOR`, `MINOR`, or `PATCH` increment
- [ ] Update the version in `package.json`
- [ ] Update the package lockfile
- [ ] Update `CHANGELOG.md`
- [ ] Create or update the release blog post
- [ ] Document breaking changes
- [ ] Add migration instructions when required
- [ ] Verify generated registry files
- [ ] Verify installation commands
- [ ] Run formatting, linting, type checking, and tests
- [ ] Test installation in a clean project
- [ ] Build the website and package successfully
- [ ] Commit the release changes
- [ ] Create the Git tag
- [ ] Push the commit and tag
- [ ] Publish the GitHub release
- [ ] Deploy the website
- [ ] Verify the production release

## Long-Term Policy

- Every published version is permanent.
- Published version numbers must not be renamed or reused.
- Git tags must not be moved after publication.
- Blog posts and changelog entries are historical release records.
- Historical release posts must use fixed version strings.
- Breaking changes require a major release.
- Backward-compatible features require a minor release.
- Backward-compatible fixes require a patch release.
- Documentation may be corrected without changing its associated release version.
- The website may be deployed independently of package releases.
- Security-related exceptions must be clearly documented.

Following this policy keeps Spark UI releases consistent, predictable, and trustworthy for users and contributors.
