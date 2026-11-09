import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { OpenAI } from "openai";

const openai = new OpenAI();

async function generateFreeImage() {
  const response = await openai.images.generate({
    model: "gpt-image-1-mini",
    prompt:
      "Corsa amarelo com fundo azul, estilo realista, com um homem usando óculos de sol",
    size: "1024x1024",
    quality: "medium",
    n: 1,
  });

  const base64Image = response.data?.[0]?.b64_json;

  if (!base64Image) {
    throw new Error("A API não retornou a imagem em Base64.");
  }

  await writeFile("imagem-gerada.png", Buffer.from(base64Image, "base64"));

  console.log("Imagem salva em imagem-gerada.png");
}

async function generateImageVariation() {
  const response = await openai.images.edit({
    model: "gpt-image-1-mini",
    image: new File(
      [await readFile("imagem-gerada.png")],
      "imagem-gerada.png",
      { type: "image/png" },
    ),
    prompt: "Crie uma variação dessa imagem com fundo vermelho",
    size: "1024x1024",
    quality: "medium",
    n: 1,
  });

  const base64Image = response.data?.[0]?.b64_json;

  if (!base64Image) {
    throw new Error("A API não retornou a imagem em Base64.");
  }

  await writeFile(
    "imagem-gerada-variacao.png",
    Buffer.from(base64Image, "base64"),
  );

  console.log("Imagem de variação salva em imagem-gerada-variacao.png");
}

generateImageVariation();
