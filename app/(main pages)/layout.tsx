import React from "react";
import Credentials from "@/components/Credentials";
import LayoutContainer from "@/components/LayoutContainer";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="layout !bg-white">
        <LayoutContainer>
          {children}
          <Credentials variation="normal" />
        </LayoutContainer>
      </section>
    </>
  );
}
