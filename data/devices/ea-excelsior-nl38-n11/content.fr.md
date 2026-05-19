<template #introduction>

:::info
L'EA EXCELSIOR NL38-N11 est un ordinateur portable de 14 pouces équipé d'un processeur Loongson 3A6000. Pesant environ 1,4 kg, le NL38-N11 est équipé d'un écran de 2240 × 1400 (2,2K) ou 1920 × 1200 (WUXGA), de nombreux ports et offre une autonomie d'environ 3 à 4 heures.

D'autres constructeurs ont également lancé des modèles dérivés inspirés de ce concept.
:::

</template>

<template #spec>

| Catégorie | Spécifications |
| ---- | ---- |
| Fabricant | Vers le haut |
| Également connu sous le nom de | IPASON LL300, GEIT UT6500-LA6 |
| Processeur | 3A6000 à 2,0 GHz |
| Écran | 14 pouces, 2240 × 1400 (2,2K) ou 1920 × 1200 (WUXGA) |
| Poids | 1,4 kg |
| Mémoire | DDR4 à 3200 MT/s (1 × SODIMM), pas de mémoire intégrée |
| Interfaces (USB) | 2 × USB 3.0, 2 × USB-C† |
| Interfaces (stockage) | 1 × NVMe (PCIe 3.0 x4) |
| Interfaces (réseau) | Un port Gigabit Ethernet |
| Interfaces (vidéo) | une sortie HDMI |
| Interfaces (Autres) | 1 prise jack 3,5 mm pour casque/micro, 1 caméra 720p |

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

![](/images/devices/ea-excelsior-nl38-n11.webp)
Source : [Site officiel d'EA EXCELSIOR](https://eaecis.com/cp_95/962.html)

</template>
