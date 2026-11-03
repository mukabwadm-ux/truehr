export function ContentStatusNotice({ content }: { content: string }) {
  return (
    <p className="container py-4 text-sm text-muted" role="status">
      Supabase is not configured. Connect it to load published {content}.
    </p>
  );
}
