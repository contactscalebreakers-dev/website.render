import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

function parseAllowlist(raw: string | undefined) {
  if (!raw) return null;
  const items = raw.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  return items.length ? new Set(items) : null;
}

export function useAdminGuard() {
  const [, setLocation] = useLocation();
  const allow = useMemo(
    () => parseAllowlist(import.meta.env.VITE_ADMIN_EMAIL_ALLOWLIST as string | undefined),
    []
  );

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      const userEmail = session?.user?.email?.toLowerCase() ?? null;

      if (cancelled) return;

      if (!session) {
        setLocation("/admin/login");
        return;
      }

      if (allow && (!userEmail || !allow.has(userEmail))) {
        await supabase.auth.signOut();
        setLocation("/admin/login");
        return;
      }

      setEmail(userEmail);
      setLoading(false);
    }

    check().catch(() => {
      setLocation("/admin/login");
    });

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check().catch(() => setLocation("/admin/login"));
    });

    return () => {
      cancelled = true;
      sub?.subscription?.unsubscribe();
    };
  }, [setLocation, allow]);

  return { loading, email };
}
