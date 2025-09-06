import { TodoList } from "@/components/TodoList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import db from "@/db/connection";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { forbidden } from "next/navigation";

export const metadata: Metadata = {
  title: "Todo Items",
};

export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await cookies();
  const userId = session.get("ssid")?.value;

  if (params.id !== userId) {
    forbidden();
  }

  const user = await db.select().from(users).where(eq(users.id, userId))

  if(user) {
    return (
      <div className="flex flex-col h-full w-full items-center pt-40 gap-5">
        <section className="flex flex-col items-center gap-1">
            <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl">{user[0].fullName}</h1>
        </section>
        <TodoList />
      </div>
    );
  }

  return null;
}
