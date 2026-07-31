import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // public/demos/ 配下の検証用デモページを検索結果に出さない。
        // robots.txt でブロックしないのは意図的。ブロックするとクローラーが
        // ページ本体を取得できず、noindex 指示自体を読めなくなるため
        // （記事からリンクされている以上、URL だけがインデックスされうる）。
        source: "/demos/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
