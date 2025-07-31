"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function StartPage() {
  const [ip, setIp] = useState("");
  const [eyeDistance, setEyeDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const textSizeClass = isLandscape ? "text-lg" : "text-2xl";
  const labelSizeClass = isLandscape ? "text-xl" : "text-3xl";
  const logoWidth = isLandscape ? 500 : 650;
  const logoHeight = isLandscape ? 173 : 224;

  return (
    <main className={`bg-mandro-bg min-h-screen flex items-center justify-center px-4 ${textSizeClass}`}>
      <div
        className={`flex ${isLandscape ? "flex-row" : "flex-col"} items-center justify-center gap-16 w-full`}
      >
        <div className="flex flex-col items-center">
          <Image src="/logo.png" alt="Mand.ro Logo" width={logoWidth} height={logoHeight} />
        </div>

        <div className="flex flex-col gap-6 w-full items-center">
          <div className="w-[70%]">
            <div className={`flex justify-between font-bold text-mandro-accent ${labelSizeClass}`}>
              <p>Eye Distance</p>
              <span className="font-mono">{eyeDistance}</span>
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

          <div className="w-[70%]">
            <p className={`font-bold text-mandro-accent mb-1 ${labelSizeClass}`}>IP Address</p>
            <input
              type="text"
              placeholder="Enter IP"
              className="w-full h-12 px-4 rounded-lg border border-mandro-gray focus:outline-none"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-[70%] bg-mandro-primary text-white font-bold py-4 rounded-2xl hover:opacity-90 transition text-xl"
          >
            {loading ? "연결 시도 중..." : "START"}
          </button>
        </div>
      </div>
    </main>
  );
}
