const CATEGORY_THUMBNAILS: Record<string, string> = {
  ai: "/images/categories/thumbnail-ai.png",
  automation: "/images/categories/thumbnail-automation.png",
  design: "/images/categories/thumbnail-design.png",
  devlog: "/images/categories/thumbnail-devlog.png",
  experiments: "/images/categories/thumbnail-experiments.png",
  frontend: "/images/categories/thumbnail-frontend.png",
  tools: "/images/categories/thumbnail-tools.png",
  wordpress: "/images/categories/thumbnail-wordpress.png",
};

export function getCategoryThumbnail(categorySlug?: string) {
  if (!categorySlug) return undefined;
  return CATEGORY_THUMBNAILS[categorySlug.toLowerCase()];
}
