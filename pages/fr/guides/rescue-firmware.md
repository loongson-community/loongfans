---
layout: page
returnLink: /fr/guides
pageTitle: Récupération du micrologiciel
pageSubTitle: Récupération d'un matériel qui ne démarre plus après une mise à jour du micrologiciel
---

# Récupération d'un micrologiciel endommagé à l'aide d'un programmateur

## Avant de commencer

Si vous consultez cette page, c'est probablement que votre matériel n'a pas démarré à cause d'une erreur lors de la mise à jour ou de la réécriture du micrologiciel. Ce guide vous aidera à réécrire le micrologiciel à l'aide d'un programmateur.

Avant de commencer, assurez-vous de disposer des outils suivants :

1. Un autre ordinateur en état de marche
2. Logiciel de programmation CH341A USB
3. Clip ou sonde SOIC-8 (la plupart des puces Flash SPI sont de type SOP8-208mil). Pour les cartes mères ASUS, utilisez le câble de flashage ASUS dédié
4. Module abaisseur de tension 1,8 V (la plupart des cartes mères Loongson utilisent une mémoire Flash de 1,8 V). Inutile si vous avez vérifié que votre mémoire Flash est bien de 3,3 V ou 5 V
5. Pour les puces Flash situées sous le dissipateur du processeur, vous aurez également besoin de pâte thermique pour remettre le dissipateur en place après la réparation

Assurez-vous également d'avoir installé les logiciels requis :

1. **Windows** : Installez le pilote CH341A. Nous vous recommandons [NeoProgrammer avec une base de données de puces mise à jour (source : forum Enshan Wireless)](https://www.right.com.cn/FORUM/thread-8289988-1-1.html)
2. **macOS / Linux** : Utilisez [IMSProg](https://github.com/bigbigmdm/IMSProg)

Avant de procéder à la mise à jour du firmware, assemblez le programmateur comme décrit ci-dessous. Nous prenons comme exemples le processeur Loongson XA61200 et la carte mère ASUS XC-LS3A6M.

## Télécharger le micrologiciel et vérifier son hachage

La plupart des produits courants se trouvent dans le [base de données des produits](https://loongfans.cn/devices). Si vous ne trouvez pas le micrologiciel correspondant à votre modèle, veuillez contacter votre distributeur.

**Vérifiez toujours la somme de contrôle** après le téléchargement ; sinon, la carte risque de ne pas démarrer.

> Remarque : si vous téléchargez depuis le site d'ASUS, vérifiez le fichier ZIP, car ASUS fournit les hachages SHA-256 pour les archives ZIP. Cela n'a aucune incidence sur le processus de flashage. Une fois la vérification effectuée, extrayez l'archive, car le logiciel de flashage ne prend pas automatiquement en charge les fichiers compressés.

Sous Windows, nous recommandons OpenHashTab pour la vérification :

![](/images/guides/rescue-firmware/verify-with-openhashtab.webp)

Sous macOS ou sur les distributions Linux, utilisez la commande `sha256sum` commande :

```bash
# Example with ASUS XC‑LS3A6M version 1402
sha256sum XC-LS3A6M-1402.7z
echo "7B435CA09F34088D6922BD82C9A46945E57A93BC4E3C24016BCE8FC19826E0AF XC-LS3A6M-1402.7z" | sha256sum -c
# Output: XC-LS3A6M-1402.7z: OK
```

## Assembler et brancher le programmateur

Vérifiez le marquage de la mémoire Flash SPI sur votre carte mère pour confirmer ses caractéristiques techniques. Le tableau suivant répertorie les cartes mères courantes et leurs puces Flash (sous réserve de modifications liées aux lots de production) :

| Carte mère | Modèle de flash | Fabricant | Tension | Modèle alternatif (pour le flashage) |
| ----------- | ----------- | ------------ | ------- | -------------------------------- |
| XA61200 / XA61201 | GD25LQ64E | GigaDevice | 1,8 V | |
| XB612B0_V1.1 / XB612B0_V1.2 | GD25LQ64E | GigaDevice | 1,8 V | |
| XC‑LS3A6M | W25Q128JW | Winbond | 1,8 V | W25Q128FW |

Assemblez ensuite le programmateur en suivant le schéma. Les broches doivent correspondre exactement, en commençant par la broche 1. En général, le point ou l'encoche sur la puce Flash SPI indique la broche 1.

:::warning
**Important** : Vérifiez au préalable le modèle de la mémoire Flash. Les puces de 1,8 V ne peuvent pas fonctionner à 3,3 V ou 5 V. Certains outils de programmation peuvent les détecter normalement sans avertissement, mais **forcer une écriture à une tension incorrecte peut détruire la puce Flash !**

Si vous disposez d'une puce de 1,8 V, installez le module abaisseur (le module vert illustré sur la photo).
:::

![](/images/guides/rescue-firmware/setup-programmer.webp)

## Connecter la puce Flash

### Utilisation d'un clip ou d'une sonde SOP-8

Alignez les broches du clip ou de la sonde conformément au schéma. Ces connecteurs sont marqués pour indiquer la position de départ (la broche n° 1 du clip est généralement rouge ; la broche n° 1 de la sonde correspond au côté noir — consultez votre fournisseur pour plus de détails).

![](/images/guides/rescue-firmware/connect-flash-with-probe-i.webp)

![](/images/guides/rescue-firmware/connect-flash-with-probe-ii.webp)

Une fois la connexion établie, branchez l'autre extrémité du câble sur le programmateur en respectant l'ordre indiqué. **Si vous utilisez une sonde, assurez-vous que la connexion est bien serrée afin d'éviter tout échec de la programmation dû à un mauvais contact.**

### Utilisation d'une prise de test

Si votre carte mère est équipée d'un double BIOS (comme les modèles XA61200 et XB612B0) et que la puce Flash SPI secondaire est amovible, comme illustré ci-dessous, vous pouvez utiliser un socle de test SOP8 pour la mise à jour du BIOS.

Après avoir retiré la puce Flash de son emplacement, vérifiez la position de la broche 1 (marquée d'un ① sur l'image) afin d'éviter toute installation incorrecte qui empêcherait le démarrage.

![](/images/guides/rescue-firmware/flash-in-socket.webp)

:::warning
**Remarque** : pour les cartes mères dotées d'un double BIOS, vérifiez que le cavalier indiqué par le numéro ② sur l'image ci-dessus est correctement positionné. **Ce réglage détermine le firmware et les paramètres qui seront utilisés au démarrage.**

En règle générale, sur les cartes mères XA61200 et XB612B0, le cavalier fonctionne comme suit :
![](/images/guides/rescue-firmware/bios-switch.png)

Si le cavalier est placé sur les broches 1 et 2, le démarrage s'effectue à partir de la puce SPI Flash intégrée ; s'il est placé sur les broches 2 et 3, le démarrage s'effectue à partir de la puce SPI Flash enfichable.
:::

Une fois retiré, installez le circuit intégré dans le socle de test comme indiqué :

![](/images/guides/rescue-firmware/connect-flash-with-test-stand.webp)

Une fois installé, connectez la prise de test au programmateur dans le bon ordre.

### (Cartes mères ASUS uniquement) Utilisation du câble de mise à jour dédié

Sur les cartes mères ASUS, la puce Flash SPI qui contient le micrologiciel du BIOS se trouve près du processeur, sous le dissipateur thermique. Vous devez retirer le dissipateur thermique ; l'emplacement de la puce est indiqué ci-dessous :

![](/images/guides/rescue-firmware/asus-spi-flash.webp)

Insérez le câble de programmation dédié dans le connecteur situé au-dessus de la mémoire SPI Flash. **Veillez à ce que le côté du connecteur marqué en blanc soit aligné avec le repère blanc situé dans le coin inférieur gauche de la carte mère (ceci indique la position de départ) :**

![](/images/guides/rescue-firmware/asus-connect-flash.webp)

Branchez l'autre extrémité du câble au programmateur comme d'habitude.

## Mettre à jour le micrologiciel

Une fois le programmateur assemblé et connecté à la puce Flash, branchez-le à votre ordinateur et sélectionnez le logiciel de programmation adapté à votre système d'exploitation.

### Utilisation de NeoProgrammer (Windows)

Avant d'utiliser NeoProgrammer, installez le pilote fourni avec le logiciel (qui se trouve dans `(software root)\Drivers\CH341A`). Exécuter `DRVSETUP64.exe` et cliquez sur `安装`.

![](/images/guides/rescue-firmware/install-driver-windows.png)

Vérifiez ensuite dans le Gestionnaire de périphériques que le périphérique suivant apparaît, ce qui indique que l'installation s'est déroulée correctement :

![](/images/guides/rescue-firmware/check-ch341a-windows.png)

Ensuite, identifiez le modèle de votre programmateur CH341A et sélectionnez-le dans la `Hardware` menu. Les modèles les plus vendus sont `CH341 Black`:

![](/en/images/guides/rescue-firmware/select-programmer.png)

::: tip
Étant donné que les paramètres par défaut de NeoProgrammer fournis par le forum Enshan Wireless sont configurés en chinois, et que NeoProgrammer prend en charge plusieurs langues, vous trouverez cette option dans le `语言设置`.

![](/en/images/guides/rescue-firmware/change-language.webp)
:::

Suivez les étapes numérotées indiquées sur le schéma :

![](/en/images/guides/rescue-firmware/neoprogrammer.webp)

1. Cliquez sur `Open File` et sélectionnez le fichier du micrologiciel correspondant à votre carte mère (**remarque : renommez l'extension en `.bin`**)
   ![](/images/guides/rescue-firmware/select-firmware-windows.png)

2. Cliquez sur `Detect` pour identifier le modèle de la puce Flash connectée. Si le modèle exact ne figure pas dans la base de données, vous pouvez en choisir un similaire (par exemple, `W25Q128JW` peut être remplacé par `W25Q128FW`). Il s'agit généralement simplement de différentes versions présentant des paramètres identiques.
   ![](/en/images/guides/rescue-firmware/detect-flashid-neoprogrammer.png)

3. Cliquez sur `Erase` pour effacer complètement le micrologiciel endommagé. Une fois l'effacement terminé, vous pouvez, si vous le souhaitez, cliquer sur `BlankCheck` pour vérifier que la puce Flash est vide. Si les deux renvoient `Success`, vous pouvez passer à l'étape suivante.

4. Cliquez sur `Write` pour enregistrer le fichier de micrologiciel ouvert sur la puce Flash. Par défaut, le logiciel effectue l'écriture et la vérification de manière séquentielle jusqu'à ce que `Success` est renvoyée. **Veillez à maintenir une connexion stable tout au long du processus ; sinon, des résultats inattendus pourraient se produire.**

5. (Facultatif) Cliquez sur `Verify` pour vérifier que le contenu écrit correspond bien au fichier du micrologiciel.

### Utilisation d'IMSProg (macOS, Linux)

Les noyaux Linux intègrent déjà des pilotes CH341 dans leur branche principale ; il n'est donc généralement pas nécessaire d'installer un pilote supplémentaire.

Pour macOS, [télécharger le pilote depuis le site officiel](https://www.wch.cn/downloads/CH34XSER_MAC_ZIP.html).

IMSProg n'est pas inclus dans la plupart des distributions. S'il est disponible, essayez d'abord de l'installer à partir du dépôt de votre distribution :

```bash
# Debian (13/14/sid)
sudo apt install imsprog

# Ubuntu
sudo add-apt-repository ppa:bigmdm/imsprog
sudo apt update
sudo apt install imsprog

# Fedora
sudo dnf install imsprog

# ArchLinux AUR
yay -S imsprog
```

Si votre distribution ne le fournit pas, compilez-le à partir du code source :

```bash
# AOSC OS
sudo oma install cmake gcc libusb qt-5 pkgconf wget zenity

# macOS (Homebrew)
brew install qt@5 libusb cmake pkgconf wget zenity

# Compiling all
git clone https://github.com/bigbigmdm/IMSProg.git && cd IMSProg
chmod +x build_all.sh
sudo ./build_all.sh # omit sudo on macOS
```

Une fois l'installation terminée, vous pouvez lancer IMSProg depuis le menu de votre application.

Une fois que vous avez commencé, suivez les étapes numérotées indiquées sur le schéma :

![](/en/images/guides/rescue-firmware/imsprog.webp)

1. Cliquez sur `Open` et sélectionnez le fichier du micrologiciel correspondant à votre carte mère (**remarque : comme avec NeoProgrammer, renommez l'extension en `.bin`**)

2. Cliquez sur `Detect` pour identifier le modèle de la puce Flash connectée. Si le modèle exact ne figure pas dans la base de données, utilisez un modèle similaire, comme indiqué ci-dessus.

3. Cochez les trois cases à gauche, puis cliquez sur `Go!` pour commencer à flasher le micrologiciel sur la puce Flash. **Veillez à ce que la connexion reste stable tout au long du processus ; sinon, des résultats inattendus pourraient se produire.**

## Vérifier la restauration

Débranchez tous les outils ou câbles de la puce Flash. Si vous avez retiré le dissipateur thermique, nettoyez les résidus de pâte thermique sur le processeur, appliquez de la pâte neuve, puis remettez le dissipateur en place.

Branchez le câble d'alimentation comme d'habitude, installez les modules de mémoire vive et le périphérique de stockage, branchez le clavier, la souris et l'écran, puis mettez l'appareil sous tension. Si le `LOONGSON 龙芯` Lorsque le logo s'affiche, cela signifie que la restauration a réussi.
