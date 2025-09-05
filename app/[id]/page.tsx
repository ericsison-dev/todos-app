import { TodoList } from "@/components/TodoList";

export default async function UserPage() {
  return (
    <div className="flex h-full w-full justify-center pt-40">
      <TodoList />
    </div>
  );
}
