const { OpenAI } = require("openai");
const openai = require('../server');

// Generate chatBot function
async function chatBot(message, articleUrl, res) {
  try {
    if (!message || !articleUrl) {
      throw new Error("Message and URL article are mandatory");
    }
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. We are going to chat about this article ${articleUrl}`,
        },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
    });
    const chatResponse = completion.choices[0].message.content;
    res.json({ message: chatResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  chatBot,
};
