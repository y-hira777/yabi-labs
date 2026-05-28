type Props = {
  html: string;
};

export function ArticleBody({ html }: Props) {
  return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
