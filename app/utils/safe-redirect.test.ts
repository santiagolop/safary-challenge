import { safeRedirect } from './safe-redirect'

test('returns destination when it is safe', () => {
  const destination = '/safe/path'
  expect(safeRedirect(destination)).toBe(destination)
})

test('returns default redirect when destination is not safe', () => {
  const destination = 'https://externalwebsite.com'
  expect(safeRedirect(destination)).toBe("/")
})
