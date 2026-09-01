# Flickr Photos Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `/\:lang/photos` page with a tested Flickr-backed photo gallery containing photo `55315546599`, and expose it through the localized primary navigation.

**Architecture:** Commit a versioned gallery manifest containing editorial and generated fields, map published records through a typed selector, and render them with React Photo Album plus Yet Another React Lightbox. Flickr remains the image CDN; this milestone makes no runtime Flickr API request and does not implement the future importer.

**Tech Stack:** React 18, TypeScript, Vite, React Router, react-photo-album, yet-another-react-lightbox, Vitest, Testing Library.

---

### Task 1: Add the test harness

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Install test dependencies**

Run:

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Add the test script**

Add to `package.json`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:

```ts
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Verify the harness**

Run `npm test`. Expected: Vitest exits successfully with “No test files found” only when `--passWithNoTests` is supplied; otherwise proceed immediately to Task 2’s first failing test.

---

### Task 2: Add the first typed gallery record

**Files:**
- Create: `src/data/photos.json`
- Create: `src/features/photos/gallery-data.ts`
- Create: `src/features/photos/gallery-data.test.ts`

- [ ] **Step 1: Write the failing selector test**

Create `src/features/photos/gallery-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { publishedPhotos } from "@/features/photos/gallery-data";

describe("publishedPhotos", () => {
  it("exposes the first public Flickr photo with responsive sources", () => {
    expect(publishedPhotos).toEqual([
      expect.objectContaining({
        id: "55315546599",
        displayTitle: "DSC05077",
        orientation: "landscape",
        thumbnail: expect.objectContaining({ width: 1024, height: 683 }),
        full: expect.objectContaining({ width: 3072, height: 2048 }),
      }),
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify RED**

Run:

```bash
npm test -- src/features/photos/gallery-data.test.ts
```

Expected: FAIL because `gallery-data` does not exist.

- [ ] **Step 3: Create the committed manifest**

Create `src/data/photos.json` with:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-08-24T11:07:39.748Z",
  "tags": [],
  "photos": [
    {
      "source": {
        "submittedPhotoPageUrl": "https://www.flickr.com/photos/davorkirbis/55315546599/in/album-72177720334032520/",
        "photoId": "55315546599",
        "albumId": "72177720334032520"
      },
      "curation": {
        "displayTitle": "DSC05077",
        "backstory": "",
        "tagIds": [],
        "altText": "A singer gestures at a microphone while two backing vocalists perform under blue stage lights.",
        "order": 1,
        "published": true
      },
      "generated": {
        "canonicalPageUrl": "https://www.flickr.com/photos/davorkirbis/55315546599/",
        "flickrTitle": "DSC05077",
        "sourceFilename": "DSC05077",
        "orientation": "landscape",
        "images": {
          "thumbnail": {
            "url": "https://live.staticflickr.com/65535/55315546599_b1285266fa_b.jpg",
            "width": 1024,
            "height": 683
          },
          "full": {
            "url": "https://live.staticflickr.com/65535/55315546599_f800830353_3k.jpg",
            "width": 3072,
            "height": 2048
          }
        },
        "exif": {}
      }
    }
  ]
}
```

- [ ] **Step 4: Add the typed selector**

Create `src/features/photos/gallery-data.ts`:

```ts
import manifestJson from "@/data/photos.json";

export interface GalleryImageSource {
  url: string;
  width: number;
  height: number;
}

export interface GalleryPhoto {
  id: string;
  displayTitle: string;
  backstory: string;
  tagIds: readonly string[];
  altText: string;
  sourceFilename: string;
  canonicalPageUrl: string;
  orientation: "landscape" | "portrait" | "square";
  thumbnail: GalleryImageSource;
  full: GalleryImageSource;
  exif: Readonly<Record<string, string>>;
}

interface PhotoManifestRecord {
  source: { photoId: string };
  curation: {
    displayTitle: string;
    backstory: string;
    tagIds: string[];
    altText: string;
    order: number;
    published: boolean;
  };
  generated: {
    canonicalPageUrl: string;
    sourceFilename: string;
    orientation: GalleryPhoto["orientation"];
    images: {
      thumbnail: GalleryImageSource;
      full: GalleryImageSource;
    };
    exif: Record<string, string>;
  };
}

const records = manifestJson.photos as PhotoManifestRecord[];

export const publishedPhotos: readonly GalleryPhoto[] = records
  .filter(({ curation }) => curation.published)
  .sort((left, right) => left.curation.order - right.curation.order)
  .map(({ source, curation, generated }) => ({
    id: source.photoId,
    displayTitle: curation.displayTitle,
    backstory: curation.backstory,
    tagIds: curation.tagIds,
    altText: curation.altText,
    sourceFilename: generated.sourceFilename,
    canonicalPageUrl: generated.canonicalPageUrl,
    orientation: generated.orientation,
    thumbnail: generated.images.thumbnail,
    full: generated.images.full,
    exif: generated.exif,
  }));
```

- [ ] **Step 5: Run the selector test to verify GREEN**

Run `npm test -- src/features/photos/gallery-data.test.ts`. Expected: one passing test.

---

### Task 3: Render the mosaic and lightbox

**Files:**
- Create: `src/components/photos/PhotosGallery.tsx`
- Create: `src/components/photos/PhotosGallery.scss`
- Create: `src/components/photos/PhotosGallery.test.tsx`

- [ ] **Step 1: Write the failing interaction test**

Create `src/components/photos/PhotosGallery.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotosGallery } from "@/components/photos/PhotosGallery";
import { publishedPhotos } from "@/features/photos/gallery-data";

describe("PhotosGallery", () => {
  it("opens the selected Flickr photo in an accessible lightbox", () => {
    render(<PhotosGallery items={publishedPhotos} />);

    fireEvent.click(screen.getByRole("button", { name: "Open DSC05077" }));

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    expect(
      screen
        .getAllByAltText(
          "A singer gestures at a microphone while two backing vocalists perform under blue stage lights.",
        )
        .some((image) => image.getAttribute("src") === publishedPhotos[0].full.url),
    ).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify RED**

Run `npm test -- src/components/photos/PhotosGallery.test.tsx`. Expected: FAIL because `PhotosGallery` does not exist.

- [ ] **Step 3: Implement the gallery**

Create `src/components/photos/PhotosGallery.tsx`:

```tsx
import type { FC } from "react";
import { useMemo, useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { Slide } from "yet-another-react-lightbox";
import type { GalleryPhoto } from "@/features/photos/gallery-data";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import "@/components/photos/PhotosGallery.scss";

export interface PhotosGalleryProps {
  items: readonly GalleryPhoto[];
}

export const PhotosGallery: FC<PhotosGalleryProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const albumPhotos = useMemo(
    () =>
      items.map((photo) => ({
        src: photo.thumbnail.url,
        width: photo.thumbnail.width,
        height: photo.thumbnail.height,
        alt: photo.altText,
        title: photo.displayTitle,
        label: `Open ${photo.displayTitle}`,
      })),
    [items],
  );
  const slides = useMemo<Slide[]>(
    () =>
      items.map((photo) => ({
        src: photo.full.url,
        width: photo.full.width,
        height: photo.full.height,
        alt: photo.altText,
        imageFit: photo.orientation === "portrait" ? "cover" : "contain",
      })),
    [items],
  );

  return (
    <section className="photos-gallery" aria-label="Photography gallery">
      <RowsPhotoAlbum
        photos={albumPhotos}
        spacing={8}
        targetRowHeight={360}
        rowConstraints={{ singleRowMaxHeight: 640 }}
        onClick={({ index }) => setSelectedIndex(index)}
      />
      <Lightbox
        open={selectedIndex >= 0}
        index={Math.max(selectedIndex, 0)}
        close={() => setSelectedIndex(-1)}
        slides={slides}
        plugins={[Fullscreen, Zoom]}
        controller={{ aria: true, closeOnEscape: true }}
        carousel={{ finite: true }}
      />
    </section>
  );
};
```

Create `src/components/photos/PhotosGallery.scss`:

```scss
.photos-gallery {
  width: min(1600px, calc(100vw - 2rem));
  margin: 1.5rem 50% 0;
  transform: translateX(-50%);
}

.photos-gallery button {
  cursor: zoom-in;
}
```

- [ ] **Step 4: Run the component test to verify GREEN**

Run `npm test -- src/components/photos/PhotosGallery.test.tsx`. Expected: one passing test.

---

### Task 4: Wire the localized route and navigation

**Files:**
- Modify: `src/routes/photos.tsx`
- Modify: `src/components/navigation/Navigation-main.tsx`
- Modify: `src/locales/en/translation.json`
- Modify: `src/locales/de/translation.json`
- Modify: `src/locales/sl/translation.json`
- Create: `src/routes/photos.test.tsx`
- Delete: `src/components/getPhotos.tsx`
- Delete: `src/components/photos/PhotoCard.tsx`
- Delete: `src/components/photos/PhotoGrid.tsx`

- [ ] **Step 1: Write the failing route test**

Create `src/routes/photos.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Photos } from "@/routes/photos";

describe("Photos route", () => {
  it("renders the published Flickr gallery", () => {
    render(<Photos />);
    expect(screen.getByRole("heading", { name: "Photos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open DSC05077" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the route test to verify RED**

Run `npm test -- src/routes/photos.test.tsx`. Expected: FAIL because the existing route still renders `GetPhotos`.

- [ ] **Step 3: Make the route compose the gallery**

Replace `src/routes/photos.tsx` with:

```tsx
import type { FC } from "react";
import { PhotosGallery } from "@/components/photos/PhotosGallery";
import { publishedPhotos } from "@/features/photos/gallery-data";

export type PhotosProps = Record<string, never>;

export const Photos: FC<PhotosProps> = () => (
  <main>
    <h1 className="px-4 text-3xl font-semibold">Photos</h1>
    <PhotosGallery items={publishedPhotos} />
    <p className="px-4 pt-4 text-xs">
      <a href={publishedPhotos[0].canonicalPageUrl}>View this photo on Flickr.</a>{" "}
      This product uses the Flickr API but is not endorsed or certified by SmugMug, Inc.
    </p>
  </main>
);
```

- [ ] **Step 4: Remove the sample Avatar API components**

Delete the three placeholder files listed above after `src/routes/photos.tsx` no longer imports them.

- [ ] **Step 5: Add the navigation entry**

Add `{ name: t("nav.photos"), href: "photos" }` after Resume in `Navigation-main.tsx`.

Add these locale values:

```json
// English
"photos": "Photos"

// German
"photos": "Fotos"

// Slovenian
"photos": "Fotografije"
```

The route already exists at `/:lang/photos` in `src/main.tsx`; retain it.

- [ ] **Step 6: Run all tests**

Run `npm test`. Expected: all selector, gallery, and route tests pass.

---

### Task 5: Verify production behavior

**Files:**
- Verify only; no planned source changes.

- [ ] **Step 1: Run static verification**

Run:

```bash
npm run lint
npm test
npm run build
```

Expected: all commands exit with status 0.

- [ ] **Step 2: Smoke-test in the browser**

Run the dev server and verify:

1. `/en/photos`, `/de/photos`, and `/sl/photos` render the same public Flickr image.
2. The primary navigation reaches the localized Photos route.
3. The thumbnail loads from the 1024px Flickr source.
4. Clicking opens the 3072px lightbox source.
5. Escape and Close dismiss the lightbox.
6. Zoom and fullscreen controls are visible.
7. The Flickr source link and required API attribution are visible.
8. The Flickr image page remains the canonical source in the manifest.

- [ ] **Step 3: Review scope**

Confirm this milestone does not add runtime Flickr API calls, credentials, inferred EXIF, tags, or backstory. Those remain for the importer and metadata-panel milestones.

## Self-review

- The first Flickr photo URL, IDs, dimensions, and CDN variants are concrete.
- Every production unit has a focused responsibility and a preceding failing test.
- The plan covers the localized route, navigation, image rendering, lightbox, accessibility, and verification.
- No placeholder requirements or undefined implementation steps remain.
