<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge&logo=three.js" alt="Three.js" />
  <img src="https://img.shields.io/badge/PyTorch-ML-EE4C2C?style=for-the-badge&logo=pytorch" alt="PyTorch" />
  <img src="https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

# ⚡ LongevityOS — Wearable Health Device 3D Showcase

> **Multi-Modal Integration of Wearable and Molecular Biomarkers for Real-Time Assessment of Longevity Intervention Efficacy**

An interactive, production-ready web application showcasing a 3D wearable health device and its AI-powered longevity monitoring pipeline. Built with **Next.js 15**, **Three.js**, **React Three Fiber**, and real ML model data from a multimodal attention neural network.

---

## 🎯 Overview

This project presents a comprehensive 3D interactive experience for a wearable health monitoring system that combines:

- **16 wearable sensor features** (HRV, sleep, activity, CGM)
- **18 molecular biomarkers** (proteomic, metabolomic, inflammatory panels)
- **8 clinical assessments** (cognitive, frailty, functional status)

The ML pipeline achieves **93.1% accuracy** and **97.8% ROC AUC** on held-out test data using a multi-view temporal attention architecture with bidirectional GRU.

---

## ✨ Features

### 🔮 3D Interactive Elements
- **Procedural wearable device model** — metallic PBR materials, animated HRV line, glowing sensor dots
- **Orbiting data ring** — particle system showing continuous data flow
- **DNA helix particles** — background molecular visualization
- **Responsive 3D canvas** — adapts to all screen sizes with fallback for low-end devices

### 📊 Data Dashboards
- **Animated metrics hero** — count-up animation with IntersectionObserver
- **Training loss chart** — dual-line train/val loss with epoch markers
- **Model comparison** — ablation study bar chart (6 models)
- **Cross-validation results** — 5-fold stratified CV
- **Feature cards** — click-to-expand modality cards with full feature lists

### 🏗️ Architecture Visualization
- **Interactive pipeline diagram** — hover to explore each neural network layer
- **Input → Encoder → Attention → GRU → Output heads** flow

### 🔬 Scientific Methodology
- Leakage prevention checklist
- Evidence boundary documentation
- Alzheimer's MRI analysis summary (40 biomarkers, 8 classifiers, 3 classes)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/longevity-wearable-3d.git
cd longevity-wearable-3d/web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments on push.

---

## 📁 Project Structure

```
web/
├── public/
│   └── data/                      # Static JSON data from ML pipeline
│       ├── config.json            # Model configuration parameters
│       ├── metrics.json           # Held-out test metrics
│       ├── training_history.json  # Loss/accuracy per epoch
│       ├── model_comparison.json  # Ablation study results
│       ├── features.json          # 42 biomarker definitions
│       ├── cv_results.json        # 5-fold CV results
│       └── architecture.json      # Network architecture spec
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout + SEO metadata
│   │   ├── page.tsx               # Main landing page
│   │   └── globals.css            # Complete design system
│   │
│   └── components/
│       ├── three/                 # 3D components (React Three Fiber)
│       │   ├── WearableDevice.tsx # 3D wearable device model
│       │   └── ParticleField.tsx  # Background particles + DNA helix
│       │
│       ├── dashboard/             # Data visualization components
│       │   ├── MetricsHero.tsx    # Animated counter stats
│       │   ├── TrainingLoss.tsx   # Loss curve chart
│       │   ├── ModelComparison.tsx# Ablation bar chart
│       │   ├── FeatureCards.tsx   # Expandable modality cards
│       │   └── ArchitecturePipeline.tsx # Interactive pipeline diagram
│       │
│       └── layout/               # Layout components
│           ├── Navbar.tsx         # Sticky glassmorphism navbar
│           └── Footer.tsx        # Footer with disclaimer
│
├── .env.example                   # Environment template
├── .gitignore                     # Comprehensive ignore rules
├── next.config.ts                 # Security headers + config
├── package.json
└── tsconfig.json
```

---

## 🧬 ML Pipeline Data Sources

The web app displays real results from 4 computational pipelines:

| Source File | Description |
|---|---|
| `longevity_multimodal_realtime_V2.py` | V2 leakage-aware multimodal attention + temporal GRU + real-time inference |
| `longevity_multimodal_realtime_FINAL.ipynb` | Complete 22-section pipeline with real-data mode support |
| `longevity_multimodal_attention_V1.ipynb` | Original multimodal attention network with 30 figures |
| `alzheimer_mri_optimized_V2.ipynb` | Alzheimer's MRI detection — 40 biomarkers, 8 classifiers, leakage-fixed |

### Key Results

| Metric | Value |
|---|---|
| Held-out Accuracy | **93.1%** |
| F1 Score | **93.8%** |
| ROC AUC | **97.8%** |
| Average Precision | **98.1%** |
| Brier Score | **0.056** |
| Training Epochs | 16 (early stopped) |
| Subjects | 800 (demo cohort) |
| Timepoints | 12 per subject |

---

## 🔒 Security

This application follows security best practices per the [vibe-security audit](https://github.com/raroque/vibe-security-skill):

- ✅ **No API keys in client bundle** — all data is pre-computed static JSON
- ✅ **Security headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- ✅ **Source maps disabled** in production
- ✅ **`.env` files in `.gitignore`** — before first commit
- ✅ **No database** — purely static site, no injection surface
- ✅ **No auth** — public showcase, no token/session management
- ✅ **ML artifacts excluded** — `.pkl`, `.pt`, `.csv` files gitignored

---

## 🎨 Design System

| Property | Value |
|---|---|
| **Theme** | Dark mode with glassmorphism |
| **Colors** | Navy/purple/teal gradient palette |
| **Typography** | Inter (sans) + JetBrains Mono (data) |
| **3D Engine** | React Three Fiber + drei |
| **Charts** | Recharts with custom dark theme |
| **Animations** | CSS transitions + IntersectionObserver |
| **Responsive** | 5 breakpoints (480px → 1440px+) |
| **Accessibility** | `prefers-reduced-motion` support, ARIA labels |

---

## 📋 Responsive Breakpoints

| Breakpoint | Target | Layout |
|---|---|---|
| `< 480px` | Mobile phones | Single column, reduced 3D |
| `480–768px` | Large phones | Two-column cards |
| `768–1024px` | Tablets | Three-column grid |
| `1024–1440px` | Laptops | Full layout |
| `> 1440px` | Desktop / 4K | Max-width container |

---

## 🧪 Evidence Boundaries

> **⚠️ Important Scientific Disclaimer**
>
> The primary analysis uses a **clearly labelled synthetic cohort** (deterministic simulator). The supplied file manifest establishes the presence of MRI, PET, blood, psychometry, EEG, MEG, NIRS, and transcriptomic files — but does **not** by itself establish complete longitudinal wearable, molecular, or intervention-response tables.
>
> - The **85–94% accuracy band** is an acceptance target for the demo validation, not a fabricated claim
> - Real-data accuracy is always reported honestly from held-out data
> - Real-data mode activates when compatible longitudinal tables and labels are supplied

---

## 📜 License

This project is for research and educational purposes. See the individual notebook files for detailed methodology and data provenance documentation.

---

## 🙏 Acknowledgments

- **ADNI** (Alzheimer's Disease Neuroimaging Initiative) for the structural MRI framework
- **PyTorch** for the deep learning backbone
- **Three.js** and **React Three Fiber** for 3D rendering
- **Next.js** and **Vercel** for the web framework and deployment

---

<p align="center">
  Made with 🧬 by the Longevity Research Team
</p>
