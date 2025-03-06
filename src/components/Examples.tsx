import { clsx } from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";

export const Examples = ({
  examples,
  backgroundColor,
}: {
  examples: {
    english: string;
    igbo: string;
  }[];
  backgroundColor: string;
}) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const slices = examples.slice(0, showMore ? examples.length : 1);
  return (
    <div
      className="flex flex-col gap-2 text-black font-semibold text-center"
    >
      {slices.map((example, index) => (
        <motion.div
          key={example.english}
          className={clsx("px-4 py-2 border-2 border-gray-700 rounded-md relative", backgroundColor)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
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
