## [1.0.1](https://github.com/jramirez87/atomize-ui/compare/v1.0.0...v1.0.1) (2025-10-15)


### 🐛 Bug Fix

* **release:** include dist via prepare and retry publish ([f80bc88](https://github.com/jramirez87/atomize-ui/commit/f80bc88e1ac3dd106aac7e46f295fb0e15c699c6))

# [1.0.0](https://github.com/jramirez87/atomize-ui/compare/v0.0.4...v1.0.0) (2025-10-15)


### ♻️ Refactoring

* **button:** extract buttonVariants to separate file and type-only re-export ([2aac1e8](https://github.com/jramirez87/atomize-ui/commit/2aac1e8538dfe196b103adc75ea3c3759cbd5523))


### 🐛 Bug Fix

* **release-notes:** make release-notes transform immutable-safe (no commit mutations) ([02f8c82](https://github.com/jramirez87/atomize-ui/commit/02f8c82583111cd0455653442f58edbcbfb44ec4))
* **release:** load config as ESM (.mjs) to resolve error ([300f92e](https://github.com/jramirez87/atomize-ui/commit/300f92e2bcdfda0b7a19c67b65abdb0cb30b5955))
* **release:** reorder prepare, enable provenance, set NPM_TOKEN ([d5de12a](https://github.com/jramirez87/atomize-ui/commit/d5de12a9dd7107d5b07d33c1823767cb88e741e0))
* **release:** resolve ENONPMTOKEN by using provenance and OIDC (Trusted Publishing) npm publish ([a5724cc](https://github.com/jramirez87/atomize-ui/commit/a5724ccdad8d10be9bde5ed5dfd9ddd59ae221bc))


### 💥 Breaking Change

* **core:** initial public API and packaging ([1338424](https://github.com/jramirez87/atomize-ui/commit/1338424915b4178e9ed18f2920835eff1833c482))


### BREAKING CHANGE

* **core:** The public API is now considered stable. Prior 0.x exports/behavior may differ.
Follow the new entrypoints and exports.
