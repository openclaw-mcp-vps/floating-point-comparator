"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { buildPrecisionSeries, formatForDisplay } from "@/lib/comparison-algorithms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PrecisionVisualizer() {
  const [baseValue, setBaseValue] = useState(0.1);
  const [increment, setIncrement] = useState(0.2);
  const [steps, setSteps] = useState(20);

  const points = useMemo(() => {
    return buildPrecisionSeries(baseValue, increment, steps);
  }, [baseValue, increment, steps]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Precision Drift Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Start value
            </label>
            <Input
              type="number"
              step="any"
              value={baseValue}
              onChange={(event) => setBaseValue(Number(event.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Increment
            </label>
            <Input
              type="number"
              step="any"
              value={increment}
              onChange={(event) => setIncrement(Number(event.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Steps
            </label>
            <Input
              type="number"
              min={2}
              max={200}
              value={steps}
              onChange={(event) => setSteps(Math.max(2, Math.min(200, Number(event.target.value))))}
            />
          </div>
        </div>

        <div className="h-72 w-full rounded-xl border border-[#2d3952] bg-[#111827] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#1d2738" strokeDasharray="4 4" />
              <XAxis dataKey="step" stroke="#8da1bf" />
              <YAxis
                stroke="#8da1bf"
                tickFormatter={(value) => Number(value).toExponential(2)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f1727",
                  borderColor: "#364158",
                  borderRadius: "12px"
                }}
                formatter={(value: number, key: string) => [formatForDisplay(value), key]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                dot={false}
                strokeWidth={2}
                name="Floating point"
              />
              <Line
                type="monotone"
                dataKey="decimalValue"
                stroke="#22d3ee"
                dot={false}
                strokeWidth={2}
                name="Exact decimal"
              />
              <Line
                type="monotone"
                dataKey="drift"
                stroke="#f97316"
                dot={false}
                strokeWidth={2}
                name="Drift"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
