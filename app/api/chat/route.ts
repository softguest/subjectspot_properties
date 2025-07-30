import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cosineSimilarity } from "@/lib/cosine";

export async function POST(req: Request) {
  const { message } = await req.json();
  if (!message) {
    return Response.json({ error: "Missing message" }, { status: 400 });
  }

  // Embed user message
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

  let queryEmbedding: number[] = [];
  try {
    const result = await embeddingModel.embedContent({
      content: {
        role: "user",
        parts: [{ text: message }],
      },
    });
    queryEmbedding = result.embedding?.values || [];
  } catch (err) {
    console.error("Gemini embedding error:", err);
    return Response.json({ error: "Embedding failed" }, { status: 500 });
  }

  // Get all problems with solutions
  const problems = await db.problem.findMany({
    include: { solutions: true },
  });

  // Rank them by similarity
  const topMatches = problems
    .map((p) => ({
      ...p,
      score: cosineSimilarity(queryEmbedding, p.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 1); // Top 1 match

  if (!topMatches.length || topMatches[0].score < 0.75) {
    return Response.json({
      reply: `I couldn't find an exact match, but can you clarify what you're looking for?`,
    });
  }

  const bestMatch = topMatches[0];

  // Format the matched content into a Gemini prompt
  const prompt = `
User's question: "${message}"

Here is the best matched problem and its solutions:
Problem: ${bestMatch.title}
Details: ${bestMatch.content}

Solutions:
${bestMatch.solutions.map((s, i) => `${i + 1}. ${s.content}`).join("\n\n")}

Write a helpful answer based on this content. Be clear, conversational, and concise.
`;

  const chatModel = genAI.getGenerativeModel({ model: "gemini-pro" });
  const reply = await chatModel.generateContent(prompt);

  const output = reply.response.text();
  return Response.json({ reply: output });
}
