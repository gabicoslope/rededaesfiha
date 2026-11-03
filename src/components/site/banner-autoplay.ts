export const BANNER_INTERVAL_MS = 6000;

export function shouldAutoplay(state: {
  hover: boolean;
  focus: boolean;
  touch: boolean;
  hidden: boolean;
  reducedMotion: boolean;
  rulesOpen: boolean;
}) {
  return !Object.values(state).some(Boolean);
}
