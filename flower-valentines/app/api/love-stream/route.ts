import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";

export const maxDuration = 30;

export async function POST() {
  try {
    // Random style selector for variety
    const styles = ["sweet", "goofy", "poetic", "playful", "cheesy", "heartfelt"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    // Check if API key is available (gateway uses VERCEL_AI_API_KEY)
    const apiKey = process.env.VERCEL_AI_API_KEY || process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      console.error("VERCEL_AI_API_KEY or AI_GATEWAY_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "AI Gateway API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const result = await streamText({
      model: gateway("openai/gpt-4o-mini"),
      prompt: `Write a ${randomStyle} reason why a boyfriend loves his girlfriend for Valentine's Day.

IMPORTANT RULES:
- Write 1-3 sentences maximum
- Mix sweetness with a little goofiness and humor
- Be genuine and heartfelt but also make her smile or laugh
- Use cute pet name vibes (but don't use actual pet names)
- Add a touch of playfulness - inside joke energy
- Can include sweet emojis like 💕 🥰 😊 ✨ but don't overdo it
- VARY WILDLY each time - sometimes be romantic, sometimes be silly, sometimes be cheesy on purpose
- Make it feel personal and specific, not generic

Style for this one: ${randomStyle}

Example vibes (vary A LOT from these):
- "You're the only person I'd share my fries with. That's basically marriage, right? 🍟💕"
- "The way your nose scrunches when you laugh... I'd do anything to see that every day."
- "You make my heart do that stupid flutter thing. It's annoying. I love it. I love you."
- "I fell for you harder than I fall asleep during movies. And that's saying something. 😴💕"
- "You're my favorite notification. Every time. Always."
- "Being weird with you is my favorite thing. Never stop being you. ✨"
- "You make even grocery shopping feel like an adventure. How do you do that?"

Now write something fresh and different:`,
      temperature: 1.0,
      maxOutputTokens: 100,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in love-stream API:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate message" 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
