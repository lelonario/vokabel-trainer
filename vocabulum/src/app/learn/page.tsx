import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LanguageTabs } from '@/components/LanguageTabs';
import { VocabListItem } from '@/components/VocabList';
import Link from 'next/link';

// This type can be moved to a types file later if it becomes more complex
type ListFromDB = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  language_id: number;
  is_public: boolean;
  created_at: string;
}

export default async function LearnPage() {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  let lists: ListFromDB[] = [];
  let error = null;

  if (session) {
    const { data, error: queryError } = await supabase
      .from('lists')
      .select('*')
      .or(`user_id.eq.${session.user.id},is_public.eq.true`);

    if (queryError) {
      error = queryError.message;
    } else {
      lists = data || [];
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <LanguageTabs />
        {session && (
           <Link href="/learn/new" className="p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Create List
          </Link>
        )}
      </div>

      {error && <p className="text-red-500">Error fetching lists: {error}</p>}

      {!session && (
        <div className="text-center py-10">
          <p>Please <Link href="/login" className="underline">log in</Link> to see your vocabulary lists.</p>
        </div>
      )}

      {session && lists.length === 0 && !error && (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No vocabulary lists found.</h2>
          <p className="mt-2 text-muted-foreground">
            Get started by creating your first list!
          </p>
          <Link href="/learn/new" className="mt-4 inline-block p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Create Your First List
          </Link>
        </div>
      )}

      {session && lists.length > 0 && (
        <div>
          {lists.map((list) => (
            <VocabListItem key={list.id} list={list} />
          ))}
        </div>
      )}
    </div>
  );
}
