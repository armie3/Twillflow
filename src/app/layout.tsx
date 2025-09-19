import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Twillflow',
  description: 'Email template builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-slate-900">
        <div className="max-w-7xl mx-auto p-4">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Twillflow</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
