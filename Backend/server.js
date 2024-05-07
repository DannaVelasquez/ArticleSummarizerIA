const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

const summarizeController = require('./controllers/summarizeController');

// Handle client route
app.post('/api/summarize', async (req, res) => {
    const { articleUrl } = req.body;
    if (!articleUrl) {
        return res.status(400).json({ error: 'Article URL is required' });
    }
    await summarizeController.generateSummary(articleUrl, res);
});

// Error handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


