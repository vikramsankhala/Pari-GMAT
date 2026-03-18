import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve from server/public (Render: copied by build) or client/dist (local)
const candidates = [
  path.join(__dirname, 'public'),
  path.resolve(__dirname, '..', 'client', 'dist'),
  path.resolve(process.cwd(), 'client', 'dist'),
];
const clientDist = candidates.find((p) => fs.existsSync(path.join(p, 'index.html'))) || candidates[0];

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

    const tabContexts = {
      'gmat-coach': 'GMAT Coach. Explain concepts (Quant, Verbal, DI), quiz by section/difficulty, track weak areas, time management (~2min 8sec/Quant). Remind: 10 min break, edit up to 3 answers/section, on-screen calculator, computer adaptive.',
      'college-apps': 'College Applications. Draft/refine SOPs, essays, short answers. Suggest programs for 655–805. Remind: some schools don\'t accept online GMAT; valid passport needed for exam. Help with LinkedIn/resume review.',
      'financial-aid': 'Financial Aid. Scholarships, assistantships, fellowships. Draft appeal letters. Compare funding across programs.',
      'study-planner': 'Study Planner. Weekly schedule generator, daily goals, homework reminders (mba.com mock test).',
      'problems-qa': 'Problems & Q&A. Pari is sharing challenges. Be empathetic, solution-focused. Acknowledge feelings, offer practical advice.',
      'past-papers': 'Past Papers Analysis. Question type patterns, difficulty trends, year-by-year focus. Tailor insights for Pari\'s 695–705 target.',
      'guided-practice': 'Guided Practice. Pari is working through a problem step-by-step. She asked for a HINT. Give a helpful hint that guides her to the next step WITHOUT revealing the full answer. Be encouraging. Help her reason through it herself.',
      'tracker': 'Score Tracker. Pari is logging scores or asking about progress, problem areas, or targeted practice. Be supportive and data-driven.',
      'video-resources': 'Video Resources. Pari has access to 100 curated GMAT YouTube videos. Help her choose which to watch, incorporate into study plan, or find videos by topic.',
    };
    const tabContext = tabContexts[tab] ? `\n\nCurrent tab: ${tabContexts[tab]}` : tab ? `\n\nCurrent tab: ${tab}. Tailor your response.` : '';
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

// Check YouTube video availability via oEmbed (no API key required)
app.get('/api/youtube/check', async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId || typeof videoId !== 'string') {
      return res.status(400).json({ error: 'videoId required' });
    }
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      return res.json({ available: true, title: data.title, author: data.author_name });
    }
    return res.json({ available: false });
  } catch (err) {
    console.error('YouTube check error:', err);
    return res.json({ available: false });
  }
});

// Batch check multiple video IDs (rate-limited: 5 concurrent, 100ms delay between batches)
app.post('/api/youtube/check-batch', async (req, res) => {
  try {
    const { videoIds } = req.body;
    if (!Array.isArray(videoIds) || videoIds.length > 100) {
      return res.status(400).json({ error: 'videoIds array required (max 100)' });
    }
    const results = {};
    const BATCH_SIZE = 5;
    const DELAY_MS = 100;
    for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
      const batch = videoIds.slice(i, i + BATCH_SIZE);
      const promises = batch.map(async (id) => {
        try {
          const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
          const resp = await fetch(url);
          if (resp.ok) {
            const data = await resp.json();
            return { id, available: true, title: data.title };
          }
          return { id, available: false };
        } catch {
          return { id, available: false };
        }
      });
      const batchResults = await Promise.all(promises);
      batchResults.forEach((r) => { results[r.id] = r.available; });
      if (i + BATCH_SIZE < videoIds.length) await new Promise((r) => setTimeout(r, DELAY_MS));
    }
    res.json(results);
  } catch (err) {
    console.error('YouTube batch check error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve static files and SPA fallback only if client/dist exists
if (fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist, { index: 'index.html' }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(503).send('App not built. Ensure build:render runs: npm run build:render');
  });
}

app.listen(PORT, () => {
  console.log(`Pari's MBA Coach API running on port ${PORT}`);
  if (!fs.existsSync(path.join(clientDist, 'index.html'))) {
    console.warn('client/dist not found. Build client first: npm run build:render');
  }
});
