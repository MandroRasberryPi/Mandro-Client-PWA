"use client";

import Image from "next/image";
import { useState } from "react";

export default function StartPage() {
  const [ip, setIp] = useState("");
  const [eyeDistance, setEyeDistance] = useState(0);
  const [distorted, setDistorted] = useState(0);   
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!ip) {
      alert("IP를 입력해주세요!");
      return;
    }

    setLoading(true);

    const left = Math.round(-(eyeDistance / 2));
    const right = Math.round(eyeDistance / 2);


    try {
      const response = await fetch(`https://${ip}:8000/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          left: left.toString(),
          right: right.toString(),
          distorted: distorted.toFixed(2),
        }),
      });

      if (response.ok) {
        alert("설정값 전송 완료!");
        window.location.href = `https://${ip}:8000/`;
      } else {
        alert("API 호출 실패");
      }
    } catch (error) {
      alert("연결 중 오류 발생");
      console.error(error);
    } finally {
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
            <div className="flex justify-between">
              <p className="text-xl font-bold text-mandro-accent">Eye Distance</p>
              <span className="text-mandro-accent font-mono">{eyeDistance}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={eyeDistance}
              onChange={(e) => setEyeDistance(Number(e.target.value))}
              className="w-full accent-mandro-primary bg-mandro-gray h-2 rounded-full"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <p className="text-xl font-bold text-mandro-accent">Distorted</p>
              <span className="text-mandro-accent font-mono">{distorted.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={distorted}
              onChange={(e) => setDistorted(parseFloat(e.target.value))}
              className="w-full accent-mandro-primary bg-mandro-gray h-2 rounded-full"
            />
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
            className="bg-mandro-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 transition"
          >
            {loading ? "연결 시도 중..." : "START"}
          </button>
        </div>
      </div>
    </main>
  );
}
