<template #introduction>

:::info
Das Loongson XA612B0_v1.0 ist ein ATX-Desktop-Motherboard (244 × 305 mm), das auf dem Loongson 3A6000-HV basiert.

Dieses Motherboard ist das erste von Loongson herausgebrachte 3A6000-Motherboard und gilt allgemein als Evaluierungsboard (EVB).
:::

</template>

<template #spec>

| Kategorie | Spezifikation |
| ---- | ---- |
| Hersteller | Loongson Technology |
| Formfaktor | ATX (244 × 305 mm) |
Prozessor: 3A6000-HV mit 2,5 GHz
| Speicher | DDR4 mit 3200 MT/s (2 × DIMM), unterstützt ECC† |
| Schnittstellen (PCIe) | 2 × PCIe 3.0 x16 (8 Lanes), 1 × PCIe 3.0 x4 (4 Lanes) |
| Anschlüsse (USB) | USB 3.0 (2 × auf der Hauptplatine, 2 × an der Vorderseite), USB 2.0 (2 × auf der Hauptplatine, 4 × an der Vorderseite) |
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Schnittstellen (Netzwerk) | 1 × GbE |
| Anschlüsse (Video) | 1 × HDMI, 1 × VGA |
| Anschlüsse (Sonstige) | 1 Satz 3,5-mm-Anschlüsse (Eingang, Ausgang, Line-In), 1 × serielle RS-232-Schnittstelle (DB-9) |

†: Derzeit ist unklar, inwieweit dieses Motherboard ECC-Speicher unterstützt. Es ist ebenfalls unklar, ob es Registered-ECC-Speicher unterstützt. Die DMI-Informationen weisen zudem keine 72-Bit-Speicherschnittstelle aus.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

Sollten bei Ihnen ähnliche Probleme auftreten, empfiehlt die Community, die Kühlung des Gehäuses oder des Brückenchips zu verbessern.

</template>

<template #image>

[![](/images/devices/loongson-xa612b0-v1.0.thumbnail.webp)](/images/devices/loongson-xa612b0-v1.0.webp)
Quelle: „XA612A0 Mainboard-Bedienungsanleitung V1.0“

</template>
