import { Sidebar } from "@/components/docs/sidebar";
import { Toc } from "@/components/docs/toc";
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

      <div className="w-full max-w-350 mx-auto flex-1 px-4 md:px-8">
        <div className="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px] md:gap-10 lg:gap-16">
          <Sidebar items={docs} />
          <main className="relative py-6 lg:py-8 w-full min-w-0">
            <div className="mx-auto w-full min-w-0 max-w-4xl">
              <Toc mobile />
              {children}
            </div>
          </main>
          <aside className="sticky top-14 hidden xl:block h-[calc(100vh-3.5rem)] overflow-y-auto py-8">
            <Toc />
          </aside>
        </div>
      </div>
    </div>
  );
}
