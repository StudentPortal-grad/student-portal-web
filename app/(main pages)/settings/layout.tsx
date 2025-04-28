import React from "react";
import Tabs from "./components/Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white p-7">
      <Tabs />
      {children}
    </section>
  );
}
