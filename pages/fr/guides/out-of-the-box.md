---
layout: page
returnLink: /fr/guides
pageTitle: Pour commencer
pageSubTitle: Votre guide, du déballage jusqu'à votre satisfaction
---

# Avant la mise sous tension : de quoi d'autre ai-je besoin ?

Les appareils Loongson sont généralement vendus sous forme d'« ensembles carte mère et processeur » (c'est-à-dire que la carte mère et le processeur sont vendus ensemble). Outre l'achat d'un système pré-assemblé, vous devrez vous procurer certains accessoires en fonction des spécifications de la carte mère et de vos propres besoins.

:::info
Pour connaître les caractéristiques techniques et les problèmes connus des différentes cartes et des systèmes préassemblés, veuillez consulter le [Base de données des spécifications matérielles](/en/devices).
:::

Par exemple, pour assembler un ordinateur de bureau Loongson, voici quelques conseils généraux à suivre :

- Les cartes mères Loongson sont généralement vendues avec le processeur et le refroidisseur déjà montés dans le même ensemble ; vous n'aurez donc pas besoin d'acheter un refroidisseur séparément.
- Les processeurs Loongson de type bureau consomment généralement moins de 150 watts ; lors du choix d'une alimentation électrique, vous devrez surtout tenir compte de la consommation des périphériques, tels que les cartes graphiques.
- Toutes les cartes mères basées sur LoongArch sont équipées d'interfaces NVMe ; l'utilisation de disques NVMe devrait garantir une bonne expérience au quotidien.
- Les processeurs Loongson, en particulier les modèles haut de gamme tels que le 3C6000/S, nécessitent des modules de mémoire vive (RAM) hautement performants et un nombre suffisant de canaux pour fonctionner à leur plein potentiel. Il est généralement recommandé d'acheter une quantité suffisante de mémoire vive (RAM) répondant aux spécifications requises.
- Étant donné que les puces graphiques intégrées ou de pont Loongson (telles que la LoongGPU LG110 intégrée au pont 7A2000) sont réputées pour leur lenteur, nous vous recommandons d'acheter une carte graphique dédiée afin de garantir une bonne expérience d'utilisation sur ordinateur de bureau.
  - Les cartes graphiques AMD sont généralement bien prises en charge (les cartes Intel peuvent également constituer un bon choix). Les cartes graphiques NVIDIA ne sont pas prises en charge.

## La question de la mémoire vive

La compatibilité de la mémoire a toujours posé problème sur les plateformes Loongson. Si vous utilisez des modules de mémoire vive incompatibles ou non vérifiés, les systèmes d'exploitation et les applications risquent de ne pas fonctionner correctement.

:::info

- Pour obtenir la liste des modules de mémoire vive (RAM) dont la compatibilité avec les plateformes Loongson est confirmée, veuillez consulter [Liste de compatibilité mémoire du Loong 1-2-3](https://loong123.cn/list-hardwares.html).
- En règle générale, les modules de mémoire vive équipés de puces Hynix sont bien pris en charge.
- Si le processeur et la carte mère le permettent, nous vous recommandons d'acheter des modules de mémoire vive ECC enregistrée.

:::

## La question du GPU

Comme indiqué plus haut, les processeurs Loongson s'associent généralement mieux avec les cartes graphiques AMD. Étant donné que les produits Loongson actuels répondent déjà aux besoins en matière de multimédia et de productivité sur ordinateur de bureau, nous vous recommandons d'opter pour des cartes graphiques offrant des performances satisfaisantes et des fonctionnalités d'encodage/décodage multimédia afin de tirer pleinement parti des capacités de votre appareil.

Voici les cartes graphiques que nous vous recommandons d'acheter et qui répondent aux critères mentionnés ci-dessus :

- Haut de gamme : AMD Radeon RX 7600 ou modèles supérieurs
- Milieu de gamme : AMD Radeon RX 550, Radeon Pro WX 3100 ou modèles supérieurs

Si votre budget est limité, vous pouvez envisager les modèles suivants. Veuillez toutefois noter que ces cartes graphiques pourraient ne pas être en mesure de transmettre des signaux vidéo 4K à un taux de rafraîchissement de 60 Hz, et que l'encodage ou le décodage H.265 et AV1 pourrait également ne pas être disponible :

- Bas de gamme : AMD Radeon R7 240 et autres cartes graphiques d'entrée de gamme (non recommandées)

## La question du système d'exploitation

Grâce aux efforts de nombreuses communautés et développeurs, de nombreuses distributions Linux prennent désormais en charge les plateformes Loongson (LoongArch) actuelles. Nous recommandons les distributions suivantes pour une utilisation avec les ordinateurs Loongson :

- Débutant : AOSC OS, deepin 23
- Niveau intermédiaire et avancé : Arch Linux pour Loong64, Debian, Gentoo, NixOS, Slackwareloong
- Spécialisé : Alpine, OpenWrt, Proxmox VE
- À la une : Linux from Scratch, Yongbao

Il existe également des systèmes commerciaux provenant de Chine et de Russie, tels que UOS, KylinOS, NFSCNS, openEuler, ALT Linux et OpenHarmony.
