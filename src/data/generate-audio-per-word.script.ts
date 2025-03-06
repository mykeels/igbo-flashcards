import fs from "fs";
import path from "path";
import { $ } from "bun";
import words from "./words.json";

const sayToMp3 = path.join(__dirname, "../../scripts/say-to-mp3.sh");

for (const word of words) {
  const { filePath, fileName } = getFilePath(
    word.english,
    word.category,
    "english"
  );
  await $`${sayToMp3} -o ${filePath} ${word.english}`;
  for (const example of word.examples) {
    const { filePath } = getFilePath(
      example.english,
      word.category,
      "english",
      `${fileName}/examples`
    );
    await $`${sayToMp3} -o ${filePath} ${example.english}`;
  }
}

function getFilePath(
  text: string,
  category: string,
  language: string,
  folder?: string
) {
  const getFileName = (text: string) =>
    text
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  const fileName = getFileName(text);
  const filePath = path.join(
    __dirname,
    "audio",
    category.toLowerCase(),
    folder || fileName,
    `${fileName}.${language}.mp3`
  );
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  return { filePath, fileName };
}
