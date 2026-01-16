"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex text-md gap-3 text-primary hover:scale-105 hover:gap-4 transition-all cursor-pointer"
    >
      <MoveLeft />
      <p className="text-primary/80">Go back</p>
    </div>
  );
}
