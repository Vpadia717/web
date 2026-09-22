import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import GlobalShortcuts from "@/components/shortcuts/GlobalShortcuts";

export const metadata: Metadata = {
  title: "Longevity Wearable | Real-Time Multimodal Biomarker Monitoring",
  description:
    "3D interactive showcase of a wearable health device for real-time longevity intervention monitoring. Multi-modal integration of wearable sensors, molecular biomarkers, and clinical assessments using attention-based deep learning.",
  keywords: [
    "longevity",
    "wearable device",
    "biomarkers",
    "multimodal",
    "deep learning",
    "health monitoring",
    "ADNI",
    "Alzheimer's",
    "HRV",
    "proteomics",
  ],
  openGraph: {
    title: "Longevity Wearable | Real-Time Multimodal Biomarker Monitoring",
    description:
      "Interactive 3D showcase of wearable health device with 93.1% accuracy multimodal ML pipeline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("longevity-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <GlobalShortcuts />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
