import Link from "next/link";
export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mx-auto min-h-screen">
      <h2 className="text-3xl font-semibold">
        Dashboard is under construction.
      </h2>
      <Link href="/" className="text-xl text-primary">
        Go Back To Home
      </Link>
    </div>
  );
}
