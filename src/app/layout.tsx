import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrueSpot V2 | The Reality Verification Layer",
  description: "Cryptographically verified recreation ground truth backed by Uzbekistan Soliq fiscal receipts. Case C: Trusted Recreation Information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defensive script to prevent browser extensions (e.g. Definer popup dictionary)
              // from prepending elements to <body> before React hydration
              try {
                const relocateExtensionNodes = function() {
                  const hosts = document.querySelectorAll('#definer-bubble-host, [data-definer-bubble-ready]');
                  hosts.forEach(function(host) {
                    if (host && host.parentNode === document.body) {
                      document.documentElement.appendChild(host);
                    }
                  });
                };
                relocateExtensionNodes();
                if (typeof MutationObserver !== 'undefined') {
                  new MutationObserver(function() {
                    relocateExtensionNodes();
                  }).observe(document.documentElement, { childList: true, subtree: true });
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
