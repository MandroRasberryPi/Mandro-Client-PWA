"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const titleSize = isLandscape ? "text-2xl" : "text-4xl";
  const descSize = isLandscape ? "text-base" : "text-lg";
  const logoSize = isLandscape ? "w-500 h-173" : "w-650 h-224";
  const buttonSize = isLandscape ? "text-base py-2" : "text-lg py-3";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <img
        src="/logo.png"
        alt="Mandro Logo"
        className={`${logoSize} mb-6`}
      />

      <h1 className={`font-bold mb-4 ${titleSize}`}>Mandro에 오신 것을 환영합니다!</h1>

      <p className={`text-gray-600 text-center mb-6 ${descSize}`}>
        라즈베리파이 카메라 화면을 확인하고자 한다면 아래 버튼을 눌러주세요.
      </p>

      <Link href="/start">
        <button
          className={`w-40 px-6 ${buttonSize} bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4`}
        >
          기능 시작하기
        </button>
      </Link>

      {showInstall && (
        <button
          onClick={handleInstallClick}
          className={`w-40 px-6 ${buttonSize} bg-green-600 text-white rounded-md hover:bg-green-700`}
        >
          앱 설치하기
        </button>
      )}
    </main>
  );
}
