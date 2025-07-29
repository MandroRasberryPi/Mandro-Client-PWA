"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";

function CameraInner() {
  const searchParams = useSearchParams();
  const ipFromQuery = searchParams.get("ip");
  const [ip, setIp] = useState<string | null>(null);

  const cam0Ref = useRef<HTMLImageElement>(null);
  const cam1Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ipFromQuery) {
      localStorage.setItem("ip", ipFromQuery);
      setIp(ipFromQuery);
    } else {
      const storedIp = localStorage.getItem("ip");
      setIp(storedIp);
    }
  }, [ipFromQuery]);

  useEffect(() => {
    if (!ip) return;

    const ws0 = new WebSocket(`wss://${ip}:8000/ws0`);
    const ws1 = new WebSocket(`wss://${ip}:8000/ws1`);

    ws0.onmessage = (event) => {
      if (cam0Ref.current) {
        cam0Ref.current.src = "data:image/jpeg;base64," + event.data;
      }
    };

    ws1.onmessage = (event) => {
      if (cam1Ref.current) {
        cam1Ref.current.src = "data:image/jpeg;base64," + event.data;
      }
    };

    return () => {
      ws0.close();
      ws1.close();
    };
  }, [ip]);

  if (!ip) {
    return <div style={{ color: "white", padding: "2rem" }}>IP 주소를 불러올 수 없습니다.</div>;
  }

  return (
    <main
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        height: "100vh",
        margin: 0,
        paddingTop: "20px",
      }}
    >
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <img ref={cam0Ref} alt="Camera 0" width={320} height={240} />
        <img ref={cam1Ref} alt="Camera 1" width={320} height={240} />
      </div>
    </main>
  );
}

export default function CameraPage() {
  return (
    <Suspense fallback={<div>카메라 로딩중 ...</div>}>
      <CameraInner />
    </Suspense>
  );
}
