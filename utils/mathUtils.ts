import { RatioResult } from '../types';
import { PRESETS } from '../constants';

export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const calculateAspectRatio = (width: number, height: number): RatioResult | null => {
  if (!width || !height || width <= 0 || height <= 0) return null;

  const currentDecimal = width / height;

  // Check for near-exact matches with presets to handle rounding errors
  // Tolerance of 0.01 handles small pixel rounding discrepancies (e.g. 1080x608 for 16:9)
  const matchingPreset = PRESETS.find(p => {
    const presetDecimal = p.w / p.h;
    return Math.abs(currentDecimal - presetDecimal) < 0.01;
  });

  if (matchingPreset) {
      return {
          w: matchingPreset.w,
          h: matchingPreset.h,
          string: matchingPreset.label,
          decimal: currentDecimal
      };
  }

  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;

  return {
    w,
    h,
    string: `${w}:${h}`,
    decimal: currentDecimal
  };
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};