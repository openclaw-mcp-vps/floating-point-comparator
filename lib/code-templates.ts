export type LanguageId =
  | "typescript"
  | "javascript"
  | "python"
  | "go"
  | "java"
  | "csharp"
  | "rust"
  | "cpp";

export interface LanguageOption {
  id: LanguageId;
  label: string;
}

export interface CodeTemplateOptions {
  functionName: string;
  absoluteTolerance: number;
  relativeTolerance: number;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "rust", label: "Rust" },
  { id: "cpp", label: "C++" }
];

function normalizeFunctionName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return "almostEqual";
  }

  return trimmed.replace(/[^a-zA-Z0-9_]/g, "");
}

export function generateCodeTemplate(
  language: LanguageId,
  options: CodeTemplateOptions
): string {
  const functionName = normalizeFunctionName(options.functionName);
  const absTol = options.absoluteTolerance;
  const relTol = options.relativeTolerance;

  const templates: Record<LanguageId, string> = {
    typescript: `export function ${functionName}(a: number, b: number, absTol = ${absTol}, relTol = ${relTol}): boolean {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;

  const diff = Math.abs(a - b);
  if (diff <= absTol) return true;

  const largest = Math.max(Math.abs(a), Math.abs(b), 1);
  return diff <= largest * relTol;
}

// Example usage:
// ${functionName}(0.1 + 0.2, 0.3)
`,
    javascript: `function ${functionName}(a, b, absTol = ${absTol}, relTol = ${relTol}) {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;

  const diff = Math.abs(a - b);
  if (diff <= absTol) return true;

  const largest = Math.max(Math.abs(a), Math.abs(b), 1);
  return diff <= largest * relTol;
}

// Example usage:
// ${functionName}(0.1 + 0.2, 0.3);
`,
    python: `import math

def ${functionName}(a: float, b: float, abs_tol: float = ${absTol}, rel_tol: float = ${relTol}) -> bool:
    if math.isnan(a) or math.isnan(b):
        return False
    if not math.isfinite(a) or not math.isfinite(b):
        return a == b

    diff = abs(a - b)
    if diff <= abs_tol:
        return True

    largest = max(abs(a), abs(b), 1.0)
    return diff <= largest * rel_tol

# Example usage:
# ${functionName}(0.1 + 0.2, 0.3)
`,
    go: `package floatcmp

import "math"

func ${functionName[0]?.toUpperCase() + functionName.slice(1)}(a, b float64, absTol, relTol float64) bool {
\tif math.IsNaN(a) || math.IsNaN(b) {
\t\treturn false
\t}
\tif math.IsInf(a, 0) || math.IsInf(b, 0) {
\t\treturn a == b
\t}

\tdiff := math.Abs(a - b)
\tif diff <= absTol {
\t\treturn true
\t}

\tlargest := math.Max(math.Abs(a), math.Max(math.Abs(b), 1.0))
\treturn diff <= largest*relTol
}

// Example usage:
// ${functionName[0]?.toUpperCase() + functionName.slice(1)}(0.1+0.2, 0.3, ${absTol}, ${relTol})
`,
    java: `public final class FloatComparator {
  private FloatComparator() {}

  public static boolean ${functionName}(double a, double b, double absTol, double relTol) {
    if (Double.isNaN(a) || Double.isNaN(b)) return false;
    if (!Double.isFinite(a) || !Double.isFinite(b)) return a == b;

    double diff = Math.abs(a - b);
    if (diff <= absTol) return true;

    double largest = Math.max(Math.abs(a), Math.max(Math.abs(b), 1.0));
    return diff <= largest * relTol;
  }
}
`,
    csharp: `public static class FloatComparator
{
    public static bool ${functionName}(double a, double b, double absTol = ${absTol}, double relTol = ${relTol})
    {
        if (double.IsNaN(a) || double.IsNaN(b)) return false;
        if (!double.IsFinite(a) || !double.IsFinite(b)) return a == b;

        var diff = Math.Abs(a - b);
        if (diff <= absTol) return true;

        var largest = Math.Max(Math.Abs(a), Math.Max(Math.Abs(b), 1.0));
        return diff <= largest * relTol;
    }
}
`,
    rust: `pub fn ${functionName}(a: f64, b: f64, abs_tol: f64, rel_tol: f64) -> bool {
    if a.is_nan() || b.is_nan() {
        return false;
    }

    if !a.is_finite() || !b.is_finite() {
        return a == b;
    }

    let diff = (a - b).abs();
    if diff <= abs_tol {
        return true;
    }

    let largest = a.abs().max(b.abs()).max(1.0);
    diff <= largest * rel_tol
}
`,
    cpp: `#include <cmath>

inline bool ${functionName}(double a, double b, double absTol = ${absTol}, double relTol = ${relTol}) {
  if (std::isnan(a) || std::isnan(b)) return false;
  if (!std::isfinite(a) || !std::isfinite(b)) return a == b;

  const double diff = std::fabs(a - b);
  if (diff <= absTol) return true;

  const double largest = std::max({std::fabs(a), std::fabs(b), 1.0});
  return diff <= largest * relTol;
}
`
  };

  return templates[language];
}
