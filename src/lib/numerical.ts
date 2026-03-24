// Newton's Method for finding roots of f(x) = 0
export interface NewtonStep {
  iteration: number;
  x: number;
  fx: number;
  dfx: number;
  error: number;
}

export function newtonMethod(
  f: (x: number) => number,
  df: (x: number) => number,
  x0: number,
  tol: number = 1e-8,
  maxIter: number = 50
): NewtonStep[] {
  const steps: NewtonStep[] = [];
  let x = x0;

  for (let i = 0; i < maxIter; i++) {
    const fx = f(x);
    const dfx = df(x);
    if (Math.abs(dfx) < 1e-14) break;

    const xNew = x - fx / dfx;
    const error = Math.abs(xNew - x);

    steps.push({ iteration: i, x, fx, dfx, error });

    if (error < tol) break;
    x = xNew;
  }

  return steps;
}

// Logistic Map: x_{n+1} = r * x_n * (1 - x_n)
export interface LogisticMapResult {
  r: number;
  steadyStates: number[];
}

export function logisticMap(
  rMin: number = 2.5,
  rMax: number = 4.0,
  rSteps: number = 800,
  warmup: number = 300,
  collect: number = 100
): LogisticMapResult[] {
  const results: LogisticMapResult[] = [];

  for (let i = 0; i <= rSteps; i++) {
    const r = rMin + (rMax - rMin) * (i / rSteps);
    let x = 0.5;

    for (let j = 0; j < warmup; j++) {
      x = r * x * (1 - x);
    }

    const states: number[] = [];
    for (let j = 0; j < collect; j++) {
      x = r * x * (1 - x);
      states.push(x);
    }

    results.push({ r, steadyStates: states });
  }

  return results;
}

// Bayesian Inference
export interface BayesianStep {
  trial: number;
  outcome: 0 | 1;
  alpha: number;
  beta: number;
  mean: number;
  lower95: number;
  upper95: number;
}

function betaQuantile(a: number, b: number, p: number): number {
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (incompleteBeta(mid, a, b) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function incompleteBeta(x: number, a: number, b: number): number {
  if (x === 0 || x === 1) return x;
  const bt = Math.exp(
    lgamma(a + b) - lgamma(a) - lgamma(b) +
    a * Math.log(x) + b * Math.log(1 - x)
  );
  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaCF(x, a, b) / a;
  }
  return 1 - bt * betaCF(1 - x, b, a) / b;
}

function betaCF(x: number, a: number, b: number): number {
  const maxIter = 200;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIter; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-10) break;
  }
  return h;
}

function lgamma(x: number): number {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x, tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

export function betaPDF(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  return Math.exp(
    (a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) +
    lgamma(a + b) - lgamma(a) - lgamma(b)
  );
}

export function bayesianInference(
  trueP: number = 0.7,
  nTrials: number = 50,
  priorAlpha: number = 1,
  priorBeta: number = 1
): BayesianStep[] {
  const steps: BayesianStep[] = [];
  let alpha = priorAlpha;
  let beta = priorBeta;

  let seed = 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };

  for (let i = 0; i < nTrials; i++) {
    const outcome: 0 | 1 = rand() < trueP ? 1 : 0;
    alpha += outcome;
    beta += 1 - outcome;

    steps.push({
      trial: i + 1,
      outcome,
      alpha,
      beta,
      mean: alpha / (alpha + beta),
      lower95: betaQuantile(alpha, beta, 0.025),
      upper95: betaQuantile(alpha, beta, 0.975),
    });
  }

  return steps;
}

export function generateCurve(
  f: (x: number) => number,
  xMin: number,
  xMax: number,
  points: number = 200
): { x: number; y: number }[] {
  const data: { x: number; y: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const x = xMin + (xMax - xMin) * (i / points);
    const y = f(x);
    if (isFinite(y)) data.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
  }
  return data;
}
