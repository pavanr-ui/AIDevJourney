export async function onRequestPost(context) {
  const apiKey = context.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("your_") || !apiKey.startsWith("sk-ant-")) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured in Cloudflare Pages." },
      { status: 500 }
    );
  }

  let requestBody;
  try {
    requestBody = await context.request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const { messages, model, systemPrompt } = requestBody;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: model || "claude-3-5-sonnet-20241021",
        messages,
        system: systemPrompt,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const providerMessage = data?.error?.message;
      return Response.json(
        { error: providerMessage || "Failed to communicate with the AI provider." },
        { status: response.status }
      );
    }
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to communicate with the AI provider." },
      { status: 500 }
    );
  }
}
