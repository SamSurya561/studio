import type { Metadata } from 'next';
import './globals.css';
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'SharmilaS Portfolio',
  description: 'UI/UX & Graphic Designer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
