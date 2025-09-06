import { RegistrationForm } from "@/components/RegistrationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegistrationPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <RegistrationForm />
    </div>
  );
}
