import React from "react";
import Credentials from "@/components/Credentials";
import LayoutContainer from "@/components/LayoutContainer";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/logout";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    logout();
  }
  return (
    <>
      <section className="layout !bg-white">
        <LayoutContainer session={session} baseUrl={process.env.BASE_URL || ""}>
          {children}
          <Credentials variation="normal" />
        </LayoutContainer>
      </section>
    </>
  );
}
