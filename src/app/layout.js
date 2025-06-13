import "./globals.css";

export const metadata = {
  title: {
    default: "ARIN Climate Research",
    template: "%s | ARIN Climate Research",
  },
  description:
    "Environmental Sustainability Blog showcasing data-driven insights on climate change",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
