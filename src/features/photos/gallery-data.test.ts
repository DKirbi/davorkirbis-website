import { describe, expect, it } from 'vitest'
import {
  publishedPhotos,
  selectPublishedPhotos,
} from '@/features/photos/gallery-data'

interface SyntheticPhotoOptions {
  id?: string
  order?: number
  published?: boolean
  orientation?: string
  submittedPhotoPageUrl?: string
  canonicalPageUrl?: string
  thumbnailUrl?: string
  thumbnailWidth?: number
  exif?: Record<string, string>
  tagIds?: string[]
}

const makePhoto = ({
  id = '55315546599',
  order = 1,
  published = true,
  orientation = 'landscape',
  submittedPhotoPageUrl = `https://www.flickr.com/photos/davorkirbis/${id}/`,
  canonicalPageUrl = `https://www.flickr.com/photos/davorkirbis/${id}/`,
  thumbnailUrl = 'https://live.staticflickr.com/65535/example_b.jpg',
  thumbnailWidth = 1024,
  exif = {},
  tagIds = [],
}: SyntheticPhotoOptions = {}) => ({
  source: {
    submittedPhotoPageUrl,
    photoId: id,
    albumId: '72177720334032520',
  },
  curation: {
    displayTitle: `Photo ${id}`,
    backstory: '',
    tagIds,
    altText: `Photo ${id}`,
    order,
    published,
  },
  generated: {
    canonicalPageUrl,
    flickrTitle: `Photo ${id}`,
    sourceFilename: `Photo ${id}`,
    orientation,
    images: {
      thumbnail: {
        url: thumbnailUrl,
        width: thumbnailWidth,
        height: 683,
      },
      full: {
        url: 'https://live.staticflickr.com/65535/example_3k.jpg',
        width: 3072,
        height: 2048,
      },
    },
    exif,
  },
})

const makeManifest = (
  photos: unknown[] = [makePhoto()],
  tags: unknown[] = [],
): Record<string, unknown> => ({
  schemaVersion: 1,
  generatedAt: '2026-08-24T11:07:39.748Z',
  tags,
  photos,
})

describe('publishedPhotos', () => {
  it('exposes the first public Flickr photo with responsive sources', () => {
    expect(publishedPhotos).toEqual([
      expect.objectContaining({
        id: '55315546599',
        displayTitle: 'DSC05077',
        altText:
          'A singer gestures at a microphone while two backing vocalists perform under blue stage lights.',
        orientation: 'landscape',
        thumbnail: expect.objectContaining({ width: 1024, height: 683 }),
        full: expect.objectContaining({ width: 3072, height: 2048 }),
      }),
    ])
  })

  it('filters unpublished records and sorts by order then photo ID', () => {
    const manifest = makeManifest(
      [
        makePhoto({ id: '30', order: 2 }),
        makePhoto({ id: '20', order: 1 }),
        makePhoto({ id: '10', order: 1 }),
        makePhoto({ id: '05', order: 0, published: false }),
      ],
      [{ id: 'stage', label: 'Stage' }],
    )

    expect(selectPublishedPhotos(manifest).map(({ id }) => id)).toEqual([
      '10',
      '20',
      '30',
    ])
  })

  it('accepts only allowlisted EXIF fields', () => {
    const manifest = makeManifest([
      makePhoto({
        exif: {
          camera: 'Example Camera',
          lens: 'Example Lens',
          exposureTime: '1/250',
          aperture: 'f/2.8',
          iso: '800',
          focalLength: '85 mm',
          flash: 'Off',
        },
      }),
    ])

    expect(selectPublishedPhotos(manifest)[0].exif).toEqual({
      camera: 'Example Camera',
      lens: 'Example Lens',
      exposureTime: '1/250',
      aperture: 'f/2.8',
      iso: '800',
      focalLength: '85 mm',
      flash: 'Off',
    })
  })

  it.each([
    {
      name: 'unsupported schema version',
      manifest: { ...makeManifest(), schemaVersion: 2 },
      expected: 'schemaVersion',
    },
    {
      name: 'malformed required fields',
      manifest: makeManifest([{ ...makePhoto(), curation: {} }]),
      expected: 'photos[0].curation.displayTitle',
    },
    {
      name: 'non-public Flickr page host',
      manifest: makeManifest([
        makePhoto({
          submittedPhotoPageUrl:
            'https://private.example.com/photos/davorkirbis/55315546599/',
        }),
      ]),
      expected: 'photos[0].source.submittedPhotoPageUrl',
    },
    {
      name: 'non-public Flickr CDN host',
      manifest: makeManifest([
        makePhoto({
          thumbnailUrl: 'https://cdn.example.com/65535/example_b.jpg',
        }),
      ]),
      expected: 'photos[0].generated.images.thumbnail.url',
    },
    {
      name: 'non-positive image dimensions',
      manifest: makeManifest([makePhoto({ thumbnailWidth: 0 })]),
      expected: 'photos[0].generated.images.thumbnail.width',
    },
    {
      name: 'invalid orientation',
      manifest: makeManifest([makePhoto({ orientation: 'diagonal' })]),
      expected: 'photos[0].generated.orientation',
    },
    {
      name: 'duplicate photo IDs',
      manifest: makeManifest([
        makePhoto({ id: '10' }),
        makePhoto({ id: '10', order: 2 }),
      ]),
      expected: 'duplicate photo ID',
    },
    {
      name: 'unsafe EXIF keys',
      manifest: makeManifest([makePhoto({ exif: { gps: 'private' } })]),
      expected: 'photos[0].generated.exif.gps',
    },
  ])('rejects $name', ({ manifest, expected }) => {
    expect(() => selectPublishedPhotos(manifest)).toThrow(expected)
  })
})
