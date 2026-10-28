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
        downloads: [
          "reference-manual-loongarch-volume-i-v1.11",
          "reference-manual-loongarch-volume-i-v1.10-zh",
        ],
      },
      {
        id: "loongarch-reference-manual-volume-i-en",
        downloads: ["reference-manual-loongarch-volume-i-v1.10-en"],
      },
      {
        id: "loongarch-reference-manual-la32-reduced",
        downloads: ["reference-manual-loongarch-la32-reduced-v1.04"],
      },
    ],
  },
  {
    id: "loongarch-software-specifications",
    titleKey: "documentsSoftwareSpecifications",
    families: [
      {
        id: "loongarch-abi",
        downloads: ["reference-manual-loongarch-abi-v2.50-en"],
      },
      {
        id: "loongarch-elf-abi",
        downloads: [
          "reference-manual-loongarch-elf-abi-v2.01-zh",
          "reference-manual-loongarch-elf-abi-v2.01-en",
        ],
      },
      {
        id: "loongarch-toolchain-conventions",
        downloads: [
          "reference-manual-loongarch-toolchain-conventions-v1.00-zh",
        ],
      },
      {
        id: "loongarch-toolchain-conventions-en",
        downloads: [
          "reference-manual-loongarch-toolchain-conventions-v1.2-en",
          "reference-manual-loongarch-toolchain-conventions-v1.00-en",
        ],
      },
      {
        id: "loongarch-softdev-convention",
        downloads: ["reference-manual-loongarch-softdev-convention-v0.2-en"],
      },
      {
        id: "loongarch-processor-smbios",
        downloads: ["reference-manual-loongarch-processor-smbios-v1.00-en"],
      },
    ],
  },
  {
    id: "loongson-chip-user-manuals",
    titleKey: "documentsChipUserManuals",
    families: [
      {
        id: "loongson-3a5000-user-manual",
        downloads: [
          "user-manual-loongson-3a5000-v1.03-zh",
          "user-manual-loongson-3a5000-v1.03-en",
        ],
      },
      {
        id: "loongson-7a1000-user-manual",
        downloads: [
          "user-manual-loongson-7a1000-v2.00-zh",
          "user-manual-loongson-7a1000-v2.00-en",
        ],
      },
    ],
  },
] as const
