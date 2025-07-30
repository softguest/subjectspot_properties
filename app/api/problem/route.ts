import { db } from "@/lib/db";
import { auth } from "@/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ message: "Not Authenticated!" }, { status: 401 });
  }

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return Response.json({ message: "Missing title or content" }, { status: 400 });
    }

    const cleanedTitle = title.trim();
    const cleanedContent = content.trim();

    // Load Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

    // Generate embedding
    let embedding: number[] = [];
    try {
      const result = await embeddingModel.embedContent({
        content: {
          role: "user",
          parts: [{ text: `${cleanedTitle}\n${cleanedContent}` }],
        },
      });
      embedding = result.embedding?.values || [];
      if (embedding.length === 0) throw new Error("Empty embedding");
    } catch (e) {
      console.error("Gemini embedding error:", e);
      return Response.json({ message: "Failed to generate embedding" }, { status: 500 });
    }

    // Store problem
    const newProblem = await db.problem.create({
      data: {
        title: cleanedTitle,
        content: cleanedContent,
        authorEmail: session.user.email,
        embedding,
      },
    });

    return Response.json({ newProblem }, { status: 200 });
  } catch (error) {
    console.error("Create Problem Error:", error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
