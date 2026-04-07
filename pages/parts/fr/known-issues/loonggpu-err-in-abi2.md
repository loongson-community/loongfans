### La gestion de la rétroéclairage peut ne pas être disponible avec les distributions ABI 2.0

En raison d'une modification de l'API du noyau en amont et d'une implémentation problématique du pilote PWM Loongson, ainsi que de l'absence de `gpio_base` Remarque : la gestion du rétroéclairage de l'ordinateur portable peut ne pas être disponible sur certaines distributions Linux.

Pour résoudre ce problème, il faut procéder comme suit :

- [Routines supplémentaires d'initialisation ACPI au niveau de la carte](https://github.com/AOSC-Tracking/linux/commit/dbb668a14178)and les modifications correspondantes apportées au pilote du noyau LoongGPU (telles qu'implémentées par [Système d'exploitation AOSC](https://github.com/AOSC-Tracking/loonggpu-kernel-dkms/commit/aaee8cb5d7f879ba4cd2cb268a8591f99735b729) sont nécessaires : l'appel correct des contrôleurs PWM et la fonctionnalité permettant de désactiver complètement le rétroéclairage via GPIO.
- Un correctif pour corriger le calcul de la fréquence du contrôleur PWM, voir [ce correctif du noyau provenant d'AOSC OS](https://github.com/AOSC-Tracking/linux/commit/30b69e76d820) (Ce correctif fait désormais partie de Linux 6.18).
