const codePenPattern = /(?:<p>\s*)?\[\[codepen:([\w-]+)\/([\w-]+)\]\](?:\s*<\/p>)?/g;

export function convertEmbeds(html: string) {
  return html.replace(codePenPattern, (_match, user: string, slug: string) => {
    const src = `https://codepen.io/${user}/embed/${slug}?default-tab=css%2Cresult&theme-id=dark`;

    return `<iframe class="codepen-embed" height="520" style="width:100%;border:0;border-radius:10px;margin:2em 0;display:block;" loading="lazy" allowfullscreen src="${src}" title="CodePen ${user}/${slug}"></iframe>`;
  });
}
