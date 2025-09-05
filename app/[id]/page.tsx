import { TodoList } from "@/components/TodoList";
import { cookies } from "next/headers";
import { forbidden } from "next/navigation";

export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  console.log(params.id);

  const session = await cookies();
  const userId = session.get("ssid")?.value;

  if (params.id !== userId) {
    forbidden();
  }

  return (
    <div className="flex h-full w-full justify-center pt-40">
      <TodoList />
    </div>
  );
}
