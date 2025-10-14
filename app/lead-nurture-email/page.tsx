// app/lead-nurture-email/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, Bot, CheckCircle2, Heart, Loader2, Mail, Target } from "lucide-react";
import { ReportSampleLink } from "@/components/report-sample-link";

type SubmissionState = "idle" | "pending" | "success" | "error";

const sellingPoints = [
  {
    icon: Bot,
    title: "AI-Powered Personalization",
    description:
      "Claude 4.5 Sonnet adapts proven email formulas to your specific brand, audience, and objectives for maximum resonance.",
  },
  {
    icon: Target,
    title: "Proven Frameworks",
    description:
      "Built on battle-tested email formulas including Origin Story, Actionable Framework, and Transformation Spotlight.",
  },
  {
    icon: Heart,
    title: "Relationship-First Approach",
    description:
      "Every email designed to build know, like, and trust—not just sell—creating loyal subscribers who become customers.",
  },
];

const deliverables = [
  "Complete 5-email nurture sequence with strategic flow designed to build trust progressively",
  "10+ optimized subject line variants for each email with psychological rationale",
  "Email-specific strategic recommendations for sequencing, timing, and engagement optimization",
  "Detailed copywriting guidance including hooks, storytelling elements, and CTAs",
];

const howItWorks = [
  {
    title: "Share your project details",
    description:
      "Tell us about your business, audience, brand voice, and email sequence goals so the AI can create a tailored strategy.",
  },
  {
    title: "AI crafts your sequence",
    description:
      "Claude 4.5 Sonnet uses proven formulas and templates to generate engaging, relationship-building emails optimized for your audience.",
  },
  {
    title: "Refine & deploy",
    description: (
      <>
        Review your complete email sequence, make adjustments with AI guidance, and get ready-to-send content that converts.
      </>
    ),
  },
];

const deliverableHighlights = deliverables.slice(0, 3);
const additionalDeliverables = deliverables.slice(3);

const API_ROUTE = "/api/lead-nurture-email";

export default function LeadNurtureEmailPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [sequenceComplexity, setSequenceComplexity] = useState<"simple" | "advanced">("simple");

  const resetStatus = () => {
    setSubmissionState("idle");
    setStatusMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStatus();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const toStringValue = (value: FormDataEntryValue | null) =>
      typeof value === "string" ? value.trim() : "";

    const payload = {
      companyName: toStringValue(formData.get("companyName")),
      productService: toStringValue(formData.get("productService")),
      industry: toStringValue(formData.get("industry")),
      email: toStringValue(formData.get("email")),
      targetAudience: toStringValue(formData.get("targetAudience")),
      sequenceGoal: toStringValue(formData.get("sequenceGoal")),
      uniqueValue: toStringValue(formData.get("uniqueValue")),
      contentThemes: toStringValue(formData.get("contentThemes")),
      brandVoice: toStringValue(formData.get("brandVoice")),
      sequenceLength: sequenceComplexity === "simple" ? "5" : "7",
      brandVoiceExamples: toStringValue(formData.get("brandVoiceExamples")),
      competitors: toStringValue(formData.get("competitors")),
      emailPerformance: toStringValue(formData.get("emailPerformance")),
      concerns: toStringValue(formData.get("concerns")),
      timestamp: new Date().toISOString(),
    };

    console.log("[form] Sending payload:", payload);

    const emailForMessage = payload.email || "your email";

    setIsSubmitting(true);
    setSubmissionState("pending");
    setStatusMessage(
      "Starting email sequence generation... This usually takes 5-10 minutes. You will receive your sequence at " + emailForMessage
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

      // Handle 524 timeout - job processing in background
      if (response.status === 524) {
        console.log("[form] Timeout (524) received - job likely processing in background");
        setSubmissionState("success");
        setStatusMessage(
          "Your email sequence has been submitted successfully! Due to high processing time, we'll send your sequence directly to " +
          emailForMessage +
          " when ready (usually 5-10 minutes)."
        );
        setIsSubmitting(false);
        form.reset();
        setSequenceComplexity("simple");
        return;
      }

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
          "Request failed with status " + response.status + ".";

        if (missingFields) {
          errorDetails += " Missing fields: " + missingFields.join(", ");
        }

        throw new Error(errorDetails);
      }

      const jobId = responseBody.job_id;
      console.log("[form] Job created:", jobId);

      form.reset();
      setSequenceComplexity("simple");

      setStatusMessage(
        "Email sequence generation started! Crafting your personalized emails... We'll also email you at " + emailForMessage + " when ready."
      );

      const pollForCompletion = async () => {
        const maxAttempts = 120;
        let attempts = 0;

        const checkStatus = async (): Promise<void> => {
          attempts++;

          try {
            console.log("[poll] Checking status (attempt " + attempts + ")...");

            const statusResponse = await fetch("/api/job-status/" + jobId, {
              cache: 'no-store'
            });
            const statusData = await statusResponse.json();

            console.log("[poll] Status:", statusData.status);

            if (statusData.status === 'completed') {
              console.log('[poll] Email sequence complete!');
              setSubmissionState("success");
              setStatusMessage("Email sequence complete! Your content is ready. Redirecting...");

              setTimeout(() => {
                window.location.href = "/lead-nurture-email/" + jobId;
              }, 2000);

              return;
            }

            if (statusData.status === 'error' || statusData.status === 'failed') {
              throw new Error('Generation failed. Please contact support with job ID: ' + jobId);
            }

            if (attempts >= maxAttempts) {
              console.log('[poll] Max attempts reached, stopping polling');
              setStatusMessage(
                "Generation is taking longer than expected. We'll email you at " + emailForMessage + " when it's ready. (Job ID: " + jobId + ")"
              );
              setIsSubmitting(false);
              return;
            }

            const elapsedMinutes = Math.floor((attempts * 5) / 60);
            const elapsedSeconds = (attempts * 5) % 60;
            const timeStr = elapsedMinutes > 0
              ? elapsedMinutes + " min " + elapsedSeconds + " sec"
              : elapsedSeconds + " sec";

            setStatusMessage(
              "Crafting your email sequence (" + timeStr + " elapsed)... AI is analyzing your brand and audience. Hang tight!"
            );

            await new Promise(resolve => setTimeout(resolve, 5000));

            return checkStatus();

          } catch (error) {
            console.error('[poll] Error:', error);
            throw error;
          }
        };

        await checkStatus();
      };

      await pollForCompletion();

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "We could not submit your request. Please try again or contact support."
      );
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
          AI Copilot
        </span>
        <div className="space-y-2.5">
          <h1 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Create High-Converting Email Sequences That Build Trust & Drive Engagement
          </h1>
          <p className="text-center text-sm text-muted-foreground sm:text-base">
            Share your brand and audience details — get a complete lead nurture email sequence designed to build relationships and convert subscribers into loyal customers.
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
              Project basics
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="companyName">
                  Company/Brand Name *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  placeholder="Your Company Name"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="organization"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="productService">
                  Product/Service *
                </label>
                <input
                  id="productService"
                  name="productService"
                  type="text"
                  required
                  placeholder="Describe what you offer"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="industry">
                  Industry *
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  required
                  placeholder="e.g., SaaS, E-commerce, Consulting"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="off"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Your Email Address *
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Receive your complete sequence + strategic recommendations)
                  </span>
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
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Audience & Objectives
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="targetAudience">
                Target Audience *
              </label>
              <textarea
                id="targetAudience"
                name="targetAudience"
                required
                placeholder="Describe your ideal customer: demographics, interests, pain points..."
                className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="sequenceGoal">
                Primary Sequence Goal *
              </label>
              <select
                id="sequenceGoal"
                name="sequenceGoal"
                required
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a goal...</option>
                <option value="welcome">Welcome & Onboard New Subscribers</option>
                <option value="trust">Build Trust & Relationship</option>
                <option value="educate">Educate & Demonstrate Expertise</option>
                <option value="purchase">Move Toward Purchase Decision</option>
                <option value="engagement">Increase Engagement & Interaction</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="uniqueValue">
                Your Unique Value Proposition
              </label>
              <textarea
                id="uniqueValue"
                name="uniqueValue"
                placeholder="What makes you different? What unique value do you provide?"
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="contentThemes">
                Key Content Themes/Expertise Areas
              </label>
              <textarea
                id="contentThemes"
                name="contentThemes"
                placeholder="Topics you're known for, areas of expertise, content pillars..."
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Brand Voice & Style
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="brandVoice">
                Brand Voice/Tone *
              </label>
              <select
                id="brandVoice"
                name="brandVoice"
                required
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              >
                <option value="">Select tone...</option>
                <option value="professional">Professional & Authoritative</option>
                <option value="friendly">Friendly & Conversational</option>
                <option value="casual">Casual & Relatable</option>
                <option value="inspirational">Inspirational & Motivating</option>
                <option value="educational">Educational & Informative</option>
              </select>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-foreground">Sequence Complexity</span>
              <div className="flex gap-3">
                <label className="flex flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="sequenceComplexity"
                    value="simple"
                    className="peer sr-only"
                    checked={sequenceComplexity === "simple"}
                    onChange={() => setSequenceComplexity("simple")}
                  />
                  <span className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-ring peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                    Simple (5 emails)
                  </span>
                </label>
                <label className="flex flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="sequenceComplexity"
                    value="advanced"
                    className="peer sr-only"
                    checked={sequenceComplexity === "advanced"}
                    onChange={() => setSequenceComplexity("advanced")}
                  />
                  <span className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-ring peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary">
                    Advanced (7+ emails)
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="brandVoiceExamples">
                Brand Voice Examples (Optional)
              </label>
              <textarea
                id="brandVoiceExamples"
                name="brandVoiceExamples"
                placeholder="Paste examples of your existing content that captures your brand voice..."
                className="mt-1 min-h-[110px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Additional Context (Optional)
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="competitors">
                Known Competitors
              </label>
              <input
                id="competitors"
                name="competitors"
                type="text"
                placeholder="List main competitors in your space"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="emailPerformance">
                Previous Email Performance (if any)
              </label>
              <textarea
                id="emailPerformance"
                name="emailPerformance"
                placeholder="Share any metrics or insights from past email campaigns..."
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="concerns">
                Specific Concerns or Focus Areas
              </label>
              <textarea
                id="concerns"
                name="concerns"
                placeholder="Any specific challenges, objections, or areas you want to address?"
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </fieldset>

          <p className="text-center text-base font-bold text-muted-foreground">
            * Powered by Claude 4.5 Sonnet with proven email formulas and psychological frameworks
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
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden={true} />
                Generate My Email Nurture Sequence Now
              </span>
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
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">What you&apos;ll receive</h2>
          <p className="text-sm text-muted-foreground">
            A complete, ready-to-use email sequence backed by proven formulas and best practices.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
