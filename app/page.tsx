"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function StartPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!ip.trim()) {
      alert("IP 주소를 입력해주세요!");
      return;
    }

    setLoading(true);
    const url = `https://${ip}:8000/`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      clearTimeout(timeout);
      window.location.href = url;
    } catch (err) {
      alert("IP 연결에 실패했습니다. 다시 한번 확인해주세요!");
      setLoading(false);
    }
  };

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
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="bg-mandro-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "연결 시도 중..." : "START"}
          </button>
        </div>
      </div>
    </main>
  );
}
