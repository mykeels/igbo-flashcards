// Import necessary libraries
import React, { useState, useEffect, useMemo } from "react";
import { clsx } from "clsx";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import words from "../data/words.json";
import { useMouseHold } from "@/hooks/useMouseHold.hook";
import { Examples } from "./Examples";
import { speak } from "@/utils/speak";
import { motion } from "framer-motion";
// Define the WordCard component
const WordFlashCard: React.FC = () => {
  const [showIgbo, setShowIgbo] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [shouldSpeak, setShouldSpeak] = useState(false);
  const { currentWord, setNextWord } = useWord({ shouldSpeak });
  const { ref, isHeld } = useMouseHold();

  // Effect to handle the countdown
  useEffect(() => {
    if (isHeld) {
      return;
    }
    if (countdown === 0) {
      setShowIgbo(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, isHeld]);

  // Function to handle card click
  const handleCardClick = () => {
    if (showIgbo) {
      setNextWord();
      setShowIgbo(false);
      setCountdown(3);
    } else {
      setShowIgbo(true);
    }
  };

  const backgroundColor = {
    noun: "bg-blue-300",
    verb: "bg-red-300",
    adjective: "bg-green-300",
    adverb: "bg-yellow-300",
    pronoun: "bg-purple-300",
    preposition: "bg-pink-300",
    conjunction: "bg-gray-300",
  }[currentWord.category.toLowerCase()];

  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center h-screen bg-primary gap-2"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <form method="get" action="/" className="flex flex-row gap-2">
          <motion.select
            name="category"
            className={clsx(
              "w-full max-w-sm text-black border-2 border-gray-700 rounded-md p-2",
              backgroundColor
            )}
            value={currentWord.category.toLowerCase() ?? "all"}
            onChange={(e) => {
              const category = e.target.value;
              navigate(`/?category=${category}`);
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <option value="all">All</option>
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
            <option value="noun">Noun</option>
            <option value="preposition">Preposition</option>
            <option value="pronoun">Pronoun</option>
            <option value="verb">Verb</option>
          </motion.select>
          <motion.button 
            type="button" 
            className={clsx(
              "text-black px-4 py-2 rounded-md border-2 border-gray-700",
              {
                [backgroundColor || 'bg-transparent']: shouldSpeak,
                "bg-gray-300": !shouldSpeak,
              })} 
            onClick={() => setShouldSpeak(!shouldSpeak)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            {shouldSpeak ? "🔈" : "🔇"}
          </motion.button>
        </form>
      </div>
      <motion.div
        className={clsx(
          "max-w-sm mx-auto py-16 px-8 border rounded shadow-lg text-center cursor-pointer gap-8 relative",
          "flex flex-col items-center justify-center rounded-lg shadow-lg min-w-64 border-2 border-gray-700 select-none",
          backgroundColor
        )}
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <h2 className="text-3xl font-bold">{currentWord.english}</h2>
        {showIgbo ? (
          <p className="text-3xl mt-2">{currentWord.igbo}</p>
        ) : (
          <p className="text-lg mt-2 text-gray-500">
            Revealing in {countdown}...
          </p>
        )}
      </motion.div>
      {showIgbo && !!currentWord.examples && (
        <Examples
          examples={currentWord.examples}
          backgroundColor={backgroundColor ?? "bg-gray-300"}
        />
      )}
    </div>
  );
};

export default WordFlashCard;

function useSearch() {
  const [searchParams] = useSearchParams({
    from: "/",
  });
  const search = z
    .object({
      category: z
        .enum([
          "all",
          "adjective",
          "adverb",
          "noun",
          "preposition",
          "pronoun",
          "verb",
        ])
        .optional(),
      word: z.string().optional(),
    })
    .parse(Object.fromEntries(searchParams));
  return search;
}

function useWord({
  shouldSpeak = true,
}: {
  shouldSpeak?: boolean;
}) {
  const search = useSearch();
  const navigate = useNavigate();
  // Function to get a random word from the list
  const getRandomWord = () => {
    const wordSet =
      search.category && search.category !== "all"
        ? words.filter(
          (word) =>
            word.category.toLowerCase() === search.category?.toLowerCase()
        )
        : words;
    return wordSet[Math.floor(Math.random() * wordSet.length)];
  };
  const setNextWord = () => {
    navigate(`/?category=${search.category ?? "all"}&word=${getRandomWord().english}`);
  }
  const currentWord = useMemo(() => {
    return words.find((word) => word.english === search.word) || getRandomWord();
  }, [search.word, search.category]);
  useEffect(() => {
    if (!search.word && !search.category) {
      navigate(`/?category=all&word=${currentWord.english}`, { replace: true });
    } else if (!search.word) {
      navigate(`/?category=${search.category}&word=${currentWord.english}`, { replace: true });
    }
  }, [search?.category, currentWord.english, search.word]);

  useEffect(() => {
    if (shouldSpeak) {
      speak(currentWord.english);
    }
  }, [currentWord.english, shouldSpeak]);

  return {
    currentWord,
    setNextWord,
  }
}
