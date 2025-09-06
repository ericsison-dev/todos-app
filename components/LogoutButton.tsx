"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

export const LogoutButton: FunctionComponent = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await axios.post(`/api/auth/logout`);
    if (result.data) {
      router.push("/auth/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-primary text-primary-foreground fixed top-10 right-10 rounded-md px-3 py-2"
    >
      Logout
    </button>
  );
};
