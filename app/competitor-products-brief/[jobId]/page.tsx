import { notFound } from "next/navigation";
import { marked } from "marked";

import { getCompetitorReport } from "@/lib/supabase/server";

type PageProps = {
  params: {
    jobId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function CompetitorProductBriefPage({
  params,
}: PageProps) {
  const report = await getCompetitorReport(params.jobId);

  if (!report) {
    notFound();
  }

  const html = marked.parse(report.html_content);

  return (
    <main className="prose mx-auto max-w-4xl px-6 py-12">
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
