<template #introduction>

:::info
La Loongson AC612A0_V1.1 est une carte mère ATX (244 × 305 mm) pour PC de bureau ou serveur, basée sur le processeur Loongson 3C6000/S.

Cette carte mère est un modèle d'entrée de gamme Loongson 3C6000/S, dotée d'un ensemble relativement complet d'interfaces et prenant en charge les modules de gestion hors bande (BMC) pour l'exploitation et la gestion à distance.
:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Loongson Technology |
| Format | ATX (244 × 305 mm) |
| Processeur | 3C6000/S à 2,0/2,2 GHz |
| Mémoire | DDR4 à 3200 MT/s (4 × barrettes DIMM), compatible RECC |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16, 2 × PCIe 3.0 x8 |
| Interfaces (USB) | USB 3.0 (2 × sur la carte mère, 2 × en façade), USB 2.0 (2 × sur la carte mère, 4 × en façade) |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0, 1 × interface SFF-8654-4i |
| Interfaces (réseau) | 2 × GbE |
| Interfaces (vidéo) | 1 × VGA |
| Interfaces (autres) | 1 × interface pour module BMC†‡, 1 × interface réseau BMC, 1 × interface M.2 Key E (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 jeu d'interfaces 3,5 mm (entrée, sortie), 1 × port série RS-232 (DB-9) |

- † : Prend en charge les modules BMC basés sur l'AST2500 ou le Loongson 2K0500.
- ‡ : Il existe également une version de cette carte mère appelée « composants [réservés] au marché intérieur (chinois) », qui ne dispose pas d'emplacement pour les modules BMC.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/images/devices/loongson-ac612a0-v1.1.webp)
Source : « Fiche technique de la carte mère pour serveur mono-processeur Loongson 3C6000, version 1.0 »

</template>
