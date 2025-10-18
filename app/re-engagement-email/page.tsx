// app/re-engagement-email/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, Bot, CheckCircle2, Heart, Loader2, Mail, RefreshCcw, Target } from "lucide-react";

type SubmissionState = "idle" | "pending" | "success" | "error";

const sellingPoints = [
  {
    icon: Bot,
    title: "AI-Powered Win-Back Strategy",
    description:
      "Claude 4.5 Sonnet applies proven re-engagement formulas to your specific inactive segment and business context, creating reconnection sequences that respect subscriber autonomy.",
  },
  {
    icon: Target,
    title: "Psychology-Based Frameworks",
    description:
      "Built on reconnection psychology including FOMO, exclusivity, value-first, and guilt-free approaches that rebuild trust without manipulation or pressure.",
  },
  {
    icon: Heart,
    title: "Relationship-Preserving Approach",
    description:
      "Every email designed to rebuild trust and respect subscriber autonomy—not manipulate or guilt-trip—fostering genuine re-engagement and long-term loyalty.",
  },
];

const deliverables = [
  "Complete 3-email win-back sequence with strategic flow designed to reconnect without guilt",
  "10+ optimized subject line variants for each email with psychological rationale",
  "Email-specific strategic recommendations for timing, segmentation, and list hygiene",
  "Detailed copywriting guidance including reconnection hooks, FOMO triggers, and clear CTAs",
];

const howItWorks = [
  {
    title: "Define your inactive segment",
    description:
      "Share details about your inactive subscribers, business context, and re-engagement goals",
  },
  {
    title: "AI crafts your win-back sequence",
    description:
      "Claude 4.5 Sonnet creates a strategic 3-email sequence designed to reconnect without being pushy",
  },
  {
    title: "Deploy & reactivate",
    description:
      "Get your complete re-engagement campaign with subject lines, copy, and strategic timing guidance",
  },
];

const deliverableHighlights = deliverables.slice(0, 3);
const additionalDeliverables = deliverables.slice(3);

const API_ROUTE = "/api/re-engagement-email";

export default function ReEngagementEmailPage() {
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

    // Generate unique job ID for tracking
    const jobId = crypto.randomUUID();

    const payload = {
      jobId: jobId,
      companyName: toStringValue(formData.get("companyName")),
      productService: toStringValue(formData.get("productService")),
      industry: toStringValue(formData.get("industry")),
      email: toStringValue(formData.get("email")),
      inactivityPeriod: toStringValue(formData.get("inactivityPeriod")),
      listSize: toStringValue(formData.get("listSize")),
      primaryGoal: toStringValue(formData.get("primaryGoal")),
      incentive: toStringValue(formData.get("incentive")),
      brandVoice: toStringValue(formData.get("brandVoice")),
      originalValue: toStringValue(formData.get("originalValue")),
      sequenceLength: sequenceComplexity === "simple" ? "3" : "5",
      previousAttempts: toStringValue(formData.get("previousAttempts")),
      inactivityReasons: toStringValue(formData.get("inactivityReasons")),
      concerns: toStringValue(formData.get("concerns")),
      timestamp: new Date().toISOString(),
    };

    console.log("[form] Sending payload with job ID:", jobId, payload);

    const emailForMessage = payload.email || "your email";

    setIsSubmitting(true);
    setSubmissionState("pending");
    setStatusMessage(
      "Starting re-engagement sequence generation... This usually takes 5-10 minutes. You will receive your sequence at " + emailForMessage
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
          "Your re-engagement sequence has been submitted successfully! Due to high processing time, we'll send your sequence directly to " +
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

      console.log("[form] Job created with ID:", jobId);

      form.reset();
      setSequenceComplexity("simple");

      setStatusMessage(
        "Re-engagement sequence generation started! Crafting your win-back emails... We'll also email you at " + emailForMessage + " when ready."
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
              console.log('[poll] Re-engagement sequence complete!');
              setSubmissionState("success");
              setStatusMessage("Re-engagement sequence complete! Your content is ready. Redirecting...");

              setTimeout(() => {
                window.location.href = "/re-engagement-email/" + jobId;
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
              "Crafting your re-engagement sequence (" + timeStr + " elapsed)... AI is analyzing your inactive subscribers. Hang tight!"
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
            Win Back Inactive Subscribers with AI-Powered Email Sequences
          </h1>
          <p className="text-center text-sm text-muted-foreground sm:text-base">
            Get a customized re-engagement sequence that rebuilds trust and reignites interest—without guilt trips or pressure—turning inactive subscribers into active, engaged customers.
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
              Business basics
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
                  placeholder="Your company or brand name"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring"
                  autoComplete="organization"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground" htmlFor="productService">
                  Product/Service *
                </label>
                <textarea
                  id="productService"
                  name="productService"
                  required
                  placeholder="What you offer in a few words (e.g., B2B SaaS platform, online courses, consulting services)"
                  className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="industry">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select industry...</option>
                  <option value="saas">SaaS / Software</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="coaching">Coaching / Consulting</option>
                  <option value="agency">Agency / Services</option>
                  <option value="education">Education / Online Courses</option>
                  <option value="health">Health & Wellness</option>
                  <option value="finance">Finance / Fintech</option>
                  <option value="b2b">B2B Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Your Email Address *
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Receive complete re-engagement sequence)
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
              Inactive subscriber details
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="inactivityPeriod">
                Inactivity Period *
              </label>
              <select
                id="inactivityPeriod"
                name="inactivityPeriod"
                required
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              >
                <option value="">Select period...</option>
                <option value="30-60">30-60 days (Early disengagement)</option>
                <option value="60-90">60-90 days (Moderate disengagement)</option>
                <option value="90-180">90-180 days (Advanced disengagement)</option>
                <option value="180+">180+ days (Severe disengagement)</option>
              </select>
              <small className="mt-1.5 block text-xs text-muted-foreground">
                How long since these subscribers last engaged with your emails?
              </small>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="listSize">
                Approximate List Size *
              </label>
              <input
                id="listSize"
                name="listSize"
                type="number"
                required
                placeholder="1000"
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
                autoComplete="off"
              />
              <small className="mt-1.5 block text-xs text-muted-foreground">
                Approximate number of inactive subscribers you're targeting
              </small>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="primaryGoal">
                Primary Re-engagement Goal *
              </label>
              <select
                id="primaryGoal"
                name="primaryGoal"
                required
                className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              >
                <option value="">Select goal...</option>
                <option value="reactivate">Maximum Reactivation (focus on winning back)</option>
                <option value="clean">List Cleaning (identify who wants to stay)</option>
                <option value="feedback">Gather Feedback (understand why they left)</option>
                <option value="purchase">Drive Purchase from Inactive Subscribers</option>
                <option value="balanced">Balanced Approach (reactivate + clean)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="incentive">
                Available Reactivation Incentive
              </label>
              <textarea
                id="incentive"
                name="incentive"
                placeholder="e.g., 25% discount, free month, exclusive content, strategy call, early access, bonus resources..."
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
              <small className="mt-1.5 block text-xs text-muted-foreground">
                What special offer can you provide to inactive subscribers? (Optional but recommended)
              </small>
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Brand & Messaging
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
                <option value="professional">Professional & Respectful</option>
                <option value="friendly">Friendly & Understanding</option>
                <option value="casual">Casual & Relatable</option>
                <option value="direct">Direct & No-Nonsense</option>
                <option value="empathetic">Empathetic & Supportive</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="originalValue">
                Why Did They Subscribe Originally?
              </label>
              <textarea
                id="originalValue"
                name="originalValue"
                placeholder="e.g., weekly marketing tips, product updates, exclusive deals, industry insights, free resources..."
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
              <small className="mt-1.5 block text-xs text-muted-foreground">
                What value did you promise when they first subscribed?
              </small>
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
                    Standard (3 emails)
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
                    Extended (5 emails)
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 md:p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Additional Context (Optional)
            </legend>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="previousAttempts">
                Previous Re-engagement Attempts
              </label>
              <textarea
                id="previousAttempts"
                name="previousAttempts"
                placeholder="Have you tried re-engagement before? What happened? What worked and what didn't?"
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="inactivityReasons">
                Known Reasons for Inactivity
              </label>
              <textarea
                id="inactivityReasons"
                name="inactivityReasons"
                placeholder="e.g., too many emails, content not relevant, purchased already, changed job, overwhelmed, life changes..."
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
                placeholder="Any specific challenges or areas you want the sequence to address? (e.g., avoiding spam filters, maintaining list health, specific objections)"
                className="mt-1 min-h-[90px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring"
              />
            </div>
          </fieldset>

          <p className="text-center text-base font-bold text-muted-foreground">
            * Powered by Claude 4.5 Sonnet with proven re-engagement formulas and psychological frameworks
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
                <RefreshCcw className="h-4 w-4" aria-hidden={true} />
                Generate My Re-Engagement Sequence Now
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
            A complete, ready-to-deploy re-engagement campaign backed by proven formulas and reconnection psychology.
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
