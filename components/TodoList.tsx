"use client";

import axios from "axios";
import { Check, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { FunctionComponent, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Todo = {
  id: string;
  userId: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export const TodoList: FunctionComponent = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const params = useParams();

  // 🔄 fetch todos (memoized so we can reuse it)
  const fetchTodos = useCallback(async () => {
    if (!params?.id) return;

    try {
      const res = await axios.get<Todo[]>(`/api/todos/${params.id}`);
      if (res.data) {
        setTodos(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }, [params?.id]);

  // fetch on mount + when id changes
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCompleteTodo = async (todoId: string) => {
    try {
      await axios.patch(`/api/todos/mark-complete`, {
        todoId,
        isCompleted: true,
      });

      await fetchTodos();
      toast.success("Todo item marked as complete!")
   
    } catch (err) {
      console.error("Failed to complete todo:", err);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await axios.post(`/api/todos`, {
        title: newTodo,
        userId: params.id,
      });

      setNewTodo("");
      await fetchTodos();
      toast.success("Successfully added a new todo item!")
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
      await fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="flex max-h-[30rem] min-h-56 w-[30rem] flex-col items-center gap-7 overflow-y-auto rounded-lg border bg-white p-7">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <h3 className="text-muted-foreground text-lg font-medium">{todos.length} total todos</h3>
      </header>

      <main className="w-full">
        <section className="w-full">
          <div className="flex items-center gap-2 px-2">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              id="todo-item"
              placeholder="Add a new todo item..."
              className="w-full rounded-md border px-3 py-2"
            />

            <button onClick={handleAddTodo} className="bg-primary rounded px-3 py-2 text-white">
              Add
            </button>
          </div>
        </section>

        {todos.length === 0 ? (
          <p className="text-muted-foreground mt-7 text-center text-lg">No todo item yet. Add one!</p>
        ) : (
          <ul className="w-full space-y-1 p-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between rounded-md border px-4 py-2">
                <section className="flex items-center gap-2">
                  <p
                    title="Mark as completed"
                    className={`cursor-pointer hover:underline ${
                      todo.isCompleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                </section>

                <section className="space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        title="Mark as complete"
                        className="hover:bg-muted rounded border p-1"
                        onClick={() => handleCompleteTodo(todo.id)}
                      >
                        <Check className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Mark this as completed
                    </TooltipContent>
                  </Tooltip>

                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <button
                            title="Delete todo"
                            className="hover:bg-muted rounded border p-1"
                            // onClick={() => handleDeleteTodo(todo.id)}
                          >
                            <Trash className="size-4" />
                          </button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        Remove this todo item
                      </TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your todo item.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteTodo(todo.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </section>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
