import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (SIL OFL, from @fontsource-variable) so builds
// don't depend on the Google Fonts API.
const sora = localFont({
  src: "../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  variable: "--font-sora",
  weight: "100 800",
  display: "swap",
});
const sourceSans3 = localFont({
  src: "../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-source-sans-3",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TruewardHR | HR consulting and payroll in Kenya",
    template: "%s | TruewardHR",
  },
  description:
    "HR consulting and payroll services for growing businesses in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${sourceSans3.variable}`}>
        {children}
      </body>
    </html>
  );
}
