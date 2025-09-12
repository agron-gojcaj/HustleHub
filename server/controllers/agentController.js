const { runAgent } = require("../services/agentService");

exports.createAgent = async (req, res) => {
    try {
        const userMessage = req.body?.userMessage ?? req.body.prompt;

        if (!userMessage || typeof userMessage !== "string") {
            return res.status(400).json({ error: "User message is required." });
        }

        const result = await runAgent(userMessage);

        return res.status(200).json({
            message: result.text,
            model: result.model,
            finish_reason: result.finish_reason,
            usage: result.usage,
        });
    } catch (err) {
        console.error("[createAgent] error:", {
            status: err?.status || err?.response?.status,
            message: err?.message,
            data: err?.response?.data,
        });
        const status = err?.status && Number.isInteger(err.status) ? err.status : 500;
        return res.status(status).json({
            error:
                err?.response?.data?.error?.message ||
                err?.message ||
                "Server error: AI agent failed.",
        });
    }
};
