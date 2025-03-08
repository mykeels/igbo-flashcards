import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Word } from "./types";
export const FeedbackButton = ({
  backgroundColor,
  word,
}: {
  backgroundColor: string;
  word: Word;
}) => {
  const giveFeedback = () => {
    const context = [
      location.href,
      "",
      `Part of Speech: ${word.category}`,
      "",
      `${word.english} => ${word.igbo}`,
      "",
      word.examples
        .map((example) => `- ${example.english} => ${example.igbo}`)
        .join("\n"),
      "",
      "",
    ].join("\n");
    navigator.clipboard.writeText(context);
    alert(
      "Context copied to clipboard. Please submit it to help us improve the app."
    );
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeQ00Tb144rwK7PxPRIIL4ohYt0uyaAuqVHUfDjg6ikJobHoQ/viewform?usp=dialog",
      "_blank"
    );
  };
  return (
    <motion.button
      type="button"
      className={clsx(
        "text-black px-2.5 py-2 rounded-md border-2 border-gray-700",
        backgroundColor
      )}
      onClick={() => giveFeedback()}
      title="Give Feedback"
    >
      <img src="/feedback.png" alt="feedback" className="w-12" />
    </motion.button>
  );
};
