const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: "sk-proj-ojv174WTwbN1BLpTltfyT3BlbkFJOUD2MphTra49EI75lByo" });

// Generate summary function
async function generateSummary(articleUrl, res) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `me haces un resumen de este articulo ${articleUrl} teniendo mínimo 1000 caracteres` }],
            model: "gpt-3.5-turbo",
            max_tokens: 3000,
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
