import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://contentlabs.app.n8n.cloud/webhook/competitor-products-brief";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload: expected JSON object." },
        { status: 400 }
      );
    }

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await webhookResponse.text();

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Webhook responded with status ${webhookResponse.status}.`,
          details: responseText || "No response body returned by webhook.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Webhook accepted the payload.",
        details: responseText || null,
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
