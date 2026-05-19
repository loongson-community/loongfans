<template #introduction>

:::info
Der EA EXCELSIOR NL38-N11 ist ein 14-Zoll-Laptop, der auf dem Loongson 3A6000 basiert. Mit einem Gewicht von ca. 1,4 kg verfügt der NL38-N11 über ein Display mit einer Auflösung von 2240 × 1400 (2,2K) oder 1920 × 1200 (WUXGA), eine Vielzahl von Anschlüssen und eine Akkulaufzeit von ca. 3–4 Stunden.

Auch andere Hersteller haben auf der Grundlage dieses Designs abgeleitete Modelle auf den Markt gebracht.
:::

</template>

<template #spec>

| Kategorie | Spezifikation |
| ---- | ---- |
| Hersteller | EA EXCELSIOR |
| Auch bekannt als | IPASON LL300, GEIT UT6500-LA6 |
| Prozessor | 3A6000 mit 2,0 GHz |
| Bildschirm | 14 Zoll, 2240×1400 (2,2K) oder 1920×1200 (WUXGA) |
| Gewicht | 1,4 kg |
| Speicher | DDR4 mit 3200 MT/s (1 × SODIMM), kein integrierter Speicher |
Anschlüsse (USB) | 2 × USB 3.0, 2 × USB-C†
| Schnittstellen (Speicher) | 1 × NVMe (PCIe 3.0 x4) |
| Schnittstellen (Netzwerk) | 1 × GbE |
| Anschlüsse (Video) | 1 × HDMI |
| Anschlüsse (Sonstiges) | 1 × 3,5-mm-Kopfhörer-/Mikrofonbuchse, 1 × 720p-Kamera |

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

![](/images/devices/ea-excelsior-nl38-n11.webp)
Quelle: [Offizielle Website von EA EXCELSIOR](https://eaecis.com/cp_95/962.html)

</template>
