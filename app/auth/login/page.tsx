import { LoginForm } from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
