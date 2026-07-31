type Props = {
  title: string;
  description?: string;
  prompt?: string;
};

export function PageHeader({ title, description, prompt = "~" }: Props) {
  return (
    <div className="border-b-2 border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl border-x-0 border-[var(--color-border)] px-4 py-12 sm:px-6 sm:py-16 lg:border-x-2 lg:px-10 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
              Archive / {prompt}
            </p>
            <h1 className="font-sans text-5xl font-black leading-none tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              {title}
              <span className="text-[var(--color-accent-violet)]">.</span>
            </h1>
          </div>
          {description && (
            <p className="max-w-sm border-l-2 border-[var(--color-border)] pl-4 text-sm font-medium leading-7 text-[var(--color-text-secondary)] sm:mb-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
