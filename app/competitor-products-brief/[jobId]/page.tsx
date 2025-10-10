import { notFound } from "next/navigation";
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

  // ❌ УДАЛИТЬ ЭТУ СТРОКУ:
  // const html = marked.parse(report.html_content);

  // ✅ HTML уже отрендерен в n8n, просто показываем:
  return (
    <main className="prose mx-auto max-w-4xl px-6 py-12">
      <article dangerouslySetInnerHTML={{ __html: report.html_content }} />
    </main>
  );
}
