import { CheckCircle2, Bot, LineChart, Users } from "lucide-react";

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

export const metadata = {
  title: "Competitor Products Brief"
};

export default function CompetitorProductsBriefPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
          Agentic Tool
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Instantly Know Exactly How You Stack Up Against Top Competitors
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Enter basic product information — get a ready-made competitive analysis that shows where you win, why you should raise prices, and what opportunities you're missing.
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <form className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div>
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
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email (to receive report) *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
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
            <div className="grid gap-4 sm:grid-cols-2">
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
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">Research depth</span>
                <div className="flex gap-2">
                  <label className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-medium text-foreground transition-colors hover:border-ring">
                    <input type="radio" name="depth" value="basic" className="hidden" defaultChecked />
                    <span>Basic (3-5)</span>
                  </label>
                  <label className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-medium text-foreground transition-colors hover:border-ring">
                    <input type="radio" name="depth" value="deep" className="hidden" />
                    <span>Deep (6-10)</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
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
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="concerns">
                Competitive concerns
              </label>
              <textarea
                id="concerns"
                placeholder="Where do you feel pressure? What data is missing?"
                className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Generate Analysis
          </button>
          <p className="text-xs text-muted-foreground">
            * Powered by Claude 4.5 Sonnet + Perplexity Sonar Pro. Each request uses real credits.
          </p>
        </form>

        <div className="space-y-6">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-3">
            {sellingPoints.map((point) => (
              <div key={point.title} className="space-y-3 rounded-xl border border-border/60 bg-background/30 p-4">
                <point.icon className="h-6 w-6 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">What you'll get</h2>
            <ul className="space-y-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h3 className="text-base font-semibold text-primary">How it works</h3>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Enter your product and current challenges in the form.</li>
              <li>2. AI orchestration gathers fresh data and generates a report.</li>
              <li>3. Receive PDF and link via email. Your team can comment and share.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
