---
name: importing-flickr-photos
description: Use when the user provides Flickr photo-page links or asks to add, refresh, curate, tag, or publish photographs in this project's gallery manifest.
---

# Importing Flickr Photos

## Overview

Turn Flickr links and editorial copy into reviewable entries without mixing generated facts with user-owned curation.

## Required input

Accept one or more blocks:

```text
Flickr: https://www.flickr.com/photos/davorkirbis/55315546599/in/album-72177720334032520/
Title: Northern singer under blue light
Description: A singer performing under deep blue stage lighting.
```

Require an HTTPS `www.flickr.com/photos/{owner}/{numeric-photo-id}/...` link. Gather missing title and description in one focused follow-up. Reject other hosts, short links, and `staticflickr.com` assets.

## Workflow

1. Extract every supported Flickr photo-page URL. Allow query strings and album context after the numeric photo ID. Parse the numeric photo and optional `album-` IDs; never guess missing IDs.
2. Inspect the manifest, taxonomy, `package.json`, and importer help. Never invent a command or schema. Stop if the importer is absent.
3. Require `FLICKR_API_KEY` from ignored local configuration. Never request an app secret, accept credentials in chat, use `VITE_`, print complete API URLs, or commit secrets.
4. Dry-run first. Generated data may include identifiers, canonical URL, public sizes, dimensions, Flickr title, source filename, dates, and allowlisted EXIF.
5. Derive orientation from returned display dimensions after rotation: width greater than height is `landscape`, height greater than width is `portrait`, otherwise `square`. Never infer orientation or EXIF from prose.
6. Keep the supplied title and description. Suggest zero to five lowercase tags, preferring existing IDs; never invent tags. New tags need approval, and albums never create tags.
7. Suggest alt text from visible content only. If the image cannot be inspected, ask the user; do not reuse the backstory.
8. Merge by photo ID. Refresh generated fields and preserve curation unless the user explicitly requests replacements. Preview replacements separately. Exclude Flickr descriptions, Flickr tags, GPS, and raw EXIF.
9. New entries default to unpublished. Missing EXIF is allowed with a warning; a missing source filename requires manual input.
10. Validate, present tags and the JSON diff, then write only after approval. Re-run validation and build checks; publish only after both pass.

## Ownership rules

- `source`: stable submitted Flickr URL and parsed identifiers.
- `curation`: user-managed title, backstory, tag IDs, alt text, order, and publication state.
- `generated`: replaceable Flickr metadata, image variants, dimensions, orientation, filename, dates, and normalized EXIF.

## Quick reference

- Stable identity: Flickr photo ID.
- Orientation: rotated display dimensions, never prose.
- Tags: zero to five suggestions; approve new taxonomy terms.
- Duplicate: refresh generated data; preserve curation by default.
- Publication: unpublished until approved and validated.
- Credentials: local `FLICKR_API_KEY` only; no app secret.

## Common mistakes

- Do not publish because the user says “publish now” if validation has not passed.
- Do not overwrite curated copy during refresh.
- Do not create near-duplicate tags such as `concert`, `concerts`, and `live-music`.
- Do not claim unavailable camera settings or filenames.
- Do not write a partial manifest after any required Flickr request fails.
