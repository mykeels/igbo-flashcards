import fs from "fs";
import path from "path";
import axios from "axios";
import { $ } from "bun";
import words from "./words.json";
import dotenv from "dotenv";

dotenv.config();

const sayToMp3 = path.join(__dirname, "../../scripts/say-to-mp3.sh");
const wavToMp3 = path.join(__dirname, "../../scripts/wav-to-mp3.sh");

for (const word of words) {
  const { filePath: englishFilePath, fileName: englishFileName } = getFilePath(
    word.english,
    word.category,
    "english"
  );
  const { filePath: igboFilePath } = getFilePath(
    word.english,
    word.category,
    "igbo"
  );
  if (!fs.existsSync(englishFilePath)) {
    await $`${sayToMp3} -o ${englishFilePath} ${word.english}`;
  }
  if (!fs.existsSync(igboFilePath)) {
    const res = await axios.post(
      `https://api.spi-tch.com/v1/speech`,
      {
        text: word.igbo,
        voice: "obinna",
        language: "ig",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SPI_TCH_API_KEY}`,
        },
        responseType: "stream",
      }
    );
    const igboFilePathWav = igboFilePath.replace(".mp3", ".wav");
    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(igboFilePathWav);
      res.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    await $`bash ${wavToMp3} ${igboFilePathWav}`;
  }
  await Promise.all(
    word.examples.map(async (example) => {
      const { filePath: englishExampleFilePath } = getFilePath(
        example.english,
        word.category,
        "english",
        `${englishFileName}/examples`
      );
      if (!fs.existsSync(englishExampleFilePath)) {
        await $`${sayToMp3} -o ${englishExampleFilePath} ${example.english}`;
      }

      const { filePath: igboExampleFilePath } = getFilePath(
        example.english,
        word.category,
        "igbo",
        `${englishFileName}/examples`
      );
      const igboExampleFilePathWav = igboExampleFilePath.replace(
        ".mp3",
        ".wav"
      );
      if (!fs.existsSync(igboExampleFilePath)) {
        const res = await axios.post(
          `https://api.spi-tch.com/v1/speech`,
          {
            text: example.igbo,
            voice: "obinna",
            language: "ig",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.SPI_TCH_API_KEY}`,
            },
            responseType: "stream",
          }
        );
        await new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(igboExampleFilePathWav);
          res.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
        await $`bash ${wavToMp3} ${igboExampleFilePathWav}`;
      }
    })
  );
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
    "../../public/audio",
    category.toLowerCase(),
    folder || fileName,
    `${fileName}.${language}.mp3`
  );
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  return { filePath, fileName };
}
