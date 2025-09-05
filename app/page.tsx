import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await cookies();

  const userId = session.get("ssid")?.value;

  redirect(`/${userId}`);
}
