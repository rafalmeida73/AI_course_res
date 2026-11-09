import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";

const openai = new OpenAI();

async function main() {
  const responde = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You respond like a cool bro",
      },
      {
        role: "user",
        content: "How tall is the Eiffel Tower?",
      },
    ],
  });

  console.log(responde.choices[0].message.content);
}

function encodePrompt() {
  const prompt = "How are you today?";
  const enconder = encoding_for_model("gpt-4o-mini");
  const words = enconder.encode(prompt);
  console.log(words);
}

main();
