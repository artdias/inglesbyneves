"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      title="Logout"
      className={
        iconOnly
          ? "p-2 text-brand-taupe hover:text-red-500 dark:hover:text-red-400 rounded-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-2 disabled:opacity-50"
          : "flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-taupe hover:text-brand-mauve transition-colors disabled:opacity-50"
      }
    >
      <LogOut size={iconOnly ? 20 : 16} />
      {!iconOnly && (isLoggingOut ? "Logging out..." : "Log out")}
    </button>
  );
}
