const faqs = [
  {
    question: "Which AI models are used in Content Labs 416?",
    answer:
      "We combine Claude 4.5 Sonnet, Perplexity Sonar Pro, and proprietary prompts. For email and content, we use an ensemble of models (GPT-4.1 Turbo, Claude, Mistral) to select the best option."
  },
  {
    question: "How often is data updated in competitive briefs?",
    answer:
      "Each run performs a fresh data collection. We use public sources, ad libraries, product pages, and reviews. For in-depth analysis, manual validation by our team is included."
  },
  {
    question: "Can I add my own templates and guidelines?",
    answer:
      "Yes. In copilots, you can pin your Tone of Voice, CTA examples, and approved messaging. This helps transform results to match your brand."
  },
  {
    question: "How do I connect my ticketing system?",
    answer:
      "Initially, we accept requests via email. We plan to integrate Freshdesk. If you already have a system in place, reach out to [support@contentlabs416.com](mailto:support@contentlabs416.com) and we'll help set up the integration."
  },
  {
    question: "Will there be integrations with CRM and Ads platforms?",
    answer:
      "Integrations with HubSpot, Salesforce, and Meta Ads API are planned. Stay tuned for updates in the Roadmap section (announcing soon)."
  }
];

export const metadata = {
  title: "FAQ"
};

export default function FAQPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
          Knowledge Base
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          We've compiled answers to the most common questions about features, data, and development plans.
        </p>
      </header>
      <div className="space-y-4">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
              <span>{item.question}</span>
              <span className="text-primary transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-sm text-muted-foreground">
        Didn't find the answer? Email us at{" "}
        <a className="text-primary underline-offset-2 hover:underline" href="mailto:support@contentlabs416.com">
          [support@contentlabs416.com](mailto:support@contentlabs416.com)
        </a>{" "}
        or create a ticket on the <a className="text-primary underline-offset-2 hover:underline" href="/support">Support</a> page.
      </div>
    </div>
  );
}
