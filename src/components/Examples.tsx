import { clsx } from "clsx";
import { useState } from "react";

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
  return (
    <div
      className="flex flex-col gap-2 text-black font-semibold text-center"
      onClick={toggleShowMore}
    >
      {examples.slice(0, showMore ? examples.length : 1).map((example) => (
        <div
          key={example.english}
          className={clsx("px-4 py-2 border border-black", backgroundColor)}
        >
          <p>{example.english}</p>
          <p>{example.igbo}</p>
        </div>
      ))}
    </div>
  );
};
