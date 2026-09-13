export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const ramp = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));
const smooth = (value: number) => value * value * (3 - 2 * value);
/** All scenes are derived from a single native-scroll timeline, never wheel interception. */
export function shadowMotion(progress: number) {
  const p = clamp01(progress);
  const leave = ramp(p, 0.02, 0.23);
  const enterVision = ramp(p, 0.12, 0.23),
    leaveVision = ramp(p, 0.48, 0.66);
  const final = leaveVision;
  return {
    openingScale: 1 + leave * 1.3,
    openingOpacity: 1 - ramp(p, 0.08, 0.23),
    openingBlur: leave * 22,
    openingY: -leave * 90,
    split: smooth(ramp(p, 0.12, 0.61)),
    shadowOpacity: ramp(p, 0.11, 0.27),
    shadowBlur: (1 - ramp(p, 0.18, 0.51)) * 12,
    personOpacity: 1 - ramp(p, 0.24, 0.53),
    personBlur: ramp(p, 0.24, 0.53) * 16,
    personScale: 1 + ramp(p, 0.07, 0.38) * 0.08 - ramp(p, 0.64, 1) * 0.12,
    visionOpacity: enterVision * (1 - leaveVision),
    visionScale: 0.73 + enterVision * 0.27 + leaveVision * 0.7,
    visionBlur: (1 - enterVision) * 14 + leaveVision * 24,
    labelOpacity: ramp(p, 0.53, 0.67),
    finalOpacity: final,
    finalScale: 0.76 + final * 0.24,
    finalBlur: (1 - final) * 12,
  };
}
