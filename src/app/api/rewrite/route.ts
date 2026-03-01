import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, style } = await request.json();

    if (!text || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const baseUrl = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: `You are an expert Twitter/X content creator. Rewrite tweets and threads in different styles while preserving the core message. Keep it engaging, within character limits, and match the requested style perfectly.`,
        messages: [
          {
            role: "user",
            content: `Rewrite the following tweet/thread in a ${style} style:\n\n${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { error: "Failed to rewrite content" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data));
    // Handle different response formats (Anthropic vs proxy)
    const content = data.content;
    let result = "";
    if (Array.isArray(content)) {
      // Find the text content (not thinking)
      const textBlock = content.find((c: any) => c.type === "text");
      result = textBlock?.text || "";
    } else if (typeof content === "string") {
      result = content;
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Rewrite error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
