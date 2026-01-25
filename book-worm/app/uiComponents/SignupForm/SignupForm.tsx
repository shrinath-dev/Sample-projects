"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import {
  BookOpenText,
  Eye,
  EyeOff,
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SignupDataSchema,
  ConfirmPasswordSchema,
  SignupDataSchemaType,
} from "@/app/lib/inputValidationSchema";
import { SignupData } from "@/app/lib/userDefinedTypes";
import isValidUsername from "@/app/lib/serverActions/checkExistingUsername";

export default function SingupForm() {
  const ref = useRef<keyof SignupData<string>>(null);
  const inputDelay = 500;
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

  const handleError = (name: keyof SignupData<string[]>, value: string[]) => {
    setError((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkAgainstSchema = () => {}; // here i  got a thought to somehow develope a single fucntion validate all field with given field and data as parameter

  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current === null) return;
      let val: keyof SignupData<string> = ref.current;
      if (userData[val] === "") {
        handleError(val, []);
        return;
      }

      if (val === "confirm" || val === "password") {
        let result = ConfirmPasswordSchema.safeParse(userData);
        if (result.success) {
          setError((prev) => ({
            ...prev,
            password: [],
            confirm: [],
          }));
        }

        if (result.error) {
          let issuesArray: string[] = [];
          for (let issue of result.error.issues) {
            if (issue.path[0] === val) issuesArray.push(issue.message);
          }
          handleError(val, issuesArray);
        }

        return;
      }

      let result = SignupDataSchema.safeParse(userData);

      if (result.success) {
        setError((prev) => ({
          ...prev,
          fullname: [],
          username: [],
          email: [],
          password: [],
          confirm: [],
        }));
      }

      if (result.error) {
        let issuesArray: string[] = [];
        for (let issue of result.error.issues) {
          if (issue.path[0] === val) issuesArray.push(issue.message);
        }
        handleError(val, issuesArray);
      }
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [userData]);

  useEffect(() => {
    let val: keyof SignupDataSchemaType = "username"; // only left here to refer to develop checkAgainstSchema function usign this type.
    if (ref.current === null) return;
    const t = setTimeout(async () => {
      // logic to check that username is availabel or not
      // if not available show an error
      // if available let it go
      //if valid username then check for availabilty
      const result = SignupDataSchema.pick({ [val]: true }).safeParse({
        username: userData.username,
      });
      if (result.success) {
        let isValid = await isValidUsername(userData.username);

        if (!isValid) {
          setError((prev) => ({
            ...prev,
            username: [
              `'${userData.username}' is already taken, please try another username.`,
            ],
          }));
        }
      }
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [userData.username]);

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
              className={`border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary ${error.fullname.length !== 0 ? "border-error-state" : "border-border"}`}
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="John Doe"
            />

            <div className="flex flex-col gap-2">
              {error.fullname &&
                error.fullname.map((err) => (
                  <div
                    className=" flex gap-4 border rounded border-error-state text-error-state bg-error-state/10 py-2 px-4 animate-pulse "
                    key={err}
                  >
                    <CircleAlert />
                    <p>{err}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-sm" htmlFor="username">
                Username
              </label>
            </div>
            <div
              className={`has-focus:outline has-focus:outline-primary border border-border p-2 text-lg rounded-lg bg-secondary/20 flex gap-2 justify-between items-center ${error.username.length !== 0 ? "border-error-state" : "border-border"}`}
            >
              <input
                className={`border-none outline-none w-full `}
                name="username"
                type="text"
                value={userData.username}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="user_123"
              />
              {error.username.length === 0 && userData.username !== "" && (
                <CircleCheck color="green" />
              )}
            </div>

            <div className="flex flex-col gap-2">
              {error.username &&
                error.username.map((err) => (
                  <div
                    className=" flex gap-4 border rounded border-error-state text-error-state bg-error-state/10 py-2 px-4 animate-pulse "
                    key={err}
                  >
                    <CircleAlert />
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
              className={`border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary ${error.email.length !== 0 ? "border-error-state" : "border-border"}`}
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="example@email.com"
            />
            <div className="flex flex-col gap-2">
              {error.email &&
                error.email.map((err) => (
                  <div
                    className=" flex gap-4 border rounded border-error-state text-error-state bg-error-state/10 py-2 px-4 animate-pulse "
                    key={err}
                  >
                    <CircleAlert />
                    <p>{err}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
            </div>
            <div
              className={`has-focus:outline has-focus:outline-primary border border-border p-2 text-lg rounded-lg bg-secondary/20 flex gap-2 justify-between items-center ${error.password.length !== 0 ? "border-error-state" : "border-border"}`}
            >
              <input
                className={`border-none outline-none w-full `}
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

            <div className="flex flex-col gap-2">
              {error.password &&
                error.password.map((err) => (
                  <div
                    className=" flex gap-4 border rounded border-error-state text-error-state bg-error-state/10 py-2 px-4 animate-pulse "
                    key={err}
                  >
                    <CircleAlert />
                    <p>{err}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              className={`border p-2 text-lg rounded-lg bg-secondary/20 focus:outline focus:outline-primary ${error.confirm.length !== 0 ? "border-error-state" : "border-border"}`}
              type="text"
              name="confirm"
              value={userData.confirm}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Re-Enter your password"
            />

            <div className="flex flex-col gap-2">
              {error.confirm &&
                error.confirm.map((err) => (
                  <div
                    className=" flex gap-4 border rounded border-error-state text-error-state bg-error-state/10 py-2 px-4 animate-pulse "
                    key={err}
                  >
                    <CircleAlert />
                    <p>{err}</p>
                  </div>
                ))}
            </div>
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
