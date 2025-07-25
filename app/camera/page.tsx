"use client";

import { useEffect, useRef } from "react";

export default function CameraPage() {
  const ip = process.env.NEXT_PUBLIC_IP;
  const cam0Ref = useRef<HTMLImageElement>(null);
  const cam1Ref = useRef<HTMLImageElement>(null);

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
        <div>
          <img ref={cam0Ref} alt="Camera 0" width={320} height={240} />
        </div>
        <div>
          <img ref={cam1Ref} alt="Camera 1" width={320} height={240} />
        </div>
      </div>
    </main>
  );
}
