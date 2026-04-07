### Périphériques USB non reconnus au démarrage

Certains utilisateurs ont signalé que leurs claviers et souris USB pouvaient cesser de fonctionner après le démarrage du système et qu'il fallait parfois les brancher et les débrancher plusieurs fois avant qu'ils ne fonctionnent à nouveau.

D'après les recherches menées par un ingénieur de Loongson Technology, cela a été causé par un [défaut matériel dans le circuit intégré de pont Loongson 7A2000](https://github.com/torvalds/linux/commit/bcb60d438547355b8f9ad48645909139b64d3482). Une solution de contournement pour ce problème est incluse depuis Linux 6.15-rc1 ; les distributions commerciales basées sur les noyaux Linux 6.6 (ABI20.) ou 4.19 (ABI1.0) intègrent également cette solution.
