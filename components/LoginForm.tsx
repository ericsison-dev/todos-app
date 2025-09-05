"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

export const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
        username,
        password,
      });

      if (result.data) {
        router.push(`/${result.data.id}`);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-96 space-y-4 rounded-md border bg-white p-7">
      <header>
        <h1 className="text-xl font-medium">Login</h1>
        <p className="text-muted-foreground">Enter your credentials below</p>
      </header>

      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="email"
          placeholder="johndoe"
          className="rounded-md border px-3 py-2"
        />
        <span className="text-muted-foreground pl-1 text-sm">Please enter your email address</span>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="********"
          className="rounded-md border px-3 py-2"
        />
        <span className="text-muted-foreground pl-1 text-sm">Please enter your email address</span>
      </div>

      <div className="space-y-2">
        <button className="bg-primary text-primary-foreground w-full rounded-md py-2" onClick={handleLogin}>
          Login
        </button>

        <section className="flex items-center gap-1">
          <p>No account yet? Register </p>
          <Link href="/auth/register" className="font-medium text-indigo-400 underline underline-offset-1">
            here.
          </Link>
        </section>
      </div>
    </div>
  );
};
