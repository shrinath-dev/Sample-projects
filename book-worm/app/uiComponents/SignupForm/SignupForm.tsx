"use client";

import { FormEvent, useState } from "react";
import { BookOpenText, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SingupForm() {
  const router = useRouter();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordMatch: "",
  });

  const [error, setError] = useState({
    fullName: null,
    email: null,
    password: null,
    passwordMatch: null,
  });

  const [show, setShow] = useState(false);

  const handleChange = (name: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <>
      <div className="bg-popover p-4 border-0 rounded-xl w-full max-w-md flex flex-col gap-4 ">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <BookOpenText className="w-10 h-10 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold">BookWorm</h2>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl mb-2">Create an account</h2>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Enter your information to get started with BookRead
            </p>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="John Doe"
            />
          </div>
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

          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="passwordMatch">
              Confirm Password
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="text"
              name="passwordMatch"
              value={data.passwordMatch}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Re-Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={
              !(
                error.email === null &&
                error.fullName === null &&
                error.password === null &&
                error.passwordMatch === null &&
                Boolean(
                  data.email.trim() &&
                    data.password.trim() &&
                    data.fullName.trim() &&
                    data.passwordMatch.trim()
                )
              )
            }
            className="bg-primary text-center text-sm rounded-lg p-2 cursor-pointer text-muted disabled:cursor-not-allowed disabled:bg-primary/20"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
