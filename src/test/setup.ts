import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(cleanup)

// jsdom implements clientWidth but does not perform layout. Provide a
// deterministic viewport measurement for responsive components.
Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
  configurable: true,
  get: () => 1024,
})

// jsdom does not implement the Fullscreen API. Expose its standard capability
// flag so libraries render fullscreen controls for accessibility tests.
Object.defineProperty(document, 'fullscreenEnabled', {
  configurable: true,
  value: true,
})
