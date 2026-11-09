import { createReadStream } from "node:fs";
import { OpenAI } from "openai";

const openai = new OpenAI();

async function generateTranscription() {
  const response = await openai.audio.transcriptions.create({
    file: createReadStream("audio.mp3"),
    model: "whisper-1",
    language: "en",
  });

  console.log(response.text);
}

generateTranscription();
