import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.join(currentDirectory, 'dist');

app.post('/api/chat', async (req, res) => {
  const { messages, model, systemPrompt } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.startsWith('your_') || !apiKey.startsWith('sk-ant-')) {
    return res.status(500).json({ error: "API Key not configured on backend." });
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: model || 'claude-3-5-sonnet-20241022',
        messages: messages,
        system: systemPrompt,
        max_tokens: 1024,
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    const providerMessage = error.response?.data?.error?.message;
    if (error.response?.status === 401 || providerMessage?.includes('api-key')) {
      return res.status(500).json({ error: 'The Anthropic API key is invalid or expired. Update ANTHROPIC_API_KEY in .env and restart the server.' });
    }
    if (error.response?.status === 429) {
      return res.status(500).json({ error: 'The Anthropic API quota has been exceeded or rate-limited.' });
    }
    res.status(500).json({ error: providerMessage || 'Failed to communicate with the AI provider.' });
  }
});

app.use(express.static(distDirectory));
app.get('*', (req, res) => {
  res.sendFile(path.join(distDirectory, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AI Proxy Server running on http://localhost:${PORT}`);
});
