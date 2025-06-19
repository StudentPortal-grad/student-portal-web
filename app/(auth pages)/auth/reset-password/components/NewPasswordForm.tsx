"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import SuccessMessage from "@/components/messages/SuccessMessage";
import ErrorMessage from "@/components/messages/ErrorMessage";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const getPasswordStrength = (password: string): number => {
  let strength = 0;

  // Rule 1: At least 8 characters
  if (password.length >= 8) strength++;

  // Rule 2: Contains letters
  if (/[a-zA-Z]/.test(password)) strength++;

  // Rule 3: Contains numbers
  if (/[0-9]/.test(password)) strength++;

  // Rule 4: Contains symbols
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return strength;
};

export default function NewPasswordForm({
  baseUrl,
  resetToken,
}: {
  baseUrl: string;
  resetToken: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");
  const passwordStrength = getPasswordStrength(newPassword || "");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: resetToken,
          password: data.newPassword,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          Cookies.remove("resetToken", { path: "/" });
          router.replace("/auth/login");
        }, 1000);
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

        {success && <SuccessMessage message="Password reset successfully" />}
        {error && <ErrorMessage message={error} />}

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              placeholder="Password"
            />
            <PasswordStrengthIndicator strength={passwordStrength} />
            <div className="text-black-40 text-xs">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </div>
            {errors.newPassword && (
              <p className="pl-1 text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="Repeat Password"
            />
            {errors.confirmPassword && (
              <p className="pl-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <button
          disabled={passwordStrength < 4 || isLoading}
          className="bg-black-brand flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-1.5 text-base font-semibold text-white capitalize disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 sm:text-lg"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

function FormHeader() {
  return (
    <div className="flex flex-col gap-1.5 text-center capitalize sm:gap-2">
      <h1 className="text-black-100 text-xl font-semibold sm:text-2xl">
        Setup New Password
      </h1>
      <p className="text-black-40 text-xs font-normal sm:text-sm">
        Fill the fields below to setup your new password
      </p>
    </div>
  );
}

function PasswordStrengthIndicator({ strength }: { strength: number }) {
  return (
    <div className="mt-1 mb-2 flex w-full gap-1.5">
      <PasswordStrengthTile strength={strength} index={1} />
      <PasswordStrengthTile strength={strength} index={2} />
      <PasswordStrengthTile strength={strength} index={3} />
      <PasswordStrengthTile strength={strength} index={4} />
    </div>
  );
}

function PasswordStrengthTile({
  strength,
  index,
}: {
  strength: number;
  index: number;
}) {
  const isActive = strength >= index;
  const color =
    strength < 2
      ? "bg-red-500"
      : strength < 4
        ? "bg-yellow-500"
        : "bg-green-500";
  return (
    <div
      className={`h-1 flex-1 rounded-sm ${isActive ? color : "bg-black-10"} transition-all duration-300`}
    ></div>
  );
}
