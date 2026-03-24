import { useState, useMemo } from "react";
import SciLayout from "@/components/SciLayout";
import { bayesianInference, betaPDF } from "@/lib/numerical";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine,
} from "recharts";

const BayesianPage = () => {
  const [trueP, setTrueP] = useState(0.7);
  const [nTrials, setNTrials] = useState(50);
  const [step, setStep] = useState(50);

  const allSteps = useMemo(() => bayesianInference(trueP, nTrials), [trueP, nTrials]);
  const visibleSteps = allSteps.slice(0, step);
  const currentStep = visibleSteps[visibleSteps.length - 1] || { alpha: 1, beta: 1, mean: 0.5 };

  const pdfData = useMemo(() => {
    const points: { x: number; density: number }[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const d = betaPDF(x, currentStep.alpha, currentStep.beta);
      if (isFinite(d)) points.push({ x: Math.round(x * 1000) / 1000, density: Math.round(d * 1000) / 1000 });
    }
    return points;
  }, [currentStep.alpha, currentStep.beta]);

  const priorPdf = useMemo(() => {
    const points: { x: number; density: number }[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const d = betaPDF(x, 1, 1);
      if (isFinite(d)) points.push({ x: Math.round(x * 1000) / 1000, density: Math.round(d * 1000) / 1000 });
    }
    return points;
  }, []);

  const meanOverTime = visibleSteps.map((s) => ({
    trial: s.trial,
    mean: Math.round(s.mean * 10000) / 10000,
    lower: Math.round(s.lower95 * 10000) / 10000,
    upper: Math.round(s.upper95 * 10000) / 10000,
  }));

  const successes = visibleSteps.filter(s => s.outcome === 1).length;
  const failures = visibleSteps.filter(s => s.outcome === 0).length;

  return (
    <SciLayout>
      <div className="container py-10 md:py-14">
        <div className="mb-8 animate-fade-up">
          <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            Probabilistic Methods
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Bayesian <span className="text-gradient-cyan">Inference</span>
          </h1>
          <p className="text-secondary-foreground text-sm mt-2 max-w-lg">
            Watch a Beta-Binomial conjugate model update its beliefs. The posterior distribution sharpens around the true probability as evidence accumulates.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="rounded-lg border border-border bg-card p-4">
            <label className="font-display text-xs text-muted-foreground block mb-2">
              True probability θ = <span className="text-primary">{trueP.toFixed(2)}</span>
            </label>
            <input
              type="range" min={0.1} max={0.9} step={0.05} value={trueP}
              onChange={(e) => setTrueP(parseFloat(e.target.value))}
              className="w-full h-1" style={{ accentColor: "hsl(190 90% 50%)" }}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <label className="font-display text-xs text-muted-foreground block mb-2">
              Total trials = <span className="text-primary">{nTrials}</span>
            </label>
            <input
              type="range" min={10} max={200} step={10} value={nTrials}
              onChange={(e) => { setNTrials(parseInt(e.target.value)); setStep(parseInt(e.target.value)); }}
              className="w-full h-1" style={{ accentColor: "hsl(190 90% 50%)" }}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <label className="font-display text-xs text-muted-foreground block mb-2">
              Observe up to trial <span className="text-primary">{step}</span>
            </label>
            <input
              type="range" min={1} max={nTrials} step={1} value={step}
              onChange={(e) => setStep(parseInt(e.target.value))}
              className="w-full h-1" style={{ accentColor: "hsl(190 90% 50%)" }}
            />
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
          {[
            { label: "Posterior Mean", value: currentStep.mean.toFixed(4), color: "text-primary" },
            { label: "α (successes + 1)", value: currentStep.alpha.toString(), color: "text-success" },
            { label: "β (failures + 1)", value: currentStep.beta.toString(), color: "text-warning" },
            { label: `Observed (${successes}S / ${failures}F)`, value: `${(successes / Math.max(1, successes + failures) * 100).toFixed(1)}%`, color: "text-accent" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-3">
              <p className="font-display text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className={`font-display text-xl font-semibold ${s.color} mt-1`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-lg border border-glow-cyan bg-card p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">
              Posterior Distribution — Beta({currentStep.alpha}, {currentStep.beta})
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
                <XAxis
                  dataKey="x" type="number" domain={[0, 1]}
                  stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }}
                  label={{ value: "θ", position: "insideBottom", offset: -5, fill: "hsl(215 15% 45%)", fontSize: 10 }}
                />
                <YAxis stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <ReferenceLine x={trueP} stroke="hsl(142 60% 45%)" strokeDasharray="5 5" label={{ value: `true θ=${trueP}`, fill: "hsl(142 60% 45%)", fontSize: 9 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Area data={priorPdf} type="monotone" dataKey="density" stroke="hsl(215 15% 30%)" fill="hsl(215 15% 30% / 0.1)" strokeDasharray="4 4" />
                <Area data={pdfData} type="monotone" dataKey="density" stroke="hsl(190 90% 50%)" fill="hsl(190 90% 50% / 0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
            <p className="font-display text-xs text-muted-foreground mb-4">
              Posterior Mean & 95% CI over Trials
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={meanOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 14%)" />
                <XAxis dataKey="trial" stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 1]} stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <ReferenceLine y={trueP} stroke="hsl(142 60% 45%)" strokeDasharray="5 5" />
                <Tooltip
                  contentStyle={{ background: "hsl(222 22% 8%)", border: "1px solid hsl(222 18% 14%)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                />
                <Area dataKey="upper" stroke="none" fill="hsl(190 90% 50% / 0.08)" />
                <Area dataKey="lower" stroke="none" fill="hsl(222 25% 5%)" />
                <Line type="monotone" dataKey="mean" stroke="hsl(190 90% 50%)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <p className="font-display text-xs text-muted-foreground mb-3">
            Observation Sequence (first {Math.min(step, 100)} trials)
          </p>
          <div className="flex flex-wrap gap-1">
            {visibleSteps.slice(0, 100).map((s, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  s.outcome === 1 ? "bg-success" : "bg-destructive/60"
                }`}
                title={`Trial ${s.trial}: ${s.outcome === 1 ? "Success" : "Failure"}`}
              />
            ))}
          </div>
          <p className="font-display text-[10px] text-muted-foreground mt-2">
            <span className="text-success">■</span> Success &nbsp;
            <span className="text-destructive/60">■</span> Failure
          </p>
        </div>
      </div>
    </SciLayout>
  );
};

export default BayesianPage;
