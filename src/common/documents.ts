// Each family contains releases of one independently versioned document.
// Keep section and family IDs stable when adding new releases.
export const documentSections = [
  {
    id: "unofficial-loongarch-reference-manual",
    titleKey: "documentsUnofficialReferenceManual",
    families: [
      {
        id: "unofficial-loongarch-reference-manual-volume-ii-a",
        downloads: [
          "reference-manual-unofficial-loongarch-reference-manual-v1.11",
        ],
      },
    ],
  },
  {
    id: "loongson-cpu-system-architecture",
    titleKey: "documentsSystemArchitecture",
    families: [
      {
        id: "loongson-cpu-system-architecture-pc-server",
        downloads: [
          "reference-manual-loongson-system-architecture-pc-server-v4.3",
        ],
      },
      {
        id: "loongson-cpu-system-architecture-embedded",
        downloads: [
          "reference-manual-loongson-system-architecture-embedded-v1.1",
        ],
      },
    ],
  },
  {
    id: "loongarch-reference-manual",
    titleKey: "documentsReferenceManual",
    families: [
      {
        id: "loongarch-reference-manual-volume-i",
        downloads: ["reference-manual-loongarch-volume-i-v1.11"],
      },
      {
        id: "loongarch-reference-manual-la32-reduced",
        downloads: ["reference-manual-loongarch-la32-reduced-v1.04"],
      },
    ],
  },
] as const
