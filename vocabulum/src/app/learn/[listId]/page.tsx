import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { LearningSession } from '@/components/learn/LearningSession';

type LearnListPageProps = {
  params: {
    listId: string;
  };
};

export default async function LearnListPage({ params }: LearnListPageProps) {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  // Fetch the list and its words
  const { data: list, error: listError } = await supabase
    .from('lists')
    .select(`
      id,
      title,
      description,
      is_public,
      user_id,
      words (
        id,
        list_id,
        term,
        translation,
        created_at
      )
    `)
    .eq('id', params.listId)
    .single();

  if (listError || !list) {
    notFound();
  }

  // Check if the user is authorized to view this list
  if (!list.is_public && list.user_id !== session.user.id) {
    notFound();
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">{list.title}</h1>
        {list.description && <p className="text-muted-foreground">{list.description}</p>}
      </div>
      <LearningSession list={list} words={list.words} />
    </div>
  );
}
