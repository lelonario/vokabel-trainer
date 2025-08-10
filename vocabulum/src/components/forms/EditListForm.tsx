'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateList } from '@/app/learn/actions';

type Language = {
  id: number;
  name: string;
  code: string;
};

type List = {
  id: string;
  title: string;
  description: string | null;
  language_id: number;
};

type EditListFormProps = {
  list: List;
  languages: Language[];
};

export const EditListForm: React.FC<EditListFormProps> = ({ list, languages }) => {
  const [title, setTitle] = useState(list.title);
  const [description, setDescription] = useState(list.description || '');
  const [languageId, setLanguageId] = useState(list.language_id);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await updateList(list.id, {
        title,
        description,
        language_id: languageId,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/learn');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-input"
          required
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-input"
          rows={3}
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="language" className="block text-sm font-medium mb-1">
          Language
        </label>
        <select
          id="language"
          value={languageId}
          onChange={(e) => setLanguageId(Number(e.target.value))}
          className="w-full p-2 border rounded bg-input"
          required
          disabled={isPending}
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};
