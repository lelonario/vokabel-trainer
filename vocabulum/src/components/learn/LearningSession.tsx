'use client';

import { useState } from 'react';
import { Flashcard } from './Flashcard';

type WordFromDB = {
  id: number;
  list_id: number;
  term: string;
  translation: string;
  created_at: string;
};

type ListFromDB = {
  id: string;
  // ... other list properties
};

type LearningSessionProps = {
  words: WordFromDB[];
};

export const LearningSession: React.FC<LearningSessionProps> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(() => [...words].sort(() => Math.random() - 0.5));

  const currentWord = shuffledWords[currentWordIndex];

  const handleAssessment = (knewIt: boolean) => {
    // Here you would add logic to update the word's spaced repetition data.
    // For now, we just move to the next word.
    console.log(`User knew word '${currentWord.term}': ${knewIt}`);

    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      alert("You've completed the list!");
      setCurrentWordIndex(0);
      setShuffledWords([...words].sort(() => Math.random() - 0.5));
    }
  };

  if (!currentWord) {
    return <p>This list has no words to learn.</p>;
  }

  return (
    <div>
      <div className="text-center my-4">
        <p>Progress: {currentWordIndex + 1} / {shuffledWords.length}</p>
      </div>

      <Flashcard word={currentWord} />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAssessment(false)}
          className="p-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
        <button
          onClick={() => handleAssessment(true)}
          className="p-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          I Knew It
        </button>
      </div>
    </div>
  );
};
