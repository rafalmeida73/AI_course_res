import { OpenAI } from "openai";

const openai = new OpenAI();

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are a helpful chatbot",
  },
];

async function createChatCompletion() {
  const respnse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: context,
  });

  const responseMessage = respnse.choices[0].message;

  context.push({
    role: "assistant",
    content: responseMessage?.content || "",
  });

  console.log(
    `${respnse.choices[0].message.role}: ${respnse.choices[0].message.content}`,
  );
}

process.stdin.addListener("data", async (input) => {
  const userInput = input.toString().trim();

  context.push({
    role: "user",
    content: userInput,
  });

  await createChatCompletion();
});
