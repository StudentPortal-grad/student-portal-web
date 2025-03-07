"use client";
import { useForm } from "react-hook-form";
import React from "react";
import Image from "next/image";

type FormValues = {
  email: string;
};

export default function NewsTellerForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px]">
      <div className="relative">
        <input
          type="email"
          placeholder="Enter your email to subscribe for updates."
          className="bg-black-5 text-black-100 placeholder:text-black-20 focus:ring-secondary-purple-a w-full rounded-2xl border px-3 py-3 pr-12 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          {...register("email", { required: true })}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-4 -translate-y-[50%] cursor-pointer"
        >
          <Image
            src="/icons/send.svg"
            alt="send icon"
            width={20}
            height={20}
            className="opacity-60 transition-opacity hover:opacity-100"
          />
        </button>
      </div>
    </form>
  );
}
