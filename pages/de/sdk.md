---
layout: page
pageTitle: Entwicklerhandbuch
pageSubTitle: Anleitungen und Hinweise zur Entwicklung für LoongArch
---

<script setup lang="ts">
import SdkIndex from "@src/client/components/sdk/SdkIndex.vue"
</script>

Bei der Entwicklung für Nicht-x86-Systeme stellen sich viele vielleicht folgende Frage:

> Wo finde ich das SDK für dieses Gerät?

Dank des Engagements der Community-Mitwirkenden und der Loongson-Ingenieure seit 2021 werden die meisten Toolchains nun vom Upstream-Projekt unterstützt.

> Was bedeutet das?

Das bedeutet, dass der Installationsprozess für verschiedene Programmier-Toolchains nun ähnlich, wenn nicht sogar identisch mit dem auf der x86-Plattform ist – die Installation ist also genauso einfach wie aus den Repositories der Distribution und erfolgt mit nur einer einzigen Befehlszeile!

:::tip
Da ABI 2.0 („New World“) von den meisten Community-Nutzern und Entwicklern verwendet wird, konzentriert sich dieser Leitfaden ausschließlich auf die Vorstellung der Installations- und Konfigurationsverfahren für ABI 2.0-Systeme. ABI 1.0 („Old World“) wird hier nicht behandelt. Sollten Sie sich in einer Situation befinden, in der Sie für ABI 1.0 entwickeln müssen, empfehlen wir Ihnen, diese Entscheidung zu überdenken und die Voraussetzungen dafür zu überprüfen. Sollte dies dennoch erforderlich sein, lesen Sie bitte die Dokumentation unter [Loongson Open-Source-Community (loongnix.cn)](https://www.loongnix.cn/).
:::

---

<SdkIndex>
<template #gnu>

GCC und Binutils unterstützen LoongArch offiziell. Sie sind direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder können mittels Cross-Kompilierung erstellt werden.

:::tip
Hinweis: Neuere Versionen von GCC und Binutils bieten eine verbesserte Unterstützung für LoongArch. Insbesondere wurde mit GCC 14 die Unterstützung für LoongArch-Vektorerweiterungen eingeführt, während Binutils 2.41 die Unterstützung für Linker-Relaxation und später, mit GCC 16, das Medium-Code-Modell einführte (was die Kompatibilität mit größeren Quellprojekten erheblich verbessert). All dies sind entscheidende Funktionserweiterungen. Bitte aktualisieren Sie die Komponenten daher auf mindestens die oben genannten Versionen.

Wenn Sie beabsichtigen, universelle Binärdateien für Projekte zu veröffentlichen oder eine Linux-Distribution zu betreuen, lesen Sie bitte die entsprechenden Spezifikationen und Einschränkungen, die in der [*Softwareentwicklung und Build-Konventionen für LoongArch-Architekturen*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

So installieren Sie die GNU-Toolchain auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install binutils gcc` |
| Arch Linux | `sudo pacman -S binutils gcc` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install build-essential` |
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

:::tip
Hinweis: Neuere Versionen von LLVM bieten eine verbesserte Unterstützung für LoongArch. Mit LLVM 18 wurde die Unterstützung für LoongArch-Vektorerweiterungen eingeführt. Sofern verfügbar, aktualisieren Sie bitte auf diese Version oder eine neuere.

Wenn Sie beabsichtigen, universelle Binärdateien für Projekte zu veröffentlichen oder eine Linux-Distribution zu betreuen, lesen Sie bitte die entsprechenden Spezifikationen und Einschränkungen, die in der [*Softwareentwicklung und Build-Konventionen für LoongArch-Architekturen*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

So installieren Sie LLVM (einschließlich Clang) auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssysteme | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install llvm` |
| Arch Linux | `sudo pacman -S clang llvm` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install clang llvm` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install clang llvm` |

Die LLVM-Toolchain (insbesondere der Clang-Compiler) unterstützt die Cross-Kompilierung nativ. Um diese Toolchain für LoongArch cross-kompilieren zu können, verwenden Sie LLVM Version 17 oder höher und beachten Sie [dieser Artikel](https://clang.llvm.org/docs/CrossCompilation.html) und geben Sie die LoongArch-Zielplattform an (z. B. `loongarch64-unknown-linux-gnu`).

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
| Debian und davon abgeleitete Distributionen wie deepin, openKylin und Loongnix 25 | `sudo apt install rust-all` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install rust cargo` |

</template>

<template #nodejs>

Node.js unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden. Node.js stellt LoongArch-Binärdateien über das [Inoffizielle Versionen](https://unofficial-builds.nodejs.org/) Projekt (mit dem Tag `loong64` Architektur).

So installieren Sie Node.js auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install nodejs` |
| Arch Linux | `sudo pacman -S nodejs` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install nodejs` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install nodejs` |

:::tip
Viele Linux-Distributionen bieten mehrere Versionen von Node.js an, um den Anforderungen verschiedener Anwendungen und Projekte gerecht zu werden. Bitte lesen Sie die Dokumentation Ihrer Distribution und installieren Sie bei Bedarf alternative Node.js-Versionen.
:::

</template>

<template #golang>

Go unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann per Cross-Kompilierung erstellt werden. Das Go-Upstream-Projekt erstellt LoongArch-Binärdateien, die über deren [Seite herunterladen](https://go.dev/dl/).

So installieren Sie Go auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install go` |
| Arch Linux | `sudo pacman -S go` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install golang` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install golang` |

Go unterstützt die Cross-Kompilierung nativ. Ab Go 1.21 befolgen Sie bitte die Anweisungen unter [dieser Artikel](https://go.dev/doc/install/source) und geben Sie die LoongArch-Zielplattform an (d. h., `GOARCH=loong64`), um für LoongArch zu cross-kompilieren.

</template>

<template #python>

Python unterstützt LoongArch offiziell. Es ist direkt über das Repository Ihrer Distribution als Binärdateien verfügbar oder kann mittels Cross-Kompilierung erstellt werden.

So installieren Sie Python auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsverfahren |
| -------- | -------- |
| AOSC OS | `oma install python-3` |
| Arch Linux | `sudo pacman -S python` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install python3` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install python3` |

:::tip
Da für LoongArch noch keine Definition für eine „manylinux“-Baseline vorliegt, enthält das offizielle PyPI-Repository keine Binärdateien für LoongArch. Das bedeutet, dass bei der Installation von PyPI-Modulen mithilfe von `pip`, werden die jeweiligen Module aus dem Quellcode kompiliert, und Sie müssen gegebenenfalls C/C++/Rust-Toolchains installieren.

Loongson Technology betreibt ein PyPI-Binär-Repository für ABI 2.0-Systeme unter [lpypi.loongnix.cn](http://lpypi.loongnix.cn/). Sie können bearbeiten `/etc/pip.conf` zu und legen Sie dieses als Standard-Repository fest. Alternativ können Sie das [long64](https://github.com/loong64) Die Organisation auf GitHub unterhält ein unabhängiges PyPI-Binär-Repository. Informationen zur Konfiguration finden Sie unter [die README-Datei der Organisation](https://github.com/loong64#pypi-repository).
:::

</template>

<template #dotnet>

.NET unterstützt LoongArch offiziell. Da LoongArch innerhalb von .NET jedoch als „von der Community unterstützte Architektur“ eingestuft wird, stellt Microsoft keine Binär-Toolchains für LoongArch bereit.

Die Binärdateien der .NET-Toolchain können jedoch über die folgenden Kanäle bezogen werden:

- [.NET 10 (von Loongson Technology)](https://github.com/loongson/dotnet/releases)
- [.NET 9 (von der Organisation „loongson-community“)](http://github.com/loongson-community/dotnet-unofficial-build/releases)

Für gängige Linux-Distributionen laden Sie einfach das SDK-Paket mit dem RID (.NET Runtime Identifier) herunter. `linux-loongarch64` um die vollständige Toolchain zu erhalten (d. h., `dotnet-runtime-10.0.1-linux-loongarch64.tar.gz`). Eine Anleitung zur Installation des .NET SDK mithilfe von tar-Paketen finden Sie unter [offizielle .NET-Dokumentation](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install).

### Cross-Kompilierung von .NET-Anwendungen für LoongArch

.NET unterstützt von Haus aus die Cross-Kompilierung und die plattformübergreifende Veröffentlichung. Informationen zu .NET 9 oder höher finden Sie unter [dieser Artikel](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog) und geben Sie die Ziel-RID an, unter der .NET-Anwendungen für LoongArch veröffentlicht werden sollen. Da LoongArch jedoch als „von der Community unterstützte Architektur“ für .NET eingestuft ist, hostet NuGet.org keine .NET-Laufzeitpakete für LoongArch, was zu Fehlern beim Erstellen führen kann.

Um dieses Problem zu umgehen, können Sie alle erforderlichen NuGet-Pakete lokal herunterladen und installieren. Laden Sie dazu einfach die folgenden Dateien von den oben genannten Release-Seiten der Toolchain herunter (* kennzeichnet bestimmte Versionsnummern):

- Microsoft.AspNetCore.App.Runtime.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Crossgen2.linux-loongarch64.*.nupkg
Microsoft.NETCore.App.Host.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Runtime.linux-loongarch64.*.nupkg
- runtime.linux-loongarch64.Microsoft.DotNet.ILCompiler.*.nupkg

:::tip
Die von loongson-community/dotnet-unofficial-build bereitgestellte Distribution stuft die oben genannten Dateien als „Release-Artefakte“ ein. Bitte laden Sie dieses Paket herunter, um die oben aufgeführten Komponenten zu erhalten.
:::

Speichern Sie die oben genannten Dateien an einem Ort Ihrer Wahl (z. B. `/data/loongarch64-nupkgs`) und befolgen Sie die Anweisungen in [dieser Artikel](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) um dieses Verzeichnis wie unten gezeigt zu Ihrer NuGet-Quellenliste hinzuzufügen:

```xml
<packageSources>
    <add key="LoongArch64 Packages" value="/data/loongarch64-nupkgs" />
</packageSources>
```

Sie sollten nun in der Lage sein, .NET-Anwendungen für LoongArch cross-zu kompilieren.

### Kompilieren der .NET-Toolchain

Das Kompilieren der .NET-Toolchain selbst ist ein relativ aufwendiger Vorgang. Um den Einstieg zu erleichtern, lesen Sie bitte die [Von Loongson Technology verwendete CI-Build-Skripte](https://github.com/loongson/dotnet/blob/build/.github/workflows/build-sdk10.yml). Diese Methode nutzt das von .NET offiziell für die Kompilierung empfohlene VMR-Quellcode-Paket.

</template>

<template #java>

Aus nicht-technischen Gründen unterstützt Oracle OpenJDK derzeit LoongArch JIT nicht. Zur Installation von Java wird empfohlen, Binärpakete herunterzuladen, die mit dem „Linux 5.10.0-Kernel-UAPI“ kompatibel sind, und zwar auf der [Loongson Open-Source-Community (loongnix.cn)](https://www.loongnix.cn/zh/api/java/) oder über das Repository Ihrer Distribution.

So installieren Sie Java auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsanleitungen |
| -------- | -------- |
| AOSC OS | `oma install openjdk` |
| Arch Linux | `sudo pacman -S java-openjdk` |
| Debian und davon abgeleitete Distributionen wie deepin, openKylin und Loongnix 25 | `sudo apt install default-jdk` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install java-latest-openjdk` |

:::tip
Viele Linux-Distributionen bieten mehrere Versionen von OpenJDK an, um den Anforderungen verschiedener Anwendungen und Projekte gerecht zu werden. Bitte lesen Sie die Dokumentation Ihrer Distribution und installieren Sie bei Bedarf alternative OpenJDK-Versionen.
:::

</template>

<template #kernel>

Der Linux-Kernel unterstützt LoongArch offiziell. Im Allgemeinen verwenden Linux-Distributionen, die auf ABI 2.0 basieren, den Upstream-Kernel (zusammen mit plattformspezifischen Workarounds und anderen Patches, siehe unten). Einige kommerzielle Distributionen liefern jedoch den 6.6 „Longterm“-Kernel mit einer umfangreichen Sammlung plattformspezifischer Patches aus.

:::tip
Der Linux-Kernel unterstützt LoongArch seit Version 5.19. Um jedoch die Hardwarefunktionen und die Leistung von LoongArch voll auszuschöpfen, sollten Sie bitte den neuesten Mainline-Kernel verwenden.
:::

### Referenz zur Kernel-Wartung

Wie oben bereits erwähnt, sind neuere Linux-Kernel aufgrund ihrer besseren Unterstützung für LoongArch-Geräte in der Regel vorzuziehen. Da Distributionen jedoch hinsichtlich von Kernel-Updates unter Umständen ihre eigenen Regeln haben, haben wir die folgende Anleitung als Orientierungshilfe für Sie zusammengestellt.

| Linux-Version | Eingeführte Hauptfunktion |
| ------------- | ---------------------------- |
| 7.1.4 | Korrektur der PCIe-Geschwindigkeit bei 3B6000/3C6000 |
| 7.1.1 | Unterstützung für den ACPI-SystemIO-Bereich |
| 7.1 | Unterstützung für Mehrkanal-DMA der Modelle 2K0300/2K3000/3B6000M |
| 6.18 | Korrekturen für GPIO bei 2K2000/2K3000/3B6000M |
| 6.17 | Unterstützung für DWMAC bei den On-Chip-Netzwerkkarten 2K3000/3B6000M; Behebung eines Problems bei der PWM-Frequenzmodulation |
| 6.16 | Unterstützung für 2K2000/2K3000/3B6000M SDIO |
| 6.14 | Unterstützung für Multiplexing der 3C6000-Familie |
| 6.12 | Unterstützung der 3B6000/3C6000-Familie (erweitertes IRQ-Modell) |
| 6.7 | Virtualisierungsunterstützung |
| 6.4 | Unterstützung für Simultaneous Multi-Threading (SMT) |

### Nicht eingezogene Patches

In der Regel leiten Ingenieure von Loongson Technology und Entwickler aus der Community Hardware-Unterstützung, Optimierungen und Fehlerbehebungen an den Upstream-Kernel (Mainline) weiter. Aus technischen und nicht-technischen Gründen werden einige Patches jedoch nicht übernommen.

Die folgende Tabelle enthält eine Auflistung aller bekannten und wesentlichen Patches, die von verschiedenen nachgelagerten Akteuren (Entwickler, Distributions-Communities usw.) gepflegt werden, und dient zu Ihrer Information (die nachstehende Patch-Liste basiert auf `v7.1.4` und Patches, die bereits in das [vorgelagert](https://git.kernel.org/stable/l/v7.1.4)):

| Beschreibung | Kconfig-Eintrag (hinzugefügt/beeinflusst) | Link | Anmerkungen |
| ----------- | -------------------------------- | ---- | ----- |
| PixArt PS/2-Geräte | Hinzugefügt: `MOUSE_PS2_PIXART` (bool: ja/nein) [1](https://github.com/AOSC-Tracking/linux/commit/f2bb6ff4f797) | Bei Laptops wie dem Tongfang Chaorui L860-T2 und dem EA EXCELSIOR L71, die auf den Chipsätzen 3A5000 und 3A6000 basieren, behebt dieser Patch ein Problem, bei dem die Touchpads fälschlicherweise als PS/2-Mäuse erkannt wurden, wodurch die Unterstützung für Gesten und die Handflächenerkennung nicht mehr funktionierte. |
| HWMon-Unterstützung (Temperaturüberwachung und andere Formen der Hardwareüberwachung) mit CPU-Temperaturregelung für die Loongson-3-Familie | Hinzugefügt: `CPU_HWMON` (bool: ja/nein) | [1](https://github.com/AOSC-Tracking/linux/commit/ab7b90e7808a) | Enthält keine Unterstützung für die Temperaturüberwachung des 7A-Bridge-Chips; auf Plattformen ab 3C6000 wird dieser Sensor durch die Firmware-Version 202511 oder höher bereits als ACPI-Temperaturzone dargestellt, sodass dieser Patch nicht erforderlich ist |
| 2K3000/3B6000M SoC CAN-FD-Bus | Hinzugefügt: `CAN_LSCANFD` (bool: ja/nein), `CAN_LSCANFD_PLATFORM` (Tristate: y/m/n) | [1](https://github.com/AOSC-Tracking/linux/commit/0dc2107b57a2) | Muss zusammen mit einem Linux-Kernel der Version 7.1 oder höher mit Multi-Channel-DMA-Unterstützung verwendet werden |
| Firmware-Unterstützung für BPI1000/1001 („Old World“) | k. A. | [1](https://github.com/AOSC-Tracking/linux/commit/12790a1e5d40), [2](https://github.com/AOSC-Tracking/linux/commit/42046c2ed32d), [3](https://github.com/AOSC-Tracking/linux/commit/12e17687f2f7), [4](https://github.com/AOSC-Tracking/linux/commit/8dd6b7a65a68), [5](https://github.com/AOSC-Tracking/linux/commit/08d7416a7b74), [6](https://github.com/AOSC-Tracking/linux/commit/d83315017a3a), [7](https://github.com/AOSC-Tracking/linux/commit/bb5ee2c6ffd9), [8](https://github.com/AOSC-Tracking/linux/commit/2c89d5c8e77e) | Unverzichtbar für das Booten von ABI2.0-Systemen auf Lenovo Kaitian M540z, Gooxi 3C5000L-Servern mit vier Sockeln sowie bestimmten Plattformen, auf denen von 2020 bis 2022 die Kunlun-Firmware ausgeliefert wurde. |
| Unterstützung für die Auswertung der Takteigenschaften des Loongson-I2C-Controllers und die Anpassung der Busgeschwindigkeit | `CONFIG_LS2X_I2C` | [1](https://github.com/AOSC-Tracking/linux/commit/42d158cdba34) | Das Fehlen dieser Funktion führt bei einigen 3B6000M-Laptops zu Verzögerungen beim Touchpad. |
| Aktualisierung des SMCv2-Firmware-Protokolls | `CONFIG_LOONGSON3_CPUFREQ` | [1](https://github.com/AOSC-Tracking/linux/commit/e838f8194a49) | Fehlt dieses Update, kann dies bei der Firmware-Version 202605 zu einem Startfehler führen, wenn DVFS aktiviert ist; beachten Sie außerdem, dass es sich bei der Version 202605 um eine experimentelle Version handelt |
| Workaround für nicht funktionsfähige GPIOs aufgrund von Gerätebeschreibungen, die nur einer alten Version der *Loongson CPU Unified System Architecture Specification* entsprechen, in der GPIO-Geräte innerhalb von `gsi_idx_map` | `CONFIG_GPIO_LOONGSON_64BIT` | [1](https://github.com/AOSC-Tracking/linux/commit/911ae66f00b3) | Sollte keine Auswirkungen auf die Modelle 2K3000/3B6000M und neuere Produkte haben |
| Abhilfe bei sporadischen Treiberabstürzen, Neustarts und Systemblockaden bei AMD-GCN-1.0–4.0-GPUs auf LoongArch-Plattformen | `CONFIG_DRM_AMDGPU` | [1](https://github.com/AOSC-Tracking/linux/commit/0d9e47e4c3ad) | Der Mechanismus hinter dieser Abhilfe ist unklar (empirischer Patch); die Abhilfe kann diese Probleme nicht vollständig umgehen, sondern verringert lediglich deren Wahrscheinlichkeit; kommerzielle 6.6-Kernel wie Deepin enthalten ein aggressiveres (wenn auch ebenfalls ungeklärtes) Patch-Set. Siehe [Dieser Deepin-Pull-Request](https://github.com/deepin-community/kernel/pull/1215). |
| Abhilfe bei Datenfehlern, die auf 7A-Plattformen bei Verwendung von AMD „Radeon“-Grafiktreibern auftreten (für TeraScale 2 und ältere Grafikkarten) | `CONFIG_DRM_RADEON` | [1](https://github.com/AOSC-Tracking/linux/commit/608cc0997567), [2](https://github.com/AOSC-Tracking/linux/commit/ad49de48bb10), [3](https://github.com/AOSC-Tracking/linux/commit/3381349cf67f) | Der Mechanismus ist unbekannt (die Commit-Meldung ist technisch nicht korrekt), aber wirksam; Patch 3 beschränkt diese Abhilfe auf MIPS- und LoongArch64-Plattformen (`MACH_LOONGSON64`) |
| Den dritten PWM-Regler registrieren `LOON0006:03` auf der 7A2000-Brücke als `gsgpu_backlight` im ACPI-Initialisierungscode auf Board-Ebene zur Unterstützung der LoongGPU-Hintergrundbeleuchtungssteuerung | `CONFIG_PWM_LOONGSON` | [1](https://github.com/AOSC-Tracking/linux/commit/54af59a094a6) | Erforderlicher Patch für die Unterstützung der LoongGPU-Hintergrundbeleuchtung. Informationen zu Patches im Zusammenhang mit dem LoongGPU-Treiber finden Sie unter [AOSC-Tracking/loonggpu-kernel-dkms @ aosc/v1.0.1-alpha-lnd25.5](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commits/aosc/v1.0.1-alpha-lnd25.5/). |
| „Remote Wake“-Unterstützung für USB-Root-Hubs (z. B. USB-Tastaturen, Mäuse und andere Eingabegeräte) aktivieren | `CONFIG_USB` | [1](https://github.com/AOSC-Tracking/linux/commit/a50c62f43a4c), [2](https://github.com/AOSC-Tracking/linux/commit/5e7477d28344) | Durch das Anwenden dieses Patches wird das Aufwachen per Tastatur für LoongArch-Geräte im ACPI-S3-Modus (Suspend-to-RAM) ermöglicht; es ist jedoch bekannt, dass dadurch einige x86-Laptops nicht mehr in den Ruhezustand wechseln können. Patch 2 beschränkt diese Problemumgehung auf MIPS- und LoongArch64-Plattformen (`MACH_LOONGSON64`). |
| Zurücksetzen des Aktivierungsstatus der Hintergrundbeleuchtung in der S3-Ruhezustands-/Wiederherstellungsroutine des loongson-laptop-Treibers | `CONFIG_LOONGSON_LAPTOP` | [1](https://github.com/AOSC-Tracking/linux/commit/1a659eeb6eec) | Behebung des Problems bei der EC-Firmware einiger 3B6000M-Laptops, das dazu führt, dass die Hintergrundbeleuchtung nach dem Aufwachen aus dem S3-Modus deaktiviert ist |
| sc.q bei unregelmäßigem Betrieb erkennen und deaktivieren | k. A. | [1](https://github.com/AOSC-Tracking/linux/commit/1835688d13f3) | Die Abhilfe ist erforderlich, um den Kernel auf einigen fehlerhaften Firmware-Implementierungen der 2K3000/3B6000M-Plattform zu booten, die den LA364E-Kern falsch konfigurieren und dazu führen, dass der Befehl „sc.q“ falsche Daten schreibt; Die Abhilfe ist unvollständig, da Programme im Benutzerbereich möglicherweise weiterhin fehlerhafte Ergebnisse liefern, falls sie die Verwendung von „sc.q“ nicht durch `AT_HWCAP` Bitte prüfen; zur Behebung des Problems wird ein Firmware-Update empfohlen |
| Unterstützung von I2C-HID-Geräten, die als ACPI beschrieben sind `PRP0001` Knoten mit `_DSM` Methode | `CONFIG_I2C_HID_ACPI` | [1](https://github.com/AOSC-Tracking/linux/commit/7f17caafc784) | Bei einigen Laptops, beispielsweise dem Lenovo Kaitian N60d-G1d und dem Inspur Yingzheng, wird das Touchpad auf diese Weise beschrieben, sodass dieser Patch erforderlich ist, damit das Touchpad funktioniert |
| 16-KiB-Seitenunterstützung für Intel Xe | `CONFIG_DRM_XE` | [1](https://github.com/AOSC-Tracking/linux/commit/5ea0f72ba810) [2](https://github.com/AOSC-Tracking/linux/commit/83d9435d7ea5) [3](https://github.com/AOSC-Tracking/linux/commit/699686db06a3) [4](https://github.com/AOSC-Tracking/linux/commit/c10c60ebb46b) [5](https://github.com/AOSC-Tracking/linux/commit/562971810d99) [6](https://github.com/AOSC-Tracking/linux/commit/8b6d67ff4abd) | Für die Verwendung einer Intel-Grafikkarte im 16-KiB-Page-Kernel, den die meisten LoongArch-Distributionen bevorzugen, ist dies erforderlich; es wird jedoch weiterhin nicht empfohlen, eine Intel-Karte für die LoongArch-Plattform zu erwerben, da die Firmware die Intel-Karte nicht als Ausgabegerät nutzen kann |

</template>

<template #docker>

Docker (Dienstprogramm) unterstützt nun offiziell LoongArch, das in der Regel über das Repository Ihrer Distribution verfügbar ist.

So installieren Sie Docker auf gängigen Linux-Distributionen und Betriebssystemen:

| Betriebssystem | Installationsmethode |
| -------- | -------- |
| AOSC OS | `oma install docker` |
| Arch Linux | `sudo pacman -S docker` |
| Debian und davon abgeleitete Distributionen wie Deepin, openKylin und Loongnix 25 | `sudo apt install docker.io` |
| Von Red Hat abgeleitete Distributionen wie Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install docker` |

:::tip
In der offiziellen Docker-Registry sind nur wenige LoongArch-Container verfügbar. Loongson Technology unterhält eine [Docker-Image-Repository für LoongArch ABI 2.0](https://lcr.loongnix.cn/). Du kannst [Passen Sie Ihre Docker-Konfiguration an](https://docs.docker.com/docker-hub/image-library/mirror/) diese Registrierung nach Bedarf zu nutzen.
:::

</template>

<template #cirunner>

Viele Code-Hosting-Plattformen bieten Unterstützung für CI-Runner, und einige unterstützen LoongArch bereits nativ.

### GitHub Actions

Der GitHub Actions Runner konnte aufgrund von […] keine Binär-Releases erstellen. [NuGet bietet keine Unterstützung für LoongArch](https://github.com/dotnet/sdk/issues/42248). Wenn Sie diesen CI-Agenten selbst kompilieren und bereitstellen möchten, lesen Sie bitte diese Anleitung [Pull-Anfrage](https://github.com/actions/runner/pull/3928).

### GitLab Runner

GitLab Runner unterstützt LoongArch nun offiziell. Zur Bereitstellung laden Sie einfach die Pakete oder komprimierten Archive mit dem Tag `loong64` aus seinem [Veröffentlichungsseite](https://gitlab.com/gitlab-org/gitlab-runner/-/releases).

### Gitea act\_runner

Gitea act_runner unterstützt LoongArch offiziell, allerdings sind noch keine LoongArch-Binärdateien verfügbar. Vorerst können Sie das [Quellcode](https://gitea.com/gitea/act_runner) um diesen Runner zu kompilieren und bereitzustellen.

### Forgejo Runner

Forgejo Runner hat die LoongArch-Unterstützung noch nicht integriert. Wenn Sie diesen Runner selbst kompilieren und bereitstellen möchten, lesen Sie bitte diese Anleitung [Pull-Anfrage](https://code.forgejo.org/forgejo/runner/pulls/1144).

### Sourcehut

Sourcehut-CI-Proxy [builds.sr.ht](https://git.sr.ht/~sircmpwn/builds.sr.ht/) unterstützt LoongArch offiziell. Da dieser CI-Runner keine Binärdateien bereitstellt, müssten Sie diesen Runner aus dem Quellcode kompilieren und bereitstellen.

GitHub

Gitee hat die LoongArch-Unterstützung noch nicht integriert. Wenn Sie diesen Runner selbst kompilieren und bereitstellen möchten, beachten Sie bitte die folgenden Pull-Anfragen:

- [gitee-go/utils#1](https://gitee.com/gitee-go/utils/pulls/1)
- [gitee-go/core#1](https://gitee.com/gitee-go/core/pulls/1)
- [gitee-go/runner-core#1](https://gitee.com/gitee-go/runner-core/pulls/1)
- [gitee-go/runner#1](https://gitee.com/gitee-go/runner/pulls/1)

### GitCode

Wie von Mitgliedern der Community angefragt, unterstützt GitCode derzeit keine selbst gehosteten CI-Proxys, weshalb eine Unterstützung von LoongArch zumindest zum jetzigen Zeitpunkt nicht möglich ist.

</template>
</SdkIndex>
