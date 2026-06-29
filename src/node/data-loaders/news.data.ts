import { createContentLoader } from "vitepress"
export default createContentLoader("news/**/*.md", {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform: (data) =>
    Object.groupBy(data, (item) => item.url.split("/").at(-2) || "others"),
})
