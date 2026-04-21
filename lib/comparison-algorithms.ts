import Decimal from "decimal.js";

const SIGN_MASK_64 = 0x8000000000000000n;

export type ComparisonKind = "exact" | "epsilon" | "absolute" | "relative" | "ulps";

export interface ComparisonOptions {
  absoluteTolerance: number;
  relativeTolerance: number;
  maxUlps: number;
}

export interface ComparisonReport {
  equal: boolean;
  kind: ComparisonKind;
  absoluteDifference: number;
  relativeDifference: number;
  ulpDistance: bigint;
  reason: string;
}

export interface PrecisionPoint {
  step: number;
  value: number;
  decimalValue: number;
  drift: number;
}

export const DEFAULT_COMPARISON_OPTIONS: ComparisonOptions = {
  absoluteTolerance: 1e-12,
  relativeTolerance: 1e-9,
  maxUlps: 4
};

function normalizeBits(value: number): bigint {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  const bits = view.getBigInt64(0, false);

  if (bits < 0n) {
    return SIGN_MASK_64 - bits;
  }

  return bits + SIGN_MASK_64;
}

export function ulpDistance(a: number, b: number): bigint {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return BigInt(Number.MAX_SAFE_INTEGER);
  }

  const left = normalizeBits(a);
  const right = normalizeBits(b);
  return left >= right ? left - right : right - left;
}

export function safeFloatCompare(
  left: number,
  right: number,
  options: Partial<ComparisonOptions> = {}
): ComparisonReport {
  const merged: ComparisonOptions = {
    ...DEFAULT_COMPARISON_OPTIONS,
    ...options
  };

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return {
      equal: false,
      kind: "exact",
      absoluteDifference: Number.NaN,
      relativeDifference: Number.NaN,
      ulpDistance: BigInt(Number.MAX_SAFE_INTEGER),
      reason: "NaN cannot be compared safely and should be handled explicitly."
    };
  }

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    const equal = left === right;
    return {
      equal,
      kind: "exact",
      absoluteDifference: Math.abs(left - right),
      relativeDifference: equal ? 0 : Number.POSITIVE_INFINITY,
      ulpDistance: BigInt(Number.MAX_SAFE_INTEGER),
      reason: equal
        ? "Both values are the same infinity."
        : "Infinity values differ and should not be treated as equal."
    };
  }

  if (Object.is(left, right)) {
    return {
      equal: true,
      kind: "exact",
      absoluteDifference: 0,
      relativeDifference: 0,
      ulpDistance: 0n,
      reason: "Exact IEEE-754 equality."
    };
  }

  const absoluteDifference = Math.abs(left - right);
  const largestMagnitude = Math.max(Math.abs(left), Math.abs(right), 1);
  const relativeDifference = absoluteDifference / largestMagnitude;
  const distance = ulpDistance(left, right);

  if (absoluteDifference <= merged.absoluteTolerance) {
    return {
      equal: true,
      kind: "absolute",
      absoluteDifference,
      relativeDifference,
      ulpDistance: distance,
      reason: `Absolute difference is within ${merged.absoluteTolerance}.`
    };
  }

  if (relativeDifference <= merged.relativeTolerance) {
    return {
      equal: true,
      kind: "relative",
      absoluteDifference,
      relativeDifference,
      ulpDistance: distance,
      reason: `Relative difference is within ${merged.relativeTolerance}.`
    };
  }

  if (distance <= BigInt(merged.maxUlps)) {
    return {
      equal: true,
      kind: "ulps",
      absoluteDifference,
      relativeDifference,
      ulpDistance: distance,
      reason: `ULP distance (${distance.toString()}) is within ${merged.maxUlps}.`
    };
  }

  return {
    equal: false,
    kind: "epsilon",
    absoluteDifference,
    relativeDifference,
    ulpDistance: distance,
    reason: "Values differ beyond absolute, relative, and ULP tolerances."
  };
}

export function toSafeDecimalString(value: number, digits = 20): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const decimal = new Decimal(value);
  return decimal.toSignificantDigits(digits).toString();
}

export function buildPrecisionSeries(
  baseValue: number,
  increment: number,
  steps: number
): PrecisionPoint[] {
  const data: PrecisionPoint[] = [];
  const decimalBase = new Decimal(baseValue);
  const decimalIncrement = new Decimal(increment);

  let floatValue = baseValue;

  for (let index = 1; index <= steps; index += 1) {
    floatValue += increment;
    const decimalValue = decimalBase.plus(decimalIncrement.mul(index));
    const drift = new Decimal(floatValue).minus(decimalValue).toNumber();

    data.push({
      step: index,
      value: floatValue,
      decimalValue: decimalValue.toNumber(),
      drift
    });
  }

  return data;
}

export function formatForDisplay(value: number, digits = 16): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  return value.toPrecision(digits);
}
