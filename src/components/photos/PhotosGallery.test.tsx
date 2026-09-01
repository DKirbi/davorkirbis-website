import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PhotosGallery } from '@/components/photos/PhotosGallery'
import { publishedPhotos } from '@/features/photos/gallery-data'

const ALT_TEXT =
  'A singer gestures at a microphone while two backing vocalists perform under blue stage lights.'

describe('PhotosGallery', () => {
  it('opens the selected Flickr photo in an accessible lightbox', async () => {
    const user = userEvent.setup()
    render(<PhotosGallery items={publishedPhotos} />)

    await user.click(screen.getByRole('button', { name: 'Open DSC05077' }))

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    expect(
      screen
        .getAllByAltText(ALT_TEXT)
        .filter(
          (image) => image.getAttribute('src') === publishedPhotos[0].full.url,
        ),
    ).toHaveLength(1)
    expect(
      screen.getByRole('button', { name: 'Enter Fullscreen' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument()
  })

  it('closes the lightbox with Escape', async () => {
    const user = userEvent.setup()
    render(<PhotosGallery items={publishedPhotos} />)

    await user.click(screen.getByRole('button', { name: 'Open DSC05077' }))
    await user.keyboard('{Escape}')

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: 'Close' }),
      ).not.toBeInTheDocument(),
    )
  })
})
