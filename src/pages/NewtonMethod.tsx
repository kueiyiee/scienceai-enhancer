import { useState, useMemo } from "react";
import SciLayout from "@/components/SciLayout";
import { newtonMethod, generateCurve } from "@/lib/numerical";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ScatterChart, Scatter,
} from "recharts";

const functions = [
  {
    name: "x³ − 2x − 5",
    f: (x: number) => x ** 3 - 2 * x - 5,
    df: (x: number) => 3 * x ** 2 - 2,
    range: [-3, 4] as [number, number],
    default_x0: 2,
  },
  {
    name: "x² − 2 (√2 finder)",
    f: (x: number) => x ** 2 - 2,
    df: (x: number) => 2 * x,
    range: [-2, 3] as [number, number],
    default_x0: 1,
  },
  {
    name: "sin(x) − x/2",
    f: (x: number) => Math.sin(x) - x / 2,
    df: (x: number) => Math.cos(x) - 0.5,
    range: [-4, 4] as [number, number],
    default_x0: 2,
  },
  {
    name: "eˣ − 3x",
    f: (x: number) => Math.exp(x) - 3 * x,
    df: (x: number) => Math.exp(x) - 3,
    range: [-1, 3] as [number, number],
    default_x0: 0,
  },
];

const NewtonMethodPage = () => {
  const [funcIdx, setFuncIdx] = useState(0);
  const [x0, setX0] = useState(functions[0].default_x0);

  const fn = functions[funcIdx];
  const steps = useMemo(() => newtonMethod(fn.f, fn.df, x0), [funcIdx, x0]);
  const curve = useMemo(() => generateCurve(fn.f, fn.range[0], fn.range[1], 300), [funcIdx]);

  const root = steps.length > 0 ? steps[steps.length - 1].x - steps[steps.length - 1].fx / steps[steps.length - 1].dfx : x0;

  const convergenceData = steps.map((s) => ({
    iteration: s.iteration,
    error: s.error,
    logError: s.error > 0 ? Math.log10(s.error) : -16,
  }));

  return (
    <SciLayout>
      <div className="container py-10 md:py-14">
        <div className="mb-8 animate-fade-up">
          <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Nonlinear Equations
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Newton's <span className="text-gradient-cyan">Method</span>
          </h1>
          <p className="text-secondary-foreground text-sm mt-2 max-w-lg">
            Iterative root-finding using tangent-line approximation. Observe quadratic convergence — each iteration roughly doubles the number of correct digits.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {functions.map((f, i) => (
            <button
              key={i}
              onClick={() => { setFuncIdx(i); setX0(f.default_x0); }}
              className={`px-3 py-1.5 rounded-md text-xs font-display transition-all border ${
                funcIdx === i
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              f(x) = {f.name}
            </button>
          ))}
        </div>

        <div className="mb-8 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <label className="font-display text-xs text-muted-foreground block mb-2">
            Initial guess x₀ = <span className="text-primary">{x0.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min={fn.range[0]}
            max={fn.range[1]}
            step={0.1}
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
            className="w-full max-w-md h-1"
            style={{ accentColor: "hsl(190 90% 50%)" }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">
              Function Plot — f(x) = {fn.name}
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={curve}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
                <XAxis dataKey="x" stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <YAxis stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <ReferenceLine y={0} stroke="hsl(215 15% 30%)" strokeDasharray="5 5" />
                <ReferenceLine x={root} stroke="hsl(190 90% 50%)" strokeDasharray="3 3" label={{ value: `root ≈ ${root.toFixed(4)}`, fill: "hsl(190 90% 50%)", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                  labelStyle={{ color: "hsl(215 15% 45%)" }}
                />
                <Line type="monotone" dataKey="y" stroke="hsl(190 90% 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">
              Convergence — log₁₀(|error|)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
                <XAxis dataKey="iteration" stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} label={{ value: "Iteration", position: "insideBottom", offset: -5, fill: "hsl(215 15% 45%)", fontSize: 10 }} />
                <YAxis stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} label={{ value: "log₁₀(error)", angle: -90, position: "insideLeft", fill: "hsl(215 15% 45%)", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Scatter data={convergenceData} fill="hsl(190 90% 50%)" dataKey="logError" line={{ stroke: "hsl(190 90% 50%)", strokeWidth: 1 }} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden animate-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="p-4 border-b border-border">
            <p className="font-display text-xs text-muted-foreground">
              Iteration Table — {steps.length} steps to convergence
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-display">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 px-4 text-left">n</th>
                  <th className="py-2.5 px-4 text-left">xₙ</th>
                  <th className="py-2.5 px-4 text-left">f(xₙ)</th>
                  <th className="py-2.5 px-4 text-left">f′(xₙ)</th>
                  <th className="py-2.5 px-4 text-left">|error|</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s) => (
                  <tr key={s.iteration} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-4 text-primary">{s.iteration}</td>
                    <td className="py-2 px-4 text-foreground">{s.x.toFixed(10)}</td>
                    <td className="py-2 px-4 text-secondary-foreground">{s.fx.toExponential(4)}</td>
                    <td className="py-2 px-4 text-secondary-foreground">{s.dfx.toFixed(6)}</td>
                    <td className="py-2 px-4 text-warning">{s.error.toExponential(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SciLayout>
  );
};

export default NewtonMethodPage;
