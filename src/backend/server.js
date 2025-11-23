require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateSystemPrompt } = require('../system_prompt.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        // Frontend now sends 'mode', not 'systemPrompt'
        const { message, mode } = req.body;
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API Key not configured on server.' });
        }

        // Generate prompt on the backend
        const systemPrompt = generateSystemPrompt(mode);
        console.log('Received request for mode:', mode);
        console.log('Generated System Prompt length:', systemPrompt.length);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-5-20250929',
                max_tokens: 1024,
                system: systemPrompt,
                messages: [
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('FULL API ERROR:', JSON.stringify(data.error, null, 2));
            return res.status(500).json({ 
                error: data.error.message,
                type: data.error.type 
            });
        }

        const aiMessage = data.content[0].text;
        res.json({ response: aiMessage });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log('Cognitive OS Proxy Server running on http://localhost:' + PORT);
});
