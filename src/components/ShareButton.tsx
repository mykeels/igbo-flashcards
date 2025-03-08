import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Word } from "./types";
export const ShareButton = ({
  backgroundColor,
  word,
}: {
  backgroundColor: string;
  word: Word;
}) => {
  const canShare = typeof navigator.share !== "undefined";
  const share = () => {
    const context = [
      "",
      `Part of Speech: ${word.category}`,
      "",
      `${word.english} => ${word.igbo}`,
      "",
      "Examples:",
      word.examples
        .map((example) => `- ${example.english} => ${example.igbo}`)
        .join("\n"),
      "",
      "",
    ].join("\n");
    navigator.clipboard.writeText(context);
    if (navigator.share) {
      navigator
        .share({
          title: "Igbo Flashcards - Learn 200+ Igbo words and phrases",
          text: context,
          url: location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Context copied to clipboard!");
    }
  };
  return canShare ? (
    <motion.button
      type="button"
      className={clsx(
        "text-black px-2.5 py-2 rounded-md border-2 border-gray-700",
        backgroundColor
      )}
      onClick={() => share()}
      title="Share"
    >
      <img src="./share.png" alt="share" className="w-12" />
    </motion.button>
  ) : null;
};
