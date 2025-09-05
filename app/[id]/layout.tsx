import { LogoutButton } from "@/components/LogoutButton";
import { PropsWithChildren } from "react";

export default function UserPageLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <LogoutButton />
      {children}
    </div>
  );
}
