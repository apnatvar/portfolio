"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/visual");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return <p>Redirecting...</p>;
}
