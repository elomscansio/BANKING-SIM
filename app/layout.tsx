import type { Metadata, Viewport } from "next";
import "./globals.css";

const officeBaseUrl = process.env.NEXT_PUBLIC_OFFICE_BASE_URL;
const mid = process.env.NEXT_PUBLIC_MID;
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE;
const version = Date.now(); // or use a fixed value if needed

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: siteTitle || "v0 App",
  applicationName: siteTitle,
  description: "Created with v0",
  generator: "v0.dev",
  icons: `/180x180.jpeg?v=${version}`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: siteTitle || "App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={siteTitle} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/180x180.jpeg?v=${version}`}
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href={`/192x192.jpeg?v=${version}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
