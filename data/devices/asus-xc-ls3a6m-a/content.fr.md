<template #introduction>

:::info
La carte mère ASUS XC-LS3A6M-A est une carte mère de bureau au format DTX (203 × 244 mm) basée sur le processeur Loongson 3A6000-HV.

Cette carte mère a été conçue et commercialisée par ASUS ; il s'agit de l'une des premières cartes mères Loongson 3A6000 proposées par un fabricant tiers. Elle se distingue du modèle XC-LS3A6M par le déplacement de l'interface M.2 Key E, la conversion de l'interface USB 3.0 intégrée en PCIe x1, la suppression d'un port réseau et une modification de la configuration des ports USB.
:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | ASUS |
| Format | DTX (203 × 244 mm) |
| Processeur | 3A6000-HV à 2,5 GHz |
| Mémoire | DDR4 à 3200 MT/s (2 barrettes DIMM) |
| Interfaces (PCIe) | PCIe 3.0 x1 (x1 voies), PCIe 3.0 x16 (x8 voies), PCIe 3.0 x8 (x8 voies), PCIe 3.0 x8 (x4 voies) |
| Interfaces (USB) | USB 3.0 (2 ports intégrés, 3 ports en façade), USB 2.0 (4 ports intégrés, 1 port en façade) |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Interfaces (réseau) | Un port Gigabit Ethernet |
| Interfaces (vidéo) | 1 × HDMI, 1 × VGA |
| Interfaces (Autres) | 1 port M.2 Key E (PCIe + USB), 1 port mPCIe (PCIe + USB), 1 ensemble de ports 3,5 mm (entrée, sortie, entrée ligne) |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

<!--@include: @parts/en/known-issues/usb-device-lost.md -->

### Absence de mise à jour du micrologiciel

D'après les commentaires des utilisateurs, cette carte mère bénéficie de peu de mises à jour du micrologiciel et présente plusieurs bogues connus :

- Les premières versions du micrologiciel ne proposaient pas la possibilité de désactiver l'émulation x86 UEFI GOP pour les cartes graphiques, ce qui rendait inutilisables les cartes graphiques AMD récentes (série RX 5000 et supérieures) ainsi que les cartes graphiques discrètes Intel.
- Certaines versions du micrologiciel ne transmettent pas de signal d'affichage depuis les cartes graphiques dédiées, tandis que la sortie HDMI intégrée (7A2000) n'affiche qu'un curseur.

</template>

<template #image>

![ASUS XC-LS3A6M-A Face avant](/images/devices/asus-xc-ls3a6m-a.webp)
![ASUS XC-LS3A6M-A E/S](/images/devices/asus-xc-ls3a6m-a-back.webp)
Source : Goofish

</template>
