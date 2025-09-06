"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

export const RegistrationForm: FunctionComponent = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleRegistration = async () => {
    try {
      const result = await axios.post(`/api/auth/register`, {
        fullName,
        username,
        password,
      });

      if (result.data) {
        router.push("/auth/login");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-96 space-y-7 rounded-md border bg-white p-7">
      <header>
        <h1 className="text-xl font-medium">Register</h1>
        <p className="text-muted-foreground">Enter your details below to get started</p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="fullName" className="font-medium">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            placeholder="John Doe"
            className="rounded-md border px-3 py-2"
          />
          <span className="text-muted-foreground pl-1 text-sm">Please enter your email address</span>
        </div>

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

        <div className="space-y-2 text-center">
          <button
            className="bg-primary text-primary-foreground w-full rounded-md py-2"
            onClick={handleRegistration}
          >
            Register
          </button>

          <Link href="/auth/login" className="underline underline-offset-1">
            Go back
          </Link>
        </div>
      </section>
    </div>
  );
};
