'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { deleteList } from '@/app/learn/actions';
import { useTransition } from 'react';

type VocabListItemProps = {
  list: {
    id: string;
    title: string;
    description: string | null;
  };
};

export const VocabListItem: FC<VocabListItemProps> = ({ list }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
      startTransition(async () => {
        const result = await deleteList(list.id);
        if (result?.error) {
          alert(`Error: ${result.error}`);
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
      <Link href={`/learn/${list.id}`} className="flex-grow hover:underline">
        <div>
          <h3 className="font-bold">{list.title}</h3>
          {list.description && (
            <p className="text-sm text-muted-foreground">{list.description}</p>
          )}
        </div>
      </Link>
      <div className="flex gap-2">
        <Link href={`/learn/${list.id}/edit`} className="p-2 hover:bg-muted rounded">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 rounded"
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};
