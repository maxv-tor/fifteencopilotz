"use client";

import * as React from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import type { Tool, ToolCategory } from "@/lib/tools";
import { toolFilters } from "@/lib/tools";
import Link from "next/link";

type ToolGridProps = {
  tools: Tool[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<ToolCategory>("all");

  const filteredTools = React.useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.categories.includes(selectedCategory);
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Quick search for tools..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring"
            aria-label="Search tools"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {toolFilters.map((filter) => {
            const isActive = selectedCategory === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedCategory(filter.value)}
                className={clsx(
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors sm:text-sm",
                  isActive
                    ? "border-transparent bg-primary text-primary-foreground shadow-xs"
                    : "border-border bg-background hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          const isComingSoon = tool.status === "coming-soon";

          return (
            <div
              key={tool.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {tool.name}
                    </h3>
                    {isComingSoon && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-2xs font-medium text-secondary-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <div className="flex flex-wrap gap-2 text-2xs uppercase tracking-wide text-muted-foreground">
                  {tool.categories
                    .filter((category) => category !== "all")
                    .map((category) => (
                      <span
                        key={`${tool.name}-${category}`}
                        className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground"
                      >
                        {category}
                      </span>
                    ))}
                </div>
                {isComingSoon ? (
                  <span className="text-xs font-medium text-muted-foreground">
                    Preparing release
                  </span>
                ) : (
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform hover:translate-x-1"
                  >
                    {tool.cta ?? "Go"}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        {filteredTools.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-border/80 bg-background/40 p-8 text-center text-sm text-muted-foreground">
            No tools found. Change filters or try a different query.
          </div>
        )}
      </div>
    </div>
  );
}
