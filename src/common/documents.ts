// Each family contains releases of one independently versioned document.
// Datasheets, user/register manuals, and industrial variants are separate families.
// Keep section and family IDs stable when adding new releases.
export const documentSections = [
  {
    id: "unofficial-loongarch-reference-manual",
    titleKey: "documentationUnofficialReferenceManual",
    families: [
      {
        id: "unofficial-loongarch-reference-manual-volume-ii-a",
        downloads: [
          "reference-manual-unofficial-loongarch-reference-manual-v1.11",
        ],
      },
      {
        id: "manual-unofficial-loongarch-intrinsics-guide",
        downloads: ["reference-manual-unofficial-loongarch-intrinsics-guide"],
      },
      {
        id: "unofficial-loongarch-quickref",
        downloads: ["reference-manual-unofficial-loongarch-quickref"],
      },
    ],
  },
  {
    id: "unofficial-mips-reference-manual",
    titleKey: "documentationUnofficialMipsReferenceManual",
    families: [
      {
        id: "unofficial-mips-intrinsics-guide",
        downloads: ["reference-manual-unofficial-mips-intrinsics-guide"],
      },
    ],
  },
  {
    id: "loongson-cpu-system-architecture",
    titleKey: "documentationSystemArchitecture",
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
    titleKey: "documentationReferenceManual",
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
    titleKey: "documentationSoftwareSpecifications",
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
    titleKey: "documentationChipUserManuals",
    families: [
      {
        id: "loongson-1c102-user-manual",
        downloads: ["user-manual-loongson-1c102-v1.0-zh"],
      },
      {
        id: "loongson-1c103-user-manual",
        downloads: ["user-manual-loongson-1c103-v1.2-zh"],
      },
      {
        id: "loongson-1c203-user-manual",
        downloads: ["user-manual-loongson-1c203-v1.0-zh"],
      },
      {
        id: "loongson-1d100-user-manual",
        downloads: ["user-manual-loongson-1d100-v1.0-zh"],
      },
      {
        id: "loongson-2k0300-user-manual",
        downloads: ["user-manual-loongson-2k0300-v1.1-zh"],
      },
      {
        id: "loongson-2k0301-user-manual",
        downloads: ["user-manual-loongson-2k0301-v1.0-zh"],
      },
      {
        id: "loongson-2k0500-user-manual",
        downloads: ["user-manual-loongson-2k0500-v1.0-zh"],
      },
      {
        id: "loongson-2k1000la-user-manual",
        downloads: ["user-manual-loongson-2k1000la-v1.0-zh"],
      },
      {
        id: "loongson-2k1500-user-manual",
        downloads: ["user-manual-loongson-2k1500-v1.1-zh"],
      },
      {
        id: "loongson-2k2000-user-manual",
        downloads: ["user-manual-loongson-2k2000-v1.04-zh"],
      },
      {
        id: "loongson-2k3000-3b6000m-user-manual",
        downloads: ["user-manual-loongson-2k3000-3b6000m-v1.0-zh"],
      },
      {
        id: "loongson-2p0300-user-manual",
        downloads: ["user-manual-loongson-2p0300-v1.0-zh"],
      },
      {
        id: "loongson-2p0500-user-manual",
        downloads: ["user-manual-loongson-2p0500-v1.02-zh"],
      },
      {
        id: "loongson-3a5000-user-manual",
        downloads: [
          "user-manual-loongson-3a5000-v1.03-zh",
          "user-manual-loongson-3a5000-v1.03-en",
        ],
      },
      {
        id: "loongson-3a6000-user-manual",
        downloads: ["user-manual-loongson-3a6000-v1.2-zh"],
      },
      {
        id: "loongson-3b6000-user-manual",
        downloads: ["user-manual-loongson-3b6000-v1.0-zh"],
      },
      {
        id: "loongson-3c5000-user-manual",
        downloads: ["user-manual-loongson-3c5000-v1.1-zh"],
      },
      {
        id: "loongson-3c5000l-user-manual",
        downloads: ["user-manual-loongson-3c5000l-v1.2-zh"],
      },
      {
        id: "loongson-3c6000-user-manual",
        downloads: ["user-manual-loongson-3c6000-v1.0-zh"],
      },
      {
        id: "loongson-3d5000-user-manual",
        downloads: ["user-manual-loongson-3d5000-v1.1-zh"],
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
  {
    id: "loongson-chip-datasheets",
    titleKey: "documentationChipDatasheets",
    families: [
      {
        id: "loongson-1c102-datasheet",
        downloads: ["user-manual-loongson-1c102-datasheet-v1.1-zh"],
      },
      {
        id: "loongson-1c103-datasheet",
        downloads: ["user-manual-loongson-1c103-datasheet-v1.2-zh"],
      },
      {
        id: "loongson-1c203-datasheet",
        downloads: ["user-manual-loongson-1c203-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-1d100-datasheet",
        downloads: ["user-manual-loongson-1d100-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-2k0300-datasheet",
        downloads: ["user-manual-loongson-2k0300-datasheet-v1.1-zh"],
      },
      {
        id: "loongson-2k0301-datasheet",
        downloads: ["user-manual-loongson-2k0301-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-2k0500-datasheet",
        downloads: ["user-manual-loongson-2k0500-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-2k1000la-datasheet",
        downloads: ["user-manual-loongson-2k1000la-datasheet-v1.1-zh"],
      },
      {
        id: "loongson-2k1500-datasheet",
        downloads: ["user-manual-loongson-2k1500-datasheet-v1.21-zh"],
      },
      {
        id: "loongson-2k2000-datasheet",
        downloads: ["user-manual-loongson-2k2000-datasheet-v1.05-zh"],
      },
      {
        id: "loongson-2k2000-i-datasheet",
        downloads: ["user-manual-loongson-2k2000-i-datasheet-v1.05-zh"],
      },
      {
        id: "loongson-2k3000-datasheet",
        downloads: ["user-manual-loongson-2k3000-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-2p0300-datasheet",
        downloads: ["user-manual-loongson-2p0300-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-2p0500-datasheet",
        downloads: ["user-manual-loongson-2p0500-datasheet-v1.02-zh"],
      },
      {
        id: "loongson-3a5000-datasheet",
        downloads: ["user-manual-loongson-3a5000-datasheet-v1.7-zh"],
      },
      {
        id: "loongson-3a6000-datasheet",
        downloads: ["user-manual-loongson-3a6000-datasheet-v1.5-zh"],
      },
      {
        id: "loongson-3a6000-i-datasheet",
        downloads: ["user-manual-loongson-3a6000-i-datasheet-v1.3-zh"],
      },
      {
        id: "loongson-3b6000-datasheet",
        downloads: ["user-manual-loongson-3b6000-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-3c5000-datasheet",
        downloads: ["user-manual-loongson-3c5000-datasheet-v1.0-zh"],
      },
      {
        id: "loongson-3c5000l-datasheet",
        downloads: ["user-manual-loongson-3c5000l-datasheet-v1.2-zh"],
      },
      {
        id: "loongson-3c6000-datasheet",
        downloads: ["user-manual-loongson-3c6000-datasheet-v1.1-zh"],
      },
      {
        id: "loongson-3d5000-datasheet",
        downloads: ["user-manual-loongson-3d5000-datasheet-v1.0-zh"],
      },
    ],
  },
] as const
