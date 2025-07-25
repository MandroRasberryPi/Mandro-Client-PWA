'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const router = useRouter();

  return (
    <main className="bg-mandro-bg min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col custom:flex-row items-center justify-center gap-16 w-full max-w-6xl">
        <div className="flex flex-col items-center md:items-start">
          <Image src="/logo.png" alt="Mand.ro Logo" width={240} height={60} />
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          <div>
            <p className="text-xl font-bold text-mandro-accent">Eye Distance</p>
            <input type="range" className="w-full accent-mandro-primary bg-mandro-gray h-2 rounded-full" />
          </div>

          <div>
            <p className="text-xl font-bold text-mandro-accent">Distored</p>
            <input type="range" className="w-full accent-mandro-primary bg-mandro-gray h-2 rounded-full" />
          </div>

          <div>
            <p className="text-xl font-bold text-mandro-accent">IP Address</p>
            <input
              type="text"
              placeholder="Enter IP"
              className="w-full h-10 px-3 rounded-lg border border-mandro-gray focus:outline-none"
            />
          </div>

          <button
            onClick={() => router.push('/camera')}
            className="bg-mandro-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 transition"
          >
            START
          </button>
        </div>
      </div>
    </main>
  );
}
