export interface SearchResult {
  id: string;
  title: string;
  url: string;
  summary: string;
}

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';

async function makeOpenRouterRequest(messages: any[], model: string, responseFormat?: { type: string }) {
  const response = await fetch(`${OPENROUTER_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Blog Post Creator'
    },
    body: JSON.stringify({
      model,
      messages,
      response_format: responseFormat,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function searchArticles(query: string): Promise<SearchResult[]> {
  // Use Mistral for search as it's good at structured output
  const content = await makeOpenRouterRequest([
    {
      role: "system",
      content: "You are a helpful assistant that provides search results for articles. Return exactly 5 relevant articles in JSON format with the following structure: {\"articles\": [{\"id\": \"string\", \"title\": \"string\", \"url\": \"string\", \"summary\": \"string\"}]}"
    },
    {
      role: "user",
      content: `Find 5 articles about: ${query}`
    }
  ], 'mistralai/mistral-7b-instruct', { type: "json_object" });

  const response = JSON.parse(content || "{}");
  return response.articles || [];
}

export async function generateBlogPost(params: {
  subject: string;
  ageRange: string;
  educationLevel: string;
  articles: { title: string; summary: string }[];
}): Promise<string> {
  // Use GPT for content generation as it's better at creative writing
  const content = await makeOpenRouterRequest([
    {
      role: "system",
      content: "You are a professional blog post writer. Create a well-structured blog post based on the provided information. Use HTML formatting for headers and paragraphs."
    },
    {
      role: "user",
      content: `Write a blog post about ${params.subject} for audience age ${params.ageRange} with ${params.educationLevel} education level.
      Use these articles as reference:
      ${params.articles.map(a => `- ${a.title}: ${a.summary}`).join('\n')}
      
      Make it engaging and informative. Structure the content with proper HTML tags (<h1>, <h2>, <p>, etc.).`
    }
  ], 'openai/gpt-3.5-turbo');

  return content || "";
}