type Props = {
  title: string;
  description?: string;
  prompt?: string;
};

export function PageHeader({ title, description, prompt = "~" }: Props) {
  return (
    <div className="border-b border-[var(--color-border)] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="mb-3 font-mono text-xs text-[var(--color-accent-cyan)]">{prompt}</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
