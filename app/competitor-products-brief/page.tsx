// app/competitor-products-brief/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, Bot, CheckCircle2, LineChart, Loader2, Users } from "lucide-react";
import { ReportSampleLink } from "@/components/report-sample-link";

type SubmissionState = "idle" | "pending" | "success" | "error";

const sellingPoints = [
  {
    icon: Bot,
    title: "AI Orchestration",
    description:
      "Claude 4.5 Sonnet + Perplexity Sonar Pro combine open data and fresh market signals.",
  },
  {
    icon: LineChart,
    title: "Ready-Made Insights",
    description:
      "Positioning, pricing strategies, ad messaging, and expertise gaps in a single brief.",
  },
  {
    icon: Users,
    title: "Niche Player Tracking",
    description:
      "Add known competitors and local brands so you don't miss paid traffic opportunities.",
  },
];

const deliverables = [
  "Assessment of competitor positioning and key messaging",
  "Breakdown of product lines and pricing strategies",
  "Chart of hidden opportunities and white space segments",
  "Recommendations for unique value propositions and GTM",
  "Summary of advertising creatives and channels",
];

const howItWorks = [
  {
    title: "Submit your brief",
    description:
      "Enter company, product, market focus, and known competitors so the AI stack has a clear starting point.",
  },
  {
    title: "AI orchestration",
    description:
      "Claude + Perplexity analyze positioning, pricing, messaging, and emerging players to surface what matters.",
  },
  {
    title: "Review & share",
    description: (
      <>
        Get your report by email with a secure, always‑available shareable link. <ReportSampleLink />
      </>
    ),
  },
];

const deliverableHighlights = deliverables.slice(0, 4);
const additionalDeliverables = deliverables.slice(4);

const API_ROUTE = "/api/competitor-products-brief";

export default function CompetitorProductsBriefPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const resetStatus = () => {
    setSubmissionState("idle");
    setStatusMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStatus();

    const formData = new FormData(event.currentTarget);

    const toStringValue = (value: FormDataEntryValue | null) =>
      typeof value === "string" ? value.trim() : "";

    const payload = {
      companyName: toStringValue(formData.get("companyName")),
      productName: toStringValue(formData.get("productName")),
      productCategory: toStringValue(formData.get("productCategory")),
      productSubcategory: toStringValue(formData.get("productSubcategory")),
      price: toStringValue(formData.get("price")),
      email: toStringValue(formData.get("email")),
      features: toStringValue(formData.get("features")),
      depth: toStringValue(formData.get("depth")) || "basic",
      target: toStringValue(formData.get("target")),
      competitors: toStringValue(formData.get("competitors")),
      urls: toStringValue(formData.get("urls")),
      concerns: toStringValue(formData.get("concerns")),
      timestamp: new Date().toISOString(),
    };

    console.log("[form] Sending payload:", payload);

    const emailForMessage = payload.email || "your email";

    setIsSubmitting(true);
    setSubmissionState("pending");
    setStatusMessage(
      `We are processing your request. This usually takes 5–10 minutes depending on complexity. You will receive the report at ${emailForMessage}.`
    );

    try {
      const response = await fetch(API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("[form] Response status:", response.status);

      const responseBody = await response.json().catch(() => null);
      console.log("[form] Response body:", responseBody);

      if (!response.ok || !responseBody?.success) {
        const missingFields =
          Array.isArray(responseBody?.missingFields) && responseBody.missingFields.length > 0
            ? responseBody.missingFields
            : null;

        let errorDetails =
          (typeof responseBody?.error === "string" && responseBody.error) ||
          (typeof responseBody?.details === "string" && responseBody.details) ||
          `Request failed with status ${response.status}.`;

        if (missingFields) {
          errorDetails += ` Missing fields: ${missingFields.join(", ")}`;
        }

        throw new Error(errorDetails);
      }

      setSubmissionState("success");
      setStatusMessage(
        `All set! Your competitive products brief is on the way to ${emailForMessage}. Please allow up to 10 minutes for the email to arrive.`
      );
      event.currentTarget.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your request. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusIcon = useMemo(() => {
    switch (submissionState) {
      case "pending":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden={true} />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden={true} />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" aria-hidden={true} />;
      default:
        return null;
    }
  }, [submissionState]);

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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl space-y-8 rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8"
        >
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
                  name="companyName"
                  type="text"
                  required
                  placeholder="Content Labs 416"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="organization"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productName">
                  Product name *
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  required
                  placeholder="AI Marketing Automation Suite"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productCategory">
                  Product category *
                </label>
                <input
                  id="productCategory"
                  name="productCategory"
                  type="text"
                  required
                  placeholder="SaaS / Marketing Automation"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productSubcategory">
                  Product subcategory
                </label>
                <input
                  id="productSubcategory"
                  name="productSubcategory"
                  type="text"
                  placeholder="Competitive Intelligence"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="price">
                  Price point
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="$149 / mo"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Your Email Address (Receive your full competitor report via email - plus a personal link for quick review) *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                autoComplete="email"
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
                name="features"
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
                  Target market *
                </label>
                <textarea
                  id="target"
                  name="target"
                  required
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
                  name="competitors"
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
                  name="urls"
                  placeholder="https://competitor.com, https://another.com"
                  className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="concerns">
                  Competitive concerns
                </label>
                <textarea
                  id="concerns"
                  name="concerns"
                  placeholder="Where do you feel pressure? What data is missing?"
                  className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </fieldset>

          <div className="text-center">
            <ReportSampleLink />
          </div>

          <p className="text-center text-base font-bold text-muted-foreground">
            * Powered by Claude 4.5 Sonnet + Perplexity Sonar Pro. Each request uses real credits.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isSubmitting ? "cursor-not-allowed opacity-75" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden={true} />
                Submitting...
              </span>
            ) : (
              "Get Your Competitive Products Brief Now"
            )}
          </button>

          {submissionState !== "idle" && (
            <div
              className="flex items-start gap-3 rounded-2xl border border-border bg-background/80 p-4 shadow-sm"
              aria-live="polite"
            >
              {statusIcon}
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            </div>
          )}
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
