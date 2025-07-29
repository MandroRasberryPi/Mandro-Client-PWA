"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // @ts-ignore
    deferredPrompt.prompt();
    // @ts-ignore
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("사용자가 설치함");
    } else {
      console.log("사용자가 설치 취소함");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <img src="/logo.png" alt="Mandro Logo" className="w-200 h-32 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Mandro에 오신 것을 환영합니다!</h1>
      <p className="text-gray-600 text-center mb-6">
        라즈베리파이 카메라 화면을 확인하고자 한다면 아래 버튼을 눌러주세요.
      </p>

      <Link href="/start">
        <button className="w-40 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4">
          기능 시작하기
        </button>
      </Link>

      {showInstall && (
        <button
          onClick={handleInstallClick}
          className="w-40 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          앱 설치하기
        </button>
      )}
    </main>
  );
}
