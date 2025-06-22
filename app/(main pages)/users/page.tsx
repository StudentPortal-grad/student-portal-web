import UsersTable from "./components/UsersTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="flex h-full flex-col bg-white p-7">
      <h1 className="mb-4 text-lg font-bold">User Management</h1>
      <div className="min-h-0 flex-1">
        <Suspense fallback={<div>Loading users...</div>}>
          <UsersTable session={session} baseUrl={process.env.BASE_URL || ""} />
        </Suspense>
      </div>
    </section>
  );
}
