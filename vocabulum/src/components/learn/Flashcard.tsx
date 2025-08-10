'use client';

import { useState } from 'react';

type Word = {
  term: string;
  translation: string;
};

type FlashcardProps = {
  word: Word;
};

export const Flashcard: React.FC<FlashcardProps> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="p-10 border rounded-lg text-center cursor-pointer min-h-[150px] flex items-center justify-center"
      onClick={handleFlip}
    >
      {isFlipped ? (
        <p className="text-xl text-muted-foreground">{word.translation}</p>
      ) : (
        <p className="text-3xl">{word.term}</p>
      )}
    </div>
  );
};
