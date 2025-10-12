// app/api/competitor-products-brief/route.ts
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://contentlabs.app.n8n.cloud/webhook/competitor-products-brief";

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
      product_name: normalizeString(payload.productName),
      product_category: normalizeString(payload.productCategory),
      key_features: normalizeString(payload.features),
      target_market: normalizeString(payload.target),
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
      product_subcategory: normalizeString(payload.productSubcategory),
      price_point: normalizeString(payload.price),
      research_depth: normalizeString(payload.depth),
      known_competitors: normalizeString(payload.competitors),
      competitor_urls: normalizeString(payload.urls),
      competitive_concerns: normalizeString(payload.concerns),
      timestamp: normalizeString(payload.timestamp) || new Date().toISOString(),
    };

    const webhookPayload: Record<string, string> = { ...requiredFieldMap };

    for (const [key, value] of Object.entries(optionalFieldMap)) {
      if (value) {
        webhookPayload[key] = value;
      }
    }

    console.log("[proxy] Outgoing webhook payload:", webhookPayload);

    // Создаем URL с query параметрами для GET запроса
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
