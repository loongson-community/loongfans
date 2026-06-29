import { createContentLoader } from "vitepress"
export default createContentLoader("**/news/**/*.md", {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform: (data) =>
    data.map((item) => ({
      ...item,
      category: item.url.split("/").at(-2) || "others",
      localeIndex: item.url.startsWith("/news")
        ? "root"
        : item.url.split("/")[1],
    })),
})
