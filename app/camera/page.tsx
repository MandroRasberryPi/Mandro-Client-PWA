"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const ip = process.env.NEXT_PUBLIC_IP;

  useEffect(() => {
    if (ip) {
      window.location.href = `http://${ip}:8000/`;
    }
  }, [ip]);

  return <p>Redirecting to camera view...</p>;
}
