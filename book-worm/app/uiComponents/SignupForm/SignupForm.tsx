"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import { BookOpenText, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupDataSchema } from "@/app/lib/inputValidationSchema";
import { SignupData } from "@/app/lib/userDefinedTypes";

export default function SingupForm() {
  const ref = useRef<keyof SignupData<string>>(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<SignupData<string>>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState<SignupData<string[]>>({
    fullname: [],
    username: [],
    email: [],
    password: [],
    confirm: [],
  });

  const handleChange = (name: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    ref.current = name as keyof SignupData<string>;
  };

  const handleError = (name: string, value: string[]) => {
    setError((prev) => ({
      ...prev,
      [name]: [...value],
    }));
  };

  useEffect(() => {
    if (ref.current === null) return;
    let val: keyof SignupData<string> = ref.current;
    if (userData[val] === "") {
      handleError(val, []);
      return;
    }
    let result = SignupDataSchema.safeParse(userData);
    if (result.success) {
      handleError(val, []);
    }

    if (result.error) {
      let issuesArray: string[] = [];
      for (let issue of result.error.issues) {
        if (issue.path[0] === val) issuesArray.push(issue.message);
      }
      handleError(val, issuesArray);
    }

    console.log(result);
  }, [userData]);

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
            <label className="text-sm" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="John Doe"
            />

            <div>
              {error.fullname &&
                error.fullname.map((err) => (
                  <div key={err}>
                    <p>{err}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="username">
              Username
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="text"
              name="username"
              value={userData.username}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="user_123"
            />
            <div>
              {error.username &&
                error.username.map((err) => (
                  <div key={err}>
                    <p>{err}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="email"
              name="email"
              value={userData.email}
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
                value={userData.password}
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
            <label className="text-sm" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              className="border border-border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary"
              type="text"
              name="confirm"
              value={userData.confirm}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Re-Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={
              !(
                error.email.length === 0 &&
                error.fullname.length === 0 &&
                error.password.length === 0 &&
                error.confirm.length === 0 &&
                Boolean(
                  userData.email.trim() &&
                  userData.password.trim() &&
                  userData.fullname.trim() &&
                  userData.confirm.trim(),
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
