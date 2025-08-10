export type Word = {
  german: string;
  translation: string;
};

export type VocabList = {
  id: string;
  title: string;
  description: string;
  language: 'english' | 'latin' | 'spanish';
  words: Word[];
};
