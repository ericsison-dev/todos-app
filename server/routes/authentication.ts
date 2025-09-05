import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import argon2 from "argon2";
import db from "@/db/connection";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { deleteCookie, setCookie } from "hono/cookie";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const RegistraionSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  password: z.string(),
});

export const authenticationHandler = new Hono()
  .basePath("/auth")
  .post("/login", zValidator("json", LoginSchema), async (c) => {
    const body = c.req.valid("json");

    const result = await db.select().from(users).where(eq(users.username, body.username));

    if (!result.length) {
      return c.json({ message: "Invalid credentials!" }, 401);
    }

    const isPasswordValid = await argon2.verify(result[0].password, body.password);

    if (!isPasswordValid) {
      return c.json({ message: "Invalid credentials!" }, 401);
    }

    setCookie(c, "ssid", result[0].id, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 3600 * 24,
    });

    return c.json({ id: result[0].id, fullName: result[0].fullName, username: result[0].username });
  })
  .post("/register", zValidator("json", RegistraionSchema), async (c) => {
    const body = c.req.valid("json");

    const result = await db
      .insert(users)
      .values({ ...body, password: await argon2.hash(body.password) })
      .returning();

    return c.json({ user: result[0].fullName, username: result[0].username });
  })
  .post("/logout", async (c) => {
    deleteCookie(c, "ssid");
    return c.text("Logged out successfully");
  });
