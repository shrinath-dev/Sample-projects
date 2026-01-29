import { auth } from "@/app/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "@/app/lib/lougout";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={logout}
        className="border border-border rounded px-4 py-2 flex gap-2  cursor-pointer"
      >
        Logout <LogOut />
      </button>
    </div>
  );
}
