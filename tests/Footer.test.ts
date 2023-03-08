import { cleanup, render, screen } from '@testing-library/svelte'
import Footer from '$components/Footer.svelte'

describe('Footer.svelte', () => {
  // TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(Footer)
    expect(container).toBeTruthy()

    const year = new Date().getFullYear();

    expect(screen.getByText(`Copyright ©${year} | All Rights Reserved`)).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy').getAttribute('href')).toBe('/privacy')
    expect(screen.getByText('Terms of Service').getAttribute('href')).toBe('/tos')
  })
})