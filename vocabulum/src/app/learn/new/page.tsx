import { createSupabaseServerClient } from '@/lib/supabase/server';
import { CreateListForm } from '@/components/forms/CreateListForm';
import { redirect } from 'next/navigation';

export default async function NewListPage() {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to login page if user is not authenticated
    redirect('/login');
  }

  const { data: languages, error } = await supabase.from('languages').select('*');

  if (error) {
    // You can render an error message here
    return <p>Error loading languages: {error.message}</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Create a New List</h1>
      <CreateListForm languages={languages || []} />
    </div>
  );
}
