<template #introduction>

:::info
Das Loongson XA61201_v1.0 ist ein DTX-Desktop-Motherboard (203 × 244 mm), das auf dem Loongson 3A6000-HV basiert.

Im Vergleich zu dem [XA61200](/en/devices/loongson-xa61200), das XA61201-Motherboard:

- Unterstützt ECC-Speicher
- Wurde der PCIe 3.0 x8-Steckplatz im dritten Steckplatzbereich auf eine PCIe 3.0 x16-Schnittstelle (x8-Lanes) umgestellt?

:::

</template>

<template #spec>

| Kategorie | Technische Daten |
| ---- | ---- |
| Hersteller | Loongson Technology |
| Formfaktor | DTX (203 × 244 mm) |
| Prozessor | 3A6000-HV mit 2,5 GHz |
| Speicher | DDR4 mit 3200 MT/s (2 × DIMM), unterstützt ECC† |
| Schnittstellen (PCIe) | 2 × PCIe 3.0 x16 (8 Lanes), 1 × PCIe 3.0 x4 (4 Lanes) |
| Schnittstellen (USB) | USB 3.0 (2 × auf der Hauptplatine, 2 × an der Vorderseite), USB 2.0 (2 × auf der Hauptplatine, 4 × an der Vorderseite) |
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Schnittstellen (Netzwerk) | Ein Gigabit-Ethernet |
| Schnittstellen (Video) | 1 × HDMI, 1 × VGA |
| Schnittstellen (Sonstiges) | 1 × m.2 Key E-Schnittstelle (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 Satz 3,5-mm-Anschlüsse (Eingang, Ausgang, Line-In), 1 × serielle RS-232-Schnittstelle (DB-9) |

†: Der Stand der ECC-Speicherunterstützung dieses Motherboards ist derzeit unklar. Es ist ebenfalls unklar, ob es Registered-ECC-Speicher unterstützt. Die DMI-Informationen weisen zudem keine 72-Bit-Speicherschnittstelle aus.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

</template>

<template #image>

[![](/images/devices/loongson-xa61201-v1.0.thumbnail.webp)](/images/devices/loongson-xa61201-v1.0.webp)
Quelle: „XA61201 Handbuch zum Motherboard V1.0“

</template>
