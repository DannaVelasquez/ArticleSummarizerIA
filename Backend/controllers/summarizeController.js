const { OpenAI } = require('openai');
const openai = require('../server');

// Generate summary function
async function generateSummary(articleUrl, res) {
    try {
        if (!articleUrl) {
            throw new Error("Article URL is mandatory");
        }
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
    generateSummary
}
