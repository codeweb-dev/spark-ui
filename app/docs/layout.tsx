import { Sidebar } from "@/components/docs/sidebar";
import { Navbar } from "@/components/landing/Navbar";
import { getAllDocs } from "@/lib/docs";
import React from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="w-full max-w-350 mx-auto px-4 md:px-8">
        <div className="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:gap-16">
          <Sidebar items={docs} />
          <main className="relative py-6 lg:py-8 w-full min-w-0 overflow-y-auto">
            <div className="mx-auto w-full min-w-0 max-w-4xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
