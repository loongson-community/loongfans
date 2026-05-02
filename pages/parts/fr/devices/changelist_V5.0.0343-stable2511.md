## Mises à jour du micrologiciel et de l'interface système

- Suppression du code de compatibilité ascendante pour les environnements hérités (ABI 1.0 ; plus précisément, la spécification v3.1 de l'architecture système unifiée pour processeurs Loongson), avec migration de toutes les plateformes vers la spécification v4.0 ([Lien de référence](https://github.com/tianocore/edk2/)).
- Nous sommes passés de la chaîne d'outils de compilation GCC 8.3 à GCC 12/13/14, en adoptant pleinement la chaîne d'outils communautaire EDK2.
- Suppression des options de mode de démarrage héritées de l'interface de configuration, avec adoption complète du mappage d'adresses VA => PA 1:1.
- Migration de l'ancienne version UDK2018 vers EDK2025 ; la plupart des API d'infrastructure LoongArch sont désormais alignées sur les implémentations EDK2 en amont.

## Mises à jour des modules

- Ajout de la prise en charge des plates-formes basées sur les processeurs 3B6000, 3C6000/{S,D,Q} à un ou plusieurs sockets, ainsi que sur les plates-formes 2K3000/3B6000M.
- Mise à jour du code de divers modules logiciels et matériels, tels que PHY, MRC, SMC, IPMI, MultiArch, eMMC, etc.

## Nouvelles fonctionnalités

Mises à jour générales des fonctionnalités :

- Intégration de MultiArchUefiPkgs pour prendre en charge l'émulation des ROM optionnelles x86 et EFI, ainsi que le filtrage des périphériques tiers (cette fonctionnalité peut être activée ou désactivée dans la configuration du micrologiciel).
- Ajout d'une option permettant de configurer les fréquences de la mémoire : il est désormais possible de réduire la vitesse d'horloge de la mémoire pour améliorer la compatibilité si nécessaire (les fréquences configurables peuvent varier selon les modèles ; l'interface de configuration du micrologiciel propose des options pour restaurer les paramètres ; il est également possible de retirer la pile CMOS pour réinitialiser les paramètres).
- Ajout d'options de configuration permettant de régler la résolution de l'interface et de la console.
- Ajout de l'option DSM#5 permettant de contrôler la stratégie d'allocation des ressources PCIe avec le noyau Linux.
- Ajout de la prise en charge des périphériques d'origine chinoise, notamment les contrôleurs RAID de HRDT et les cartes réseau 25/40 GbE de BZWX.
- Ajout d'options multi-GPU et possibilité d'afficher simultanément avec différents GPU sous UEFI.
- Ajout des fonctionnalités TPM et Secure Boot, avec prise en charge d'algorithmes tels que SHA-384, SHA-512 et SM3 (prise en charge matérielle du TPM requise).
- Séparation des vues consacrées aux informations PCIe, au disque dur et aux ports USB, et ajout d'un affichage détaillé des informations relatives au disque dur.
- Mise à jour de SRAT vers la version 6.5, avec prise en charge de l'extension x2APIC.
- Synchronisation de la logique de code concernant le réveil des cœurs multiples LoongArch, la gestion des exceptions, la MMU, etc., à partir de la version en amont de l'EDK2.

Fonctionnalités spécifiques à la plateforme :

- Ajout de la prise en charge de la configuration des périphériques PCIe 4.0 pour les plateformes Loongson Coherent Link (LCL) : séries 3B6000 et 3C6000/{S,D,Q}.
- Ajout de la prise en charge de la carte eMMC 2K3000.
- Ajout de la prise en charge de la surveillance des zones thermiques ACPI et HWMon pour le 3C6000.
- Ajout de la prise en charge ACPI EDAC pour les plates-formes serveur, permettant ainsi d'interroger l'état ECC depuis Linux.
- Limitation de puissance améliorée via le SMC, « turbo boost » et surveillance/contrôle des ventilateurs pour certains modèles.
- Prise en charge de la génération de rapports sur la description des ressources du moteur de sécurité (SE) via les tables DSDT sur certains modèles.

## Corrections et optimisations

Corrections générales :

- Correction d'un risque de plantage du système lors de la sélection de « All Video » comme affichage principal sur les serveurs à un seul socket équipés à la fois d'une carte graphique dédiée et d'une carte graphique BMC.
- Problème résolu : l'affichage de la version du micrologiciel et de l'heure de compilation était déformé sur l'écran de démarrage.
- Prise en charge optimisée de la table SMBIOS, corrigeant principalement des erreurs logiques liées au DMI de type 7.
- Correction des blocages inattendus survenant lors des opérations d'écriture sur la mémoire LP de l'horloge en temps réel (RTC).
- Correction de problèmes connus liés aux tables ACPI.
- Correction d'un ordre incorrect lors de la commutation des contrôleurs de ports SATA.
- Correction de plusieurs problèmes liés à la traduction en chinois.
- Correction d'un problème occasionnel de disparition du logo au démarrage.

Corrections et ajustements spécifiques à certaines plateformes :

- Correction d'un problème qui empêchait parfois l'affichage des informations relatives aux cartes réseau GMAC sur certains modèles.
- La fréquence du chipset 7A2000 a été réduite à 750 MHz sur les plateformes serveur.
- Compatibilité optimisée avec le protocole de commande BMC des modèles AST2500 et LS2K0500, corrigeant les problèmes d'affichage IPMI et les erreurs liées à certaines commandes.
- Correction d'un problème de désynchronisation des informations SMBIOS dans l'interface Web du BMC lors de l'utilisation du BMC LS2K0500 avec des versions de micrologiciel supérieures à la v2.2.2.
- Correction de problèmes liés à l'inversion des broches P-N sur les connecteurs SATA et à des paramètres LnkCap2 PCIe incorrects sur certaines plateformes.
- Correction de la sortie 2K0500 BMC Serial-over-LAN (SOL).
- Correction des tableaux PPTT pour plusieurs puces.
- La fonctionnalité PTW a été désactivée afin d'éviter toute corruption des données due à des problèmes liés aux tables de pages du noyau Linux (elle sera réactivée dès que des correctifs pour le noyau seront largement disponibles).
- Suppression des descriptions des ressources GPIO ACPI pour certaines plateformes afin d'éviter des problèmes de compatibilité (elles seront réintégrées dès que la prise en charge par les systèmes d'exploitation sera largement disponible).

Optimisations fonctionnelles :

- Amélioration de diverses interfaces de configuration du micrologiciel.
- Amélioration de l'interface de détection et de configuration de la présence BMC, avec l'ajout d'extensions de données FRU, de commandes pour l'interface des ports USB, et bien plus encore.

Les informations ci-dessus ont été initialement fournies par Loongson Technology [Notes de mise à jour du micrologiciel](https://github.com/loongson/Firmware/blob/main/docs/changelist_V5.0.0343-stable2511.md); réorganisé et reformulé à plusieurs endroits pour en faciliter la lecture.
