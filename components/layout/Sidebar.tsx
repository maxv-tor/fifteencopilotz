"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/lib/navigation";
import { X, Search, ChevronDown } from "lucide-react";
import * as React from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EXPANDED_SECTION_TITLES = new Set([
  "Resources",
  "Agentic Tools",
  "Content Creation",
  "Content Creation Copilots",
]);

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = React.useState<number[]>(() =>
    navigationSections.reduce<number[]>((accumulator, section, index) => {
      if (EXPANDED_SECTION_TITLES.has(section.title)) {
        accumulator.push(index);
      }
      return accumulator;
    }, [])
  );

  const toggleSection = (index: number) => {
    setExpandedSections((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={clsx(
          "fixed inset-y-14 left-0 z-40 flex w-72 flex-col border-r border-border bg-background transition-transform duration-200 ease-out md:static md:inset-auto md:h-[calc(100vh-56px)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
          <span className="text-sm font-medium text-muted-foreground">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="border-b border-border px-4 py-3">
            <label className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring"
                aria-label="Search tools"
              />
            </label>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 py-4 sidebar-scrollbar">
            <ul className="space-y-4">
              {navigationSections.map((section, index) => {
                const isExpanded = expandedSections.includes(index);
                const displayTitle =
                  section.title === "Content Creation Copilots"
                    ? "Content Creation"
                    : section.title;

                return (
                  <li key={section.title}>
                    <button
                      type="button"
                      onClick={() => toggleSection(index)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-expanded={isExpanded}
                      aria-controls={`sidebar-section-${index}`}
                    >
                      <span className="flex items-center gap-2">
                        <section.icon className="h-4 w-4" />
                        {displayTitle}
                      </span>
                      <ChevronDown
                        className={clsx(
                          "h-4 w-4 transition-transform",
                          isExpanded ? "rotate-180" : "rotate-0"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <ul
                      id={`sidebar-section-${index}`}
                      className={clsx(
                        "mt-2 space-y-1 overflow-hidden transition-[max-height,opacity] duration-200",
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      {section.items.map((item) => {
                        const isActive =
                          item.href !== "#" && pathname.startsWith(item.href);

                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href === "#" ? pathname : item.href}
                              className={clsx(
                                "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                                item.soon && "pointer-events-none opacity-60"
                              )}
                              aria-disabled={item.soon}
                            >
                              <span>{item.name}</span>
                              {item.soon && (
                                <span className="rounded-full bg-secondary px-2 py-0.5 text-2xs font-medium text-secondary-foreground">
                                  Coming soon
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
