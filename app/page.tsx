import { ToolGrid } from "@/components/ToolGrid";
import { tools } from "@/lib/tools";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4 text-center">
        <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI Marketing Automation Hub
        </span>
        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Automate research, content, and campaigns with AI agents
        </h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          Content Labs 416 transforms briefs and ideas into concrete artifacts ready to launch — from competitive reviews to lead generation pages.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Tools and copilots
        </h2>
        <p className="text-sm text-muted-foreground">
          Drive growth: research competitors, gather insights, and generate campaigns from a single hub.
        </p>
      </section>

      <ToolGrid tools={tools} />

      <section className="grid gap-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/30 p-8 sm:gap-8 sm:p-12">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">
            Ready to integrate AI into marketing?
          </h3>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Compile key briefs, collect competitor data, and prepare full-scale campaigns faster than a team of multiple specialists.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:hello@contentlabs416.com"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Contact the team
          </a>
          <a
            href="/competitor-products-brief"
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            See it in action
          </a>
        </div>
      </section>
    </div>
  );
}
