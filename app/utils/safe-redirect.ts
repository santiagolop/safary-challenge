const DEFAULT_REDIRECT = '/'

export function safeRedirect(
  to: string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
): string {
  return to || defaultRedirect
}
