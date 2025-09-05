import db from "@/db/connection";
import { todoItems } from "@/db/schemas";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import z from "zod";

const MarkAsCompleteSchema = z.object({
  todoId: z.string(),
});

const TodoSchema = z.object({
  userId: z.string(),
  title: z.string(),
});

export const todosHandler = new Hono()
  .basePath("/todos")
  .get("/:id", async (c) => {
    const userId = c.req.param("id");

    const todos = await db
      .select()
      .from(todoItems)
      .where(eq(todoItems.userId, userId))
      .orderBy(todoItems.createdAt);

    return c.json(todos);
  })
  .post("/", zValidator("json", TodoSchema), async (c) => {
    const body = c.req.valid("json");

    const result = await db.insert(todoItems).values(body).returning();

    return c.json(result);
  })
  .patch("/mark-complete", zValidator("json", MarkAsCompleteSchema), async (c) => {
    const body = c.req.valid("json");

    const result = await db
      .update(todoItems)
      .set({ isCompleted: true })
      .where(eq(todoItems.id, body.todoId))
      .returning();

    return c.json(result[0]);
  })
  .delete("/:id", async (c) => {
    const todoId = c.req.param("id");

    await db.delete(todoItems).where(eq(todoItems.id, todoId));

    return c.json({ message: "Delete successful!" });
  });
