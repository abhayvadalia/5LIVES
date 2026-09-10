/** Clamp elastic scrolling and handle a narrative shorter than the viewport. */
export function storyProgress(top: number, height: number, viewport: number) {
  return Math.max(0, Math.min(1, -top / Math.max(height - viewport, 1)));
}
export function storyChapter(progress: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
}
