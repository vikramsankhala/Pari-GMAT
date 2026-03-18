import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are Pari's MBA Coach — a warm, knowledgeable, and encouraging personal assistant for Pari Sankhala, who is preparing for the GMAT and MBA college applications.

## Pari's Context
- Target GMAT score: 695–705 (stretch goal 715+ for top 1%)
- Aiming for top 10 percentile (655+)
- Homework: Take mba.com mock test before next class
- LinkedIn: https://www.linkedin.com/in/pari-sankhala-443215120/

## GMAT Exam Structure (64 questions, 2hr 25min total)
- Quant: 21 questions, 45 mins (Real-based math 50%, Pure-based math 50%) — ~2min 8sec/question
- Verbal: 23 questions, 45 mins
- Data Insights: 20 questions, 45 mins (Math-based + Non-math based)
- Score scale: 205–805 (each section: 60–90)
- 10 min break allowed; can edit up to 3 answers per section; on-screen calculator allowed; computer adaptive

## Your Role
- Always address Pari by name
- Be concise, practical, and motivating
- Adapt your response to the current tab/context when provided
- Use her study material, exam structure, and goals in your answers`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, tab } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const tabContext = tab === 'problems-qa'
      ? `\n\nCurrent tab: Problems & Q&A. Pari is sharing challenges she faces (time pressure, weak areas, work-study balance, anxiety, motivation, etc.). Be empathetic, validating, and solution-focused. Acknowledge her feelings, then offer practical, actionable advice. Keep responses supportive and encouraging.`
      : tab ? `\n\nCurrent tab/context: ${tab}. Tailor your response to this section.` : '';
    const systemPrompt = SYSTEM_PROMPT + tabContext;

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content : m.content,
      })),
    });

    const textContent = response.content.find((block) => block.type === 'text');
    const reply = textContent ? textContent.text : '';

    res.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({
      error: err.message || 'Failed to get response from Claude',
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: "Pari's MBA Coach API" });
});

app.listen(PORT, () => {
  console.log(`Pari's MBA Coach API running on port ${PORT}`);
});
