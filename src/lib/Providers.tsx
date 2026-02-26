"use client";

import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./ToastContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
