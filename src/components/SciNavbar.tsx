import { Link, useLocation } from "react-router-dom";
import { Atom, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/newton", label: "Newton" },
  { to: "/logistic", label: "Chaos" },
  { to: "/bayesian", label: "Bayes" },
  { to: "/about", label: "About" },
];

const SciNavbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 border border-primary/20 group-hover:glow-cyan transition-shadow">
            <Atom className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            AI<span className="text-gradient-cyan">forScience</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 font-display text-xs">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 flex flex-col gap-3 font-display text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`transition-colors ${
                  location.pathname === l.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default SciNavbar;
