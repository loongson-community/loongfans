<template #introduction>

:::info
Der EA EXCELSIOR NL60R-N17 ist ein 14-Zoll-Laptop, der auf dem Loongson 3B6000M basiert. Mit einem Gewicht von ca. 1,35 kg verfügt der NL60R-N17 über ein Display mit einer Auflösung von 2880×1800 (2,8K) oder 1920 × 1200 (WUXGA), eine Vielzahl von Anschlüssen und eine Akkulaufzeit von etwa 2–4 Stunden.

:::

</template>

<template #spec>

| Kategorie | Technische Daten |
| ---- | ---- |
| Hersteller | Nach oben |
| Prozessor | 3B6000M mit 2,4 GHz |
| Bildschirm | 14 Zoll, 2880×1800 (2,8K) oder 1920 × 1200 (WUXGA) |
| Gewicht | 1,35 kg |
| Speicher | DDR4 mit 3200 MT/s (1 × SODIMM), kein integrierter Speicher |
| Schnittstellen (USB) | 2 × USB 3.0, 3 × USB-C† |
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4), 1 × NVMe (PCIe 3.0 x1) |
| Schnittstellen (Netzwerk) | Ein Gigabit-Ethernet |
| Schnittstellen (Video) | ein HDMI-Anschluss |
| Schnittstellen (Sonstiges) | 1 × 3,5-mm-Kopfhörer-/Mikrofonbuchse, 1 × 1080p-Kamera |

†: Zum Laden darf nur eine der beiden USB-C-Schnittstellen verwendet werden.

</template>

<template #known-issues>

<!--@include: @parts/en/known-issues/touchpad-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/loonggpu-err-in-abi2.md -->

<!--@include: @parts/en/known-issues/smcv1-issue-in-abi2.md -->

### Hoher Stromverbrauch des Systems

Dieser Laptop nutzt zur Energieeinsparung AVS (Adaptive Voltage Scaling) anstelle von vollständigem DVFS (Dynamic Voltage and Frequency Scaling) (und der Spielraum für die Spannungsanpassung ist recht begrenzt). Infolgedessen sinkt der Stromverbrauch des Prozessors bei einer Reduzierung der Taktfrequenz nur geringfügig, und die Akkulaufzeit bleibt insgesamt unbefriedigend.

</template>

<template #image>

![](/images/devices/ea-excelsior-nl60r-n17.webp)

</template>
