"use client";

import { useEffect } from "react";

export default function CameraPage() {
  const ip = process.env.NEXT_PUBLIC_IP;

  useEffect(() => {
    if (ip) {
      window.location.replace(`https://${ip}:8000/`);
    }
  }, [ip]);

  return <p>Redirecting to camera view...</p>;
}
