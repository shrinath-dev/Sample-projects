"use client";

import { useState } from "react";
import { BookOpenText, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-popover p-4 border-0 rounded-xl w-full max-w-md flex flex-col gap-4 ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <BookOpenText className="w-10 h-10 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold">BookWorm</h2>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">Welcome back</h2>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Enter your credentials to access your reading dashboard
          </p>
        </div>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <Link className="text-sm text-primary" href="/">
              Forgot password?
            </Link>
          </div>
          <div className="has-focus:outline has-focus:outline-primary border border-border p-2 text-lg rounded-lg bg-secondary/20 flex gap-2 justify-between items-center ">
            <input
              className="border-none outline-none w-full"
              name="password"
              type={show ? "text" : "password"}
              value={data.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="********"
            />
            {show ? (
              <Eye onClick={() => setShow(false)} />
            ) : (
              <EyeOff onClick={() => setShow(true)} />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={
            !(
              error === null &&
              Boolean(data.email.trim() && data.password.trim())
            )
          }
          className="bg-primary text-center text-sm rounded-lg p-2 cursor-pointer text-muted disabled:cursor-not-allowed disabled:bg-primary/20"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-center mt-3">
        Don't have an account?{" "}
        <Link className="text-primary" href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
