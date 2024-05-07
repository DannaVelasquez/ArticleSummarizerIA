const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: "sk-proj-ojv174WTwbN1BLpTltfyT3BlbkFJOUD2MphTra49EI75lByo" });

// Generate chatBot function
async function chatBot(message, articleUrl, res) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
              { role: "system", content: `You are a helpful assistant. We are going to chat about this article ${articleUrl}` },
              { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
          });
          const chatResponse = completion.choices[0].message.content;
          res.json({ message: chatResponse });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    chatBot: chatBot
};