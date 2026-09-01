import manifestJson from '@/data/photos.json'

export interface GalleryImageSource {
  readonly url: string
  readonly width: number
  readonly height: number
}

export interface GalleryExif {
  readonly camera?: string
  readonly lens?: string
  readonly exposureTime?: string
  readonly aperture?: string
  readonly iso?: string
  readonly focalLength?: string
  readonly flash?: string
}

export interface GalleryTagDefinition {
  readonly id: string
  readonly label: string
}

export interface GalleryPhoto {
  readonly id: string
  readonly displayTitle: string
  readonly backstory: string
  readonly tagIds: readonly string[]
  readonly altText: string
  readonly sourceFilename: string
  readonly canonicalPageUrl: string
  readonly orientation: 'landscape' | 'portrait' | 'square'
  readonly thumbnail: GalleryImageSource
  readonly full: GalleryImageSource
  readonly exif: GalleryExif
}

interface PhotoManifestRecord {
  readonly source: {
    readonly submittedPhotoPageUrl: string
    readonly photoId: string
    readonly albumId: string
  }
  readonly curation: {
    readonly displayTitle: string
    readonly backstory: string
    readonly tagIds: readonly string[]
    readonly altText: string
    readonly order: number
    readonly published: boolean
  }
  readonly generated: {
    readonly canonicalPageUrl: string
    readonly flickrTitle: string
    readonly sourceFilename: string
    readonly orientation: GalleryPhoto['orientation']
    readonly images: {
      readonly thumbnail: GalleryImageSource
      readonly full: GalleryImageSource
    }
    readonly exif: GalleryExif
  }
}

interface PhotoManifest {
  readonly schemaVersion: 1
  readonly generatedAt: string
  readonly tags: readonly GalleryTagDefinition[]
  readonly photos: readonly PhotoManifestRecord[]
}

type JsonObject = Record<string, unknown>

const PAGE_HOSTS = new Set(['flickr.com', 'www.flickr.com'])
const CDN_HOSTS = new Set(['live.staticflickr.com'])
const SAFE_EXIF_KEYS = new Set([
  'camera',
  'lens',
  'exposureTime',
  'aperture',
  'iso',
  'focalLength',
  'flash',
])

const invalid = (path: string): never => {
  throw new Error(`Invalid photo manifest: ${path}`)
}

const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const expectObject = (value: unknown, path: string): JsonObject => {
  if (!isJsonObject(value)) {
    return invalid(path)
  }

  return value
}

const expectArray = (value: unknown, path: string): unknown[] => {
  if (!Array.isArray(value)) {
    return invalid(path)
  }

  return value
}

const expectString = (
  value: unknown,
  path: string,
  allowEmpty = false,
): string => {
  if (typeof value !== 'string' || (!allowEmpty && value.length === 0)) {
    return invalid(path)
  }

  return value
}

const expectStringArray = (value: unknown, path: string): string[] =>
  expectArray(value, path).map((entry, index) =>
    expectString(entry, `${path}[${index}]`),
  )

const expectBoolean = (value: unknown, path: string): boolean => {
  if (typeof value !== 'boolean') {
    return invalid(path)
  }

  return value
}

const expectFiniteNumber = (value: unknown, path: string): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return invalid(path)
  }

  return value
}

const expectDimension = (value: unknown, path: string): number => {
  const dimension = expectFiniteNumber(value, path)

  if (!Number.isInteger(dimension) || dimension <= 0) {
    return invalid(path)
  }

  return dimension
}

const expectUrl = (
  value: unknown,
  path: string,
  allowedHosts: ReadonlySet<string>,
): string => {
  const rawUrl = expectString(value, path)
  let url: URL

  try {
    url = new URL(rawUrl)
  } catch {
    return invalid(path)
  }

  if (
    url.protocol !== 'https:' ||
    url.port !== '' ||
    url.username !== '' ||
    url.password !== '' ||
    !allowedHosts.has(url.hostname.toLowerCase())
  ) {
    return invalid(path)
  }

  return rawUrl
}

const hasOwn = (value: JsonObject, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, key)

const isOrientation = (
  value: string,
): value is GalleryPhoto['orientation'] =>
  value === 'landscape' || value === 'portrait' || value === 'square'

const parseExif = (value: unknown, path: string): GalleryExif => {
  const exif = expectObject(value, path)

  for (const key of Object.keys(exif)) {
    if (!SAFE_EXIF_KEYS.has(key)) {
      return invalid(`${path}.${key}`)
    }
  }

  return {
    ...(hasOwn(exif, 'camera')
      ? { camera: expectString(exif.camera, `${path}.camera`, true) }
      : {}),
    ...(hasOwn(exif, 'lens')
      ? { lens: expectString(exif.lens, `${path}.lens`, true) }
      : {}),
    ...(hasOwn(exif, 'exposureTime')
      ? {
          exposureTime: expectString(
            exif.exposureTime,
            `${path}.exposureTime`,
            true,
          ),
        }
      : {}),
    ...(hasOwn(exif, 'aperture')
      ? { aperture: expectString(exif.aperture, `${path}.aperture`, true) }
      : {}),
    ...(hasOwn(exif, 'iso')
      ? { iso: expectString(exif.iso, `${path}.iso`, true) }
      : {}),
    ...(hasOwn(exif, 'focalLength')
      ? {
          focalLength: expectString(
            exif.focalLength,
            `${path}.focalLength`,
            true,
          ),
        }
      : {}),
    ...(hasOwn(exif, 'flash')
      ? { flash: expectString(exif.flash, `${path}.flash`, true) }
      : {}),
  }
}

const parseImageSource = (
  value: unknown,
  path: string,
): GalleryImageSource => {
  const image = expectObject(value, path)

  return {
    url: expectUrl(image.url, `${path}.url`, CDN_HOSTS),
    width: expectDimension(image.width, `${path}.width`),
    height: expectDimension(image.height, `${path}.height`),
  }
}

const parseTag = (value: unknown, path: string): GalleryTagDefinition => {
  const tag = expectObject(value, path)

  return {
    id: expectString(tag.id, `${path}.id`),
    label: expectString(tag.label, `${path}.label`),
  }
}

const parsePhoto = (value: unknown, path: string): PhotoManifestRecord => {
  const photo = expectObject(value, path)
  const source = expectObject(photo.source, `${path}.source`)
  const curation = expectObject(photo.curation, `${path}.curation`)
  const generated = expectObject(photo.generated, `${path}.generated`)
  const images = expectObject(generated.images, `${path}.generated.images`)
  const orientation = expectString(
    generated.orientation,
    `${path}.generated.orientation`,
  )

  if (!isOrientation(orientation)) {
    return invalid(`${path}.generated.orientation`)
  }

  return {
    source: {
      submittedPhotoPageUrl: expectUrl(
        source.submittedPhotoPageUrl,
        `${path}.source.submittedPhotoPageUrl`,
        PAGE_HOSTS,
      ),
      photoId: expectString(source.photoId, `${path}.source.photoId`),
      albumId: expectString(source.albumId, `${path}.source.albumId`),
    },
    curation: {
      displayTitle: expectString(
        curation.displayTitle,
        `${path}.curation.displayTitle`,
      ),
      backstory: expectString(
        curation.backstory,
        `${path}.curation.backstory`,
        true,
      ),
      tagIds: expectStringArray(curation.tagIds, `${path}.curation.tagIds`),
      altText: expectString(curation.altText, `${path}.curation.altText`),
      order: expectFiniteNumber(curation.order, `${path}.curation.order`),
      published: expectBoolean(
        curation.published,
        `${path}.curation.published`,
      ),
    },
    generated: {
      canonicalPageUrl: expectUrl(
        generated.canonicalPageUrl,
        `${path}.generated.canonicalPageUrl`,
        PAGE_HOSTS,
      ),
      flickrTitle: expectString(
        generated.flickrTitle,
        `${path}.generated.flickrTitle`,
      ),
      sourceFilename: expectString(
        generated.sourceFilename,
        `${path}.generated.sourceFilename`,
      ),
      orientation,
      images: {
        thumbnail: parseImageSource(
          images.thumbnail,
          `${path}.generated.images.thumbnail`,
        ),
        full: parseImageSource(
          images.full,
          `${path}.generated.images.full`,
        ),
      },
      exif: parseExif(generated.exif, `${path}.generated.exif`),
    },
  }
}

const parseManifest = (value: unknown): PhotoManifest => {
  const manifest = expectObject(value, 'manifest')

  if (manifest.schemaVersion !== 1) {
    return invalid('schemaVersion')
  }

  const generatedAt = expectString(manifest.generatedAt, 'generatedAt')
  if (Number.isNaN(Date.parse(generatedAt))) {
    return invalid('generatedAt')
  }

  const tags = expectArray(manifest.tags, 'tags').map((tag, index) =>
    parseTag(tag, `tags[${index}]`),
  )
  const tagIds = new Set<string>()
  for (const tag of tags) {
    if (tagIds.has(tag.id)) {
      return invalid(`duplicate tag ID ${tag.id}`)
    }
    tagIds.add(tag.id)
  }

  const photos = expectArray(manifest.photos, 'photos').map((photo, index) =>
    parsePhoto(photo, `photos[${index}]`),
  )
  const photoIds = new Set<string>()
  for (const photo of photos) {
    if (photoIds.has(photo.source.photoId)) {
      return invalid(`duplicate photo ID ${photo.source.photoId}`)
    }
    photoIds.add(photo.source.photoId)
  }

  return {
    schemaVersion: 1,
    generatedAt,
    tags,
    photos,
  }
}

const comparePhotoIds = (
  left: PhotoManifestRecord,
  right: PhotoManifestRecord,
): number => {
  if (left.source.photoId < right.source.photoId) {
    return -1
  }

  if (left.source.photoId > right.source.photoId) {
    return 1
  }

  return 0
}

export const selectPublishedPhotos = (
  manifestJson: unknown,
): readonly GalleryPhoto[] =>
  parseManifest(manifestJson).photos
    .filter(({ curation }) => curation.published)
    .sort(
      (left, right) =>
        left.curation.order - right.curation.order ||
        comparePhotoIds(left, right),
    )
    .map(({ source, curation, generated }) => ({
      id: source.photoId,
      displayTitle: curation.displayTitle,
      backstory: curation.backstory,
      tagIds: [...curation.tagIds],
      altText: curation.altText,
      sourceFilename: generated.sourceFilename,
      canonicalPageUrl: generated.canonicalPageUrl,
      orientation: generated.orientation,
      thumbnail: { ...generated.images.thumbnail },
      full: { ...generated.images.full },
      exif: { ...generated.exif },
    }))

export const publishedPhotos = selectPublishedPhotos(manifestJson)
