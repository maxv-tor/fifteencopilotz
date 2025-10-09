import "server-only";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error(
    "SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) is required. Add it to your environment variables."
  );
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY is required. Add it to your environment variables."
  );
}

const REST_ENDPOINT = `${SUPABASE_URL}/rest/v1`;

type SupabaseFetchOptions = {
  path: string;
  query?: Record<string, string>;
};

async function supabaseFetch<T>({
  path,
  query,
}: SupabaseFetchOptions): Promise<T> {
  const url = new URL(`${REST_ENDPOINT}/${path}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
  }

  const serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY;

  const response = await fetch(url.toString(), {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      Prefer: "count=none",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Supabase request failed with status ${response.status}: ${details}`
    );
  }

  return (await response.json()) as T;
}

export type CompetitorReportRow = {
  job_id: string;
  html_content: string;
  updated_at: string;
};

export async function getCompetitorReport(
  jobId: string
): Promise<CompetitorReportRow | null> {
  const data = await supabaseFetch<CompetitorReportRow[]>({
    path: "competitor_product_brief_reports",
    query: {
      select: "job_id,html_content,updated_at",
      job_id: `eq.${jobId}`,
      limit: "1",
    },
  });

  return data[0] ?? null;
}
