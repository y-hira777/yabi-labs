type Props = {
  title: string;
  description?: string;
  prompt?: string;
};

export function PageHeader({ title, description, prompt = "~" }: Props) {
  return (
    <div className="border-b border-[var(--color-border)] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-stretch gap-5">
          <div className="w-px bg-[var(--color-accent-cyan)]/30 shrink-0" />
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-widest text-[var(--color-accent-cyan)] uppercase">
              {prompt}
            </p>
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
      </div>
    </div>
  );
}
