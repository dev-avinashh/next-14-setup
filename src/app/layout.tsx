import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../style/globals.css';
import { LayoutHoc } from '@/components/hoc';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Next 15 Setup',
  description: 'Created By Aviansh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutHoc>{children}</LayoutHoc>
      </body>
    </html>
  );
}
