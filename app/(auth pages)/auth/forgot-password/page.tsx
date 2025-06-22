import React, { Suspense } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function page() {
  return (
    <section className="relative flex items-center justify-center">
      <div className="bg-white-100 mx-10 flex w-full max-w-[680px] items-center justify-center rounded-2xl bg-white py-14 sm:py-[107px]">
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordForm baseUrl={process.env.BASE_URL || ""} />
        </Suspense>
      </div>
    </section>
  );
}
