/**
 * Tiny className helper — avoids pulling `clsx` for a brochure site.
 */
export function cn(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
