export interface StudentStep {
  step: number;
  title: string;
  desc: string;
}

export interface StudentPartData {
  id: string;
  moduleNumber: string;
  partName: string;
  studentTitle: string;
  analogy: string;
  simpleExplanation: string;
  superpower: string;
  steps: StudentStep[];
  funFact: string;
  themeColor: string;
  accentBg: string;
  borderTint: string;
}

export const STUDENT_PARTS_DATA: Record<string, StudentPartData> = {
  all: {
    id: "all",
    moduleNumber: "COMPLETE",
    partName: "Unified AURA-1 Watch",
    studentTitle: "The Complete AURA-1 Smartwatch",
    analogy: "Like all 6 superhero powers assembled into one sleek, life-saving watch!",
    simpleExplanation:
      "When every part clicks together, you get a medical-grade computer on your wrist that tracks your heart rate, sleep, fitness, and biological age 24/7 without needing to recharge for a full week.",
    superpower: "7-Day Battery · 50m Waterproof · 42 Live Health Biomarkers",
    steps: [
      { step: 1, title: "Sense", desc: "16 optical and bio-electric sensors scan your pulse and skin." },
      { step: 2, title: "Compute", desc: "The on-wrist AI brain learns your healthy baseline day and night." },
      { step: 3, title: "Protect", desc: "Alerts you immediately if anything unusual happens with your heart." },
    ],
    funFact:
      "The entire watch weighs only 38 grams—that is lighter than a single chicken egg, yet stronger than steel!",
    themeColor: "#3b82f6",
    accentBg: "rgba(59, 130, 246, 0.10)",
    borderTint: "rgba(59, 130, 246, 0.25)",
  },
  display: {
    id: "display",
    moduleNumber: "PART 01",
    partName: "Curved Sapphire Retina Display",
    studentTitle: "The Diamond-Hard Magic Screen",
    analogy: "Like a super-bright mini TV that only a real diamond could ever scratch!",
    simpleExplanation:
      "This curved screen uses millions of microscopic OLED lights. It shines so bright (2,000 nits!) that you can read your heart rate clearly even under direct summer sunshine.",
    superpower: "9 Mohs Hardness (Diamond-Hard Scratch Proofing) · 2,000 Nits Brightness",
    steps: [
      { step: 1, title: "Light Up", desc: "Millions of self-lit OLED pixels glow with zero backlight glow." },
      { step: 2, title: "Always-On", desc: "Sips tiny drops of battery so the watchface clock never turns off." },
      { step: 3, title: "Live Waveform", desc: "Draws your actual heartbeat rhythm line in real time across the screen." },
    ],
    funFact:
      "Sapphire crystal is not ordinary glass! It is grown in high-tech furnaces at over 2,000°C, making it the 2nd hardest clear material on planet Earth.",
    themeColor: "#0284c7",
    accentBg: "rgba(2, 132, 199, 0.10)",
    borderTint: "rgba(2, 132, 199, 0.25)",
  },
  chassis: {
    id: "chassis",
    moduleNumber: "PART 02",
    partName: "Aerospace Grade-5 Titanium Armor",
    studentTitle: "The Spacecraft Titanium Armor",
    analogy: "A protective spacesuit made of the exact same titanium used on Mars rovers!",
    simpleExplanation:
      "Titanium is famous for being as strong as heavy steel, but weighing almost half as much. It resists saltwater, mud, and hard drops while remaining 100% waterproof down to 50 meters.",
    superpower: "Ti-6Al-4V Aerospace Alloy · 50-Meter Waterproof Sealed",
    steps: [
      { step: 1, title: "Laser Milled", desc: "A solid titanium block is precision-carved by computer robots." },
      { step: 2, title: "Watertight Seals", desc: "Micro gaskets keep water out while swimming, showering, or diving." },
      { step: 3, title: "Tactile Crown", desc: "Spin the knurled side knob with your fingers to scroll without blocking the display." },
    ],
    funFact:
      "Titanium is biocompatible, which means human skin naturally loves it. Doctors use the exact same grade of titanium for bone replacements!",
    themeColor: "#64748b",
    accentBg: "rgba(100, 116, 139, 0.12)",
    borderTint: "rgba(100, 116, 139, 0.25)",
  },
  sensors: {
    id: "sensors",
    moduleNumber: "PART 03",
    partName: "Ceramic Bio-Sensor Array Puck",
    studentTitle: "The Flashing Light Pulse Detector",
    analogy: "Like tiny colored flashlights that see right through your skin without any needles!",
    simpleExplanation:
      "On the back of the watch, a smooth dome made of zirconia ceramic touches your wrist. It flashes green, red, and infrared light beams 100 times every single second to count your pulse waves.",
    superpower: "4-Wavelength Optical Transducers · Dual 316L ECG Electrodes",
    steps: [
      { step: 1, title: "Shine Lights", desc: "Green and red LEDs pulse safely into your skin capillaries." },
      { step: 2, title: "Catch the Bounce", desc: "When your heart pumps blood, light absorption changes instantaneously." },
      { step: 3, title: "Calculate Pulse", desc: "A light receptor catches the reflection and calculates your heart rate." },
    ],
    funFact:
      "Blood looks red because iron molecules hold oxygen. By measuring how much red and infrared light bounce back, the watch measures your blood oxygen without drawing a drop of blood!",
    themeColor: "#10b981",
    accentBg: "rgba(16, 185, 129, 0.10)",
    borderTint: "rgba(16, 185, 129, 0.25)",
  },
  pcb: {
    id: "pcb",
    moduleNumber: "PART 04",
    partName: "TinyML Neural NPU Motherboard",
    studentTitle: "The Pocket AI Super-Brain",
    analogy: "A tiny supercomputer brain that thinks 300 times faster than a human blink!",
    simpleExplanation:
      "This microchip runs smart Artificial Intelligence (AI) directly inside the watch. It examines your heart rhythms and breathing patterns to predict your biological age—without needing an internet connection!",
    superpower: "3.2 Millisecond Neural Inference · 100% Private (No Cloud Needed)",
    steps: [
      { step: 1, title: "Receive Stream", desc: "Collects 100 raw sensor readings every second from the ceramic puck." },
      { step: 2, title: "Neural Math", desc: "Dual Cortex-M55 and Ethos-U55 chips run attention neural networks locally." },
      { step: 3, title: "Total Privacy", desc: "Computes everything on-wrist, so your personal health data never leaks to the internet." },
    ],
    funFact:
      "This super-smart AI chip sips less electricity than a tiny Christmas tree fairy light (0.85 mW), so the watch never feels hot against your arm!",
    themeColor: "#8b5cf6",
    accentBg: "rgba(139, 92, 246, 0.10)",
    borderTint: "rgba(139, 92, 246, 0.25)",
  },
  battery: {
    id: "battery",
    moduleNumber: "PART 05",
    partName: "Solid-State Lithium-Ceramic Battery",
    studentTitle: "The Ceramic Energy Pouch",
    analogy: "A solid, non-flammable battery that charges wirelessly with magnetic magic!",
    simpleExplanation:
      "Unlike ordinary batteries that have flammable liquid inside, this battery uses solid ceramic crystals. That means it cannot catch fire, lasts for 7 full days, and charges wirelessly on a magnetic dock.",
    superpower: "Zero Fire Risk · 7 Days Continuous Power · 25-Min Fast Charge",
    steps: [
      { step: 1, title: "Magnetic Snap", desc: "Invisible magnetic coils transfer electrical energy through the ceramic back." },
      { step: 2, title: "Solid Storage", desc: "Solid lithium-ceramic layers store electrical charge safely at any temperature." },
      { step: 3, title: "Gentle Sips", desc: "Feeds reliable micro-currents to the screen and sensors day and night." },
    ],
    funFact:
      "Solid-state ceramic batteries are what rocket ships and future electric sports cars are developing because they are completely fire-proof!",
    themeColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.10)",
    borderTint: "rgba(245, 158, 11, 0.25)",
  },
  straps: {
    id: "straps",
    moduleNumber: "PART 06",
    partName: "Bio-Circular Fluoroelastomer Sport Band",
    studentTitle: "The Plant-Powered Comfort Strap",
    analogy: "A bendy, breathable hug that holds the sensors snugly against your wrist!",
    simpleExplanation:
      "Crafted from 65% plant-based renewable materials combined with durable fluoroelastomer rubber. Molded air channels underneath let fresh air circulate so your wrist stays cool and comfy all day long.",
    superpower: "65% Renewable Bio-Carbon · 15 mmHg Optical Contact Precision",
    steps: [
      { step: 1, title: "Plant Chemistry", desc: "Made from renewable plants instead of fossil petroleum oils." },
      { step: 2, title: "Breathable Ridges", desc: "Tubular air grooves prevent sweat from trapping against your skin." },
      { step: 3, title: "Perfect Grip", desc: "Maintains optimal 15 mmHg pressure so sensors take crystal-clear readings." },
    ],
    funFact:
      "Fluoroelastomer rubber is so tough that aerospace engineers use it to seal rocket engine valves, yet it feels as soft as silk against your skin!",
    themeColor: "#ea580c",
    accentBg: "rgba(234, 88, 12, 0.10)",
    borderTint: "rgba(234, 88, 12, 0.25)",
  },
};
