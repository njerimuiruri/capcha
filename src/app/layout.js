import "./globals.css";

export const metadata = {
  title: {
    default: "Consultative Platform On Climate and Health",
    template: "%s | CAPCHA",
  },
  description:
    "Building a transdisciplinary community of practice towards enhanced decision support environment on Climate & Health research and policy in Africa",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
