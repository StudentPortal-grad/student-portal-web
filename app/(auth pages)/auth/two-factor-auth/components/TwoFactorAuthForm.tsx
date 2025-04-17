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
}

export default function TwoFactorAuthForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [submitError, setSubmitError] = React.useState<string>("");

  const onSubmit = (data: FormData) => {
    if (data.otp.length !== 6) {
      setSubmitError("Please enter all 6 digits of the verification code");
      return;
    }
    setSubmitError("");
    console.log(data);
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
          <p>*******</p>
          <p>7987</p>
        </div>
        <div className="flex flex-col gap-4">
          <OtpInput
            watch={watch}
            setValue={setValue}
            submitError={submitError}
          />
          <FormFooter />
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

function FormFooter() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <button className="form-button">submit</button>
      <p className="text-black-40 text-xs font-normal sm:text-sm">
        <span>Didn't get the code ? </span>{" "}
        <button className="text-secondary-purple-a hover:text-secondary-purple-b transition-colors duration-300">
          Resend
        </button>{" "}
        <span>or</span>{" "}
        <a
          href=""
          className="text-secondary-purple-a hover:text-secondary-purple-b transition-colors duration-300"
        >
          Call Us
        </a>
      </p>
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
      {submitError && <p className="text-xs text-red-500">{submitError}</p>}
    </div>
  );
}
