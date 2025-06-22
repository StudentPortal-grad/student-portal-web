import React, { Suspense } from "react";
import NewPasswordForm from "./components/NewPasswordForm";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const resetToken = cookieStore.get("resetToken")?.value;
  return (
    <section className="relative flex items-center justify-center">
      <div className="bg-white-100 mx-10 flex w-full max-w-[680px] items-center justify-center rounded-2xl bg-white py-14 sm:py-[107px]">
        <Suspense fallback={<div>Loading...</div>}>
          <NewPasswordForm
            baseUrl={process.env.BASE_URL || ""}
            resetToken={resetToken || ""}
          />
        </Suspense>
      </div>
    </section>
  );
}
