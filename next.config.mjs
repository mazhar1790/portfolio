import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async redirects() {
    return [
      // Old PDF link kept floating around (bookmarks, prior deploys, social).
      // Forward to the actual file we ship.
      {
        source: "/Mazhar-Hayat-AI-Architect-CV.pdf",
        destination: "/Mazhar-Hayat-AI-Architect-CV.docx",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
