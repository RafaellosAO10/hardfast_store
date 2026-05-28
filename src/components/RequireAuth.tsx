import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";
import { useMounted } from "./ThemeManager";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.navigate({ to: "/login" });
    }
  }, [mounted, user, router]);

  if (!mounted) return null;
  if (!user) return null;
  return <>{children}</>;
}
