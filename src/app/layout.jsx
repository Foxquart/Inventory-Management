import "./globals.css";

export const metadata = {
  title: "Six Mile Motor Works — Spares Control Center",
  description: "Spare parts inventory, purchasing, and counter sales for a motorcycle workshop.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14171a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
