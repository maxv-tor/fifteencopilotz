import Link from "next/link";
import { footerColumns } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 md:max-w-sm">
          <span className="font-mono text-xl font-semibold text-foreground">
            Content Labs 416
          </span>
          <p className="text-sm text-muted-foreground">
            An AI agents and copilots platform that automates market analysis, content creation, and campaign launches.
          </p>
        </div>
        <div className="grid w-full gap-6 sm:grid-cols-2 md:w-auto md:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {column.title}
              </span>
              <ul className="space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="relative inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                      aria-disabled={link.soon}
                    >
                      {link.label}
                      {link.soon && (
                        <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-2xs font-medium text-secondary-foreground">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Content Labs 416. (2025) All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link className="hover:text-foreground" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-foreground" href="/terms-of-service">
              Terms of Service
            </Link>
            <Link className="hover:text-foreground" href="/faq">
              FAQ
            </Link>
            <Link className="hover:text-foreground" href="/support">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
