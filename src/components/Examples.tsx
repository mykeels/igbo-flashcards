import { clsx } from "clsx";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { sequence } from "@/utils/sound";
import { cleanFileName } from "@/utils/files";

export const Examples = ({
  word,
  backgroundColor,
  shouldSpeak,
}: {
  word: {
    category: string;
    english: string;
    igbo: string;
    examples: {
      english: string;
      igbo: string;
    }[];
  };
  backgroundColor: string;
  shouldSpeak: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const slices = word.examples.slice(0, showMore ? word.examples.length : 1);
  const [playing, setPlaying] = useState<string | null>(null);

  const audio = useRef<Howl | null>(null);
  const speakWord = async (example: { english: string; igbo: string }) => {
    audio.current?.stop();
    audio.current = sequence([
      `/audio/${cleanFileName(word.category)}/${cleanFileName(word.english)}/examples/${cleanFileName(example.english)}.english.mp3`,
      `/audio/${cleanFileName(word.category)}/${cleanFileName(word.english)}/examples/${cleanFileName(example.english)}.igbo.mp3`,
    ]);
    if (shouldSpeak) {
      audio.current?.play();
      setPlaying(example.english);
      await new Promise(resolve => setTimeout(resolve, (audio.current?.duration() || 1) * 1000 * 2));
      setPlaying(null);
    }
    return () => audio.current?.stop();
  }
  return (
    <div
      className="flex flex-col gap-2 text-black font-semibold text-center"
    >
      {slices.map((example, index) => (
        <motion.div
          key={example.english}
          tabIndex={0}
          role="button"
          className={clsx("px-4 py-2 rounded-md relative cursor-pointer", {
            [backgroundColor]: true,
            "border-2 border-gray-700": playing !== example.english,
            "border-4 border-green-700 animate-breathe": playing === example.english,
          })}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => {
            speakWord(example);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              speakWord(example);
            }
          }}
        >
          <p className="italic">{example.english}</p>
          <p>{example.igbo}</p>
          {
            index === slices.length - 1 && (
                <button 
                type="button" 
                className="rounded-full border-2 border-gray-700 absolute -bottom-4 right-0 left-0 mx-auto text-xs w-6 h-6 bg-gray-700 text-white" 
                onClick={() => toggleShowMore()}>
                    {showMore ? "↑" : "⌄"}
                </button>
            )
          }
        </motion.div>
      ))}
    </div>
  );
};
