import { CheckCircle2, Bot, LineChart, Users } from "lucide-react";
import { ReportSampleLink } from "@/components/report-sample-link";

const sellingPoints = [
  {
    icon: Bot,
    title: "AI Orchestration",
    description:
      "Claude 4.5 Sonnet + Perplexity Sonar Pro combine open data and fresh market signals."
  },
  {
    icon: LineChart,
    title: "Ready-Made Insights",
    description:
      "Positioning, pricing strategies, ad messaging, and expertise gaps in a single brief."
  },
  {
    icon: Users,
    title: "Niche Player Tracking",
    description:
      "Add known competitors and local brands so you don't miss paid traffic opportunities."
  }
];

const deliverables = [
  "Assessment of competitor positioning and key messaging",
  "Breakdown of product lines and pricing strategies",
  "Chart of hidden opportunities and white space segments",
  "Recommendations for unique value propositions and GTM",
  "Summary of advertising creatives and channels"
];

const deliverableHighlights = deliverables.slice(0, 4);
const additionalDeliverables = deliverables.slice(4);

const howItWorks = [
  {
    title: "Submit your brief",
    description:
      "Enter company, product, market focus, and known competitors so the AI stack has a clear starting point."
  },
  {
    title: "AI orchestration",
    description:
      "Claude + Perplexity analyze positioning, pricing, messaging, and emerging players to surface what matters."
  },
  {
    title: "Review & share",
    description: (
      <>
        Receive a polished PDF and shareable link in your inbox. Loop in product, marketing, or leadership instantly.{" "}
        <ReportSampleLink />
      </>
    )
  }
];

export const metadata = {
  title: "Competitor Products Brief"
};

export default function CompetitorProductsBriefPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
          Agentic Tool
        </span>
        <div className="space-y-2.5">
          <h1 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Instantly Know Exactly How You Stack Up Against Top Competitors
          </h1>
          <p className="text-center text-sm text-muted-foreground sm:text-base">
            Enter basic product information — get a ready-made competitive analysis that shows where you win, why you should raise prices, and what opportunities you're missing.
          </p>
        </div>
      </header>

      <section className="space-y-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 shadow-sm md:p-7">
        <h2 className="text-xl font-semibold text-primary sm:text-2xl">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3 md:gap-5">
          {howItWorks.map((step, index) => (
            <div key={step.title} className="space-y-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary sm:h-10 sm:w-10 sm:text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center">
        <form className="w-full max-w-3xl space-y-8 rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Product basics
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="companyName">
                  Company name *
                </label>
                <input
                  id="companyName"
                  type="text"
                  required
                  placeholder="Content Labs 416"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productName">
                  Product name *
                </label>
                <input
                  id="productName"
                  type="text"
                  required
                  placeholder="AI Marketing Automation Suite"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productCategory">
                  Product category *
                </label>
                <input
                  id="productCategory"
                  type="text"
                  required
                  placeholder="SaaS / Marketing Automation"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productSubcategory">
                  Product subcategory
                </label>
                <input
                  id="productSubcategory"
                  type="text"
                  placeholder="Competitive Intelligence"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="price">
                  Price point
                </label>
                <input
                  id="price"
                  type="text"
                  placeholder="$149 / mo"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Your Email Address (Receive your full competitor report via email - plus a personal link for quick review) *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Product details
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="features">
                Key product features *
              </label>
              <textarea
                id="features"
                required
                placeholder="AI sales assistant, competitor analysis, email automation"
                className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2">
                <span className="text-sm font-medium text-foreground">Research depth</span>
                <div className="flex gap-3">
                  <label className="flex flex-1 cursor-pointer">
                    <input type="radio" name="depth" value="basic" className="peer sr-only" defaultChecked />
                    <span className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-ring peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                      Basic (3-5)
                    </span>
                  </label>
                  <label className="flex flex-1 cursor-pointer">
                    <input type="radio" name="depth" value="deep" className="peer sr-only" />
                    <span className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-ring peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                      Deep (6-10)
                    </span>
                  </label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="target">
                  Target market
                </label>
                <textarea
                  id="target"
                  placeholder="B2B SaaS companies in the US, ARR 1-10M"
                  className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="competitors">
                  Known competitors
                </label>
                <textarea
                  id="competitors"
                  placeholder="Competitor One, Competitor Two, ..."
                  className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="urls">
                  Competitor URLs
                </label>
                <textarea
                  id="urls"
                  placeholder="https://competitor.com, https://another.com"
                  className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="concerns">
                  Competitive concerns
                </label>
                <textarea
                  id="concerns"
                  placeholder="Where do you feel pressure? What data is missing?"
                  className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Generate Analysis
          </button>

          <div className="text-center">
            <ReportSampleLink />
          </div>

          <p className="text-center text-base font-bold text-muted-foreground">
            * Powered by Claude 4.5 Sonnet + Perplexity Sonar Pro. Each request uses real credits.
          </p>
        </form>
      </section>

      <section className="space-y-4 rounded-3xl bg-[#f8f9ff] p-6 shadow-sm md:space-y-5 md:p-7">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">What you&apos;ll get</h2>
          <p className="text-sm text-muted-foreground">
            A battle-ready summary that gives your product, marketing, and leadership teams the edge.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deliverableHighlights.map((item) => (
            <li
              key={item}
              className="flex flex-col gap-3 rounded-2xl border border-transparent bg-white/70 p-5 shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-sm text-foreground">{item}</p>
            </li>
          ))}
        </ul>
        {additionalDeliverables.length > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
            <span>{additionalDeliverables[0]}</span>
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {sellingPoints.map((point) => (
          <article
            key={point.title}
            className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <point.icon className="h-5 w-5" />
            </span>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
