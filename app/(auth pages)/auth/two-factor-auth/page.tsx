import React from "react";
import TwoFactorAuthForm from "./components/TwoFactorAuthForm";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;
  return (
    <section className="relative flex items-center justify-center">
      <div className="bg-white-100 mx-10 flex w-full max-w-[680px] items-center justify-center rounded-2xl bg-white py-14 sm:py-[107px]">
        <TwoFactorAuthForm
          baseUrl={process.env.BASE_URL || ""}
          email={email || ""}
        />
      </div>
    </section>
  );
}
