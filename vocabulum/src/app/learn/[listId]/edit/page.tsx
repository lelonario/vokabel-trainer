import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { EditListForm } from '@/components/forms/EditListForm';

type EditListPageProps = {
  params: {
    listId: string;
  };
};

export default async function EditListPage({ params }: EditListPageProps) {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  const { data: list, error: listError } = await supabase
    .from('lists')
    .select('*')
    .eq('id', params.listId)
    .single();

  if (listError || !list) {
    notFound();
  }

  if (list.user_id !== session.user.id) {
    // Or show a more specific "forbidden" page
    notFound();
  }

  const { data: languages, error: languagesError } = await supabase
    .from('languages')
    .select('*');

  if (languagesError) {
    return <p>Error loading languages: {languagesError.message}</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Edit List</h1>
      <EditListForm list={list} languages={languages || []} />
    </div>
  );
}
