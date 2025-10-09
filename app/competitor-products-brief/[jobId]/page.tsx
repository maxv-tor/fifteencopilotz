import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { marked } from "marked";

import { createServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: {
    jobId: string;
  };
};

type JobsRow = {
  id: string;
  status: string;
  input_data: unknown;
  output_data: unknown;
  created_at: string;
  updated_at: string | null;
};

type ReportRow = {
  job_id: string;
  html_content: string;
  updated_at: string;
};

type NormalizedJobData = {
  id: string;
  status: string;
  productName: string | null;
  companyName: string | null;
  inputData: Record<string, unknown> | null;
  outputData: Record<string, unknown> | null;
};

type NormalizedReportData = {
  htmlContent: string | null;
  updatedAt: Date | null;
};

async function fetchJob(jobId: string): Promise<NormalizedJobData | null> {
  noStore();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from<JobsRow>("jobs")
    .select("id,status,input_data,output_data,created_at,updated_at")
    .eq("id", jobId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase error loading job:", error);
    throw new Error("Failed to fetch job data.");
  }

  if (!data) {
    return null;
  }

  const parseJson = (value: unknown): Record<string, unknown> | null => {
    if (!value) return null;
    if (typeof value === "object") return value as Record<string, unknown>;
    if (typeof value === "string") {
      try {
        return JSON.parse(value) as Record<string, unknown>;
      } catch (parseError) {
        console.warn("Failed to parse JSON:", parseError);
        return null;
      }
    }
    return null;
  };

  const inputData = parseJson(data.input_data);
  const outputData = parseJson(data.output_data);

  return {
    id: data.id,
    status: data.status,
    productName:
      (inputData?.product_name as string | undefined) ??
      (outputData?.product_name as string | undefined) ??
      null,
    companyName:
      (inputData?.company_name as string | undefined) ??
      (outputData?.company_name as string | undefined) ??
      null,
    inputData,
    outputData,
  };
}

async function fetchReport(jobId: string): Promise<NormalizedReportData> {
  noStore();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from<ReportRow>("competitor_product_brief_reports")
    .select("job_id, html_content, updated_at")
    .eq("job_id", jobId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase error loading report:", error);
    throw new Error("Failed to fetch HTML report.");
  }

  if (!data) {
    return {
      htmlContent: null,
      updatedAt: null,
    };
  }

  return {
    htmlContent: data.html_content ?? null,
    updatedAt: data.updated_at ? new Date(data.updated_at) : null,
  };
}

function buildFallbackHtml(markdown: string): string {
  return marked.parse(markdown, {
    breaks: true,
    gfm: true,
  });
}

function formatDate(value: Date | null): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const job = await fetchJob(params.jobId);

  if (!job) {
    return {
      title: "Report Not Found",
    };
  }

  const productName =
    job.productName ??
    (job.inputData?.product_subcategory as string | undefined) ??
    "Product";

  return {
    title: `Competitor Brief | ${productName}`,
  };
}

export default async function CompetitorBriefReportPage({
  params,
}: PageProps) {
  const job = await fetchJob(params.jobId);

  if (!job) {
    notFound();
  }

  const report = await fetchReport(job.id);

  const isCompleted = job.status === "completed";
  const markdown =
    typeof job.outputData?.analysis_content === "string"
      ? (job.outputData.analysis_content as string)
      : null;

  const htmlFromMarkdown =
    !report.htmlContent && markdown
      ? buildFallbackHtml(markdown)
      : null;

  const htmlToRender = report.htmlContent ?? htmlFromMarkdown;

  const updatedAtText = formatDate(report.updatedAt);

  const productLabel =
    job.productName ??
    (job.inputData?.product_name as string | undefined) ??
    "Your Product";

  const companyLabel =
    job.companyName ??
    (job.inputData?.company_name as string | undefined) ??
    null;

  const statusMessage = (() => {
    if (htmlToRender) return null;
    if (isCompleted && !markdown) {
      return "HTML report is not yet available. Try refreshing the page later.";
    }
    if (isCompleted && markdown && !report.htmlContent) {
      return "Report is ready, but HTML version is still being generated. Displaying fallback from Markdown.";
    }
    return "Report is still being generated. Please check back in a few minutes.";
  })();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Competitor Products Brief
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {productLabel}
          {companyLabel ? ` · ${companyLabel}` : ""}
        </p>
        {updatedAtText && (
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Updated: {updatedAtText}
          </p>
        )}
      </header>

      {statusMessage && (
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-5 text-center text-sm text-muted-foreground">
          {statusMessage}
        </div>
      )}

      {htmlToRender && (
        <article
          className="prose prose-slate max-w-none rounded-2xl border border-border bg-white p-6 shadow-sm prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: htmlToRender }}
        />
      )}
    </div>
  );
}
