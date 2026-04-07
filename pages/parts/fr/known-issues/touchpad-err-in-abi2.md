### Les pavés tactiles peuvent ne pas fonctionner avec les distributions ABI 2.0

Certains ordinateurs portables sont équipés de pavés tactiles connectés via un bus HID-over-I2C, ce qui nécessite une broche GPIO pour gérer les interruptions.

Pour résoudre ce problème, un correctif pour [ajouter la prise en charge des interruptions pour le GPIO 7A2000](https://git.kernel.org/torvalds/c/44fe79020b91) est nécessaire (désormais intégré à Linux 6.15 et versions ultérieures ; la plupart des distributions commerciales utilisant Linux 6.6 incluent également un correctif). De plus, comme le noyau en amont ne prend plus en charge la fonctionnalité obsolète `gsi_idx_map` propriété, une solution de contournement est nécessaire – voir ici [correctif du noyau](https://github.com/AOSC-Tracking/linux/commit/e29193f3f1a3) provenant du système d'exploitation AOSC.
