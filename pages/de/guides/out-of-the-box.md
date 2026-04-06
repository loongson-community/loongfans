---
layout: page
returnLink: /de/guides
pageTitle: Erste Schritte
pageSubTitle: Ihr Leitfaden vom Auspacken bis zur Zufriedenheit
---

# Vor dem Einschalten: Was muss ich noch kaufen?

Loongson-Geräte werden in der Regel als „Motherboard- und CPU-Bundles“ verkauft (d. h., Motherboard und Prozessor werden zusammen angeboten). Neben dem Kauf eines vorgefertigten Systems müssen Sie je nach den Spezifikationen des Motherboards und Ihren eigenen Anforderungen noch weiteres Zubehör erwerben.

:::Info
Informationen zu technischen Daten und bekannten Problemen verschiedener Platinen und vorgefertigter Systeme finden Sie unter [Datenbank für Hardware-Spezifikationen](/en/devices).
:::

Wenn man beispielsweise einen Loongson-Desktop-Computer zusammenbauen möchte, gibt es einige allgemeine Tipps zu beachten:

- Loongson-Motherboards werden in der Regel zusammen mit der CPU und dem Kühlkörper in einem Paket verkauft, sodass Sie keinen separaten Kühlkörper kaufen müssen.
- Loongson-Prozessoren der Desktop-Klasse verbrauchen in der Regel weniger als 150 Watt. Bei der Auswahl eines Netzteils sollten Sie vor allem den Strombedarf von Peripheriegeräten wie Grafikkarten berücksichtigen.
- Alle LoongArch-basierten Motherboards sind mit NVMe-Schnittstellen ausgestattet; die Verwendung von NVMe-Laufwerken dürfte für ein gutes Benutzererlebnis im Alltag sorgen.
- Loongson-Prozessoren, insbesondere High-End-Modelle wie der 3C6000/S, benötigen leistungsstarke RAM-Module und eine ausreichende Anzahl von Kanälen, um ihr volles Potenzial entfalten zu können. Es wird allgemein empfohlen, eine ausreichende Menge an RAM mit den entsprechenden Spezifikationen zu erwerben.
- Da die integrierte Grafik des Loongson-Onboard-/Bridge-Chips (wie beispielsweise die im Bridge-Chip 7A2000 integrierte LoongGPU LG110) bekanntermaßen langsam ist, empfehlen wir den Kauf einer separaten Grafikkarte, um ein gutes Desktop-Erlebnis zu gewährleisten.
  - AMD-Grafikkarten werden im Allgemeinen gut unterstützt (auch Intel-Karten können eine gute Wahl sein). NVIDIA-Grafikkarten werden nicht unterstützt.

## Die RAM-Frage

Die Speicherkompatibilität war auf Loongson-Plattformen schon immer eine Herausforderung. Wenn Sie inkompatible oder nicht geprüfte RAM-Module verwenden, laufen Betriebssysteme und Anwendungen möglicherweise nicht zuverlässig.

:::Info

- Eine Liste der RAM-Module, die bekanntermaßen mit Loongson-Plattformen kompatibel sind, finden Sie unter [Kompatibilitätsliste für Speicher von Loong 1-2-3](https://loong123.cn/list-hardwares.html).
- Generell werden RAM-Module mit Hynix-Chips gut unterstützt.
- Sofern der jeweilige Chip und das Motherboard dies unterstützen, empfehlen wir den Kauf von Registered-ECC-RAM-Modulen.

:::

## Die Frage nach der GPU

Wie bereits erwähnt, lässt sich Loongson im Allgemeinen am besten mit AMD-Grafikkarten kombinieren. Da aktuelle Loongson-Produkte bereits die Anforderungen an die Multimedia- und Produktivitätsleistung im Desktop-Bereich erfüllen, empfehlen wir den Kauf von Grafikkarten mit angemessener Leistung und Funktionen zur Multimedia-Kodierung und -Dekodierung, um das Potenzial Ihres Geräts voll auszuschöpfen.

Im Folgenden finden Sie Grafikkarten, deren Kauf wir empfehlen und die den oben genannten Empfehlungen entsprechen:

- High-End: AMD Radeon RX 7600 oder höher
- Mittelklasse: AMD Radeon RX 550, Radeon Pro WX 3100 oder höherwertige Modelle

Wenn Ihr Budget begrenzt ist, könnten die folgenden Modelle für Sie in Frage kommen. Bitte beachten Sie jedoch, dass diese Grafikkarten möglicherweise keine 4K-Videosignale mit einer Bildwiederholfrequenz von 60 Hz ausgeben können und dass die H.265- und AV1-Kodierung bzw. -Dekodierung möglicherweise nicht verfügbar ist:

- Einstiegsklasse: AMD Radeon R7 240 und andere Grafikkarten der Einstiegsklasse (nicht empfohlen)

## Die Frage nach dem Betriebssystem

Dank des Engagements zahlreicher Communities und Entwickler unterstützen viele Linux-Distributionen mittlerweile aktuelle Loongson-Plattformen (LoongArch). Wir empfehlen die folgenden Distributionen für den Einsatz auf Loongson-Computern:

- Anfänger: AOSC OS, Deepin 23
- Mittelstufe und Fortgeschrittene: Arch Linux für Loong64, Debian, Gentoo, NixOS, Slackwareloong
- Spezialisiert: Alpine, OpenWrt, Proxmox VE
- Im Fokus: Linux from Scratch, Yongbao

Außerdem sind kommerzielle Systeme aus China und Russland erhältlich, darunter UOS, KylinOS, NFSCNS, openEuler, ALT Linux und OpenHarmony.
