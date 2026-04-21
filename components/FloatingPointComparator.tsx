"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Sigma } from "lucide-react";

import {
  formatForDisplay,
  safeFloatCompare,
  toSafeDecimalString
} from "@/lib/comparison-algorithms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PrecisionVisualizer } from "@/components/PrecisionVisualizer";

export function FloatingPointComparator() {
  const [left, setLeft] = useState("0.1 + 0.2");
  const [right, setRight] = useState("0.3");
  const [absoluteTolerance, setAbsoluteTolerance] = useState("1e-12");
  const [relativeTolerance, setRelativeTolerance] = useState("1e-9");
  const [maxUlps, setMaxUlps] = useState("4");

  const parsedLeft = useMemo(() => {
    try {
      // eslint-disable-next-line no-new-func
      return Number(Function(`"use strict"; return (${left});`)());
    } catch {
      return Number.NaN;
    }
  }, [left]);

  const parsedRight = useMemo(() => {
    try {
      // eslint-disable-next-line no-new-func
      return Number(Function(`"use strict"; return (${right});`)());
    } catch {
      return Number.NaN;
    }
  }, [right]);

  const report = useMemo(
    () =>
      safeFloatCompare(parsedLeft, parsedRight, {
        absoluteTolerance: Number(absoluteTolerance),
        relativeTolerance: Number(relativeTolerance),
        maxUlps: Number(maxUlps)
      }),
    [absoluteTolerance, maxUlps, parsedLeft, parsedRight, relativeTolerance]
  );

  const naiveEqual = Object.is(parsedLeft, parsedRight);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sigma className="h-5 w-5 text-[#78b4ff]" />
            Compare values safely
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Left expression
              </label>
              <Input value={left} onChange={(event) => setLeft(event.target.value)} />
              <p className="mt-1 text-xs text-zinc-500">Evaluated as: {formatForDisplay(parsedLeft)}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Right expression
              </label>
              <Input value={right} onChange={(event) => setRight(event.target.value)} />
              <p className="mt-1 text-xs text-zinc-500">Evaluated as: {formatForDisplay(parsedRight)}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Absolute tolerance
              </label>
              <Input
                type="text"
                value={absoluteTolerance}
                onChange={(event) => setAbsoluteTolerance(event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Relative tolerance
              </label>
              <Input
                type="text"
                value={relativeTolerance}
                onChange={(event) => setRelativeTolerance(event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                Max ULPs
              </label>
              <Input type="number" value={maxUlps} onChange={(event) => setMaxUlps(event.target.value)} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#2f3d59] bg-[#10182a] p-4">
              <p className="text-sm font-semibold text-zinc-200">Naive equality (`a === b`)</p>
              <p className="mt-2 text-xl font-bold">{naiveEqual ? "true" : "false"}</p>
              <p className="mt-2 text-xs text-zinc-400">
                {naiveEqual
                  ? "This comparison says equal."
                  : "This comparison fails for many valid numeric matches."}
              </p>
            </div>
            <div className="rounded-xl border border-[#2f3d59] bg-[#10182a] p-4">
              <p className="text-sm font-semibold text-zinc-200">Safe comparator result</p>
              <p className="mt-2 flex items-center gap-2 text-xl font-bold">
                {report.equal ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" /> true
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-rose-400" /> false
                  </>
                )}
              </p>
              <p className="mt-2 text-xs text-zinc-400">{report.reason}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#2f3d59] bg-[#10182a] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Badge>{report.kind.toUpperCase()} check</Badge>
            </div>
            <div className="grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              <p>
                Absolute difference: <span className="font-mono">{formatForDisplay(report.absoluteDifference)}</span>
              </p>
              <p>
                Relative difference: <span className="font-mono">{formatForDisplay(report.relativeDifference)}</span>
              </p>
              <p>
                ULP distance: <span className="font-mono">{report.ulpDistance.toString()}</span>
              </p>
              <p>
                Decimal form (left): <span className="font-mono">{toSafeDecimalString(parsedLeft)}</span>
              </p>
              <p>
                Decimal form (right): <span className="font-mono">{toSafeDecimalString(parsedRight)}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <PrecisionVisualizer />
    </div>
  );
}
