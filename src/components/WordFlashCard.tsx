// Import necessary libraries
import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { createRootRoute } from "@tanstack/react-router";
import words from "../data/words.json";
import { useMouseHold } from "@/hooks/useMouseHold.hook";

// Define the WordCard component
const WordFlashCard: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [showIgbo, setShowIgbo] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Function to get a random word from the list
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

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
      setCurrentWord(getRandomWord());
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

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center h-screen bg-primary gap-2"
    >
      <div
        className={clsx(
          "max-w-sm mx-auto py-16 px-8 border rounded shadow-lg text-center cursor-pointer gap-8 relative",
          "flex flex-col items-center justify-center rounded-lg shadow-lg min-w-64 border-2 border-gray-700 select-none",
          backgroundColor
        )}
        onClick={handleCardClick}
      >
        <h2 className="text-3xl font-bold">{currentWord.english}</h2>
        {showIgbo ? (
          <p className="text-3xl mt-2">{currentWord.igbo}</p>
        ) : (
          <p className="text-lg mt-2 text-gray-500">
            Revealing in {countdown}...
          </p>
        )}
      </div>
      <div className="h-8 px-4 py-2 bg-black text-white flex items-center justify-center">
        {currentWord.category}
      </div>
    </div>
  );
};

export default WordFlashCard;

export const Route = createRootRoute({
  component: WordFlashCard,
});
