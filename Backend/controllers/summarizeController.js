const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: "sk-proj-ojv174WTwbN1BLpTltfyT3BlbkFJOUD2MphTra49EI75lByo" });

// Generate summary function
async function generateSummary(articleUrl, res) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `me haces el resumen de este articulo ${articleUrl}` }],
            model: "gpt-3.5-turbo",
        });
        res.json({ summary: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    generateSummary: generateSummary
};
