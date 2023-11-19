import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

let model;
let memory;
let chain;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { input, firstMsg } = req.body;

    if (!input) throw new Error('no input was provided');

    if (firstMsg) {
      console.log('iitializing chain');
      model = new OpenAI();
      memory = new BufferMemory();
      chain = new ConversationChain({
        llm: model,
        memory,
      });
    }

    const response = await chain.call({ input });

    console.log('prompt input: ', input);
    console.log('prompt output: ', response);

    return res.status(200).json({ output: response });
  } else {
    res.status(45).json({ message: 'Only POST is allowed' });
  }
}
