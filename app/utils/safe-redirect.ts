const DEFAULT_REDIRECT = '/'

export function safeRedirect(
  to: string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
): string {
  if (to?.startsWith('/') && !to.startsWith('//')) {
    return to;
  } else {
    return defaultRedirect;
  }
}