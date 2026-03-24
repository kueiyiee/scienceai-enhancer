import { useState, useMemo } from "react";
import SciLayout from "@/components/SciLayout";
import { logisticMap } from "@/lib/numerical";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LogisticMapPage = () => {
  const [rRange, setRRange] = useState<[number, number]>([2.5, 4.0]);
  const [resolution, setResolution] = useState(600);

  const data = useMemo(() => {
    const results = logisticMap(rRange[0], rRange[1], resolution, 300, 60);
    return results.flatMap((res) =>
      res.steadyStates.map((x) => ({ r: Math.round(res.r * 10000) / 10000, x: Math.round(x * 10000) / 10000 }))
    );
  }, [rRange, resolution]);

  const [selectedR, setSelectedR] = useState(3.7);
  const timeSeries = useMemo(() => {
    const points: { n: number; x: number }[] = [];
    let x = 0.5;
    for (let n = 0; n < 80; n++) {
      x = selectedR * x * (1 - x);
      points.push({ n, x: Math.round(x * 10000) / 10000 });
    }
    return points;
  }, [selectedR]);

  const presets = [
    { label: "Full Range", range: [2.5, 4.0] as [number, number] },
    { label: "Onset of Chaos", range: [3.4, 3.6] as [number, number] },
    { label: "Deep Chaos", range: [3.5, 4.0] as [number, number] },
    { label: "Window of Order", range: [3.82, 3.87] as [number, number] },
  ];

  return (
    <SciLayout>
      <div className="container py-10 md:py-14">
        <div className="mb-8 animate-fade-up">
          <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Dynamical Systems
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Logistic Map & <span className="text-gradient-purple">Chaos</span>
          </h1>
          <p className="text-secondary-foreground text-sm mt-2 max-w-lg">
            The equation x<sub>n+1</sub> = r·x<sub>n</sub>·(1−x<sub>n</sub>) generates the famous bifurcation diagram — a roadmap from stability to chaos through period-doubling.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setRRange(p.range)}
              className={`px-3 py-1.5 rounded-md text-xs font-display transition-all border ${
                rRange[0] === p.range[0] && rRange[1] === p.range[1]
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-accent/20"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-glow-purple bg-card p-5 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
          <p className="font-display text-xs text-muted-foreground mb-4">
            Bifurcation Diagram — r ∈ [{rRange[0]}, {rRange[1]}] · {data.length.toLocaleString()} points
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
              <XAxis
                dataKey="r" type="number" domain={rRange}
                stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }}
                label={{ value: "r (growth rate)", position: "insideBottom", offset: -5, fill: "hsl(215 15% 45%)", fontSize: 10 }}
              />
              <YAxis
                dataKey="x" type="number" domain={[0, 1]}
                stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }}
                label={{ value: "x (steady state)", angle: -90, position: "insideLeft", fill: "hsl(215 15% 45%)", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
              <Scatter data={data} fill="hsl(280 70% 60%)" r={0.5} fillOpacity={0.4} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">Time Series Explorer</p>
            <label className="font-display text-xs text-muted-foreground block mb-2">
              r = <span className="text-accent">{selectedR.toFixed(3)}</span>
            </label>
            <input
              type="range" min={1} max={4} step={0.005} value={selectedR}
              onChange={(e) => setSelectedR(parseFloat(e.target.value))}
              className="w-full h-1" style={{ accentColor: "hsl(280 70% 60%)" }}
            />
            <div className="mt-4 space-y-2 text-[11px] font-display text-muted-foreground">
              <p>r &lt; 1: <span className="text-secondary-foreground">extinction</span></p>
              <p>1 &lt; r &lt; 3: <span className="text-secondary-foreground">fixed point</span></p>
              <p>3 &lt; r &lt; 3.45: <span className="text-secondary-foreground">period-2 cycle</span></p>
              <p>3.45 &lt; r &lt; 3.57: <span className="text-secondary-foreground">period-doubling</span></p>
              <p>r &gt; 3.57: <span className="text-accent">chaos</span></p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">
              Orbit — x<sub>n</sub> vs n at r = {selectedR.toFixed(3)}
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
                <XAxis dataKey="n" stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <YAxis dataKey="x" domain={[0, 1]} stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Scatter data={timeSeries} fill="hsl(280 70% 60%)" r={2} line={{ stroke: "hsl(280 70% 60% / 0.4)", strokeWidth: 1 }} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SciLayout>
  );
};

export default LogisticMapPage;
