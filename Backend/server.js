const express = require('express');
const app = express();
const { OpenAI } = require('openai');
const PORT = process.env.PORT || 3000; 

app.use(express.json());

const openai = new OpenAI({
    apiKey: "Api key should be entered here"
});

module.exports = openai;

const summarizeController = require('./controllers/summarizeController');
const chatBotController = require('./controllers/chatBotController');


// Handle client route - generateSummary
app.post('/api/summarize', async (req, res, next) => {
    try {
        const { articleUrl } = req.body;
        if (!articleUrl) {
            return res.status(400).json({ error: 'Article URL is required' });
        }
        await summarizeController.generateSummary(articleUrl, res);
    } catch (err) {
        console.error('Error in generateSummary:', err);
        next(err);
    }
});

// Handle client route - chatBot
app.post('/api/chat', async (req, res, next) => {
    try {
        const { message, articleUrl } = req.body;
        if (!articleUrl || !message) {
            return res.status(400).json({ error: 'Article URL or message is required' });
        }
        await chatBotController.chatBot(message, articleUrl, res);
    } catch (err) {
        console.error('Error in chatBot:', err);
        next(err);
    }
});

// Error handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});


app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});

module.exports = openai;


