"use client";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/lib/actions/login";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessMessage from "@/components/messages/SuccessMessage";
import ErrorMessage from "@/components/messages/ErrorMessage";
import TooltipWrapper from "@/components/TooltipWrapper";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoginError(null);
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result?.error) {
        setLoginError(result.error);
      } else {
        setLoginSuccess(true);

        setTimeout(() => {
          const callbackUrl = searchParams.get("callbackUrl");
          router.push(callbackUrl || "/overview");
        }, 1000);
      }
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

        {loginSuccess && <SuccessMessage message="Logged in successfully" />}
        {loginError && <ErrorMessage message={loginError} />}

        <div className="flex w-full items-center gap-3 opacity-50 sm:flex-row sm:gap-4">
          <TooltipWrapper content="Coming Soon" direction="top" disabled>
            <AuthProviderButton provider="google" />
          </TooltipWrapper>
          <TooltipWrapper content="Coming Soon" direction="top" disabled>
            <AuthProviderButton provider="microsoft" />
          </TooltipWrapper>
        </div>
        <FormSeparator />
        <div className="flex w-full flex-col gap-3 sm:gap-4">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Input
              type="email"
              placeholder="Email"
              className={`h-9 sm:h-10 ${loginSuccess ? "border-green-500 focus-visible:ring-green-500" : ""} ${loginError?.toLowerCase().includes("invalid email or password") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
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
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="Password"
              className={`h-9 sm:h-10 ${loginSuccess ? "border-green-500 focus-visible:ring-green-500" : ""} ${loginError?.toLowerCase().includes("invalid email or password") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
            <Link
              href="/auth/forgot-password"
              className="text-secondary-purple-a hover:text-secondary-purple-b text-right text-xs font-normal transition-colors duration-300 sm:text-sm"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          disabled={isLoading}
          className="bg-black-brand flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-1.5 text-base font-semibold text-white capitalize disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 sm:text-lg"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}

function FormHeader() {
  return (
    <div className="flex flex-col gap-1.5 text-center capitalize sm:gap-2">
      <h1 className="text-black-100 text-xl font-semibold sm:text-2xl">
        Sign In
      </h1>
      <p className="text-black-40 text-xs font-normal sm:text-sm">
        Your Social Campaigns
      </p>
    </div>
  );
}

function AuthProviderButton({ provider }: { provider: string }) {
  return (
    <div className="bg-white-100 border-black-10 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-[8px] border-[1px] px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-[6px]">
      <Image
        src={`/icons/${provider}.svg`}
        alt={provider}
        width={24}
        height={24}
        className="h-6 w-6 sm:h-5 sm:w-5"
      />
      <p className="text-black-100 hidden text-xs font-normal whitespace-nowrap capitalize sm:block sm:text-sm">
        sign in with {provider}
      </p>
    </div>
  );
}

function FormSeparator() {
  return (
    <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
      <Separator className="flex-1" />
      <p className="text-black-40 text-xs font-normal whitespace-nowrap">
        Or with Credentials
      </p>
      <Separator className="flex-1" />
    </div>
  );
}
