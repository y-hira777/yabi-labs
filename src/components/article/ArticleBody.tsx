import { convertMarkdownTables } from "@/lib/content/markdownTables";

type Props = {
  html: string;
};

export function ArticleBody({ html }: Props) {
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: convertMarkdownTables(html) }}
    />
  );
}
