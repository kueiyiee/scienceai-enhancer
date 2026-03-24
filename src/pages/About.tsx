import SciLayout from "@/components/SciLayout";
import { Atom, Code2, BookOpen, Cpu, BarChart3, Github } from "lucide-react";
import { Link } from "react-router-dom";

const techStack = [
  { name: "React + TypeScript", desc: "Component-based UI with type safety", icon: Code2 },
  { name: "Recharts", desc: "Declarative charting for scientific visualization", icon: BarChart3 },
  { name: "Numerical Methods", desc: "Custom implementations of Newton-Raphson, logistic maps, and Bayesian inference", icon: Cpu },
  { name: "Mathematical Theory", desc: "Rooted in numerical analysis, dynamical systems, and probabilistic methods", icon: BookOpen },
];

const About = () => (
  <SciLayout>
    <div className="container py-10 md:py-14">
      <div className="max-w-2xl animate-fade-up">
        <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          About This Project
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          AI for <span className="text-gradient-cyan">Science</span>
        </h1>
        <p className="text-secondary-foreground text-sm leading-relaxed mb-6">
          This interactive web application demonstrates computational methods for nonlinear systems 
          and probabilistic inference. Each module implements numerical algorithms from scratch, 
          providing real-time visualization of mathematical concepts that are foundational to 
          scientific computing and machine learning.
        </p>
        <p className="text-secondary-foreground text-sm leading-relaxed mb-8">
          Built as a course project for <span className="text-primary font-display text-xs">Numerical Analysis</span>, 
          this application translates Python/NumPy/SciPy algorithms into interactive browser-based 
          experiences, making complex mathematical ideas accessible and explorable.
        </p>
      </div>

      {/* Modules Overview */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Interactive <span className="text-gradient-cyan">Modules</span>
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Link to="/newton" className="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-all">
            <p className="font-display text-sm font-semibold text-gradient-cyan mb-1">Newton's Method</p>
            <p className="text-[11px] text-muted-foreground">
              Root-finding with quadratic convergence. Visualize how tangent-line iterations 
              rapidly converge to solutions of nonlinear equations.
            </p>
          </Link>
          <Link to="/logistic" className="group rounded-lg border border-border bg-card p-5 hover:border-accent/30 transition-all">
            <p className="font-display text-sm font-semibold text-gradient-purple mb-1">Logistic Map & Chaos</p>
            <p className="text-[11px] text-muted-foreground">
              Period-doubling bifurcations and the onset of chaos. Explore how deterministic 
              systems produce unpredictable behavior.
            </p>
          </Link>
          <Link to="/bayesian" className="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-all">
            <p className="font-display text-sm font-semibold text-gradient-cyan mb-1">Bayesian Inference</p>
            <p className="text-[11px] text-muted-foreground">
              Beta-Binomial conjugate model with live posterior updates. Watch beliefs 
              sharpen as evidence accumulates.
            </p>
          </Link>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Technology <span className="text-gradient-purple">Stack</span>
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {techStack.map((t) => (
            <div key={t.name} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 border border-primary/20 shrink-0">
                <t.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="rounded-lg border border-border bg-card/50 p-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Key <span className="text-gradient-cyan">Concepts</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="space-y-3">
            <div>
              <p className="font-display text-xs text-primary uppercase tracking-wider mb-1">Convergence Analysis</p>
              <p className="text-muted-foreground text-[11px]">
                Understanding how iterative methods approach solutions — measuring convergence rates, 
                order of convergence, and conditions for convergence failure.
              </p>
            </div>
            <div>
              <p className="font-display text-xs text-primary uppercase tracking-wider mb-1">Bifurcation Theory</p>
              <p className="text-muted-foreground text-[11px]">
                Studying qualitative changes in dynamical system behavior as parameters vary — 
                from fixed points through period-doubling to chaos.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-display text-xs text-accent uppercase tracking-wider mb-1">Bayesian Statistics</p>
              <p className="text-muted-foreground text-[11px]">
                Updating probability distributions as new data arrives — the foundation of 
                modern machine learning and decision theory.
              </p>
            </div>
            <div>
              <p className="font-display text-xs text-accent uppercase tracking-wider mb-1">Scientific Visualization</p>
              <p className="text-muted-foreground text-[11px]">
                Translating abstract mathematical objects into interactive visual representations 
                that build intuition and enable exploration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-10 text-center animate-fade-up" style={{ animationDelay: "400ms" }}>
        <div className="inline-flex items-center gap-2 text-muted-foreground font-display text-xs">
          <Atom className="h-3.5 w-3.5 text-primary" />
          Built with passion for computational science
        </div>
      </div>
    </div>
  </SciLayout>
);

export default About;
