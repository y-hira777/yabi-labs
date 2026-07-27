type Props = {
  message?: string;
};

export function EmptyState({ message = "記事はまだありません" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-24 text-center">
      <span className="mb-5 flex h-12 w-12 rotate-3 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] font-mono text-lg font-black">
        0
      </span>
      <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
        No records found
      </p>
      <p className="text-sm font-medium text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
}
