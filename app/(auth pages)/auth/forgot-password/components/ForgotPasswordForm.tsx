"use client";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

interface FormData {
  email: string;
  password: string;
}

export default function ForgotPasswordForm({ baseUrl }: { baseUrl: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        Cookies.set("email", data.email, { path: "/" });
        router.push("/auth/two-factor-auth");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 w-full max-w-[400px] sm:mx-10"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <FormHeader />

        <div className="flex w-full flex-col gap-3 sm:gap-4">
          {error && (
            <div className="flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Input
              disabled={isLoading}
              type="email"
              placeholder="Please enter your email address"
              className={`h-9 sm:h-10`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
          <button
            disabled={isLoading}
            className="bg-black-brand flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-1.5 text-base font-semibold text-white capitalize disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 sm:text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            className="text-secondary-purple-a hover:text-secondary-purple-b w-fit cursor-pointer text-center text-sm font-normal transition-colors duration-300 sm:text-sm"
            onClick={() => router.push("/auth/login")}
          >
            Back
          </button>
        </div>
      </div>
    </form>
  );
}

function FormHeader() {
  return (
    <div className="flex flex-col gap-1.5 text-center capitalize sm:gap-2">
      <h1 className="text-black-100 text-xl font-semibold sm:text-2xl">
        Forgot Password ?
      </h1>
      <p className="text-black-40 text-xs font-normal sm:text-sm">
        Enter your email to reset your password.
      </p>
    </div>
  );
}
