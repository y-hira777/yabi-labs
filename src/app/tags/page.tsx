import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { TagBadge } from "@/components/tag/TagBadge";
import { getTags } from "@/lib/microcms/queries";
import type { Tag } from "@/types/tag";
import { SITE_NAME } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Tags | ${SITE_NAME}`,
  description: "タグ一覧",
};

export default async function TagsPage() {
  let tags: Tag[] = [];
  try {
    tags = await getTags();
  } catch {
    // microCMSの認証情報が未設定の場合は空で表示
  }

  return (
    <div>
      <PageHeader prompt="~/tags" title="Tags" description="タグから記事を探す" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {tags.length === 0 ? (
          <EmptyState message="タグはまだありません" />
        ) : (
          <div className="flex flex-wrap gap-2 border-y-2 border-[var(--color-border)] py-8">
            {tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} size="md" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
