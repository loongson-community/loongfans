export default {
  basic: {
    series:
      "La « série de produits » désigne la gamme à laquelle appartient ce produit.",
    market:
      "Le segment de marché fait référence aux coûts et aux applications recommandés par Loongson Technology. Veuillez noter qu'il ne reflète pas les applications et les scénarios réels dans lesquels les produits basés sur cette puce sont utilisés.",
  },
  cpu: {
    voltage:
      "La tension typique désigne la tension typique du cœur nécessaire pour assurer un fonctionnement stable à la fréquence nominale.",
    tpc: `La consommation électrique typique correspond à la consommation électrique de référence dans des conditions de charge de travail normales.

        Remarque : la consommation électrique typique ne reflète pas la consommation électrique pour chaque cas d'utilisation spécifique.`,
    tdp: `La puissance thermique nominale correspond à la dissipation thermique maximale en cas de charge extrême.

        Remarque : la puissance thermique nominale ne reflète pas la consommation électrique réelle de cette puce.`,
  },
  memory: {
    ecc: `Les modules de mémoire ECC sont capables de détecter et de corriger les erreurs de données internes et sont reconnus pour leur efficacité à améliorer la stabilité et la fiabilité du système. La technologie ECC utilise 8 bits supplémentaires pour stocker des sommes de contrôle sur chaque bloc de 64 bits de données enregistrées ; lors de la lecture de ces données, celles-ci sont comparées à la somme de contrôle susmentionnée afin de détecter et de réparer les données corrompues, empêchant ainsi les données erronées d'atteindre le processeur.
        
        Remarque : la prise en charge de la mémoire ECC est implémentée au niveau de la carte mère et du micrologiciel. Veuillez contacter le fabricant de votre appareil pour plus de détails.`,
  },
  exp: {
    io_name:
      "Le terme « interface E/S » désigne le canal par lequel le processeur échange des données avec les périphériques.",
    io_rev: `La « révision de l'interface E/S » désigne la version sous laquelle fonctionne l'interface E/S principale.
                
        Remarque : la prise en charge de PCI Express 4.0 est implémentée au niveau de la carte mère et du micrologiciel. Veuillez contacter le fabricant de votre appareil pour plus de détails.`,
    d2d_name: `La connexion « die-to-die » désigne la technologie permettant d'interconnecter plusieurs puces de processeur.

        Loongson Coherent Link est une connexion die-to-die développée en interne, offrant une latence plus faible et une bande passante plus élevée que l'HyperTransport 3.0.
        L'HyperTransport est un bus série/parallèle point à point à haut débit et à faible latence, généralement utilisé pour établir des connexions entre des processeurs, des chipsets, des contrôleurs de mémoire et des périphériques d'E/S.`,
  },
  package: {
    temperature:
      "La plage de température désigne la plage de températures que la surface du boîtier de la puce est autorisée à atteindre.",
    t_case:
      " (Température du boîtier) désigne la température maximale que la surface de la puce est autorisée à atteindre.\n\nRemarque : ",
    t_junction:
      "(Température de jonction) désigne la température maximale à laquelle les composants internes de la puce (et les transistors) sont autorisés à fonctionner.\n\nRemarque : ",
    t_notice:
      "définit les exigences de performance des dispositifs de refroidissement ainsi que les conditions ambiantes requises pour cette puce.",
  },
  power: {
    clock_gating:
      "Le « clock gating » est une technique d'économie d'énergie qui consiste à désactiver les signaux d'horloge des circuits inactifs afin de réduire au minimum la consommation d'énergie dynamique inutile.",
    frequency_scaling:
      "La modulation dynamique de fréquence est la capacité du processeur à ajuster sa fréquence d'horloge en fonction de la charge en temps réel et des besoins en énergie.",
    voltage_scaling:
      "La régulation adaptative de la tension est la capacité du processeur à ajuster la tension de ses cœurs (dans les limites de la plage nominale) en fonction de la fréquence d'horloge actuelle et de la charge.",
  },
  tech: {
    isa: {
      info: "Le jeu d'instructions désigne l'ensemble de base des commandes et des instructions que le processeur est capable de comprendre et d'exécuter.",
      extensions:
        "Les extensions ISA désignent les instructions supplémentaires mises en œuvre en plus du jeu d'instructions de base.",
      LBT: "Traduction binaire Loongson\n\nUn ensemble d'instructions étendues visant à améliorer les performances d'exécution du code provenant d'architectures étrangères. L'extension LBT met en œuvre des instructions non privilégiées et privilégiées.",
      LVZ: "Virtualisation Loongson\n\nUn ensemble d'instructions étendues permettant de mettre en œuvre l'accélération matérielle pour la virtualisation au niveau du système. L'extension LVZ met principalement en œuvre des instructions privilégiées, utiles pour contrôler les registres d'état, ainsi que pour implémenter des fonctions supplémentaires liées aux exceptions, aux interruptions et à la gestion du stockage.",
      LSX: "Extension SIMD Loongson\n\nEnsemble d'instructions étendues permettant la mise en œuvre du traitement « une instruction, plusieurs données ». L'extension LSX est implémentée sur des registres spéciaux afin d'accélérer les tâches nécessitant une puissance de calcul importante. L'extension LSX fonctionne avec une largeur de vecteur de 128 bits.",
      LASX: "Extension SIMD avancée Loongson\n\nSemblable à LSX, mais fonctionne avec une largeur de vecteur de 256 bits.",
    },
  },
}
