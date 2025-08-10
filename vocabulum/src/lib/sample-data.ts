import type { VocabList } from '@/types/vocab';

export const sampleVocabLists: VocabList[] = [
  {
    id: '1',
    title: 'Common English Words',
    description: 'The 100 most common words in English.',
    language: 'english',
    words: [
      { german: 'das', translation: 'the' },
      { german: 'sein', translation: 'to be' },
      { german: 'zu', translation: 'to' },
      { german: 'von', translation: 'of' },
      { german: 'und', translation: 'and' },
    ],
  },
  {
    id: '2',
    title: 'Animals',
    description: 'Common animal names in English.',
    language: 'english',
    words: [
      { german: 'der Hund', translation: 'dog' },
      { german: 'die Katze', translation: 'cat' },
      { german: 'der Vogel', translation: 'bird' },
      { german: 'der Fisch', translation: 'fish' },
      { german: 'das Pferd', translation: 'horse' },
    ],
  },
  {
    id: '3',
    title: 'Basic Latin Vocabulary',
    description: 'Essential words for beginners in Latin.',
    language: 'latin',
    words: [
        { german: 'sein', translation: 'esse' },
        { german: 'und', translation: 'et' },
        { german: 'Gott', translation: 'deus' },
        { german: 'König', translation: 'rex' },
        { german: 'sehen', translation: 'videre' },
    ],
  },
];
