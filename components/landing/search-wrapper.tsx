"use client";

import { SearchDialog } from "@/components/docs/search-dialog";
import { SearchButton } from "@/components/landing/search-button";
import { DocMetadata } from "@/lib/docs";
import { useEffect, useState } from "react";

interface SearchWrapperProps {
  items: DocMetadata[];
}

export function SearchWrapper({ items }: SearchWrapperProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SearchButton onOpen={() => setOpen(true)} />
      <SearchDialog items={items} open={open} onOpenChange={setOpen} />
    </>
  );
}
