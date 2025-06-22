import React, { Suspense } from "react";
import Tabs from "./components/Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full overflow-y-auto bg-white p-7">
      <Suspense>
        <Tabs />
      </Suspense>
      {children}
    </section>
  );
}
