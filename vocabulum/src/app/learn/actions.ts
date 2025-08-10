'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteList(listId: string) {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { error: 'You must be logged in to delete a list.' };
  }

  // Optional: Check if the user owns the list before deleting
  const { data: list, error: fetchError } = await supabase
    .from('lists')
    .select('user_id')
    .eq('id', listId)
    .single();

  if (fetchError || !list) {
    return { error: 'List not found.' };
  }

  if (list.user_id !== session.user.id) {
    return { error: 'You are not authorized to delete this list.' };
  }

  const { error } = await supabase.from('lists').delete().match({ id: listId });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/learn'); // Re-renders the learn page to show the updated list
  return { success: true };
}

export async function updateList(listId: string, formData: { title: string; description: string; language_id: number; }) {
  const supabase = createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { error: 'You must be logged in to update a list.' };
  }

  // Verify ownership before updating
  const { data: list, error: fetchError } = await supabase
    .from('lists')
    .select('user_id')
    .eq('id', listId)
    .single();

  if (fetchError || !list) {
    return { error: 'List not found.' };
  }

  if (list.user_id !== session.user.id) {
    return { error: 'You are not authorized to edit this list.' };
  }

  const { error } = await supabase
    .from('lists')
    .update({
      title: formData.title,
      description: formData.description,
      language_id: formData.language_id,
    })
    .eq('id', listId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/learn');
  revalidatePath(`/learn/${listId}/edit`);
  return { success: true };
}
