import { createContentLoader, type ContentData } from "vitepress"

export type NewsData = ContentData & {
  category: string
  localeIndex: string
  baseUrl: string
}

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
      baseUrl: item.url.startsWith("/news")
        ? item.url
        : "/" + item.url.split("/").slice(2).join("/"),
    })),
})
