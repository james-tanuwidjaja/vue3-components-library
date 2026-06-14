# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.7.0] — 2026-06-14

### Added
- **Semantic color tokens** — `danger`, `info`, `secondary` alongside the existing `success` and `warning`. Each token gains a `hover` and `on-*` counterpart so all six semantic colors are fully usable without manual CSS overrides.
- **`JtButton` `color` prop** — accepts `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'`. Defaults to `'primary'`, fully backward-compatible.
- **Edit-form example** on the Forms guide — demonstrates fetching data with a simulated delay (skeleton loading on every field), anchoring `initialValues` after the fetch, and `isDirty` dirty-check for an edit workflow.
- **Changelog page** in the docs site.

### Changed
- **Fixed footer** — the docs site footer is now pinned to the viewport bottom (aligned with the sidebar bottom section) rather than flowing inline after page content.
- **Button CSS** refactored to use internal CSS custom properties (`--_btn-*`) so color modifier classes simply override those vars — filled/outlined/text variants remain unchanged and fully composable with any color.
- **Theming docs** updated with a full palette swatch for all tokens.
- **Button docs** updated with a Colors example row.
- **README** simplified to a short component list with a link to the docs site.

---

## [0.6.0] — 2026-05

### Added
- `JtFooter` component and pinned-footer support on `JtLayout` (`fixed-footer` prop).
- MDI icon support in sidebar navigation.

### Changed
- Header and sidebar are now position-fixed; only the main area scrolls.

---

## [0.5.0] — 2026-04

### Added
- `JtSmartTable` — inline add / edit / delete on top of `JtDataTable`.
- `JtDialogProvider` + `openDialog()` promise-based modal API with modal-on-modal stacking.

---

## [0.4.0] — 2026-03

### Added
- `JtForm` — validation engine with `initialValues`, `isDirty`, `reset()`, `validate()`, `resetValidation()`.
- `JtDatePicker` and `JtDateTimePicker` using Floating UI.
- Skeleton loading on every field via the shared `loading` prop.

---

## [0.3.0] — 2026-02

### Added
- `JtDataTable` with type-aware column filters, sorting, and pagination.
- `JtTooltip` via Floating UI.

---

## [0.2.0] — 2026-01

### Added
- `JtSelect` (single + multiple with chips), `JtCheckbox`, `JtSwitch`, `JtRadioGroup`.
- `createJt()` plugin with runtime theming (`--jt-*` CSS variables).

---

## [0.1.0] — 2025-12

### Added
- Initial release: `JtButton`, `JtTextField`, `JtTextarea`, `JtNumberField`, `JtMoneyField`.
- `JtLayout`, `JtHeader`, `JtSidebar` app-shell primitives.
- `JtSkeleton` loader.
- Self-built docs site with live examples.
