import { Link } from "react-router-dom";
import SciLayout from "@/components/SciLayout";
import { Atom, TrendingUp, Shuffle, BarChart3, ArrowRight, Github, BookOpen } from "lucide-react";

const modules = [
  {
    title: "Newton's Method",
    desc: "Root-finding via tangent line iteration. Visualize quadratic convergence and the interplay between function, derivative, and successive approximations.",
    icon: TrendingUp,
    href: "/newton",
    gradient: "text-gradient-cyan",
    border: "border-glow-cyan",
    tag: "Nonlinear Equations",
  },
  {
    title: "Logistic Map & Chaos",
    desc: "Explore the route to chaos through period-doubling bifurcations. The logistic map reveals how simple deterministic rules produce complex, unpredictable behavior.",
    icon: Shuffle,
    href: "/logistic",
    gradient: "text-gradient-purple",
    border: "border-glow-purple",
    tag: "Dynamical Systems",
  },
  {
    title: "Bayesian Inference",
    desc: "Watch a probability distribution evolve in real-time as evidence accumulates. Visualize how priors become posteriors through the Beta-Binomial conjugate model.",
    icon: BarChart3,
    href: "/bayesian",
    gradient: "text-gradient-cyan",
    border: "border-glow-cyan",
    tag: "Probabilistic Methods",
  },
];

const Index = () => (
  <SciLayout>
    {/* Hero */}
    <section className="grid-dots">
      <div className="container pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-2xl space-y-5 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-display text-muted-foreground">
            <Atom className="h-3 w-3 text-primary animate-pulse-glow" />
            Numerical Analysis · Course Project
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            AI for{" "}
            <span className="text-gradient-cyan">Science</span>
            <br />
            <span className="text-secondary-foreground text-2xl md:text-3xl lg:text-4xl font-medium">
              Nonlinear Systems
            </span>
          </h1>

          <p className="text-secondary-foreground text-base md:text-lg leading-relaxed max-w-xl">
            Interactive computational methods for nonlinear systems and probabilistic inference.
            Built with <span className="text-primary font-display text-sm">Python</span>,{" "}
            <span className="text-primary font-display text-sm">NumPy</span>, and{" "}
            <span className="text-primary font-display text-sm">SciPy</span> principles — visualized in the browser.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/newton"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-display text-xs font-medium hover:glow-cyan transition-shadow"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Explore Modules
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground font-display text-xs hover:text-foreground hover:border-primary/30 transition-all"
            >
              <Github className="h-3.5 w-3.5" />
              About Project
            </Link>
          </div>

          <div className="flex items-center gap-3 pt-2 font-display text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              3 Interactive Modules
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Real-time Computation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Convergence Analysis
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Modules */}
    <section className="container pb-20">
      <div className="grid gap-4 md:grid-cols-3">
        {modules.map((mod, i) => (
          <Link
            key={mod.href}
            to={mod.href}
            className={`group block rounded-lg border ${mod.border} bg-card p-6 transition-all duration-300 hover:glow-cyan animate-fade-up`}
            style={{ animationDelay: `${(i + 1) * 120}ms` }}
          >
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  {mod.tag}
                </span>
                <mod.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h2 className={`font-display text-xl font-semibold ${mod.gradient}`}>
                {mod.title}
              </h2>

              <p className="text-sm text-secondary-foreground leading-relaxed flex-1">
                {mod.desc}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors font-display">
                Explore
                <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Theory section */}
    <section className="container pb-20">
      <div className="rounded-lg border border-border bg-card/50 p-8 md:p-10">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Mathematical <span className="text-gradient-cyan">Foundation</span>
        </h3>
        <div className="grid gap-6 md:grid-cols-3 font-display text-sm">
          <div className="space-y-2">
            <p className="text-primary text-xs uppercase tracking-wider">Newton-Raphson</p>
            <p className="text-secondary-foreground text-xs leading-relaxed">
              x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>) / f′(x<sub>n</sub>)
            </p>
            <p className="text-muted-foreground text-[11px]">
              Quadratic convergence near simple roots. Requires smooth f with non-vanishing derivative.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-accent text-xs uppercase tracking-wider">Logistic Map</p>
            <p className="text-secondary-foreground text-xs leading-relaxed">
              x<sub>n+1</sub> = r · x<sub>n</sub> · (1 − x<sub>n</sub>)
            </p>
            <p className="text-muted-foreground text-[11px]">
              Period-doubling cascade → chaos at r ≈ 3.57. Feigenbaum constant δ ≈ 4.669.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-success text-xs uppercase tracking-wider">Beta-Binomial</p>
            <p className="text-secondary-foreground text-xs leading-relaxed">
              P(θ|data) ∝ θ<sup>α-1</sup>(1−θ)<sup>β-1</sup> · L(data|θ)
            </p>
            <p className="text-muted-foreground text-[11px]">
              Conjugate prior for Bernoulli likelihood. Posterior is Beta(α + s, β + f).
            </p>
          </div>
        </div>
      </div>
    </section>
  </SciLayout>
);

export default Index;
