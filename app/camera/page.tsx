"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraPage() {
  const ip = process.env.NEXT_PUBLIC_IP;
  const cam0Ref = useRef<HTMLImageElement>(null);
  const cam1Ref = useRef<HTMLImageElement>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ws0 = new WebSocket(`ws://${ip}:8000/ws0`);
    ws0.onmessage = (event) => {
      if (cam0Ref.current) cam0Ref.current.src = "data:image/jpeg;base64," + event.data;
    };

    const ws1 = new WebSocket(`ws://${ip}:8000/ws1`);
    ws1.onmessage = (event) => {
      if (cam1Ref.current) cam1Ref.current.src = "data:image/jpeg;base64," + event.data;
    };

    return () => {
      ws0.close();
      ws1.close();
    };
  }, [ip]);

  return (
    <main className="bg-black text-white h-screen flex flex-col items-center pt-5 m-0">
      <div
        className={`flex gap-5 mt-5 justify-center w-full ${
          isLandscape ? "flex-row" : "flex-col"
        }`}
      >
        <img
          ref={cam0Ref}
          alt="Camera 0"
          className={`object-contain ${isLandscape ? "w-1/2" : "w-11/12"} ${
            isLandscape ? "" : "rotate-90"
          }`}
        />
        <img
          ref={cam1Ref}
          alt="Camera 1"
          className={`object-contain ${isLandscape ? "w-1/2" : "w-11/12"} ${
            isLandscape ? "" : "rotate-90"
          }`}
        />
      </div>
    </main>
  );
}
