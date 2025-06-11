import './globals.css';
import { ReactNode } from 'react';
import Header from './header';

export const metadata = {
  title: 'Game App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto p-4">
        <Header />
        {children}
      </body>
    </html>
  );
}
