<template #introduction>

:::info
La Loongson XB612B0_V1.2 est une carte mère de bureau au format mATX (244 × 244 mm) basée sur le processeur Loongson 3B6000.

Cette carte mère peut être équipée de différents processeurs 3B6000, notamment des modèles à 8, 12 ou 16 cœurs (16, 24 ou 32 threads), et prend en charge la mémoire ECC enregistrée. Elle dispose également de deux interfaces m.2 NVMe (PCIe 3.0 x4) 2280, ce qui en fait la carte mère basée sur Loongson offrant le plus grand nombre d'emplacements NVMe intégrés actuellement disponibles.

Par rapport au [AC612A0_V1.1](/en/devices/loongson-ac612a0-v1.1.md) Basée sur le processeur Loongson 3C6000/S, la carte mère XB612B0_V1.2 dispose de deux emplacements mémoire et d'une interface PCIe 3.0 x8 en moins. Toutefois, compte tenu de son format relativement compact, cette carte mère offre tout de même un ensemble de fonctionnalités et une évolutivité remarquables, et présente un meilleur rapport qualité-prix pour les particuliers.
:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Loongson Technology |
Format : mATX (244 × 244 mm)
| Processeur | 3B6000 (8/12/16 cœurs) à 2,3/2,2/2,1 GHz |
| Mémoire | DDR4 à 3200 MT/s (2 × DIMM), compatible RECC |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16, 1 × PCIe 3.0 x8 |
| Interfaces (USB) | USB 3.0 (2 × sur la carte mère, 2 × en façade), USB 2.0 (2 × sur la carte mère, 4 × en façade) |
| Interfaces (stockage) | 2 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (réseau) | 2 × GbE |
| Interfaces (vidéo) | 1 × HDMI, 1 × VGA |
| Interfaces (autres) | 1 interface M.2 Key E (PCIe + USB), 1 jeu d'interfaces 3,5 mm (entrée, sortie, entrée ligne), 1 port série RS-232 (DB-9) |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-xb612b0-v1.2.thumbnail.webp)](/images/devices/loongson-xb612b0-v1.2.webp)
Source : Xi Ruoyao

</template>
