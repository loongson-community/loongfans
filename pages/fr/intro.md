---
layout: page
returnLink: /fr
pageTitle: En route vers le Nouveau Monde !
pageSubTitle: Bienvenue dans l'univers Loongson, au-delà des architectures x86 et ARM
---

Loongson est une étoile montante de l'industrie nationale chinoise des puces électroniques.

Depuis sa création à l'Institut des technologies informatiques de l'Académie chinoise des sciences en 2001, Loongson a connu de nombreuses évolutions et s'est développé au point de pouvoir rivaliser avec les acteurs internationaux.

En 2021, Loongson a lancé l'architecture de jeu d'instructions LoongArch, développée en interne, dans le but de créer un « troisième écosystème logiciel et matériel » après x86 et ARM. Aujourd'hui, Loongson s'est ouvert au marché grand public et divers ordinateurs de bureau, ordinateurs portables, serveurs et cartes de développement Loongson sont désormais facilement accessibles ; ils sont depuis devenus des outils très prisés tant par les amateurs que par les développeurs de la communauté. Certains de nos amis au sein de la communauté ont même commencé à utiliser Loongson comme outil de travail principal.

Alors, quels sont les produits Loongson disponibles sur le marché et comment peut-on les acheter et en profiter ?

## À la rencontre de la famille Loongson

La gamme de processeurs de Loongson comprend des microcontrôleurs, des systèmes sur puce (SoC) embarqués, ainsi que des processeurs destinés aux ordinateurs de bureau, aux stations de travail et aux serveurs ; on les retrouve dans un large éventail de produits matériels. La gamme actuelle se compose de trois familles de processeurs, totalisant plus de dix produits.

### Gammes de produits

Les processeurs Loongson se répartissent en trois familles :

- Loongson 3 : processeurs destinés aux ordinateurs de bureau, aux stations de travail et aux serveurs, le modèle phare de Loongson en termes de performances.
- Loongson 2 : des systèmes sur puce (SoC) destinés aux ordinateurs et contrôleurs embarqués et industriels, ainsi que des solutions pour les appareils mobiles.
- Loongson 1 : SoC/microcontrôleurs destinés aux appareils en périphérie et aux petits appareils embarqués.

Étant donné que les gammes de puces Loongson 3 et 2 suscitent un intérêt nettement plus marqué chez les amateurs, nous nous concentrerons ici sur ces deux gammes.

### Produits actuels

En 2025, la gamme actuelle de puces embarquées et de bureau de Loongson comprend les produits suivants :

- Gamme Loongson 3C6000 : processeurs à 16, 32 et 64 cœurs avec prise en charge multi-sockets, destinés aux stations de travail et aux serveurs ; tous les modèles prennent en charge la technologie SMT2 (« hyperthreading »).
- Gamme Loongson 3B6000 : processeurs à 8, 12 et 16 cœurs destinés aux ordinateurs de bureau et aux stations de travail haut de gamme ; tous les modèles prennent en charge la technologie SMT2 (« hyperthreading »).
- Loongson 3A6000 : processeur à 4 cœurs destiné aux ordinateurs de bureau et aux appareils mobiles, doté de la technologie SMT2 « hyperthreading ».
- Loongson 3B6000M, 2K3000 : processeurs à faible consommation d'énergie à 8 cœurs destinés aux ordinateurs industriels, aux appareils embarqués, aux ordinateurs de bureau et aux appareils mobiles.
- Loongson 2K0300 : SoC monocœur destiné aux appareils embarqués et à des fins pédagogiques.

:::tip
Le Loongson 3B6000M est le modèle jumeau du 2K3000, avec une fréquence d'horloge légèrement supérieure à celle de ce dernier (le 3B6000M tourne à 2,5 GHz, contre 2,2 GHz pour le 2K3000).
:::

### Présentation des fonctionnalités

Le tableau suivant résume les principales différences entre les fonctionnalités des produits actuels (classés par ordre décroissant de performances) :

| Modèle | Nombre de cœurs | Nombre de threads | Fréquence d'horloge | Canaux mémoire | Vitesses PCIe | Lignes PCIe |
| ----- | ---------- | ------------ | ----------- | --------------- | ----------- | ---------- |
| 3C6000/Q | 64 | 128 | 2,0 - 2,1 GHz | 8 | 3,0/4,0† | 64 |
| 3C6000/D | 32 | 64 | 2,1 GHz | 8 | 3,0/4,0† | 64 |
| 3C6000/S | 16 | 32 | 2,2 GHz | 4 | 3,0/4,0† | 64 |
| 3B6000 | 8-16 | 16-32 | 2,3 GHz | 2 | 3,0/4,0† | 32 |
| 3A6000 | 4 | 8 | 2,0 - 2,5 GHz | 2 | 3,0 | 32‡ |
| 3B6000M | 8 | 8 | ~2,5 GHz | 1 | 3,0 | 8 |
| 2K3000 | 8 | 8 | ~2,2 GHz | 1 | 3,0 | 8 |
| 2K0300 | 1 | 1 | 1 GHz | 1 | Aucun | Aucun |

- † : Seuls certains modèles prennent en charge la norme PCIe 4.0 ; veuillez vous reporter aux modèles de cartes et aux spécifications des fournisseurs.
- ‡ : L'interface PCIe est assurée par le circuit pont 7A2000.

Outre les produits actuels, les puces suivantes, que l'on trouve couramment, sont également basées sur l'architecture LoongArch :

- Loongson 3A5000 (4 cœurs, 4 threads), 2,0 - 2,5 GHz

:::info
Pour connaître les caractéristiques techniques, les détails et les comparaisons des processeurs, veuillez consulter :

- [Base de données des spécifications des puces](/en/chips)
- [Site officiel de Loongson Technology, rubrique « Produits semi-conducteurs »](https://www.loongson.cn/product/channel).

:::

### Modèles courants de cartes électroniques

Voici quelques-uns des modèles de cartes les plus courants actuellement disponibles. Pour connaître les caractéristiques techniques des cartes, veuillez consulter le [Base de données des produits](/en/devices):

- Loongson 3C6000/S : AC612A0_V1.1
- Loongson 3B6000 : XB612B0_V1.1
- Loongson 3A6000 : XA61200, XA61201, XA612A0
- Loongson 3B6000M : CTCISZ 3B6000M NUC
- Loongson 2K3000 : OrangePi Nova, carte d'évaluation IA 2K3000
- Loongson 2K0300 : 2K0300 « Hummingbird », carte de développement ALIENTEK 2K0300, CTCISZ ForeverPi

## Sur quels systèmes d'exploitation fonctionnent-ils ?

De nombreuses distributions Linux polyvalentes pour ordinateurs de bureau et serveurs (commerciales et communautaires), des distributions Linux spécialisées (telles qu'OpenWrt), OpenHarmony, ainsi que des systèmes d'exploitation spécialisés (tels que LoongWorks basé sur VxWorks, RTOS, etc.) prennent en charge le matériel LoongArch.

Pour connaître les systèmes d'exploitation, les distributions Linux et les logiciels courants compatibles avec LoongArch, veuillez consulter [*AREWELOONGYET ?*](https://areweloongyet.com/en/).

## Je suis convaincu, où puis-je en acheter un ?

En Chine, les cartes mères Loongson sont généralement disponibles à l'achat sur Taobao ou JD.com. Goofish propose également un large choix de cartes mères d'occasion et de systèmes préassemblés, offrant un meilleur rapport qualité-prix.

En dehors de la Chine, cependant, les choses se compliquent un peu. Outre le recours à un agent d'achat ou à un service de réexpédition, Mingcong Bai, un membre de notre communauté, peut vous aider à vous procurer du matériel Loongson :

- Telegram : @JeffBai
WeChat : mingcongbai
- E-mail : baimingcong@loongfans.cn

Si vous êtes étudiant ou développeur communautaire et que vous souhaitez porter, optimiser et améliorer divers logiciels ou applications pour LoongArch, ou si vous avez besoin de plus de puissance de calcul pour votre projet actuel, vous pouvez également contacter le [Projet Roaming Loongson](https://github.com/loongson-community/1024) pour emprunter du matériel Loongson (ou pour que nous vous en fassions don pour votre projet).

## Références

À ce stade, vous disposez déjà de quelques connaissances de base sur Loongson. Vous trouverez ci-dessous une série de documents rédigés par nos amis de la communauté, comprenant des ressources allant des guides d'utilisation aux guides de dépannage, ainsi que les spécifications du processeur, les spécifications de l'ABI, des détails sur la mise en œuvre du micrologiciel et le « problème du nouveau et de l'ancien monde » dont vous avez peut-être déjà entendu parler :

- [FAQ et dépannage](/en/guides)
- [Base de données des cartes mères et des processeurs Loongson](/en/devices)
- [*AREWELOONGYET?* : Site d'information sur la mise en place de l'écosystème LoongArch](https://areweloongyet.com/)
- [Loong 1-2-3 : Base de données de compatibilité pour LoongArch](https://loong123.cn/)

Documents de lecture rassemblés :

- [Base de données des spécifications des puces](/en/chips)
- [*AREWELOONGYET?* : Lecture : « Le Nouveau Monde et l'Ancien Monde »](https://areweloongyet.com/docs/intro)
- [Site officiel de Loongson Technology, rubrique « Produits électroniques »](https://www.loongson.cn/product/channel)
