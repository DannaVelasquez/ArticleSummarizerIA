const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

const summarizeController = require('./controllers/summarizeController');
const chatBotController = require('./controllers/chatBotController');

// Handle client route - generateSummary
app.post('/api/summarize', async (req, res) => {
    const { articleUrl } = req.body;
    if (!articleUrl) {
        return res.status(400).json({ error: 'Article URL is required' });
    }
    await summarizeController.generateSummary(articleUrl, res);
});

// Handle client route - chatBot
app.post('/api/chat', async (req, res) => {
    const { message, articleUrl } = req.body;
    if (!articleUrl || !message) {
        return res.status(400).json({ error: 'Article URL or message is required' });
    }
    await chatBotController.chatBot(message, articleUrl, res);
});

// Error handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


