import './globals.css';
export const metadata = {
  title: 'Padhan Milk Dairy',
  description: 'Fresh Milk, Paneer, Ghee, Dahi and Sweets',
};

export default function RootLayout({ children }) {
  return (
    <html lang="or">
      <body>{children}</body>
    </html>
  );
}
