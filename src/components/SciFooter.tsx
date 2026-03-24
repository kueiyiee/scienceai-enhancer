import { Atom } from "lucide-react";
import { Link } from "react-router-dom";

const SciFooter = () => (
  <footer className="border-t border-border mt-16">
    <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Atom className="h-3.5 w-3.5 text-primary" />
        <span className="font-display text-xs">
          AI<span className="text-primary">forScience</span>
        </span>
        <span className="text-[10px] ml-2">Numerical Analysis · {new Date().getFullYear()}</span>
      </div>
      <div className="flex items-center gap-4 font-display text-[10px] text-muted-foreground">
        <Link to="/newton" className="hover:text-foreground transition-colors">Newton</Link>
        <Link to="/logistic" className="hover:text-foreground transition-colors">Chaos</Link>
        <Link to="/bayesian" className="hover:text-foreground transition-colors">Bayes</Link>
        <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
      </div>
      <p className="text-[10px] text-muted-foreground font-display">
        Computational Methods for Nonlinear Systems & Probabilistic Inference
      </p>
    </div>
  </footer>
);

export default SciFooter;
