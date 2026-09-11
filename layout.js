import "./globals.css";

export const metadata = {
  title: "Padhan Milk Dairy",
  description: "Fresh milk and dairy products from Padhan Milk Dairy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="or">
      <body>{children}</body>
    </html>
  );
}
