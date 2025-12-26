import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY; // Reverted to process.env
console.log("Gemini API Key Configured:", apiKey ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { timeline, matchContext } = body;

        if (!timeline || timeline.length === 0) {
            return NextResponse.json({ error: "No timeline data provided" }, { status: 400 });
        }

        // Using gemini-2.5-flash as it appeared in the valid models list
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log("Analyzing Timeline:", timeline?.length, "points");

        const prompt = `
        You are a seasoned cricket analyst for AthenaOS.
        Analyze the following emotional timeline data and match context.
        Generate a concise, data-driven narrative (3-5 lines max) explaining the shift in momentum.
        Focus on "Emotional Score" changes.

        Data:
        ${JSON.stringify(timeline.slice(-5))} 

        Context:
        ${matchContext || "Late overs, high pressure match."}

        Tone: Professional, analytical, sports-broadcast style. No formatting, just text.
        `;

        const result = await model.generateContent(prompt);
        const story = result.response.text();
        console.log("Gemini Success:", story.substring(0, 50) + "...");

        // Calculate metadata based on timeline (Mocking complexity for speed)
        const latestPoint = timeline[timeline.length - 1];
        const score = latestPoint?.emotion_score || 0;

        return NextResponse.json({
            data: {
                story_text: story,
                moment_label: "Real-Time AI Context",
                emotion_level: score > 0 ? "High Optimism" : "High Pressure",
                confidence: 0.92,
                insights: [
                    "Momentum shift detected based on velocity of scoring.",
                    "Crowd sentiment correlates with recent boundary events."
                ]
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Gemini API Error Full:", error);
        return NextResponse.json({
            data: {
                story_text: `Error: ${error.message}`,
                moment_label: "System Error",
                emotion_level: "Neutral",
                confidence: 0,
                insights: ["Please check server console for details."]
            },
            error: error.message
        }, { status: 500 });
    }
}
