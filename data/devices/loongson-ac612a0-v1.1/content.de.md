<template #introduction>

:::info
Das Loongson AC612A0_V1.1 ist ein ATX-Mainboard (244 × 305 mm) für Desktop-PCs und Server, das auf dem Loongson 3C6000/S basiert.

Dieses Motherboard ist ein Einstiegsmodell mit Loongson 3C6000/S-Prozessor, das über eine relativ umfangreiche Auswahl an Schnittstellen verfügt und Out-of-Band-Management-Module (BMC) für den Fernbetrieb und die Fernverwaltung unterstützt.
:::

</template>

<template #spec>

| Kategorie | Technische Daten |
| ---- | ---- |
| Hersteller | Loongson Technology |
| Formfaktor | ATX (244 × 305 mm) |
| Prozessor | 3C6000/S mit 2,0/2,2 GHz |
| Speicher | DDR4 mit 3200 MT/s (4 × DIMM), unterstützt ECC |
| Schnittstellen (PCIe) | 2 × PCIe 3.0 x16, 2 × PCIe 3.0 x8 |
| Schnittstellen (USB) | USB 3.0 (2 × auf der Hauptplatine, 2 × an der Vorderseite), USB 2.0 (2 × auf der Hauptplatine, 4 × an der Vorderseite) |
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0, 1 × SFF-8654-4i-Schnittstelle |
| Schnittstellen (Netzwerk) | 2 × Gigabit-Ethernet |
| Schnittstellen (Video) | Ein VGA-Anschluss |
| Schnittstellen (Sonstiges) | 1 × BMC-Modulschnittstelle†‡, 1 × BMC-Netzwerkschnittstelle, 1 × m.2 Key E-Schnittstelle (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 Satz 3,5-mm-Schnittstellen (Eingang, Ausgang), 1 × serielle RS-232-Schnittstelle (DB-9) |

- †: Unterstützt BMC-Module auf Basis von AST2500 oder Loongson 2K0500.
- ‡: Es gibt auch eine Version dieses Motherboards, die als „nur für den heimischen Markt (chinesische Komponenten)“ bezeichnet wird und über keinen Steckplatz für BMC-Module verfügt.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/3b6000-3c6000-early-stepping-pcie-link-speed-err.md -->

</template>

<template #image>

[![](/images/devices/loongson-ac612a0-v1.1.thumbnail.webp)](/images/devices/loongson-ac612a0-v1.1.webp)
Quelle: „Loongson 3C6000 Single-Socket-Server-Mainboard – Produktdatenblatt V1.0“

</template>
