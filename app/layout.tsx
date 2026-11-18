import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * Fonts are self-hosted (latin subset, variable where available) so builds
 * never depend on reaching Google Fonts. Source: fonts.google.com, all SIL
 * Open Font License.
 */
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "300 700",
  variable: "--font-inter",
  display: "swap",
});

const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  weight: "400 700",
  variable: "--font-sora",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

/** Bold editorial serif for section headings and proof figures. */
const fraunces = localFont({
  src: "./fonts/fraunces-latin.woff2",
  weight: "600 700",
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 500",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pathment | Run mentorship programs that actually deliver",
    template: "%s | Pathment",
  },
  description:
    "One workspace from the application form to the certificate. Admissions, learning roadmaps, mentor reviews, roadblocks, recognition and reporting for fellowships, bootcamps, universities and internal L&D.",
  metadataBase: new URL("https://pathment.me"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Pathment | Run mentorship programs that actually deliver",
    description:
      "Admissions, learning roadmaps, mentor reviews, recognition and reporting on one record, with a workspace built for program leads, mentors and mentees.",
    url: "https://pathment.me",
    siteName: "Pathment",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathment | Run mentorship programs that actually deliver",
    description:
      "One workspace from the application form to the certificate, for program leads, mentors and mentees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      // Font variables live on <html> so the theme tokens defined on :root
      // (--font-sans, --font-display, ...) can resolve them.
      className={`${inter.variable} ${sora.variable} ${instrumentSerif.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("pathment-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{document.documentElement.dataset.theme="light"}`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
