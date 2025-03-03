// Import necessary libraries
import React, { useState, useEffect } from "react";
import words from "../data/words.json";
import { createRootRoute } from "@tanstack/react-router";

// Define the WordCard component
const WordFlashCard: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [showIgbo, setShowIgbo] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Function to get a random word from the list
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Effect to handle the countdown
  useEffect(() => {
    if (countdown === 0) {
      setShowIgbo(true);
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="max-w-sm mx-auto p-16 border rounded shadow-lg text-center cursor-pointer gap-8 
        flex flex-col items-center justify-center"
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
    </div>
  );
};

export default WordFlashCard;

export const Route = createRootRoute({
  component: WordFlashCard,
});
