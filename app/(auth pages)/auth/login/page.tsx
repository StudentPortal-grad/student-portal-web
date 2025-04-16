import Credentials from "@/components/Credentials";
import React from "react";
import SignInForm from "./components/SignInForm";

export default function page() {
  return (
    <section className="relative flex items-center justify-center">
      <div className="bg-white-100 mx-10 flex w-full max-w-[680px] items-center justify-center rounded-2xl bg-white">
        <SignInForm />
      </div>
      <Credentials />
    </section>
  );
}
