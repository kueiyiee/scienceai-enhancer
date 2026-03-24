# AI for Science — Interactive Computational Methods

[![Built with React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive web application demonstrating computational methods for **nonlinear systems** and **probabilistic inference**. Each module implements numerical algorithms from scratch with real-time visualization — translating Python/NumPy/SciPy concepts into explorable browser-based experiences.

> 🎓 Built as a course project for **Numerical Analysis**, showcasing the intersection of mathematics, computation, and scientific visualization.

---

## 🔬 Live Modules

### 1. Newton's Method — Root Finding
Visualize how tangent-line iterations converge to roots of nonlinear equations with **quadratic convergence**.

- Interactive function selection (polynomial, trigonometric, custom)
- Real-time convergence table with iteration-by-iteration tracking
- Dual plots: function curve with tangent lines + log-error convergence chart
- Adjustable initial guess and tolerance parameters

**Core formula:**  
`x_{n+1} = x_n − f(x_n) / f'(x_n)`

### 2. Logistic Map & Chaos — Dynamical Systems
Explore the route from order to chaos through **period-doubling bifurcations**.

- High-resolution bifurcation diagram (800+ parameter steps)
- Time-series explorer for individual `r` values
- Visual identification of Feigenbaum's universal constant (δ ≈ 4.669)
- Adjustable parameter range and initial conditions

**Core formula:**  
`x_{n+1} = r · x_n · (1 − x_n)`

### 3. Bayesian Inference — Probabilistic Methods
Watch a probability distribution evolve in real-time as evidence accumulates via the **Beta-Binomial conjugate model**.

- Live posterior PDF updates after each observation
- 95% credible interval tracking over trials
- Adjustable true probability, prior parameters, and sample size
- Posterior mean convergence visualization

**Core formula:**  
`P(θ|data) ∝ θ^(α−1) · (1−θ)^(β−1) · L(data|θ)`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS + custom design system |
| **Charts** | Recharts |
| **Routing** | React Router v6 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Numerical Engine** | Custom TypeScript implementations (no external math libraries) |

---

## 📐 Mathematical Foundations

All numerical algorithms are implemented from scratch in [`src/lib/numerical.ts`](src/lib/numerical.ts):

- **Newton-Raphson iteration** with derivative evaluation and convergence detection
- **Logistic map simulation** with configurable warmup and steady-state collection
- **Beta distribution** PDF, incomplete beta function, and quantile computation via continued fractions
- **Bayesian posterior updating** with conjugate Beta-Binomial model
- **Curve generation** utilities for smooth function plotting

No external numerical libraries — every computation is transparent and auditable.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/ai-for-science.git
cd ai-for-science

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SciNavbar.tsx        # Responsive navigation
│   ├── SciLayout.tsx        # Page layout wrapper
│   ├── SciFooter.tsx        # Footer component
│   └── ui/                  # shadcn/ui primitives
├── lib/
│   └── numerical.ts         # Core numerical algorithms
├── pages/
│   ├── Index.tsx            # Landing page
│   ├── NewtonMethod.tsx     # Newton's method module
│   ├── LogisticMap.tsx      # Logistic map & chaos module
│   ├── BayesianInference.tsx # Bayesian inference module
│   ├── About.tsx            # Project information
│   └── NotFound.tsx         # 404 page
├── index.css                # Design system tokens
└── main.tsx                 # App entry point
```

---

## 🎨 Design System

The application uses a custom **"Scientific Dark"** theme featuring:

- **Typography:** JetBrains Mono for a technical, research-grade aesthetic
- **Color palette:** Cyan (`#22d3ee`) and purple (`#a78bfa`) accent gradients on a dark background
- **Effects:** Subtle glow animations, dot-grid patterns, and glassmorphism
- **Responsive:** Mobile-first design with collapsible navigation

---

## 📚 Key Concepts Demonstrated

| Concept | Module | Description |
|---------|--------|-------------|
| Convergence Analysis | Newton's Method | Measuring iteration rates and convergence order |
| Bifurcation Theory | Logistic Map | Qualitative changes in system behavior as parameters vary |
| Bayesian Statistics | Bayesian Inference | Updating distributions as new data arrives |
| Scientific Visualization | All | Translating abstract math into interactive visual representations |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/monte-carlo`)
3. Commit your changes (`git commit -m 'Add Monte Carlo simulation module'`)
4. Push to the branch (`git push origin feature/monte-carlo`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments
<p align="center">
  <strong>⚛️ Built with passion for computational science</strong><br>
  <em>By Kuei Poch Kuei</em>
</p>
