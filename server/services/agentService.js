require("dotenv").config();
const OpenAI = require("openai");

const getClient = () => {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const baseURL = process.env.OPENAI_BASE_URL?.trim();

    if (!apiKey && !baseURL) {
        const error = new Error(
            "AI is not configured. Set OPENAI_API_KEY or configure a local OpenAI-compatible server with OPENAI_BASE_URL."
        );
        error.status = 503;
        throw error;
    }

    return new OpenAI({
        apiKey: apiKey || "ollama",
        ...(baseURL ? { baseURL } : {}),
    });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const backoffDelay = (attempt) => 200 * Math.pow(2, attempt) + Math.floor(Math.random() * 150);

async function callOpenAIWithRetry({ systemPrompt, userMessage, maxRetries = 4 }) {
    const client = getClient();
    const model = process.env.AI_MODEL?.trim() || "gpt-4o-mini";
    let lastErr;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const completion = await client.chat.completions.create({
                model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
            });
            return completion;
        } catch (err) {
            lastErr = err;
            const status = err?.status || err?.response?.status;

            if (status === 429 || status === 503) {
                if (attempt === maxRetries) break;
                const retryAfter = err?.response?.headers?.["retry-after"];
                const waitMs = retryAfter ? Number(retryAfter) * 1000 : backoffDelay(attempt);
                await sleep(waitMs);
                continue;
            }
            throw err;
        }
    }
    throw lastErr;
}

async function runAgent(userMessage) {
    const systemPrompt = 
        "You are HustleHub's AI Copilot. Help the user with job applications, contacts, interview prep, and analytics. Keep answers concise and practical.";
    
    const completion = await callOpenAIWithRetry({ systemPrompt, userMessage });
    const choice = completion?.choices?.[0];
    const text = choice?.message?.content?.trim() || "No response from AI.";
    return {
        text,
        model: completion?.model ?? process.env.AI_MODEL?.trim() ?? "gpt-4o-mini",
        finish_reason: choice?.finish_reason ?? "stop",
        usage: completion?.usage ?? null,
    };
}

module.exports = { runAgent };