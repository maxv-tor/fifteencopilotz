import { notFound } from "next/navigation";
import { getLeadNurtureEmailReport } from "@/lib/supabase/server";

type PageProps = {
  params: {
    jobId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function LeadNurtureEmailReportPage({
  params,
}: PageProps) {
  const report = await getLeadNurtureEmailReport(params.jobId);

  if (!report) {
    notFound();
  }

  // HTML is already rendered from n8n, just display it
  return (
    <main className="prose mx-auto max-w-4xl px-6 py-12">
      <article dangerouslySetInnerHTML={{ __html: report.html_content }} />
    </main>
  );
}
