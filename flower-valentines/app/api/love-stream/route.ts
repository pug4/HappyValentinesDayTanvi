import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";

export const maxDuration = 30;

export async function POST() {
  const result = await streamText({
    model: gateway("openai/gpt-4o-mini"),
    prompt: `Write a short, poetic, heartfelt reason why someone loves their girlfriend. 
    
Rules:
- Write 2-3 sentences maximum
- Be sincere and emotionally deep, not generic or cliché
- Focus on specific small moments or feelings
- Use beautiful, romantic language
- Vary the style each time - sometimes focus on her smile, sometimes her laugh, sometimes her presence, sometimes small habits, sometimes how she makes you feel
- Don't start with "I love you because" - be more creative with the opening
- Don't use excessive exclamation marks
- Make it feel like a genuine love note

Example styles (vary widely from these):
- "The way you tuck your hair behind your ear when you're deep in thought... it stops my heart every time."
- "In your arms, the chaos of the world goes quiet. You are my calm, my peace, my home."
- "When you laugh, truly laugh, the whole room becomes brighter. I live for those moments."`,
    temperature: 0.9,
    maxOutputTokens: 150,
  });

  return result.toTextStreamResponse();
}
