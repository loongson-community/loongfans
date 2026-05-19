<template #introduction>

:::info
La Loongson XA612B0_v1.0 est une carte mère ATX (244 × 305 mm) pour ordinateur de bureau, basée sur le processeur Loongson 3A6000-HV.

Cette carte mère est la première carte mère 3A6000 commercialisée par Loongson et est généralement considérée comme une carte d'évaluation (EVB).
:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Loongson Technology |
| Format | ATX (244 × 305 mm) |
| Processeur | 3A6000-HV à 2,5 GHz |
| Mémoire | DDR4 à 3200 MT/s (2 × barrettes DIMM), compatible ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (8 voies), 1 × PCIe 3.0 x4 (4 voies) |
| Interfaces (USB) | USB 3.0 (2 ports intégrés, 2 ports en façade), USB 2.0 (2 ports intégrés, 4 ports en façade) |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (réseau) | Un port Gigabit Ethernet |
| Interfaces (vidéo) | 1 × HDMI, 1 × VGA |
| Interfaces (Autres) | 1 jeu d'interfaces 3,5 mm (entrée, sortie, entrée ligne), 1 port série RS-232 (DB-9) |

† : La prise en charge de la mémoire ECC par cette carte mère n'est pas clairement établie à l'heure actuelle. On ignore également si elle prend en charge la mémoire ECC enregistrée. Les informations DMI ne mentionnent pas non plus d'interface mémoire de 72 bits.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

Si vous rencontrez des problèmes similaires, la communauté recommande d'améliorer le refroidissement du boîtier ou de la puce du pont.

</template>

<template #image>

[![](/images/devices/loongson-xa612b0-v1.0.thumbnail.webp)](/images/devices/loongson-xa612b0-v1.0.webp)
Source : « Manuel d'utilisation de la carte mère XA612A0 V1.0 »

</template>
