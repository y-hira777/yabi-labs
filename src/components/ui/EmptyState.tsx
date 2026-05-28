type Props = {
  message?: string;
};

export function EmptyState({ message = "記事はまだありません" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs text-[var(--color-accent-cyan)] mb-3">{"// empty"}</p>
      <p className="text-sm text-[var(--color-text-muted)]">{message}</p>
    </div>
  );
}
