import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import type { Slide } from 'yet-another-react-lightbox'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import type { GalleryPhoto } from '@/features/photos/gallery-data'
import 'react-photo-album/rows.css'
import 'yet-another-react-lightbox/styles.css'
import '@/components/photos/PhotosGallery.scss'

/** Props for the responsive photo mosaic and its lightbox. */
export interface PhotosGalleryProps {
  /** Published photos to display without mutating their editorial order. */
  items: readonly GalleryPhoto[]
}

export const PhotosGallery: FC<PhotosGalleryProps> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
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
  )
  const slides = useMemo<Slide[]>(
    () =>
      items.map((photo) => ({
        src: photo.full.url,
        width: photo.full.width,
        height: photo.full.height,
        alt: photo.altText,
        imageFit: photo.orientation === 'portrait' ? 'cover' : 'contain',
      })),
    [items],
  )

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
  )
}
