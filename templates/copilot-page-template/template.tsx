import { Sparkles, MessageSquare, Wand2, Timer } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "AI Drafts",
    description:
      "Get content drafts structured by frameworks and channels in seconds."
  },
  {
    icon: MessageSquare,
    title: "Collaboration",
    description:
      "Work with the copilot as an editor: refine voice, add briefs, collect versions."
  },
  {
    icon: Wand2,
    title: "Ready Templates",
    description:
      "Store your favorite intros, CTAs, hashtags and apply them with one click."
  },
  {
    icon: Timer,
    title: "Time Savings",
    description:
      "Prepare campaigns 3x faster—AI handles the routine, you focus on strategy."
  }
];

export const metadata = {
  title: "Content Creation Copilot Template"
};

export default function CopilotTemplatePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
          Copilot Workspace
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Content copilot that knows your brand and delivers materials on time
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Use the template to describe the task, audience, and desired format. The copilot will compile a draft and suggest CTA options, visuals, and variations.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <form className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="goal">
              Content Goal *
            </label>
            <textarea
              id="goal"
              required
              placeholder="Increase webinar registration / Warm up leads / Support product release"
              className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="audience">
              Audience and Segment *
            </label>
            <textarea
              id="audience"
              required
              placeholder="CMO in SaaS, mid-size companies, struggling with lack of competitor data"
              className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="format">
                Format
              </label>
              <select
                id="format"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                defaultValue="email"
              >
                <option value="email">Email</option>
                <option value="social">Social post</option>
                <option value="blog">Blog</option>
                <option value="script">Video / Script</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="tone">
                Tone of voice
              </label>
              <input
                id="tone"
                type="text"
                placeholder="Professional, friendly, data-driven"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="cta">
              CTA / Desired action
            </label>
            <input
              id="cta"
              type="text"
              placeholder="Request demo, register for webinar"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="inputs">
              Additional Inputs
            </label>
            <textarea
              id="inputs"
              placeholder="Key benefits, links, offers, character limits..."
              className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Generate Copilot Output
          </button>
          <p className="text-xs text-muted-foreground">
            Tip: add examples of posts or emails you like. The copilot will maintain the style.
          </p>
        </form>

        <div className="space-y-6">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="space-y-3 rounded-xl border border-border/70 bg-background/30 p-4">
                <item.icon className="h-6 w-6 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h3 className="text-base font-semibold text-primary">
              Workflow teams love
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Add tasks to your sprint and attach state and deadlines.</li>
              <li>• Refine inputs—the copilot generates new versions in context.</li>
              <li>• Export to Notion, Google Docs, or CMS with one click.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">Best Practices</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Prepare the "perfect brief": goal + audience + key messages. Add references—the copilot will deliver 1-3 options with tone of voice in mind. Then you adjust the nuances and publish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
