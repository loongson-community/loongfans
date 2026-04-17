---
layout: page
# 返回首页
returnLink: /fr
pageTitle: Guide du développeur
pageSubTitle: Guides et notes sur le développement pour LoongArch
---

<script setup lang="ts">
import SdkIndex from "@src/client/components/sdk/SdkIndex.vue"
</script>

Lorsqu'on développe pour des systèmes autres que x86, beaucoup se posent sans doute la question suivante :

> Où se trouve le SDK de cet appareil ?

Grâce aux efforts des contributeurs de la communauté et des ingénieurs de Loongson depuis 2021, la plupart des chaînes d'outils bénéficient désormais d'un support en amont.

> Qu'est-ce que cela signifie ?

Cela signifie que la procédure d'installation des différentes chaînes d'outils de programmation est désormais similaire, voire identique, à celle de la plateforme x86 : il suffit donc de les installer à partir des dépôts de la distribution, en copiant-collant une simple ligne de commande !

:::tip
Étant donné qu'ABI 2.0 (« New World ») est utilisé par la plupart des utilisateurs et développeurs de la communauté, ce guide se concentre exclusivement sur la présentation des procédures d'installation et de configuration des systèmes ABI 2.0. ABI 1.0 (« Old World ») n'est pas abordé ici. Si vous vous trouvez dans une situation où vous devez développer pour ABI 1.0, nous vous recommandons de reconsidérer ce choix et de vous assurer qu'il est bien justifié. Si cela s'avère nécessaire, veuillez vous reporter à la documentation disponible sur [Communauté open source Loongson (loongnix.cn)](https://www.loongnix.cn/).
:::

---

<SdkIndex>
<template #gnu>

GCC et Binutils prennent officiellement en charge LoongArch. Ils sont disponibles directement depuis le dépôt de votre distribution, sous forme de binaires, ou peuvent être compilés par compilation croisée.

:::tip
Remarque : les versions récentes de GCC et de Binutils offrent une prise en charge améliorée de LoongArch. Notamment, GCC 14 prend désormais en charge les extensions vectorielles de LoongArch, tandis que Binutils 2.41 a introduit la prise en charge de la relaxation de l'éditeur de liens et, plus tard avec GCC 16, du modèle de code moyen (ce qui améliore considérablement la compatibilité avec les projets de code source de grande envergure). Toutes ces améliorations constituent des avancées fonctionnelles essentielles. Nous vous recommandons donc de les mettre à jour au moins vers les versions mentionnées ci-dessus.

Si vous avez l'intention de publier des binaires universels pour des projets ou de gérer une distribution Linux, veuillez lire attentivement les spécifications et les contraintes pertinentes décrites dans le [*Conventions de développement et de compilation pour les architectures LoongArch*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

Pour installer la chaîne d'outils GNU sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install binutils gcc` |
| Arch Linux | `sudo pacman -S binutils gcc` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install build-essential` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install binutils gcc` |

Si vous ne disposez pas d'un appareil LoongArch ou si vous souhaitez effectuer une compilation croisée :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install gcc+cross-loongarch64` |
| Debian 13 et versions ultérieures, Ubuntu 24.04 et versions ultérieures, ainsi que leurs dérivés respectifs | `sudo apt install gcc-loongarch64-linux-gnu` |
| Windows et autres distributions Linux | Veuillez effectuer l'installation à partir du dépôt GitHub [loongson/outils-de-compilation](https://github.com/loongson/build-tools) |

</template>

<template #llvm>

LLVM prend officiellement en charge LoongArch. Il est disponible directement depuis le dépôt de votre distribution, sous forme de binaires, ou peut être compilé par compilation croisée.

:::tip
Remarque : les versions récentes de LLVM offrent une prise en charge améliorée de LoongArch. LLVM 18 a introduit la prise en charge des extensions vectorielles LoongArch. Si cette version est disponible, veuillez effectuer la mise à jour vers cette version ou une version ultérieure.

Si vous avez l'intention de publier des binaires universels pour des projets ou de gérer une distribution Linux, veuillez lire attentivement les spécifications et les contraintes applicables décrites dans le [*Conventions de développement et de compilation pour les architectures LoongArch*](https://github.com/loongson/la-softdev-convention/blob/master/la-softdev-convention.adoc).
:::

Pour installer LLVM (y compris Clang) sur les distributions Linux et les systèmes d'exploitation courants :

| Systèmes d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install llvm` |
| Arch Linux | `sudo pacman -S clang llvm` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install clang llvm` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install clang llvm` |

La chaîne d'outils LLVM (en particulier le compilateur Clang) prend en charge nativement la compilation croisée. Pour compiler cette chaîne d'outils pour LoongArch, utilisez la version 17 ou une version ultérieure de LLVM et consultez [cet article](https://clang.llvm.org/docs/CrossCompilation.html) et spécifiez la cible LoongArch (par exemple, `loongarch64-unknown-linux-gnu`).

</template>

<template #rust>

Rust prend officiellement en charge LoongArch. Il est disponible directement depuis le dépôt de votre distribution, sous forme de binaires, ou peut être compilé par compilation croisée.

Rust recommande d'utiliser [rouiller](https://rustup.rs/) Pour installer la chaîne d'outils Rust :

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Pour installer Rust (rustc) et le gestionnaire de paquets Cargo sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install rustc` |
| Arch Linux | `sudo pacman -S rustc` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install rust-all` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install rust cargo` |

</template>

<template #nodejs>

Node.js prend officiellement en charge LoongArch. Il est disponible directement depuis le dépôt de votre distribution, sous forme de binaires, ou peut être compilé par compilation croisée. Node.js fournit des binaires LoongArch via le [Versions non officielles](https://unofficial-builds.nodejs.org/) projet (étiqueté comme le `loong64` (architecture)).

Pour installer Node.js sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install nodejs` |
| Arch Linux | `sudo pacman -S nodejs` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install nodejs` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install nodejs` |

:::tip
De nombreuses distributions Linux proposent plusieurs versions de Node.js afin de répondre aux besoins de différentes applications et de différents projets. Veuillez consulter la documentation de votre distribution et installer d'autres versions de Node.js si nécessaire.
:::

</template>

<template #golang>

Go prend officiellement en charge LoongArch. Il est disponible directement depuis le dépôt de votre distribution, sous forme de binaires, ou peut être compilé par compilation croisée. L'équipe en amont de Go compile des binaires LoongArch, qui sont disponibles sur leur [Télécharger la page](https://go.dev/dl/).

Pour installer Go sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install go` |
| Arch Linux | `sudo pacman -S go` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install golang` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install golang` |

Go prend en charge nativement la compilation croisée. À partir de Go 1.21, suivez les instructions décrites dans [cet article](https://go.dev/doc/install/source) et spécifier la cible LoongArch (c'est-à-dire, `GOARCH=loong64`) pour effectuer une compilation croisée pour LoongArch.

</template>

<template #python>

Python prend officiellement en charge LoongArch. Il est disponible directement depuis le dépôt de votre distribution, sous forme de binaires, ou peut être compilé par compilation croisée.

Pour installer Python sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédure d'installation |
| -------- | -------- |
| AOSC OS | `oma install python-3` |
| Arch Linux | `sudo pacman -S python` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install python3` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install python3` |

:::tip
Étant donné que LoongArch ne dispose pas encore d'une définition pour une version de référence « manylinux », le dépôt officiel PyPI n'héberge pas de binaires pour LoongArch. Cela signifie que lors de l'installation de modules PyPI à l'aide de `pip`, les modules correspondants seront compilés à partir du code source et vous devrez peut-être installer les chaînes d'outils C/C++/Rust si nécessaire.

Loongson Technology héberge un dépôt binaire PyPI pour les systèmes ABI 2.0 à l'adresse [lpypi.loongnix.cn](http://lpypi.loongnix.cn/). Vous pouvez modifier `/etc/pip.conf` vers et définir celui-ci comme référentiel par défaut. Sinon, le [64 bits](https://github.com/loong64) Cette organisation sur GitHub gère un dépôt binaire PyPI indépendant. Pour connaître les procédures de configuration, veuillez consulter [le fichier README de l'organisation](https://github.com/loong64#pypi-repository).
:::

</template>

<template #dotnet>

.NET prend officiellement en charge LoongArch. Cependant, LoongArch étant classée comme une « architecture prise en charge par la communauté » au sein de .NET, Microsoft ne fournit pas de chaînes d'outils binaires pour LoongArch.

Cependant, les fichiers binaires de la chaîne d'outils .NET peuvent être obtenus par les moyens suivants :

- [.NET 10 (de Loongson Technology)](https://github.com/loongson/dotnet/releases)
- [.NET 9 (par l'organisation loongson-community)](http://github.com/loongson-community/dotnet-unofficial-build/releases)

Pour les distributions Linux courantes, il suffit de télécharger le package SDK avec le RID (identifiant du runtime .NET) `linux-loongarch64` pour obtenir la chaîne d'outils complète (c'est-à-dire, `dotnet-runtime-10.0.1-linux-loongarch64.tar.gz`). Pour savoir comment installer le SDK .NET à l'aide de paquets tar, consultez le [documentation officielle de .NET](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#manual-install).

### Compilation croisée d'applications .NET pour LoongArch

.NET prend en charge nativement la compilation croisée et la publication multiplateforme. À partir de .NET 9, consultez [cet article](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog) et spécifiez le RID cible pour publier des applications .NET destinées à LoongArch. Cependant, LoongArch étant classée comme une « architecture prise en charge par la communauté » pour .NET, NuGet.org n'héberge pas de paquets d'exécution .NET destinés à LoongArch, ce qui peut entraîner des échecs de compilation.

Pour contourner ce problème, vous pouvez télécharger et installer localement tous les paquets NuGet nécessaires. Pour ce faire, il vous suffit de télécharger les fichiers suivants à partir des pages de publication de la chaîne d'outils mentionnées ci-dessus (* indique les numéros de version spécifiques) :

- Microsoft.AspNetCore.App.Runtime.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Crossgen2.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Host.linux-loongarch64.*.nupkg
- Microsoft.NETCore.App.Runtime.linux-loongarch64.*.nupkg
- runtime.linux-loongarch64.Microsoft.DotNet.ILCompiler.*.nupkg

:::tip
La distribution fournie par loongson-community/dotnet-unofficial-build classe les fichiers susmentionnés dans la catégorie « artefacts de version ». Veuillez télécharger ce paquet pour obtenir les composants énumérés ci-dessus.
:::

Placez les fichiers ci-dessus dans un répertoire de votre choix (par exemple, `/data/loongarch64-nupkgs`) et suivez les instructions données dans [cet article](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) pour ajouter ce répertoire à votre liste de sources NuGet, comme indiqué ci-dessous :

```xml
<packageSources>
    <add key="LoongArch64 Packages" value="/data/loongarch64-nupkgs" />
</packageSources>
```

Vous devriez désormais pouvoir compiler des applications .NET pour LoongArch.

### Compilation de la chaîne d'outils .NET

La compilation de la chaîne d'outils .NET est en soi un processus relativement complexe. Pour faciliter votre prise en main, veuillez consulter le [Scripts de compilation CI utilisés par Loongson Technology](https://github.com/loongson/dotnet/blob/build/.github/workflows/build-sdk10.yml). Cette méthode utilise le package de distribution des sources VMR officiellement recommandé par .NET pour la compilation.

</template>

<template #java>

Pour des raisons non techniques, Oracle OpenJDK ne prend actuellement pas en charge le JIT LoongArch. Pour installer Java, il est recommandé de télécharger les paquets binaires compatibles avec le « noyau Linux 5.10.0 UAPI » sur le [Communauté open source Loongson (loongnix.cn)](https://www.loongnix.cn/zh/api/java/) ou via le dépôt de votre distribution.

Pour installer Java sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Procédures d'installation |
| -------- | -------- |
| AOSC OS | `oma install openjdk` |
| Arch Linux | `sudo pacman -S java-openjdk` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install default-jdk` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install java-latest-openjdk` |

:::tip
De nombreuses distributions Linux proposent plusieurs versions d'OpenJDK afin de répondre aux besoins de différentes applications et de différents projets. Veuillez consulter la documentation de votre distribution et installer d'autres versions d'OpenJDK si nécessaire.
:::

</template>

<template #kernel>

Le noyau Linux prend officiellement en charge LoongArch. En règle générale, les distributions Linux basées sur l'ABI 2.0 utilisent le noyau en amont (accompagné de solutions de contournement spécifiques à la plate-forme et d'autres correctifs, voir ci-dessous). Cependant, certaines distributions commerciales fournissent le noyau 6.6 « longterm » avec un ensemble complet de correctifs spécifiques à la plate-forme.

:::tip
Le noyau Linux prend en charge LoongArch depuis la version 5.19. Toutefois, pour tirer pleinement parti des capacités matérielles et des performances de LoongArch, veuillez utiliser la dernière version du noyau principal.
:::

### Guide de maintenance du noyau

Comme indiqué plus haut, les versions récentes du noyau Linux sont généralement préférables, car elles offrent une meilleure prise en charge des appareils LoongArch. Cependant, comme les distributions peuvent avoir leurs propres règles en matière de mises à jour du noyau, nous avons élaboré le guide ci-dessous à titre de référence.

| Version Linux | Nouveauté principale |
| ------------- | ---------------------------- |
| 6.18 | Corrections GPIO pour les modèles 2K2000/2K3000/3B6000M |
| 6.17 | Prise en charge DWMAC pour la carte réseau intégrée 2K3000/3B6000M ; correction de la modulation de fréquence PWM |
| 6.16 | Prise en charge SDIO pour les modèles 2K2000/2K3000/3B6000M |
| 6.14 | Prise en charge du multiplexage de la famille 3C6000 |
| 6.12 | Prise en charge de la famille 3B6000/3C6000 (modèle IRQ étendu avancé) |
| 6.7 | Prise en charge de la virtualisation |
| 6.4 | Prise en charge du multithreading simultané (SMT) |

### Correctifs non fusionnés

En règle générale, les ingénieurs de Loongson Technology et les développeurs de la communauté soumettent au noyau en amont (branche principale) des correctifs visant à assurer la prise en charge matérielle, des optimisations et des corrections. Cependant, pour des raisons techniques ou non techniques, certains correctifs ne sont pas intégrés.

Le tableau suivant répertorie tous les correctifs connus et indispensables gérés par divers acteurs en aval (développeurs, communautés de distribution, etc.), à titre de référence (la liste de correctifs ci-dessous est basée sur `v6.19-rc1` et n'incluez pas les correctifs déjà soumis à l'amont [longue voûte](https://lore.kernel.org/loongarch) (liste de diffusion)):

| Description | Type | Entrée Kconfig | Lien | Remarques |
| ----------- | ---- | ------------- | ---- | ----- |
| Périphériques PixArt PS/2 | Fonctionnalités | `MOUSE_PS2_PIXART` (booléen : oui/non) | [1](https://lore.kernel.org/loongarch/20251127080203.3218018-1-zhoubinbin@loongson.cn/) | Pour les ordinateurs portables tels que le Tongfang Chaorui L860-T2 et l'EA EXCELSIOR L71 équipés des puces 3A5000 et 3A6000, ce correctif résout un problème qui entraînait l'identification erronée des pavés tactiles comme des souris PS/2, ce qui empêchait la prise en charge des gestes et de la détection de la paume. |
| Prise en charge HWMon (surveillance thermique et autres formes de surveillance matérielle), permettant le contrôle thermique du processeur pour la gamme Loongson 3 | Fonctionnalité | `CPU_HWMON` (booléen : oui/non) | [1](https://github.com/chenhuacai/linux/commit/2a6c1c74d93a21613a523aebc6494d654f35cf1a) | Ne prend pas en charge la surveillance thermique de la puce du pont 7A ; ce correctif peut entraîner `sensors(1)` pour lire les données et les capteurs de température défectueux sur des plateformes SoC telles que les 2K3000/3B6000M. |
| Contrôleur DMA multicanal | Caractéristique | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/87e13f54db61f) | |
| SoC 2K3000/3B6000M avec bus CAN-FD | Fonctionnalité | `CAN_LSCANFD` (booléen : oui/non), `CAN_LSCANFD_PLATFORM` (tristate : y/m/n) | [1](https://github.com/AOSC-Tracking/linux/commit/905bf46bcebfb) | Doit être utilisé avec le correctif pour le contrôleur DMA multicanal |
| Prise en charge du micrologiciel BPI1000/1001 (« Old World ») | Fonctionnalité | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/06e031656e659), [2](https://github.com/AOSC-Tracking/linux/commit/6a2eb415543d7), [3](https://github.com/AOSC-Tracking/linux/commit/56209fafa1832), [4](https://github.com/AOSC-Tracking/linux/commit/85a8b0edaf388), [5](https://github.com/AOSC-Tracking/linux/commit/16f5059f8b43d), [6](https://github.com/AOSC-Tracking/linux/commit/7d80610d12846), [7](https://github.com/AOSC-Tracking/linux/commit/ecd26b294d80e), [8](https://github.com/AOSC-Tracking/linux/commit/1c92272af179f) | Indispensable pour démarrer les systèmes ABI 2.0 sur les serveurs à quatre sockets Lenovo Kaitian M540z et Gooxi 3C5000L, ainsi que sur certaines plateformes équipées du micrologiciel Kunlun commercialisées entre 2020 et 2022. |
| Problème de détection de la vitesse du bus PCIe sur certains processeurs des familles 3B6000 et 3C6000, où les vitesses PCIe étaient incorrectement limitées à PCIe 1.0 | Solution de contournement | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/ae2697f19a371) | L'étendue de l'impact des versions/lots du processeur n'est pas claire. Pour plus de détails, voir [l'explication ici](@/guides/errata-desktop-and-server.html#pcie-speed-negotiation-issue-with-early-3b6000-3c6000-steppings) |
| Solution de contournement pour les GPIO inopérants en raison de descriptions de périphériques non conformes à la *Spécification d'architecture système unifiée du processeur Loongson*, dans laquelle les périphériques GPIO étaient décrits au sein de `gsi_idx_map` | Solution de contournement | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/71068c266d426) | Ne devrait pas affecter les modèles 2K3000/3B6000M et les versions ultérieures |
| Solution de contournement pour les plantages, réinitialisations et blocages intermittents du pilote avec les GPU AMD GCN 1.0–4.0 sur les plateformes LoongArch | Solution de contournement | N/A | [1](https://lore.kernel.org/all/20240617105846.1516006-1-uwu@icenowy.me/) | Le mécanisme à l'origine de ce correctif n'est pas clair (correctif empirique) ; les noyaux 6.6 commerciaux, comme celui de Deepin, intègrent un ensemble de correctifs plus agressif (mais tout aussi inexpliqué). Voir [cette demande de modification Deepin](https://github.com/deepin-community/kernel/pull/1215). |
| Solution de contournement pour les erreurs de données sur les plateformes 7A lors de l'utilisation des pilotes graphiques AMD « Radeon » (pour les cartes graphiques TeraScale 2 et antérieures) | Solution de contournement | N/A | [1](https://github.com/chenhuacai/linux/commit/6266d0082b020ad68a3b3c6f314ba299b9d06d3d), [2](https://lore.kernel.org/all/20240220074958.3288170-1-chenhuacai@loongson.cn/), [3](https://github.com/AOSC-Tracking/linux/commit/3b730340dee61) | Mécanisme inconnu mais efficace ; le correctif 3 limite cette solution de contournement aux plateformes MIPS et LoongArch64 (`MACH_LOONGSON64`) |
| Enregistrer le troisième contrôleur PWM `LOON0006:03` sur le pont 7A2000 en tant que `gsgpu_backlight` dans le code d'initialisation ACPI au niveau de la carte pour prendre en charge le contrôle du rétroéclairage par LoongGPU | Solution de contournement | N/A | [1](https://github.com/AOSC-Tracking/linux/commit/6a22acfd684e4) | Correctif préalable pour la prise en charge du rétroéclairage par LoongGPU. Pour les correctifs liés au pilote LoongGPU, veuillez consulter [AOSC-Tracking/loonggpu-kernel-dkms @ aosc/v1.0.1-alpha-lnd25.5](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commits/aosc/v1.0.1-alpha-lnd25.5/). |
| Activer la prise en charge du « réveil à distance » pour les concentrateurs USB de niveau supérieur (tels que les claviers, souris et autres périphériques d'entrée USB) | Solution de contournement | N/A | [1](https://lore.kernel.org/all/20250131100630.342995-1-chenhuacai@loongson.cn/), [2](https://github.com/AOSC-Tracking/linux/commit/a683c47758586) | L'application de ce correctif active la sortie de veille via le clavier pour les appareils LoongArch en mode ACPI S3 (mise en veille en RAM), mais il est connu pour empêcher certains ordinateurs portables x86 de passer en mode veille. Le correctif 2 limite cette solution de contournement aux plateformes MIPS et LoongArch64 (`MACH_LOONGSON64`). |

</template>

<template #docker>

Docker (utilitaire) prend désormais officiellement en charge LoongArch, généralement disponible dans le dépôt de votre distribution.

Pour installer Docker sur les distributions Linux et les systèmes d'exploitation courants :

| Système d'exploitation | Méthode d'installation |
| -------- | -------- |
| AOSC OS | `oma install docker` |
| Arch Linux | `sudo pacman -S docker` |
| Debian et ses dérivés tels que Deepin, openKylin et Loongnix 25 | `sudo apt install docker.io` |
| Distributions dérivées de Red Hat telles que Fedora LoongArch Remix, openEuler, Anolis OS, OpenCloudOS | `sudo dnf install docker` |

:::tip
Il n'y a que très peu de conteneurs LoongArch disponibles dans le registre officiel de Docker. Loongson Technology gère un [Référentiel d'images Docker destiné à l'ABI 2.0 de LoongArch](https://lcr.loongnix.cn/). Vous pouvez [modifier votre configuration Docker](https://docs.docker.com/docker-hub/image-library/mirror/) pour utiliser ce registre selon les besoins.
:::

</template>

<template #cirunner>

De nombreuses plateformes d'hébergement de code prennent en charge les exécuteurs d'intégration continue, et certaines prennent déjà en charge LoongArch de manière native

### GitHub Actions

Le runner GitHub Actions n'a pas pu générer de versions binaires en raison de [NuGet ne prend pas en charge LoongArch](https://github.com/dotnet/sdk/issues/42248). Si vous souhaitez compiler et déployer cet agent CI vous-même, veuillez consulter ce [demande de modification](https://github.com/actions/runner/pull/3928).

### GitLab Runner

GitLab Runner prend officiellement en charge LoongArch. Pour effectuer le déploiement, il suffit de télécharger et d'installer les paquets ou les archives compressées portant la balise `loong64` à partir de son [page de lancement](https://gitlab.com/gitlab-org/gitlab-runner/-/releases).

### Gitea act\_runner

Gitea act_runner prend officiellement en charge LoongArch, bien que les binaires LoongArch ne soient pas encore disponibles. Pour l'instant, vous pouvez cloner le [source code](https://gitea.com/gitea/act_runner) pour compiler et déployer ce runner.

### Forgejo Runner

Forgejo Runner n'a pas encore intégré la prise en charge de LoongArch. Si vous souhaitez compiler et déployer ce runner vous-même, veuillez vous reporter à ce document [demande de modification](https://code.forgejo.org/forgejo/runner/pulls/1144).

### Sourcehut

Sourcehut's CI proxy [builds.sr.ht](https://git.sr.ht/~sircmpwn/builds.sr.ht/) prend officiellement en charge LoongArch. Étant donné que ce moteur de CI ne distribue pas de binaires, vous devrez le compiler et le déployer à partir du code source.

GitHub

Gitee n'a pas encore intégré la prise en charge de LoongArch. Si vous souhaitez compiler et déployer ce runner vous-même, veuillez vous reporter aux pull requests suivantes :

- [gitee-go/utils#1](https://gitee.com/gitee-go/utils/pulls/1)
- [gitee-go/core#1](https://gitee.com/gitee-go/core/pulls/1)
- [gitee-go/runner-core#1](https://gitee.com/gitee-go/runner-core/pulls/1)
- [gitee-go/runner#1](https://gitee.com/gitee-go/runner/pulls/1)

### GitCode

Comme l'ont demandé certains membres de la communauté, GitCode ne prend actuellement pas en charge les proxys CI auto-hébergés ; il n'est donc pas possible de prendre en charge LoongArch, du moins pour l'instant.

</template>
</SdkIndex>
