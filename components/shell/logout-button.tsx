"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton({
  className,
  variant = "secondary",
  label = "Salir",
}: {
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/");
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={onLogout}
      disabled={loading}
    >
      {loading ? "Saliendo..." : label}
    </Button>
  );
}
