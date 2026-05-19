<template #introduction>

:::info
Das Loongson XB612B0_V1.2 ist ein mATX-Desktop-Motherboard (244 × 244 mm), das auf dem Loongson 3B6000 basiert.

Dieses Motherboard ist möglicherweise mit verschiedenen 3B6000-Prozessoren erhältlich, darunter Modelle mit 8, 12 oder 16 Kernen (16, 24 oder 32 Threads), und unterstützt Registered-ECC-Speicher. Das Motherboard verfügt zudem über zwei m.2-NVMe-Schnittstellen (PCIe 3.0 x4) im 2280-Format und bietet damit die größte Anzahl an integrierten NVMe-Steckplätzen unter den aktuellen Loongson-basierten Motherboards.

Im Vergleich zu dem [AC612A0_V1.1](/en/devices/loongson-ac612a0-v1.1.md) Das auf dem Loongson 3C6000/S basierende Motherboard XB612B0_V1.2 verfügt über zwei Speichersteckplätze und eine PCIe-3.0-x8-Schnittstelle weniger. Angesichts seines vergleichsweise kompakten Formfaktors bietet dieses Motherboard jedoch nach wie vor einen bemerkenswerten Funktionsumfang und eine hervorragende Erweiterbarkeit und stellt für Privatkunden ein besonders gutes Preis-Leistungs-Verhältnis dar.
:::

</template>

<template #spec>

| Kategorie | Spezifikation |
| ---- | ---- |
| Hersteller | Loongson Technology |
Formfaktor: mATX (244 × 244 mm)
| Prozessor | 3B6000 (8/12/16 Kerne) mit 2,3/2,2/2,1 GHz |
| Speicher | DDR4 mit 3200 MT/s (2 × DIMM), unterstützt ECC |
| Schnittstellen (PCIe) | 2 × PCIe 3.0 x16, 1 × PCIe 3.0 x8 |
| Anschlüsse (USB) | USB 3.0 (2 × auf der Hauptplatine, 2 × an der Vorderseite), USB 2.0 (2 × auf der Hauptplatine, 4 × an der Vorderseite) |
| Schnittstellen (Speicher) | 2 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Schnittstellen (Netzwerk) | 2 × GbE |
| Anschlüsse (Video) | 1 × HDMI, 1 × VGA |
| Anschlüsse (Sonstiges) | 1 × M.2-Key-E-Anschluss (PCIe + USB), 1 Satz 3,5-mm-Anschlüsse (Eingang, Ausgang, Line-In), 1 × serielle RS-232-Schnittstelle (DB-9) |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-xb612b0-v1.2.thumbnail.webp)](/images/devices/loongson-xb612b0-v1.2.webp)
Quelle: Xi Ruoyao

</template>
