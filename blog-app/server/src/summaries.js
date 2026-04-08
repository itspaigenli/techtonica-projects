const COHERE_API_URL = "https://api.cohere.com/v2/chat";
const MODEL = process.env.COHERE_SUMMARY_MODEL || "command-a-03-2025";

function getFallbackSummary(content) {
  const cleanedContent = content.trim();

  if (!cleanedContent) {
    return "Summary unavailable.";
  }

  if (cleanedContent.length <= 160) {
    return cleanedContent;
  }

  return `${cleanedContent.slice(0, 157)}...`;
}

export async function getPostSummary(post) {
  if (!process.env.COHERE_API_KEY) {
    return getFallbackSummary(post.content);
  }

  const message = `Summarize this blog post in one sentence using plain language.\n\nTitle: ${post.title}\nCategory: ${post.category_name || "Uncategorized"}\n\n${post.content}`;

  const response = await fetch(COHERE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Cohere summary request failed with status ${response.status}: ${errorText}`,
    );
    return getFallbackSummary(post.content);
  }

  const data = await response.json();
  const summary = data.message?.content?.[0]?.text?.trim();

  if (!summary) {
    return getFallbackSummary(post.content);
  }

  return summary;
}
