<template #introduction>

:::info
L'EA EXCELSIOR NL60R-N17 est un ordinateur portable de 14 pouces équipé d'un processeur Loongson 3B6000M. Pesant environ 1,35 kg, le NL60R-N17 est équipé d'un écran de 2880×1800 (2,8K) ou 1920 × 1200 (WUXGA), de nombreux ports et offre une autonomie d'environ 2 à 4 heures.

:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Vers le haut |
| Processeur | 3B6000M à 2,4 GHz |
| Écran | 14 pouces, 2240 × 1400 (2,2K) ou 1920 × 1200 (WUXGA) |
| Poids | 1,35 kg |
| Mémoire | DDR4 à 3200 MT/s (1 × SODIMM), pas de mémoire intégrée |
| Interfaces (USB) | 2 × USB 3.0, 3 × USB-C† |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4), 1 × NVMe (PCIe 3.0 x1) |
| Interfaces (réseau) | Un port Gigabit Ethernet |
| Interfaces (vidéo) | une sortie HDMI |
| Interfaces (Autres) | 1 prise jack 3,5 mm pour casque/micro, 1 caméra 1080p |

† : Seule l'une des deux interfaces USB-C peut être utilisée pour la recharge.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/touchpad-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/loonggpu-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/smcv1-issue-in-abi2.md -->

### Consommation électrique élevée du système

Cet ordinateur portable utilise la technologie AVS (Adaptive Voltage Scaling) plutôt que le système complet DVFS (Dynamic Voltage and Frequency Scaling) pour économiser l'énergie (et la plage de réglage de la tension est assez limitée). Par conséquent, lorsque la fréquence est réduite, la consommation électrique du processeur ne diminue que légèrement et l'autonomie globale de la batterie reste insatisfaisante.

</template>

<template #image>

![](/images/devices/ea-excelsior-nl60r-n17.webp)

</template>
