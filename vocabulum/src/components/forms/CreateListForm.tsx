'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client'; // We need a client-side client
import { useRouter } from 'next/navigation';

type Language = {
  id: number;
  name: string;
  code: string;
};

type CreateListFormProps = {
  languages: Language[];
};

export const CreateListForm: React.FC<CreateListFormProps> = ({ languages }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languageId, setLanguageId] = useState<number | ''>(languages[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to create a list.');
      setLoading(false);
      return;
    }

    if (!languageId) {
      setError('Please select a language.');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('lists').insert({
      title,
      description,
      language_id: languageId,
      user_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      // Redirect to the learn page on success
      router.push('/learn');
    }
    setLoading(false);
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        >
          <option value="" disabled>Select a language</option>
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
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create List'}
      </button>
    </form>
  );
};
