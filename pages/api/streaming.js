import { OpenAI } from 'langchain/llms/openai';

// server side events to implement HTTP long polling
// real-time server to client communication protocol that allows to continuously take updates from back-end i.e all data and push it to front-end withoutng continuously clicking
import SSE from 'express-sse';

const sse = new SSE(); // sets-up continuous stream

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { input } = req.body;

    if (!input) {
      throw new Error('No input');
    }

    // Initialize model
    const chat = new OpenAI({
      streaming: true,
      // object handles each new token by handling & sending it to client to new server sent events
      callbacks: [
        {
          handleLLMNewToken(token) {
            sse.send(token, 'newToken'); // continuously send token back as new tokens
          },
        },
      ],
    });

    // create the prompt
    const prompt = `Create me a short rap about my name and city. Make it funny and punny. Name: ${input}`;
    console.log({ prompt });

    // call frontend to backend
    chat.call(prompt).then(() => {
      sse.send(null, 'end');
    });

    return res.status(200).json({ result: 'Streaming complete' });
  } else if (req.method === 'GET') {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
