<template #introduction>

:::info
Das ASUS XC-LS3A6M-A ist ein DTX-Desktop-Motherboard (203 × 244 mm), das auf dem Loongson 3A6000-HV basiert.

Dieses Motherboard wurde von ASUS entwickelt und vertrieben und gehört zu den ersten Loongson-3A6000-Motherboards von Drittanbietern. Der Unterschied zum Modell XC-LS3A6M besteht darin, dass die Position der M.2-Key-E-Schnittstelle angepasst wurde, die integrierte USB-3.0-Schnittstelle auf PCIe x1 umgestellt wurde, ein Netzwerkanschluss entfernt wurde und auch die USB-Schnittstellenkonfiguration angepasst wurde.
:::

</template>

<template #spec>

| Kategorie | Technische Daten |
| ---- | ---- |
| Hersteller | ASUS |
| Formfaktor | DTX (203 × 244 mm) |
| Prozessor | 3A6000-HV mit 2,5 GHz |
| Speicher | DDR4 mit 3200 MT/s (2 × DIMM) |
| Schnittstellen (PCIe) | PCIe 3.0 x1 (x1-Lanes), PCIe 3.0 x16 (x8-Lanes), PCIe 3.0 x8 (x8-Lanes), PCIe 3.0 x8 (x4-Lanes) |
| Schnittstellen (USB) | USB 3.0 (2 × auf der Hauptplatine, 3 × an der Vorderseite), USB 2.0 (4 × auf der Hauptplatine, 1 × an der Vorderseite) |
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4), 4 × SATA 3.0 |
| Schnittstellen (Netzwerk) | Ein Gigabit-Ethernet |
| Schnittstellen (Video) | 1 × HDMI, 1 × VGA |
| Schnittstellen (Sonstiges) | 1 × M.2-Key-E-Schnittstelle (PCIe + USB), 1 × mPCIe (PCIe + USB), 1 Satz 3,5-mm-Anschlüsse (Eingang, Ausgang, Line-In) |

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/7a-errata.md -->

<!--@include: @parts/en/known-issues/usb-device-lost.md -->

### Fehlendes Firmware-Update

Laut Nutzer-Feedback gibt es für dieses Motherboard nur wenige Firmware-Updates, und es sind mehrere Firmware-Fehler bekannt:

- In früheren Firmware-Versionen fehlte die Option, die x86-UEFI-GOP-Emulation für GPUs zu deaktivieren, was dazu führte, dass neuere AMD-Grafikkarten (RX 5000 und höher) sowie diskrete Intel-Grafikkarten nicht verwendet werden konnten.
- Bei einigen Firmware-Versionen wird von separaten Grafikkarten kein Bildsignal ausgegeben, während der integrierte HDMI-Ausgang (7A2000) lediglich einen Cursor anzeigt.

</template>

<template #image>

![ASUS XC-LS3A6M-A Vorderseite](/images/devices/asus-xc-ls3a6m-a.webp)
![ASUS XC-LS3A6M-A E/A](/images/devices/asus-xc-ls3a6m-a-back.webp)
Quelle: Goofish

</template>
