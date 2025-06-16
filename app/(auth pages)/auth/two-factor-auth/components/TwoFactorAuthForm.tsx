"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

interface FormData {
  otp: string;
}

export default function TwoFactorAuthForm({
  baseUrl,
  email,
}: {
  baseUrl: string;
  email: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [submitError, setSubmitError] = React.useState<string>("");

  const onSubmit = async (data: FormData) => {
    if (data.otp.length !== 6) {
      setSubmitError("Please enter all 6 digits of the verification code");
      return;
    }
    setIsLoading(true);
    setSubmitError("");
    try {
      const response = await fetch(`${baseUrl}/auth/verify-reset-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: data.otp,
          email: email,
        }),
      });
      const result = await response.json();
      if (result.success) {
        Cookies.set("resetToken", result.data.resetToken, { path: "/" });
        Cookies.remove("email", { path: "/" });
        router.push("/auth/reset-password");
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitError("");
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 w-full max-w-[400px] sm:mx-10"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-7">
        <Image
          src="/icons/mobile.svg"
          alt="two-factor-auth"
          width={100}
          height={100}
          className="mx-auto"
        />
        <FormHeader />
        <div className="text-black-100 flex items-center text-sm font-semibold sm:text-lg">
          <p className="text-black-100 text-lg font-medium">
            {email
              ? `${email.slice(0, 4)}${"*".repeat(Math.max(0, email.length - 8))}${email.slice(-4)}`
              : ""}
          </p>
        </div>
        {submitError && (
          <div className="flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
            <p className="text-sm text-red-600">{submitError}</p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <OtpInput
            watch={watch}
            setValue={setValue}
            submitError={submitError}
          />
          <FormFooter isLoading={isLoading} resendOtp={resendOtp} />
        </div>
      </div>
    </form>
  );
}

function FormHeader() {
  return (
    <div className="flex flex-col gap-1.5 text-center capitalize sm:gap-2">
      <h1 className="text-black-100 text-xl font-semibold sm:text-2xl">
        Two Step Verification
      </h1>
      <p className="text-black-40 text-xs font-normal sm:text-sm">
        Enter the verification code we sent to
      </p>
    </div>
  );
}

function FormFooter({
  isLoading,
  resendOtp,
}: {
  isLoading: boolean;
  resendOtp: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <button
        disabled={isLoading}
        className="bg-black-brand flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] px-4 py-1.5 text-base font-semibold text-white capitalize disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 sm:text-lg"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      <div className="text-black-40 text-xs font-normal sm:text-sm">
        <span>Didn't get the code ? </span>
        <button
          type="button"
          className="text-secondary-purple-a hover:text-secondary-purple-b cursor-pointer transition-colors duration-300"
          onClick={resendOtp}
        >
          Resend
        </button>
        <span> or </span>
        <a
          href=""
          className="text-secondary-purple-a hover:text-secondary-purple-b transition-colors duration-300"
        >
          Call Us
        </a>
      </div>
    </div>
  );
}

function OtpInput({
  watch,
  setValue,
  submitError,
}: {
  watch: any;
  setValue: any;
  submitError: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <p className="text-black-100 text-xs font-semibold sm:text-sm">
        Type your 6 digit security code
      </p>
      <InputOTP
        maxLength={6}
        value={watch("otp")}
        onChange={(value) => setValue("otp", value.toUpperCase())}
        className="gap-1 sm:gap-2"
        containerClassName="group flex items-center justify-center gap-1 sm:gap-2"
      >
        <InputOTPGroup className="gap-1 sm:gap-2">
          <InputOTPSlot
            index={0}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
          <InputOTPSlot
            index={1}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
          <InputOTPSlot
            index={2}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
        </InputOTPGroup>
        <InputOTPGroup className="gap-1 sm:gap-2">
          <InputOTPSlot
            index={3}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
          <InputOTPSlot
            index={4}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
          <InputOTPSlot
            index={5}
            className="border-black-10 bg-white-100 focus:border-secondary-purple-a focus:ring-secondary-purple-a h-8 w-8 rounded-md border text-base font-semibold uppercase transition-colors focus:ring-1 sm:h-10 sm:w-10 sm:rounded-lg sm:text-lg md:h-12 md:w-12"
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
