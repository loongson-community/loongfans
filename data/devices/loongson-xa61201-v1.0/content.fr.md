<template #introduction>

:::info
La Loongson XA61201_v1.0 est une carte mère de bureau au format DTX (203 × 244 mm) basée sur le processeur Loongson 3A6000-HV.

Par rapport au [XA61200](/en/devices/loongson-xa61200), la carte mère XA61201 :

- Prend en charge la mémoire ECC
- L'emplacement PCIe 3.0 x8 situé au troisième emplacement a-t-il été remplacé par une interface PCIe 3.0 x16 (8 voies) ?

:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Loongson Technology |
| Format | DTX (203 × 244 mm) |
| Processeur | 3A6000-HV à 2,5 GHz |
| Mémoire | DDR4 à 3200 MT/s (2 × barrettes DIMM), compatible ECC† |
| Interfaces (PCIe) | 2 × PCIe 3.0 x16 (8 voies), 1 × PCIe 3.0 x4 (4 voies) |
| Interfaces (USB) | USB 3.0 (2 ports intégrés, 2 ports en façade), USB 2.0 (2 ports intégrés, 4 ports en façade) |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (réseau) | Un port Gigabit Ethernet |
| Interfaces (vidéo) | 1 × HDMI, 1 × VGA |
| Interfaces (Autres) | 1 × interface m.2 Key E (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 jeu d'interfaces 3,5 mm (entrée, sortie, entrée ligne), 1 × port série RS-232 (DB-9) |

† : La prise en charge de la mémoire ECC par cette carte mère n'est pas clairement établie à l'heure actuelle. On ignore également si elle prend en charge la mémoire ECC enregistrée. Les informations DMI ne mentionnent pas non plus d'interface mémoire de 72 bits.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61201-v1.0.thumbnail.webp)](/images/devices/loongson-xa61201-v1.0.webp)
Source : « Manuel d'utilisation de la carte mère XA61201, version 1.0 »

</template>
