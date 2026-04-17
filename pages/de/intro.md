---
layout: page
returnLink: /de
pageTitle: Auf in die Neue Welt!
pageSubTitle: Willkommen in Loongson's Welt jenseits von x86 und ARM
---

Loongson ist ein aufstrebender Stern in Chinas heimischer Chipindustrie.

Seit seiner Gründung am Institut für Computertechnologie der Chinesischen Akademie der Wissenschaften im Jahr 2001 hat Loongson zahlreiche Weiterentwicklungen durchlaufen und sich zu einem wettbewerbsfähigen Akteur auf dem internationalen Markt entwickelt.

Im Jahr 2021 stellte Loongson die eigenständig entwickelte Befehlssatzarchitektur LoongArch vor, mit dem Ziel, ein „drittes Software- und Hardware-Ökosystem“ neben x86 und ARM aufzubauen. Heute ist Loongson auf dem freien Markt vertreten, und verschiedene Loongson-Desktops, -Laptops, -Server und -Entwicklungsboards sind mittlerweile leicht erhältlich und haben sich seitdem zu begehrten Besitztümern sowohl von Hobbyisten als auch von Entwicklern in der Community entwickelt. Einige unserer Freunde in der Community nutzen Loongson sogar bereits als ihre Hauptarbeitsgeräte.

Welche Loongson-Produkte gibt es denn so, und wie können wir sie kaufen und nutzen?

## Die Loongson-Familie kennenlernen

Die Prozessorproduktpalette von Loongson umfasst Mikrocontroller, eingebettete SoCs sowie Prozessoren für Desktop-PCs, Workstations und Server – sie kommen in einer Vielzahl von Hardwareprodukten zum Einsatz. Die aktuelle Produktpalette besteht aus drei Prozessorfamilien mit insgesamt über zehn Produkten.

### Produktfamilien

Die Prozessoren von Loongson lassen sich in drei Produktfamilien unterteilen:

- Loongson 3: Prozessoren für Desktop-PCs, Workstations und Server – das Leistungsflaggschiff von Loongson.
- Loongson 2: SoCs für eingebettete und industrielle Computer/Steuerungen sowie Lösungen für mobile Geräte.
- Loongson 1: SoCs/MCUs für Edge-Geräte und kleinere eingebettete Geräte.

Da die Chip-Familien Loongson 3 und 2 unter Hobbyisten deutlich mehr Beachtung finden, werden wir uns hier auf diese beiden Familien konzentrieren.

### Aktuelle Produkte

Im Jahr 2025 umfasst das aktuelle Angebot an Embedded- und Desktop-Chips von Loongson Folgendes:

- Loongson 3C6000-Familie: 16-, 32- und 64-Kern-Prozessoren mit Unterstützung für mehrere Sockel, konzipiert für Workstations und Server; alle Modelle unterstützen SMT2 („Hyperthreading“).
- Loongson 3B6000-Familie: 8-, 12- und 16-Kern-Prozessoren für High-End-Desktops und Workstations; alle Modelle unterstützen SMT2 („Hyperthreading“).
- Loongson 3A6000: 4-Kern-Prozessor für Desktop- und Mobilgeräte mit SMT2-„Hyperthreading“.
- Loongson 3B6000M, 2K3000: 8-Kern-Prozessoren mit geringem Stromverbrauch für Industriecomputer, eingebettete Geräte, Desktop-PCs und mobile Geräte.
- Loongson 2K0300: Ein-Kern-SoC für eingebettete Geräte und für Bildungszwecke.

:::tip
Der Loongson 3B6000M ist das Schwestermodell des 2K3000 und verfügt über eine etwas höhere Taktrate als dieser (der 3B6000M taktet mit 2,5 GHz, der 2K3000 mit 2,2 GHz).
:::

### Funktionsübersicht

Die folgende Tabelle fasst die wichtigsten Unterschiede bei den Funktionen der aktuellen Produkte zusammen (von der höchsten zur niedrigsten Leistung):

| Modell | Anzahl der Kerne | Anzahl der Threads | Taktrate | Speicherkanäle | PCIe-Geschwindigkeiten | PCIe-Lanes |
| ----- | ---------- | ------------ | ----------- | --------------- | ----------- | ---------- |
| 3C6000/Q | 64 | 128 | 2,0–2,1 GHz | 8 | 3,0/4,0† | 64 |
| 3C6000/D | 32 | 64 | 2,1 GHz | 8 | 3,0/4,0† | 64 |
| 3C6000/S | 16 | 32 | 2,2 GHz | 4 | 3,0/4,0† | 64 |
| 3B6000 | 8–16 | 16–32 | 2,3 GHz | 2 | 3,0/4,0† | 32 |
| 3A6000 | 4 | 8 | 2,0–2,5 GHz | 2 | 3,0 | 32‡ |
| 3B6000M | 8 | 8 | ~2,5 GHz | 1 | 3,0 | 8 |
| 2K3000 | 8 | 8 | ~2,2 GHz | 1 | 3,0 | 8 |
| 2K0300 | 1 | 1 | 1 GHz | 1 | Keine | Keine |

- †: Nur einige Modelle unterstützen PCIe 4.0; bitte beachten Sie die Angaben zu den Board-Modellen und die Spezifikationen der Hersteller.
- ‡: PCIe wird vom 7A2000-Brückenchip bereitgestellt.

Neben den aktuellen Produkten basieren auch die folgenden gängigen Chips auf LoongArch:

- Loongson 3A5000 (4 Kerne, 4 Threads), 2,0–2,5 GHz

:::info
Informationen zu Prozessorspezifikationen, Details und Vergleichen finden Sie unter:

- [Datenbank für Chip-Spezifikationen](/de/chips)
- [Offizielle Website von Loongson Technology, Rubrik „Chip-Produkte“](https://www.loongson.cn/product/channel).

:::

### Gängige Platinenmodelle

Im Folgenden finden Sie einige der gängigen Board-Modelle, die derzeit erhältlich sind. Die technischen Daten der Boards finden Sie unter [Produktdatenbank](/de/devices):

- Loongson 3C6000/S: AC612A0_V1.1
- Loongson 3B6000: XB612B0_V1.1
- Loongson 3A6000: XA61200, XA61201, XA612A0
- Loongson 3B6000M: CTCISZ 3B6000M NUC
- Loongson 2K3000: OrangePi Nova, 2K3000-KI-Evaluierungsboard
- Loongson 2K0300: 2K0300 „Hummingbird“, ALIENTEK 2K0300-Entwicklungsboard, CTCISZ ForeverPi

## Auf welchen Betriebssystemen laufen sie?

Zahlreiche allgemeine Linux-Distributionen für Desktops und Server (kommerzielle und Community-basierte), spezialisierte Linux-Distributionen (wie OpenWrt), OpenHarmony sowie spezialisierte Betriebssysteme (wie LoongWorks auf Basis von VxWorks, RTOS usw.) unterstützen LoongArch-Hardware.

Informationen zu Betriebssystemen, Linux-Distributionen und gängiger Software, die LoongArch unterstützt, finden Sie unter [*AREWELOONGYET?*](https://areweloongyet.com/en/).

## Ich bin überzeugt – wo kann ich eines kaufen?

In China lassen sich Loongson-Boards in der Regel über Taobao oder JD.com erwerben. Goofish bietet zudem eine große Auswahl an gebrauchten Motherboards und vorgefertigten Systemen an, die ein besseres Preis-Leistungs-Verhältnis bieten.

Außerhalb Chinas wird die Sache allerdings etwas komplizierter. Abgesehen von der Inanspruchnahme eines Einkaufsagenten oder eines Weiterleitungsdienstes kann Ihnen Mingcong Bai, ein Mitarbeiter unserer Community, dabei helfen, Loongson-Hardware zu beschaffen:

- Telegram: @JeffBai
WeChat: mingcongbai
- E-Mail: baimingcong@loongfans.cn

Wenn Sie Student oder Community-Entwickler sind und Interesse daran haben, verschiedene Softwareprogramme oder Anwendungen auf LoongArch zu portieren, zu optimieren und zu verbessern, oder wenn Sie für Ihr aktuelles Projekt mehr Rechenleistung benötigen, können Sie sich auch an die [Roaming-Loongson-Projekt](https://github.com/loongson-community/1024) um Loongson-Hardware auszuleihen (oder damit wir sie für Ihr Projekt spenden).

## Literaturverzeichnis

Zu diesem Zeitpunkt verfügen Sie bereits über einige grundlegende Kenntnisse zu Loongson. Im Folgenden finden Sie eine Reihe von Lesematerialien unserer Freunde aus der Community, die Referenzmaterialien von Benutzerhandbüchern bis hin zu Anleitungen zur Fehlerbehebung sowie Prozessorspezifikationen, ABI-Spezifikationen, Details zur Firmware-Implementierung und das „New-and-Old-World-Problem“ bieten, von dem Sie vielleicht schon gehört haben:

- [Häufig gestellte Fragen & Fehlerbehebung](/de/guides)
- [Loongson-Datenbank für Motherboards und CPUs](/de/devices)
- [*AREWELOONGYET?*: Informationsseite zum Aufbau des LoongArch-Ökosystems](https://areweloongyet.com/)
- [Loong 1-2-3: Kompatibilitätsdatenbank für LoongArch](https://loong123.cn/)

Gesammelte Lesematerialien:

- [Datenbank für Chip-Spezifikationen](/de/chips)
- [*AREWELOONGYET?*: Lesestoff „Neue Welt und Alte Welt“](https://areweloongyet.com/docs/intro)
- [Offizielle Website von Loongson Technology, Rubrik „Chip-Produkte“](https://www.loongson.cn/product/channel)
