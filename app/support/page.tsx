import { Mail, MessageSquare, LifeBuoy, Zap } from "lucide-react";
import Link from "next/link";

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Response within one business day. Use the form or email us directly.",
    detail: "support@gorilladome.com"
  },
  {
    icon: MessageSquare,
    title: "Slack Integration",
    description: "Connect with our team in a dedicated channel (available for Pro plans).",
    detail: "Request an invite through the form"
  },
  {
    icon: LifeBuoy,
    title: "Knowledge Base",
    description: "FAQs, guides, and tutorials for every tool.",
    detail: "Coming soon"
  }
];

const ticketingSuggestions = [
  {
    name: "Freshdesk",
    benefit: "Free tier for up to 10 agents, email ticketing, knowledge base, SLA dashboards.",
    link: "https://freshdesk.com"
  },
  {
    name: "Zoho Desk",
    benefit: "Free tier for up to 3 agents, automation, multi-channel support.",
    link: "https://zoho.com/desk"
  },
  {
    name: "HubSpot Service Hub (Free)",
    benefit: "Forms, ticketing, reporting. Integrates well with CRM.",
    link: "https://www.hubspot.com/products/service"
  },
  {
    name: "HelpScout",
    benefit: "14-day trial, excellent shared inbox. Great for customer success.",
    link: "https://www.helpscout.com"
  }
];

export const metadata = {
  title: "Support"
};

export default function SupportPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
          Support Center
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Need help? We're here for you.
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Describe your issue — we'll get back to you with answers, guidance, or a call. Below you'll find a form for submitting a ticket and recommendations for organizing your support service.
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Submit a Request</h2>
          <p className="text-sm text-muted-foreground">
            Fill out the form — your message will be sent to [support@gorilladome.com](mailto:support@gorilladome.com). We respond within 24 business hours.
          </p>

          <form className="space-y-5" action="#" method="post">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Work Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="topic">
                Request Type
              </label>
              <select
                id="topic"
                name="topic"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                defaultValue="question"
              >
                <option value="question">Product Question</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="billing">Billing</option>
                <option value="success">Customer Success</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="subject">
                Subject *
              </label>
              <input
                id="subject"
                name="subject"
                required
                placeholder="Brief description"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="message">
                Request Details *
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Add a link, screenshot, or steps to reproduce."
                className="mt-1 min-h-[140px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-4 w-4" />
              Submit Request
            </button>
            <p className="text-xs text-muted-foreground">
              * Auto-ticketing (Freshdesk) coming soon. For now, emails are processed manually.
            </p>
          </form>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">Support Channels</h3>
            <div className="space-y-4">
              {supportChannels.map((channel) => (
                <div key={channel.title} className="flex gap-3 rounded-xl border border-border/60 bg-background/30 p-4">
                  <channel.icon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{channel.title}</h4>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{channel.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-primary">
              <Zap className="h-5 w-5" />
              Recommended Ticketing Systems (free tier)
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {ticketingSuggestions.map((tool) => (
                <li key={tool.name}>
                  <span className="font-semibold text-foreground">{tool.name}</span>: {tool.benefit} —{" "}
                  <Link
                    href={tool.link}
                    className="text-primary underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    learn more
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Tip: Start with Freshdesk or Zoho Desk — connect an email channel, set up request categories, and add FAQs. Later, you can integrate chatbots and SLA automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
