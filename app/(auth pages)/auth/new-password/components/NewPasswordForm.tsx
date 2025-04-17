"use client";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface FormData {
  otp: string;
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

export default function NewPasswordForm() {
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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 w-full max-w-[400px] sm:mx-10"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <FormHeader />
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
        <button className="form-button" disabled={passwordStrength < 4}>
          submit
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
