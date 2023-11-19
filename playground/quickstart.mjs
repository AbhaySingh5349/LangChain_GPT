import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { PlanAndExecuteAgentExecutor } from 'langchain/experimental/plan_and_execute';
import { exec } from 'child_process';

// set OPENAI_API_KEY=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;
// set SERPAPI_API_KEY=85c795c5636bf8c3b4bb77064499541a5845b8b9009c0f6f241d8c6f227df7e6;

// $env:OPENAI_API_KEY="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"
// $env:SERPAPI_API_KEY="85c795c5636bf8c3b4bb77064499541a5845b8b9009c0f6f241d8c6f227df7e6"
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
console.log('Welcome to the LangChain Quickstart Module!');

/*
const template =
  'Please give me some ideas for content I should write about regarding {topic}? The content is for {socialplatform}. Translate to {language}.';

const prompt = new PromptTemplate({
  template: template,
  inputVariables: ['topic', 'socialplatform', 'language'],
});

// This allows us to format the template into a string, which is finally passed to the LLM
const formattedTemplate = await prompt.format({
  topic: 'artificial intelligence',
  socialplatform: 'twitter',
  language: 'english',
});

console.log('formattedTemplate: ', formattedTemplate);

// LLM chain: 1. creates prompt template, 2. makes call to openai

const model = new OpenAI({ temperature: 0.9 }); // creating connection with openai model
const chain = new LLMChain({ llm: model, prompt: prompt });

// Now that we've defined the chain, we can call the LLMChain, which does two steps:

// First it properly formats the prompt according to the user input variables

// Then it makes the call to Open AI's API!
const resChain = await chain.call({
  topic: 'artificial intelligence',
  socialplatform: 'twitter',
  language: 'english',
});

console.log({ resChain });

*/

// A chain must be predefined (like configuring a robot) => research => API call => summarize research
// An agent is given a task and tools to search the internet, then it figures out how to do the job.

/*
const agentModel = new OpenAI({
  temperature: 0,
  modelName: 'text-davinci-003',
});

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: 'Dallas,Texas,United States',
    hl: 'en',
    gl: 'us',
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
  agentType: 'zero-shot-react-description',
  verbose: true,
  maxIterations: 5,
});

const input = 'What is Langchain?';
const result = await executor.call({ input });
console.log(`agent output ${result.output}`);
*/

// Plan and Execute Agents (only works with Chat models)

/*
const agentTools = [new Calculator(), new SerpAPI()];

const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
  verbose: true,
});

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
  llm: chatModel,
  tools: agentTools,
});

const result = await executor.call({
  input: `Who is the current president of the United States? What is their current age raised to the second power?`,
});

console.log({ result });
*/

// memory

/*
const llm = new OpenAI({});
const memory = new BufferMemory();
const conversationChain = new ConversationChain({ llm: llm, memory: memory });

const res1 = await conversationChain.call({
  input: 'Hey, my name is Abhay.',
});
console.log(res1);

const res2 = await conversationChain.call({
  input: 'do you remeber my name ?',
});
console.log(res2);
*/
