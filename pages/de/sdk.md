---
layout: page
# 返回首页
returnLink: /de
pageTitle: Entwicklerhandbuch
pageSubTitle: Anleitungen und Hinweise zur Entwicklung für LoongArch
---

<script setup lang="ts">
import SdkIndex from "@src/client/components/sdk/SdkIndex.vue"
</script>

Bei der Entwicklung für Nicht-x86-Systeme stellen sich viele vielleicht die Frage:

&gt; Wo finde ich das SDK für dieses Gerät?

Dank des Engagements von Community-Mitwirkenden und Loongson-Ingenieuren seit 2021 werden die meisten Toolchains nun vom Upstream-Projekt unterstützt.

&gt; Was bedeutet das?

Das bedeutet, dass der Installationsprozess für verschiedene Programmier-Toolchains nun ähnlich, wenn nicht sogar identisch mit dem auf der x86-Plattform ist – das heißt, die Installation ist so einfach wie das Herunterladen aus den Repositories der Distribution und erfolgt mit einzeiligen Befehlen!

:::Typ
Da ABI 2.0 („New World“) von den meisten Community-Nutzern und Entwicklern verwendet wird, konzentriert sich dieser Leitfaden ausschließlich auf die Vorstellung der Installations- und Konfigurationsverfahren für ABI 2.0-Systeme. ABI 1.0 („Old World“) wird hier nicht behandelt. Sollten Sie in einer Situation sein, in der Sie für ABI 1.0 entwickeln müssen, empfehlen wir Ihnen, diese Entscheidung zu überdenken und die Notwendigkeit zu überprüfen. Sollte dies dennoch erforderlich sein, lesen Sie bitte die Dokumentation unter [Loongson Open-Source-Community (loongnix.cn)](https://www.loongnix.cn/).
:::

---

<SdkIndex>
<template #gnu>

GCC und Binutils unterstützen LoongArch offiziell. Sie sind direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder können mittels Cross-Kompilierung erstellt werden.

:::Typ
Hinweis: Neuere Versionen von GCC und Binutils bieten eine verbesserte Unterstützung für LoongArch. Insbesondere bietet GCC 14 Unterstützung für LoongArch-Vektorerweiterungen, während Binutils 2.41 Unterstützung für Linker-Relaxation und – später mit GCC 16 – für das Medium-Code-Modell einführte (was die Kompatibilität mit größeren Quellcode-Projekten erheblich verbessert). All dies sind wesentliche Funktionserweiterungen. Bitte aktualisieren Sie die Software daher mindestens auf die oben genannten Versionen.

Wenn Sie beabsichtigen, universelle Binärdateien für Projekte zu veröffentlichen oder eine Linux-Distribution zu betreuen, lesen Sie bitte die entsprechenden Spezifikationen und Einschränkungen, die in der [*Softwareentwicklung und Build-Konventionen für LoongArch-Architekturen*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

So installieren Sie die GNU-Toolchain auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install binutils gcc` |
| Arch Linux | `sudo pacman -S binutils gcc` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install build-essential` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install binutils gcc` |

Falls Sie kein LoongArch-Gerät besitzen oder eine Cross-Kompilierung durchführen möchten:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install gcc+cross-loongarch64` |
| Debian 13 und höher, Ubuntu 24.04 und höher sowie deren jeweilige Derivate | `sudo apt install gcc-loongarch64-linux-gnu` |
| Windows und andere Linux-Distributionen | Bitte installieren Sie die Software aus dem GitHub-Repository [loongson/Build-Tools](https://github.com/loongson/build-tools) |

</template>

<template #llvm>

LLVM unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden.

:::Typ
Hinweis: Neuere Versionen von LLVM bieten eine verbesserte Unterstützung für LoongArch. Mit LLVM 18 wurde die Unterstützung für LoongArch-Vektorerweiterungen eingeführt. Falls verfügbar, aktualisieren Sie bitte auf diese Version oder eine neuere.

Wenn Sie beabsichtigen, universelle Binärdateien für Projekte zu veröffentlichen oder eine Linux-Distribution zu betreuen, lesen Sie bitte die entsprechenden Spezifikationen und Einschränkungen, die in der [*Softwareentwicklung und Build-Konventionen für LoongArch-Architekturen*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

So installieren Sie LLVM (einschließlich Clang) auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssysteme | Installationsanleitung |
| -------- | -------- |
| AOSC OS | `oma install llvm` |
| Arch Linux | `sudo pacman -S clang llvm` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install clang llvm` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install clang llvm` |

Die LLVM-Toolchain (insbesondere der Clang-Compiler) unterstützt von Haus aus die Cross-Kompilierung. Um diese Toolchain für LoongArch cross-kompilieren, verwenden Sie LLVM Version 17 oder höher und beachten Sie [dieser Artikel](https://clang.llvm.org/docs/CrossCompilation.html) und geben Sie das LoongArch-Ziel an (z. B. `loongarch64-unknown-linux-gnu`).

</template>

<template #rust>

Rust unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden.

Rust empfiehlt die Verwendung von [Rostbildung](https://rustup.rs/) So installieren Sie die Rust-Toolchain:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

So installieren Sie Rust (rustc) und den Paketmanager Cargo auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install rustc` |
| Arch Linux | `sudo pacman -S rustc` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install rust-all` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install rust cargo` |

</template>

<template #nodejs>

Node.js unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden. Node.js stellt LoongArch-Binärdateien über das [Inoffizielle Versionen](https://unofficial-builds.nodejs.org/) Projekt (mit dem Tag `loong64` (Architektur).

So installieren Sie Node.js auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install nodejs` |
| Arch Linux | `sudo pacman -S nodejs` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install nodejs` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install nodejs` |

:::Typ
Viele Linux-Distributionen bieten mehrere Versionen von Node.js an, um den Anforderungen verschiedener Anwendungen und Projekte gerecht zu werden. Bitte lesen Sie die Dokumentation Ihrer Distribution und installieren Sie bei Bedarf alternative Node.js-Versionen.
:::

</template>

<template #golang>

Go unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden. Das Go-Upstream-Projekt erstellt LoongArch-Binärdateien, die über deren [Seite herunterladen](https://go.dev/dl/).

So installieren Sie Go auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install go` |
| Arch Linux | `sudo pacman -S go` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install golang` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install golang` |

Go unterstützt von Haus aus die Cross-Kompilierung. Ab Go 1.21 befolgen Sie bitte die Anweisungen unter [dieser Artikel](https://go.dev/doc/install/source) und das LoongArch-Ziel angeben (d. h., `GOARCH=loong64`), um für LoongArch zu cross-kompilieren.

</template>

<template #python>

Python unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden.

So installieren Sie Python auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install python-3` |
| Arch Linux | `sudo pacman -S python` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install python3` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install python3` |

:::Typ
Da für LoongArch noch keine Definition für eine „manylinux“-Baseline vorliegt, werden im offiziellen PyPI-Repository keine Binärdateien für LoongArch bereitgestellt. Das bedeutet, dass bei der Installation von PyPI-Modulen mithilfe von `pip`Die entsprechenden Module werden aus dem Quellcode kompiliert, und Sie müssen gegebenenfalls C/C++/Rust-Toolchains installieren.

Loongson Technology betreibt ein PyPI-Binär-Repository für ABI 2.0-Systeme unter [lpypi.loongnix.cn](http://lpypi.loongnix.cn/). Sie können bearbeiten `/etc/pip.conf` zu und legen Sie dieses als Standard-Repository fest. Alternativ können Sie das [64-Bit-Lang](https://github.com/loong64) Die Organisation auf GitHub unterhält ein unabhängiges PyPI-Binär-Repository. Informationen zur Konfiguration finden Sie unter [die README-Datei der Organisation](https://github.com/loong64#pypi-repository).
:::

</template>

<template #dotnet>

.NET unterstützt LoongArch offiziell. Da LoongArch innerhalb von .NET jedoch als „von der Community unterstützte Architektur“ eingestuft wird, stellt Microsoft keine Binär-Toolchains für LoongArch bereit.

Die Binärdateien der .NET-Toolchain können jedoch über die folgenden Kanäle bezogen werden:

- [.NET 10 (von Loongson Technology)](https://github.com/loongson/dotnet/releases)
- [.NET 9 (von der Organisation „loongson-community“)](http://github.com/loongson-community/dotnet-unofficial-build/releases)

Für gängige Linux-Distributionen laden Sie einfach das SDK-Paket mit dem RID (.NET Runtime Identifier) herunter `linux-loongarch64` um die vollständige Toolchain zu erhalten (d. h., `dotnet-runtime-10.0.1-linux-loongarch64.tar.gz`). Eine Anleitung zur Installation des .NET SDK mithilfe von Tar-Paketen finden Sie unter [offizielle .NET-Dokumentation](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install).

### Cross-Kompilierung von .NET-Anwendungen für LoongArch

.NET unterstützt von Haus aus die Cross-Kompilierung und die plattformübergreifende Veröffentlichung. Informationen zu .NET 9 oder höher finden Sie unter [dieser Artikel](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog) und geben Sie die Ziel-RID an, unter der .NET-Anwendungen für LoongArch veröffentlicht werden sollen. Da LoongArch jedoch als „von der Community unterstützte Architektur“ für .NET eingestuft ist, hostet NuGet.org keine .NET-Laufzeitpakete für LoongArch, was zu Fehlern beim Erstellen führen kann.

Um dieses Problem zu umgehen, können Sie alle erforderlichen NuGet-Pakete lokal herunterladen und installieren. Laden Sie dazu einfach die folgenden Dateien von den oben genannten Seiten mit den Toolchain-Versionen herunter (* kennzeichnet bestimmte Versionsnummern):

- Microsoft.AspNetCore.App.Runtime.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Crossgen2.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Host.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Runtime.linux-loongarch64.*.nupkg
- runtime.linux-loongarch64.Microsoft.DotNet.ILCompiler.*.nupkg

:::Typ
Die von loongson-community/dotnet-unofficial-build bereitgestellte Distribution stuft die oben genannten Dateien als „Release-Artefakte“ ein. Bitte laden Sie dieses Paket herunter, um die oben aufgeführten Komponenten zu erhalten.
:::

Speichern Sie die oben genannten Dateien in einem Verzeichnis Ihrer Wahl (z. B. `/data/loongarch64-nupkgs`) und befolgen Sie die Anweisungen in [dieser Artikel](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) um dieses Verzeichnis wie unten gezeigt zu Ihrer NuGet-Quellenliste hinzuzufügen:

```xml
<packageSources>
    <add key="LoongArch64 Packages" value="/data/loongarch64-nupkgs" />
</packageSources>
```

Sie sollten nun in der Lage sein, .NET-Anwendungen für LoongArch zu kompilieren.

### Kompilieren der .NET-Toolchain

Das Kompilieren der .NET-Toolchain selbst ist ein relativ aufwendiger Vorgang. Um den Einstieg zu erleichtern, lesen Sie bitte die [Von Loongson Technology verwendete CI-Build-Skripte](https://github.com/loongson/dotnet/blob/build/.github/workflows/build-sdk10.yml). Diese Methode nutzt das von .NET offiziell empfohlene VMR-Quellcode-Paket für die Kompilierung.

</template>

<template #java>

Aus nicht-technischen Gründen unterstützt Oracle OpenJDK derzeit LoongArch JIT nicht. Zur Installation von Java wird empfohlen, Binärpakete herunterzuladen, die mit dem „Linux 5.10.0 Kernel UAPI“ kompatibel sind, und zwar auf der [Loongson Open-Source-Community (loongnix.cn)](https://www.loongnix.cn/zh/api/java/) oder über das Repository Ihrer Distribution.

So installieren Sie Java auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsanleitung |
| -------- | -------- |
| AOSC OS | `oma install openjdk` |
| Arch Linux | `sudo pacman -S java-openjdk` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install default-jdk` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install java-latest-openjdk` |

:::Typ
Viele Linux-Distributionen bieten mehrere Versionen von OpenJDK an, um den Anforderungen verschiedener Anwendungen und Projekte gerecht zu werden. Bitte lesen Sie die Dokumentation Ihrer Distribution und installieren Sie bei Bedarf alternative OpenJDK-Versionen.
:::

</template>

<template #kernel>

Der Linux-Kernel unterstützt LoongArch offiziell. Im Allgemeinen verwenden Linux-Distributionen, die auf ABI 2.0 basieren, den Upstream-Kernel (zusammen mit plattformspezifischen Workarounds und anderen Patches, siehe unten). Einige kommerzielle Distributionen liefern jedoch den „Longterm“-Kernel 6.6 mit einem umfangreichen Satz plattformspezifischer Patches aus.

:::Typ
Der Linux-Kernel unterstützt LoongArch seit Version 5.19. Um die Hardwarefunktionen und die Leistung von LoongArch jedoch voll auszuschöpfen, sollten Sie den neuesten Mainline-Kernel verwenden.
:::

### Referenz zur Kernel-Wartung

Wie bereits erwähnt, sind neuere Linux-Kernel aufgrund ihrer besseren Unterstützung für LoongArch-Geräte in der Regel vorzuziehen. Da Distributionen jedoch hinsichtlich der Kernel-Updates unter Umständen eigene Richtlinien haben, haben wir die folgende Anleitung als Orientierungshilfe für Sie zusammengestellt.

| Linux-Version | Neue Hauptfunktion |
| ------------- | ---------------------------- |
| 6.18 | Korrekturen für 2K2000/2K3000/3B6000M GPIO |
| 6.17 | Unterstützung für DWMAC bei den On-Chip-Netzwerkkarten 2K3000/3B6000M; Korrektur der PWM-Frequenzmodulation |
| 6.16 | Unterstützung für 2K2000/2K3000/3B6000M SDIO |
| 6.14 | Unterstützung für Multiplexing der 3C6000-Familie |
| 6.12 | Unterstützung der 3B6000/3C6000-Familie (erweitertes IRQ-Modell) |
| 6.7 | Unterstützung für Virtualisierung |
| 6.4 | Unterstützung für Simultaneous Multi-Threading (SMT) |

### Nicht integrierte Patches

In der Regel leiten Ingenieure von Loongson Technology und Entwickler aus der Community Hardware-Unterstützung, Optimierungen und Fehlerbehebungen an den Upstream-Kernel (Mainline) weiter. Aus technischen und nicht-technischen Gründen werden einige Patches jedoch nicht übernommen.

Die folgende Tabelle enthält alle bekannten und wichtigen Patches, die von verschiedenen nachgelagerten Akteuren (Entwickler, Distributions-Communities usw.) gepflegt werden, zu Ihrer Information (die nachstehende Patch-Liste basiert auf `v6.19-rc1` und enthalten keine Patches, die bereits an den Upstream-Entwickler gesendet wurden [langer Bogen](https://lore.kernel.org/loongarch) (Mailingliste):

| Beschreibung | Typ | Kconfig-Eintrag | Link | Anmerkungen |
| ----------- | ---- | ------------- | ---- | ----- |
| PixArt PS/2-Geräte | Funktionen | `MOUSE_PS2_PIXART` (bool: ja/nein) | [1](https://lore.kernel.org/loongarch/20251127080203.3218018-1-zhoubinbin@loongson.cn/) | Bei Laptops wie dem Tongfang Chaorui L860-T2 und dem EA EXCELSIOR L71, die auf den Chipsätzen 3A5000 und 3A6000 basieren, behebt dieser Patch ein Problem, bei dem die Touchpads fälschlicherweise als PS/2-Mäuse erkannt wurden, wodurch die Unterstützung für Gesten und die Handflächenerkennung nicht mehr funktionierte. |
| HWMon-Unterstützung (Temperaturüberwachung und andere Formen der Hardwareüberwachung) mit Temperaturregelung für die CPU der Loongson-3-Familie | Funktion | `CPU_HWMON` (bool: ja/nein) | [1](https://github.com/chenhuacai/linux/commit/2a6c1c74d93a21613a523aebc6494d654f35cf1a) | Enthält keine Unterstützung für die Temperaturüberwachung des 7A-Bridge-Chips; dieser Patch kann dazu führen, dass `sensors(1)` um fehlerhafte Temperatursensoren und Daten auf SoC-Plattformen wie 2K3000/3B6000M auszulesen. |
| Mehrkanal-DMA-Controller | Funktion | k. A. | [1](https://github.com/AOSC-Tracking/linux/commit/87e13f54db61f) | |
| 2K3000/3B6000M SoC CAN-FD-Bus | Funktion | `CAN_LSCANFD` (bool: ja/nein), `CAN_LSCANFD_PLATFORM` (Tristate: y/m/n) | [1](https://github.com/AOSC-Tracking/linux/commit/905bf46bcebfb) | Muss zusammen mit dem Patch für den Mehrkanal-DMA-Controller verwendet werden |
| Firmware-Unterstützung für BPI1000/1001 („Old World“) | Funktion | Nicht zutreffend | [1](https://github.com/AOSC-Tracking/linux/commit/06e031656e659), [2](https://github.com/AOSC-Tracking/linux/commit/6a2eb415543d7), [3](https://github.com/AOSC-Tracking/linux/commit/56209fafa1832), [4](https://github.com/AOSC-Tracking/linux/commit/85a8b0edaf388), [5](https://github.com/AOSC-Tracking/linux/commit/16f5059f8b43d), [6](https://github.com/AOSC-Tracking/linux/commit/7d80610d12846), [7](https://github.com/AOSC-Tracking/linux/commit/ecd26b294d80e), [8](https://github.com/AOSC-Tracking/linux/commit/1c92272af179f) | Unverzichtbar für das Booten von ABI2.0-Systemen auf Lenovo Kaitian M540z, Gooxi 3C5000L Quad-Socket-Servern und bestimmten Plattformen, die von 2020 bis 2022 mit Kunlun-Firmware ausgeliefert wurden. |
| Ein Problem bei der Erkennung der PCIe-Busgeschwindigkeit bei einigen Prozessoren der Serien 3B6000 und 3C6000, bei denen die PCIe-Geschwindigkeit fälschlicherweise auf PCIe 1.0 begrenzt wurde | Workaround | Nicht zutreffend | [1](https://github.com/AOSC-Tracking/linux/commit/ae2697f19a371) | Der Umfang der Auswirkungen auf Prozessor-Steppings/Batches ist unklar. Weitere Informationen finden Sie unter [die Erklärung dazu](@/guides/errata-desktop-and-server.html#pcie-speed-negotiation-issue-with-early-3b6000-3c6000-steppings) |
| Workaround für nicht funktionsfähige GPIOs aufgrund von Gerätebeschreibungen, die nicht der *Loongson CPU Unified System Architecture Specification* entsprechen, in der GPIO-Geräte beschrieben wurden innerhalb von `gsi_idx_map` | Workaround | Nicht zutreffend | [1](https://github.com/AOSC-Tracking/linux/commit/71068c266d426) | Sollte keine Auswirkungen auf die Modelle 2K3000/3B6000M und neuere Produkte haben |
| Workaround für sporadische Treiberabstürze, Neustarts und Systemblockaden bei AMD GCN 1.0–4.0-GPUs auf LoongArch-Plattformen | Workaround | N/A | [1](https://lore.kernel.org/all/20240617105846.1516006-1-uwu@icenowy.me/) | Der Mechanismus hinter dieser Korrektur ist unklar (empirischer Patch); kommerzielle 6.6-Kernel wie Deepin enthalten einen aggressiveren (und ebenfalls ungeklärten) Patch-Satz. Siehe [dieser Deepin-Pull-Request](https://github.com/deepin-community/kernel/pull/1215). |
| Workaround für Datenfehler, die auf 7A-Plattformen bei Verwendung von AMD „Radeon“-Grafiktreibern auftreten (für TeraScale 2 und ältere Grafikkarten) | Workaround | Nicht zutreffend | [1](https://github.com/chenhuacai/linux/commit/6266d0082b020ad68a3b3c6f314ba299b9d06d3d), [2](https://lore.kernel.org/all/20240220074958.3288170-1-chenhuacai@loongson.cn/), [3](https://github.com/AOSC-Tracking/linux/commit/3b730340dee61) | Wirkungsweise unbekannt, aber wirksam; Patch 3 beschränkt diese Problemumgehung auf MIPS- und LoongArch64-Plattformen (`MACH_LOONGSON64`) |
| Den dritten PWM-Controller registrieren `LOON0006:03` auf der 7A2000-Brücke als `gsgpu_backlight` im ACPI-Initialisierungscode auf Board-Ebene zur Unterstützung der LoongGPU-Hintergrundbeleuchtungssteuerung | Workaround | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/6a22acfd684e4) | Vorab-Patch für die Unterstützung der Hintergrundbeleuchtung bei LoongGPU. Informationen zu Patches für den LoongGPU-Treiber finden Sie unter [AOSC-Tracking/loonggpu-kernel-dkms @ aosc/v1.0.1-alpha-lnd25.5](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commits/aosc/v1.0.1-alpha-lnd25.5/). |
| „Remote Wake“-Unterstützung für USB-Root-Hubs (z. B. USB-Tastaturen, Mäuse und andere Eingabegeräte) aktivieren | Workaround | Nicht zutreffend | [1](https://lore.kernel.org/all/20250131100630.342995-1-chenhuacai@loongson.cn/), [2](https://github.com/AOSC-Tracking/linux/commit/a683c47758586) | Durch das Anwenden dieses Patches wird das Aufwachen per Tastatur für LoongArch-Geräte im ACPI-S3-Modus (Suspend-to-RAM) ermöglicht, allerdings ist bekannt, dass dadurch einige x86-Laptops nicht mehr in den Ruhezustand wechseln können. Patch 2 beschränkt diese Umgehungslösung auf MIPS- und LoongArch64-Plattformen (`MACH_LOONGSON64`). |

</template>

<template #docker>

Docker (Dienstprogramm) unterstützt nun offiziell LoongArch, das in der Regel über das Repository Ihrer Distribution verfügbar ist.

So installieren Sie Docker auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsmethode |
| -------- | -------- |
| AOSC OS | `oma install docker` |
| Arch Linux | `sudo pacman -S docker` |
| Debian und Derivate wie Deepin, openKylin und Loongnix 25 | `sudo apt install docker.io` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install docker` |

:::Typ
In der offiziellen Docker-Registry sind nur wenige LoongArch-Container verfügbar. Loongson Technology unterhält eine [Docker-Image-Repository für LoongArch ABI 2.0](https://lcr.loongnix.cn/). Sie können [Ändern Sie Ihre Docker-Konfiguration](https://docs.docker.com/docker-hub/image-library/mirror/) diese Registrierung nach Bedarf zu nutzen.
:::

</template>

<template #cirunner>

Viele Code-Hosting-Plattformen bieten Unterstützung für CI-Runner, und einige unterstützen LoongArch bereits nativ

### GitHub Actions

Der GitHub Actions Runner konnte aufgrund von [NuGet bietet keine Unterstützung für LoongArch](https://github.com/dotnet/sdk/issues/42248). Wenn Sie diesen CI-Agenten selbst kompilieren und bereitstellen möchten, lesen Sie bitte diese Anleitung [Pull-Anfrage](https://github.com/actions/runner/pull/3928).

### GitLab Runner

GitLab Runner unterstützt LoongArch offiziell. Für die Bereitstellung laden Sie einfach die Pakete oder komprimierten Archive mit dem Tag `loong64` aus seinem [Veröffentlichungsseite](https://gitlab.com/gitlab-org/gitlab-runner/-/releases).

### Gitea act\_runner

Gitea act_runner unterstützt LoongArch offiziell, allerdings sind noch keine LoongArch-Binärdateien verfügbar. Vorerst können Sie das [Quellcode](https://gitea.com/gitea/act_runner) um diesen Runner zu kompilieren und bereitzustellen.

### Forgejo Runner

Forgejo Runner hat die LoongArch-Unterstützung noch nicht integriert. Wenn Sie diesen Runner selbst kompilieren und bereitstellen möchten, lesen Sie bitte diese Anleitung [Pull-Anfrage](https://code.forgejo.org/forgejo/runner/pulls/1144).

### Sourcehut

Sourcehut's CI-Proxy [builds.sr.ht](https://git.sr.ht/~sircmpwn/builds.sr.ht/) unterstützt LoongArch offiziell. Da dieser CI-Runner keine Binärdateien bereitstellt, müssen Sie diesen Runner aus dem Quellcode kompilieren und bereitstellen.

GitHub

Gitee hat die LoongArch-Unterstützung noch nicht integriert. Wenn Sie diesen Runner selbst kompilieren und bereitstellen möchten, sehen Sie sich bitte die folgenden Pull-Anfragen an:

- [gitee-go/utils#1](https://gitee.com/gitee-go/utils/pulls/1)
- [gitee-go/core#1](https://gitee.com/gitee-go/core/pulls/1)
- [gitee-go/runner-core#1](https://gitee.com/gitee-go/runner-core/pulls/1)
- [gitee-go/runner#1](https://gitee.com/gitee-go/runner/pulls/1)

### GitCode

Wie von Mitgliedern der Community angefragt, unterstützt GitCode derzeit keine selbst gehosteten CI-Proxys, weshalb eine Unterstützung von LoongArch zumindest zum jetzigen Zeitpunkt nicht möglich ist.

</template>
</SdkIndex>
