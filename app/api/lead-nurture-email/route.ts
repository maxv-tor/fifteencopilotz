// app/api/lead-nurture-email/route.ts
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://contentlabs.app.n8n.cloud/webhook/lead-nurture-email";

const normalizeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload: expected JSON object." },
        { status: 400 }
      );
    }

    console.log("[proxy] Incoming payload:", payload);

    const requiredFieldMap = {
      company_name: normalizeString(payload.companyName),
      product_service: normalizeString(payload.productService),
      industry: normalizeString(payload.industry),
      target_audience: normalizeString(payload.targetAudience),
      sequence_goal: normalizeString(payload.sequenceGoal),
      brand_voice: normalizeString(payload.brandVoice),
      email_address: normalizeString(payload.email),
    };

    const missingRequiredFields = Object.entries(requiredFieldMap)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingRequiredFields.length > 0) {
      console.warn("[proxy] Missing required fields:", missingRequiredFields);
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields for webhook submission.",
          missingFields: missingRequiredFields,
        },
        { status: 400 }
      );
    }

    const optionalFieldMap: Record<string, string> = {
      unique_value: normalizeString(payload.uniqueValue),
      content_themes: normalizeString(payload.contentThemes),
      sequence_length: normalizeString(payload.sequenceLength),
      brand_voice_examples: normalizeString(payload.brandVoiceExamples),
      competitors: normalizeString(payload.competitors),
      email_performance: normalizeString(payload.emailPerformance),
      concerns: normalizeString(payload.concerns),
      timestamp: normalizeString(payload.timestamp) || new Date().toISOString(),
    };

    const webhookPayload: Record<string, string> = { ...requiredFieldMap };

    for (const [key, value] of Object.entries(optionalFieldMap)) {
      if (value) {
        webhookPayload[key] = value;
      }
    }

    console.log("[proxy] Outgoing webhook payload:", webhookPayload);

    // Create URL with query parameters for GET request
    const queryParams = new URLSearchParams(webhookPayload).toString();
    const fullWebhookUrl = `${WEBHOOK_URL}?${queryParams}`;

    console.log("[proxy] Full webhook URL:", fullWebhookUrl);

    const webhookResponse = await fetch(fullWebhookUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const responseText = await webhookResponse.text();
    console.log(
      "[proxy] Webhook response:",
      webhookResponse.status,
      webhookResponse.statusText,
      responseText
    );

    let responseJson: Record<string, unknown> | null = null;

    if (responseText) {
      try {
        responseJson = JSON.parse(responseText);
      } catch (error) {
        console.warn("Failed to parse webhook response JSON:", error);
      }
    }

    const webhookSuccess =
      webhookResponse.ok && responseJson?.success !== false;

    if (!webhookSuccess) {
      const missingFields = Array.isArray(responseJson?.missing_fields)
        ? (responseJson?.missing_fields as string[])
        : undefined;

      return NextResponse.json(
        {
          success: false,
          error:
            (typeof responseJson?.error === "string" && responseJson.error) ||
            `Webhook responded with status ${webhookResponse.status}.`,
          details:
            (typeof responseJson?.details === "string" && responseJson.details) ||
            (!responseJson && responseText) ||
            null,
          missingFields,
        },
        { status: webhookResponse.status || 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          (typeof responseJson?.message === "string" && responseJson.message) ||
          "Webhook accepted the payload.",
        redirect_url: typeof responseJson?.redirect_url === "string" ? responseJson.redirect_url : undefined,
        job_id: typeof responseJson?.job_id === "string" ? responseJson.job_id : undefined,
        details: responseJson ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Proxy webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server failed to submit the webhook request.",
      },
      { status: 500 }
    );
  }
}
